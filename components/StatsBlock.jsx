import { useContext } from "react";
import { max } from "lodash";
import StatBlock from "./StatBlock";
import AppContext from "../context/AppContext";

const WeakAlert = () => {
  const minStatsThreshold = 68;
  const { stats } = useContext(AppContext);

  if (
    stats.str + stats.dex + stats.con + stats.int + stats.wis + stats.cha >
    minStatsThreshold
  )
    return null;

  return (
    <div>
      <alert>Weak char alert!</alert>
    </div>
  );
};

const BoringAlert = () => {
  const { stats } = useContext(AppContext);

  if (
    max([stats.str, stats.dex, stats.con, stats.int, stats.wis, stats.cha]) >=
    15
  )
    return null;

  return (
    <div>
      <alert>All-rounder alert!</alert>
    </div>
  );
};

const StatsBlock = () => {
  const { stats } = useContext(AppContext);
  return (
    <div>
      <StatBlock name="Strength" value={stats.str} />
      <StatBlock name="Dexterity" value={stats.dex} />
      <StatBlock name="Constitution" value={stats.con} />
      <StatBlock name="Intelligence" value={stats.int} />
      <StatBlock name="Wisdom" value={stats.wis} />
      <StatBlock name="Charisma" value={stats.cha} />
      <WeakAlert />
      <BoringAlert />
    </div>
  );
};

export default StatsBlock;
