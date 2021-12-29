import React from "react";
import useReducer from "../context/useReducer";
import { sum, max } from "lodash";

const weakThreshold = 68;
const boringThreshold = 15;
const allowWeak = false;
const allowBoring = true;

const d6 = () => Math.ceil(Math.random() * 6);

const rollIt = () => sum([d6(), d6(), d6(), d6()].sort().slice(1));

const rollStats = () => ({
  str: rollIt(),
  dex: rollIt(),
  con: rollIt(),
  int: rollIt(),
  wis: rollIt(),
  cha: rollIt(),
});

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
      reRoll: (draft) => {
        draft.stats = rollStatsWithOptions(draft);
      },
    },
    { stats, weakThreshold, boringThreshold, allowWeak, allowBoring }
  );

  const actions = React.useRef({
    toggleAllowWeak: () => dispatch({ type: "toggleAllowWeak" }),
    toggleAllowBoring: () => dispatch({ type: "toggleAllowBoring" }),
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
