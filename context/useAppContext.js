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

const M_DWARF = "Mountain Dwarf";
const HALF_ORC = "Half-orc";
const DRAGONBORN = "Dragonborn";
const HUMAN = "Human";
const F_GNOME = "Forest Gnome";
const S_HALFLING = "Stout Halfling";
const R_GNOME = "Rock Gnome";
const H_ELF = "High Elf";
const TIEFLING = "Tiefling";
const H_DWARF = "Hill Dwarf";
const W_ELF = "Wood Elf";
const HALF_ELF = "Half-Elf";
const D_ELF = "Drow";
const L_HALFLING = "Lightfoot Halfling";

const races = [
  M_DWARF,
  HALF_ORC,
  DRAGONBORN,
  HUMAN,
  F_GNOME,
  S_HALFLING,
  R_GNOME,
  H_ELF,
  TIEFLING,
  H_DWARF,
  W_ELF,
  HALF_ELF,
  D_ELF,
  L_HALFLING,
];

const bonus = (twoPointRaces, onePointRaces, race) => {
  if (twoPointRaces.includes(race)) return 2;
  else if (onePointRaces.includes(race)) return 1;
  else return 0;
};

const strBonus = (race) =>
  bonus([M_DWARF, HALF_ORC, DRAGONBORN], [HUMAN], race);
const dexBonus = (race) =>
  bonus([H_ELF, W_ELF, D_ELF, S_HALFLING, L_HALFLING], [HUMAN, F_GNOME], race);
const conBonus = (race) =>
  bonus([H_DWARF, M_DWARF], [HALF_ORC, S_HALFLING, R_GNOME, HUMAN], race);
const intBonus = (race) =>
  bonus([R_GNOME, F_GNOME], [H_ELF, TIEFLING, HUMAN], race);
const wisBonus = (race) => bonus([], [H_DWARF, HUMAN, W_ELF], race);
const chaBonus = (race) =>
  bonus([HALF_ELF, TIEFLING], [DRAGONBORN, D_ELF, HUMAN, L_HALFLING], race);

const rollStats = () => {
  const race = races[Math.floor(Math.random() * races.length)];
  return {
    race,
    str: rollIt() + strBonus(race),
    dex: rollIt() + dexBonus(race),
    con: rollIt() + conBonus(race),
    int: rollIt() + intBonus(race),
    wis: rollIt() + wisBonus(race),
    cha: rollIt() + chaBonus(race),
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
