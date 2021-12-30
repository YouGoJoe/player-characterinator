import { sum, max } from "lodash";
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
const D_ELF = "Drow";
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

const rollStats = () => {
  const race = pickOne(races);
  return {
    race,
    stats: {
      str: rollIt() + strBonus(race),
      dex: rollIt() + dexBonus(race),
      con: rollIt() + conBonus(race),
      int: rollIt() + intBonus(race),
      wis: rollIt() + wisBonus(race),
      cha: rollIt() + chaBonus(race),
    },
  };
};

export const isWeakChar = (stats) =>
  stats.str + stats.dex + stats.con + stats.int + stats.wis + stats.cha <
  weakThreshold;

export const isBoringChar = (stats) =>
  max([stats.str, stats.dex, stats.con, stats.int, stats.wis, stats.cha]) <
  boringThreshold;

const rollStatsWithOptions = ({ allowBoring, allowWeak }) => {
  let tempStats = rollStats();
  while (
    (!allowBoring && isBoringChar(tempStats.stats)) ||
    (!allowWeak && isWeakChar(tempStats.stats))
  ) {
    tempStats = rollStats();
  }

  return tempStats;
};

export default rollStatsWithOptions;
