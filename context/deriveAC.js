import { allClasses } from "./pickClass";
import valueToModifier from "utils/valueToModifier";

const deriveAC = (charClass, stats) => {
  if (charClass === allClasses.MONK)
    return 10 + valueToModifier(stats.wis) + valueToModifier(stats.dex);
  if (charClass === allClasses.BARBARIAN)
    return 10 + valueToModifier(stats.con) + valueToModifier(stats.dex);
  if (charClass === allClasses.DRUID)
    // Druids won't wear metal
    return 12 + Math.min(valueToModifier(stats.dex), 2); // Hide armour
  if (
    [allClasses.BARD, allClasses.ROGUE, allClasses.WARLOCK].includes(charClass)
  )
    return 11 + valueToModifier(stats.dex); // Leather armour (Light)
  if ([allClasses.CLERIC, allClasses.RANGER].includes(charClass))
    return 14 + Math.min(valueToModifier(stats.dex), 2); // Scale mail (Medium)
  if ([allClasses.FIGHTER, allClasses.PALADIN].includes(charClass))
    return stats.str > 12 ? 16 : 14; // Ring mail/Chain mail (Heavy)
  return 8 + valueToModifier(stats.dex);
};


export default deriveAC