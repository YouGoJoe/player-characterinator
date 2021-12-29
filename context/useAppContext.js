import React from "react";
import useReducer from "../context/useReducer";
import { sum, max } from "lodash";

const weakThreshold = 68;
const boringThreshold = 15;
const showMore = false;
const allowWeak = false;
const allowBoring = true;

const d6 = () => Math.ceil(Math.random() * 6);

const rollIt = () => sum([d6(), d6(), d6(), d6()].sort().slice(1));

const races = [
  "Mountain Dwarf",
  "Half-orc",
  "Dragonborn",
  "Human",
  "Forest Gnome",
  "Stout Halfling",
  "Rock Gnome",
  "High Elf",
  "Tiefling",
  "Hill Dwarf",
  "Wood Elf",
  "Half-Elf",
  "Drow",
  "Lightfoot Halfling",
];

const rollStats = () => {
  return {
    race: races[Math.floor(Math.random() * races.length)],
    str: rollIt(),
    dex: rollIt(),
    con: rollIt(),
    int: rollIt(),
    wis: rollIt(),
    cha: rollIt(),
  };
};

const isWeakChar = (stats) =>
  stats.str + stats.dex + stats.con + stats.int + stats.wis + stats.cha <
  weakThreshold;

const isBoringChar = (stats) =>
  max([stats.str, stats.dex, stats.con, stats.int, stats.wis, stats.cha]) <
  boringThreshold;

const rollStatsWithOptions = ({ allowBoring, allowWeak }) => {
  let tempStats = rollStats();
  while (
    (!allowBoring && isBoringChar(tempStats)) ||
    (!allowWeak && isWeakChar(tempStats))
  ) {
    tempStats = rollStats();
  }

  return tempStats;
};

const useAppContext = (
  stats = rollStatsWithOptions({ allowBoring, allowWeak })
) => {
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
        draft.stats = rollStatsWithOptions(draft);
      },
    },
    { stats, weakThreshold, boringThreshold, allowWeak, allowBoring, showMore }
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
