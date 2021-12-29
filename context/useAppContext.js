import React from "react";
import useReducer from "./useReducer";
import rollStats, {
  weakThreshold,
  isWeakChar,
  boringThreshold,
  isBoringChar,
} from "./rollStats";

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
];

const pickClass = (stats) => {
  return classes[Math.floor(Math.random() * classes.length)];
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
