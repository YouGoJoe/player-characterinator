import React from "react";
import useReducer from "./useReducer";
import rollStats, {
  weakThreshold,
  isWeakChar,
  boringThreshold,
  isBoringChar,
} from "./rollStats";
import pickClass, { allClasses } from "context/pickClass";
import deriveAC from "context/deriveAC";

const showMore = false;
const allowWeak = false;
const allowBoring = true;

const useAppContext = (rolledStats = rollStats({ allowBoring, allowWeak })) => {
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
        const recommendedClass = pickClass(newRolledStats.stats);
        draft.stats = newRolledStats.stats;
        draft.race = newRolledStats.race;
        draft.recommendedClass = recommendedClass;
        draft.armourClass = deriveAC(recommendedClass, newRolledStats.stats);
      },
    },
    {
      stats: rolledStats.stats,
      race: rolledStats.race,
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

  const recommendedClass = pickClass(state.stats);
  return [
    {
      isWeak: isWeakChar(state.stats),
      isBoring: isBoringChar(state.stats),
      recommendedClass,
      armourClass: deriveAC(recommendedClass, state.stats),

      ...state,
    },
    actions.current,
  ];
};

export default useAppContext;
