import { useContext } from "react";

import StatBlock from "./StatBlock";
import AppContext from "../context/AppContext";

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
    </div>
  );
};

export default StatsBlock;
