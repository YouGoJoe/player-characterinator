import React from "react";
import { sum, max } from "lodash";

const d6 = () => Math.ceil(Math.random() * 6);

const rollIt = () => sum([d6(), d6(), d6(), d6()].sort().slice(1));

export const contextValue = {
  stats: {
    str: rollIt(),
    dex: rollIt(),
    con: rollIt(),
    int: rollIt(),
    wis: rollIt(),
    cha: rollIt(),
  },
  setStr: function (value) {
    this.stats.str = value;
  },
};

const AppContext = React.createContext(contextValue);

export default AppContext;
