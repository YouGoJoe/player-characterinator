import { orderBy, isEqual } from "lodash";
import pickOne from "../utils/pickOne";

const BARBARIAN = "Barbarian";
const BARD = "Bard";
const CLERIC = "Cleric";
const DRUID = "Druid";
const FIGHTER = "Fighter";
const MONK = "Monk";
const PALADIN = "Paladin";
const RANGER = "Ranger";
const ROGUE = "Rogue";
const SORCERER = "Sorcerer";
const WIZARD = "Wizard";
const WARLOCK = "Warlock";

const classes = [
  BARBARIAN, // str, con
  BARD, // cha, dex
  CLERIC, // wis, str or con
  DRUID, // wis, con
  FIGHTER, // str or dex, con
  MONK, // dex, wis
  PALADIN, // str, cha
  RANGER, // dex, wis
  ROGUE, // dex
  SORCERER, // cha, con
  WIZARD, // int, con
  WARLOCK, // cha, con
];

// extra classes thrown in to help with biases
const classesByStatName = {
  str: [FIGHTER, BARBARIAN, PALADIN],
  dex: [FIGHTER, ROGUE, RANGER, ROGUE, RANGER],
  int: [WIZARD],
  wis: [DRUID, DRUID, DRUID, CLERIC, MONK],
  cha: [BARD, SORCERER, SORCERER, SORCERER, WARLOCK, WARLOCK, WARLOCK],
  con: classes,
};

const pickClass = (stats) => {
  const orderedStats = orderBy(
    Object.entries(stats).map(([name, value]) => ({ name, value })),
    "value",
    "desc"
  );

  // tie for top stat. pick one from two highest stats (as long as it's not CON)
  const [topStat, secondStat] = orderedStats;
  if (
    topStat.value === secondStat.value &&
    topStat.name !== "con" &&
    secondStat.name !== "con"
  ) {
    return pickOne([
      ...classesByStatName[topStat.name],
      ...classesByStatName[secondStat.name],
    ]);
  }

  // stats heavily bias towards one class
  const topTwo = [topStat.name, secondStat.name].sort();

  if (isEqual(topTwo, ["dex", "wis"])) return MONK;
  if (isEqual(topTwo, ["cha", "str"])) return PALADIN;
  if (isEqual(topTwo, ["cha", "dex"])) return BARD;
  if (isEqual(topTwo, ["str", "wis"])) return CLERIC;
  if (isEqual(topTwo, ["dex", "con"])) return BARBARIAN;

  // bias class based on highest stat
  let highestStat = topStat;

  // Lots of Wizards showing up. This helps mitigate the Wizard bias
  if (highestStat.name === "int" && Math.random() > 0.4)
    highestStat = secondStat;
  // ditto Barbarians
  if (highestStat.name === "con") highestStat = secondStat;

  return pickOne(classesByStatName[highestStat.name]);
};

export const allClasses = {
  BARBARIAN,
  BARD,
  CLERIC,
  DRUID,
  FIGHTER,
  MONK,
  PALADIN,
  RANGER,
  ROGUE,
  SORCERER,
  WIZARD,
  WARLOCK,
};

export default pickClass;
