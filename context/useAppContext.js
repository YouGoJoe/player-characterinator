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

const mapCharToSlug = (race, recommendedClass, gender) => {
  if (!race || !recommendedClass || !gender) return null;
  let raceSlug = race.toLowerCase();
  if (raceSlug.includes("gnome")) raceSlug = "halfling"; // no gnomes?
  if (raceSlug.includes("dwarf")) raceSlug = "dwarf";
  if (raceSlug.includes("elf")) raceSlug = "elf";
  if (raceSlug.includes("halfling")) raceSlug = "halfling";
  if (raceSlug.includes("orc")) raceSlug = "orc";

  // genderless pics
  if (["dragonborn"].includes(raceSlug))
    return `https://tetra-cube.com/dnd/dndimages/cardimages/characters/${raceSlug}/${recommendedClass.toLowerCase()}.jpg`;

  return `https://tetra-cube.com/dnd/dndimages/cardimages/characters/${raceSlug}/${recommendedClass.toLowerCase()}-${gender}.jpg`;
};

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
      addRaceBias: (draft, event) => {
        if (!draft.raceBiases.includes(event)) draft.raceBiases.push(event);
      },
      removeRaceBias: (draft, event) => {
        draft.raceBiases = draft.raceBiases.filter(
          (raceBias) => raceBias !== event
        );
      },
      clearBiases: (draft) => {
        draft.classBiases = [];
        draft.raceBiases = [];
      },
      reRoll: (draft, _, state) => {
        const newRolledStats = rollStats(state);
        const recommendedClass = pickClass(newRolledStats.stats);
        draft.stats = newRolledStats.stats;
        draft.race = newRolledStats.race;
        draft.recommendedClass = recommendedClass;
        draft.armourClass = deriveAC(recommendedClass, newRolledStats.stats);
        draft.gender = Math.random() > 0.5 ? "male" : "female"; // just for images
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
      raceBiases: [],
    }
  );

  const actions = React.useRef({
    toggleAllowWeak: () => dispatch({ type: "toggleAllowWeak" }),
    toggleAllowBoring: () => dispatch({ type: "toggleAllowBoring" }),
    toggleShowMore: () => dispatch({ type: "toggleShowMore" }),
    addClassBias: (payload) => dispatch({ type: "addClassBias", payload }),
    removeClassBias: (payload) =>
      dispatch({ type: "removeClassBias", payload }),
    addRaceBias: (payload) => dispatch({ type: "addRaceBias", payload }),
    removeRaceBias: (payload) => dispatch({ type: "removeRaceBias", payload }),
    clearBiases: () => dispatch({ type: "clearBiases" }),
    reRoll: () => dispatch({ type: "reRoll" }),
  });

  return [
    {
      isWeak: isWeakChar(state.stats),
      isBoring: isBoringChar(state.stats),
      charImage: mapCharToSlug(
        state.race,
        state.recommendedClass,
        state.gender
      ),

      ...state,
    },
    actions.current,
  ];
};

export default useAppContext;
