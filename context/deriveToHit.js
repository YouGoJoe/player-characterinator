import { allClasses } from "./pickClass";
import valueToModifier from "utils/valueToModifier";

const deriveToHit = (classInput, stats) => {
  const martialMod = valueToModifier(Math.max(stats.dex, stats.str));
  let spellMod = 0;

  // Charisma casters
  if (
    [
      allClasses.BARD,
      allClasses.WARLOCK,
      allClasses.SORCERER,
      allClasses.PALADIN,
    ].includes(classInput)
  ) {
    spellMod = valueToModifier(stats.cha);
  }

  // Wisdom casters
  if ([allClasses.DRUID, allClasses.CLERIC].includes(classInput)) {
    spellMod = valueToModifier(stats.wis);
  }

  // Intelligence casters
  if ([allClasses.WIZARD].includes(classInput)) {
    spellMod = valueToModifier(stats.int);
  }

  return { martialMod, spellMod };
};

export default deriveToHit;
