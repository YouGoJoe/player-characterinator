import { sum, max, flatten, orderBy, shuffle } from "lodash";
import pickOne from "utils/pickOne";

export const weakThreshold = 68;
export const boringThreshold = 15;

const d6 = () => Math.ceil(Math.random() * 6);

const rollIt = () => sum([d6(), d6(), d6(), d6()].sort().slice(1));

const M_DWARF = "Mountain Dwarf";
const HALF_ORC = "Half-orc";
const DRAGONBORN = "Dragonborn";
const HUMAN = "Human";
const F_GNOME = "Forest Gnome";
const S_HALFLING = "Stout Halfling";
const R_GNOME = "Rock Gnome";
const H_ELF = "High Elf";
const TIEFLING = "Tiefling";
const H_DWARF = "Hill Dwarf";
const W_ELF = "Wood Elf";
const HALF_ELF = "Half-Elf";
const D_ELF = "Drow/Dark Elf";
const L_HALFLING = "Lightfoot Halfling";

const races = [
  M_DWARF,
  HALF_ORC,
  DRAGONBORN,
  HUMAN,
  F_GNOME,
  S_HALFLING,
  R_GNOME,
  H_ELF,
  TIEFLING,
  H_DWARF,
  W_ELF,
  HALF_ELF,
  D_ELF,
  L_HALFLING,
];

const pickOneBias = (raceBiases) => {
  return pickOne(
    flatten(
      raceBiases.map((raceBias) =>
        races.filter((raceName) => raceName.toLowerCase().includes(raceBias))
      )
    )
  );
};

const bonus = (twoPointRaces, onePointRaces, race) => {
  if (twoPointRaces.includes(race)) return 2;
  else if (onePointRaces.includes(race)) return 1;
  else return 0;
};

const strBonus = (race) =>
  bonus([M_DWARF, HALF_ORC, DRAGONBORN], [HUMAN], race);
const dexBonus = (race) =>
  bonus([H_ELF, W_ELF, D_ELF, S_HALFLING, L_HALFLING], [HUMAN, F_GNOME], race);
const conBonus = (race) =>
  bonus([H_DWARF, M_DWARF], [HALF_ORC, S_HALFLING, R_GNOME, HUMAN], race);
const intBonus = (race) =>
  bonus([R_GNOME, F_GNOME], [H_ELF, TIEFLING, HUMAN], race);
const wisBonus = (race) => bonus([], [H_DWARF, HUMAN, W_ELF], race);
const chaBonus = (race) =>
  bonus([HALF_ELF, TIEFLING], [DRAGONBORN, D_ELF, HUMAN, L_HALFLING], race);

const statsWithMods = (race) => ({
  str: rollIt() + strBonus(race),
  dex: rollIt() + dexBonus(race),
  con: rollIt() + conBonus(race),
  int: rollIt() + intBonus(race),
  wis: rollIt() + wisBonus(race),
  cha: rollIt() + chaBonus(race),
});

const statsWithModsBias = (race, classBiases) => {
  // they selected everything AKA no bias
  if (classBiases.length === 3) return statsWithMods(race);

  const returnStats = {};
  const statsLowToHigh = orderBy(new Array(6).fill().map(rollIt));

  // Dex is pretty much the only thing that seems to reinforce the idea of "Stealth"
  // This should over-index you into Rogue/Ranger
  if (classBiases.includes("stealth"))
    returnStats.dex = statsLowToHigh.pop() + dexBonus(race);

  // Maxing out Wis/Int/Cha to reinforce the idea of "Spells"
  // This should over-index you into Bard/Druid/Sorcerer/Wizard/Warlock
  if (classBiases.includes("spells")) {
    const topThree = shuffle([
      statsLowToHigh.pop(),
      statsLowToHigh.pop(),
      statsLowToHigh.pop(),
    ]);
    returnStats.int = topThree.pop() + intBonus(race);
    returnStats.wis = topThree.pop() + wisBonus(race);
    returnStats.cha = topThree.pop() + chaBonus(race);
  }

  // Maxing out Str/Dex/Con to reinforce the idea of "Martial"
  // This should over-index you into Barbarian/Cleric/Fighter/Paladin
  if (classBiases.includes("martial")) {
    if (classBiases.includes("stealth")) {
      //already maxxed Dex, just need Str and Con
      const topTwo = shuffle([statsLowToHigh.pop(), statsLowToHigh.pop()]);
      returnStats.str = topTwo.pop() + strBonus(race);
      returnStats.con = topTwo.pop() + conBonus(race);
    } else {
      const topThree = shuffle([
        statsLowToHigh.pop(),
        statsLowToHigh.pop(),
        statsLowToHigh.pop(),
      ]);
      returnStats.str = topThree.pop() + strBonus(race);
      returnStats.dex = topThree.pop() + dexBonus(race);
      returnStats.con = topThree.pop() + conBonus(race);
    }
  }

  return {
    str: returnStats.str ?? shuffle(statsLowToHigh).pop() + strBonus(race),
    dex: returnStats.dex ?? shuffle(statsLowToHigh).pop() + dexBonus(race),
    con: returnStats.con ?? shuffle(statsLowToHigh).pop() + conBonus(race),
    int: returnStats.int ?? shuffle(statsLowToHigh).pop() + intBonus(race),
    wis: returnStats.wis ?? shuffle(statsLowToHigh).pop() + wisBonus(race),
    cha: returnStats.cha ?? shuffle(statsLowToHigh).pop() + chaBonus(race),
  };
};

const rollStats = ({ classBiases, raceBiases }) => {
  const race = raceBiases.length ? pickOneBias(raceBiases) : pickOne(races);
  const stats = classBiases.length
    ? statsWithModsBias(race, classBiases)
    : statsWithMods(race);
  return {
    race,
    stats,
  };
};

export const isWeakChar = (stats) =>
  stats.str + stats.dex + stats.con + stats.int + stats.wis + stats.cha <
  weakThreshold;

export const isBoringChar = (stats) =>
  max([stats.str, stats.dex, stats.con, stats.int, stats.wis, stats.cha]) <
  boringThreshold;

const rollStatsWithOptions = ({
  allowBoring,
  allowWeak,
  classBiases,
  raceBiases,
}) => {
  let tempStats = rollStats({ classBiases, raceBiases });
  while (
    (!allowBoring && isBoringChar(tempStats.stats)) ||
    (!allowWeak && isWeakChar(tempStats.stats))
  ) {
    tempStats = rollStats({ classBiases, raceBiases });
  }

  return tempStats;
};

export default rollStatsWithOptions;
