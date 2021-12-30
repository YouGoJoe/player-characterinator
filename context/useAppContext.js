import React from "react";
import useReducer from "./useReducer";
import { orderBy, isEqual } from "lodash";
import rollStats, {
  weakThreshold,
  isWeakChar,
  boringThreshold,
  isBoringChar,
} from "./rollStats";
import pickOne from "../utils/pickOne";

const showMore = false;
const allowWeak = false;
const allowBoring = true;

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
  str: [FIGHTER, BARBARIAN, BARBARIAN, PALADIN],
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

  // tie for top stat. pick one from two highest stats
  if (orderedStats[0].value === orderedStats[1].value) {
    return pickOne([
      ...classesByStatName[orderedStats[0].name],
      ...classesByStatName[orderedStats[1].name],
    ]);
  }

  // stats heavily bias towards one class
  const topTwo = [orderedStats[0].name, orderedStats[1].name].sort();

  if (isEqual(topTwo, ["dex", "wis"])) return MONK;
  if (isEqual(topTwo, ["cha", "str"])) return PALADIN;
  if (isEqual(topTwo, ["cha", "dex"])) return BARD;
  if (isEqual(topTwo, ["str", "wis"])) return CLERIC;

  // bias class based on highest stat
  let highestStat = orderedStats[0];

  // con doesn't bias you to a class well, so we'll take the next highest as your primary stat
  if (highestStat.name === "con") highestStat = orderedStats[1];
  // Lots of Wizards showing up. This helps mitigate the Wizard bias
  if (highestStat.name === "int" && Math.random() > 0.4)
    highestStat = orderedStats[1];

  return pickOne(classesByStatName[highestStat.name]);
};

const useAppContext = (rolledStats = rollStats({ allowBoring, allowWeak })) => {
  const recommendedClass = pickClass(rolledStats.stats);
  const [state, dispatch] = useReducer(
    {
      toggleAllowWeak: (draft) => {
        draft.allowWeak = !draft.allowWeak;
      },
      toggleAllowBoring: (draft) => {
        draft.allowBoring = !draft.allowBoring;
      },
      toggleShowMore: (draft) => {
        draft.showMore = !draft.showMore;
      },
      reRoll: (draft) => {
        const newRolledStats = rollStats(draft);
        draft.stats = newRolledStats.stats;
        draft.race = newRolledStats.race;
        draft.recommendedClass = pickClass(newRolledStats.stats);
      },
    },
    {
      stats: rolledStats.stats,
      race: rolledStats.race,
      recommendedClass,
      weakThreshold,
      boringThreshold,
      allowWeak,
      allowBoring,
      showMore,
    }
  );

  const actions = React.useRef({
    toggleAllowWeak: () => dispatch({ type: "toggleAllowWeak" }),
    toggleAllowBoring: () => dispatch({ type: "toggleAllowBoring" }),
    toggleShowMore: () => dispatch({ type: "toggleShowMore" }),
    reRoll: () => dispatch({ type: "reRoll" }),
  });

  return [
    {
      isWeak: isWeakChar(state.stats),
      isBoring: isBoringChar(state.stats),

      ...state,
    },
    actions.current,
  ];
};

export default useAppContext;
