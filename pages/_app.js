import "@styles/globals.css";
import React from "react";
import AppContext from "../context/AppContext";
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

const rollStatsWithOptions = () => {
  let tempStats = rollStats();
  while (
    (!allowBoring && isBoringChar(tempStats)) ||
    (!allowWeak && isWeakChar(tempStats))
  ) {
    tempStats = rollStats();
  }

  return tempStats;
};

const useAppContext = (stats) => {
  const [state, dispatch] = useReducer(
    {
      toggleAllowWeak: (draft) => {
        draft.allowWeak = !draft.allowWeak;
      },
      toggleAllowBoring: (draft) => {
        draft.allowBoring = !draft.allowBoring;
      },
      reRoll: (draft) => {
        let tempStats = rollStats();
        while (
          (!draft.allowBoring && isBoringChar(tempStats)) ||
          (!draft.allowWeak && isWeakChar(tempStats))
        ) {
          tempStats = rollStats();
        }
        draft.stats = tempStats;
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

function Application({ Component, pageProps }) {
  const [state, actions] = useAppContext(rollStatsWithOptions());
  return (
    <AppContext.Provider value={{ ...state, actions }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default Application;
