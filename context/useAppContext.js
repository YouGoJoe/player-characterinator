import React from "react";
import useReducer from "./useReducer";
import rollStats, {
  weakThreshold,
  isWeakChar,
  boringThreshold,
  isBoringChar,
} from "./rollStats";
import pickClass from "context/pickClass";
import deriveAC from "context/deriveAC";

const useAppContext = () => {
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
      addClassBias: (draft, event) => {
        if (!draft.classBiases.includes(event)) draft.classBiases.push(event);
      },
      removeClassBias: (draft, event) => {
        draft.classBiases = draft.classBiases.filter(
          (classBias) => classBias !== event
        );
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
      stats: {},
      weakThreshold,
      boringThreshold,
      allowWeak: false,
      allowBoring: true,
      showMore: false,
      classBiases: [],
    }
  );

  const actions = React.useRef({
    toggleAllowWeak: () => dispatch({ type: "toggleAllowWeak" }),
    toggleAllowBoring: () => dispatch({ type: "toggleAllowBoring" }),
    toggleShowMore: () => dispatch({ type: "toggleShowMore" }),
    addClassBias: (payload) => dispatch({ type: "addClassBias", payload }),
    removeClassBias: (payload) =>
      dispatch({ type: "removeClassBias", payload }),
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
