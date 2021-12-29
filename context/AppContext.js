import React from "react";
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

export const contextValue = {
  // weak char values
  allowWeak,
  weakThreshold,
  isWeak: () => isWeakChar(contextValue.stats),
  toggleAllowWeak: () => (contextValue.allowWeak = !contextValue.allowWeak),

  // boring char values
  allowBoring,
  boringThreshold,
  isBoring: () => isBoringChar(contextValue.stats),
  toggleAllowBoring: function () {
    this.allowBoring = !this.allowBoring;
  },

  // general stats
  stats: rollStatsWithOptions(),
};

const AppContext = React.createContext(contextValue);

export default AppContext;
