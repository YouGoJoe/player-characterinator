import { useContext } from "react";
import StatBlock from "./StatBlock";
import CharImage from "./CharImage";
import AppContext from "../context/AppContext";

const StatsBlock = () => {
  const { stats, race, recommendedClass, armourClass } = useContext(AppContext);

  return (
    <div>
      <h2>Your Stats:</h2>
      <h3>Your race is: {race}</h3>
      <h3>Your class is: {recommendedClass}</h3>
      <h3>Your AC is: {armourClass}</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ marginRight: "32px" }}>
          <StatBlock name="Strength" value={stats.str} />
          <StatBlock name="Dexterity" value={stats.dex} />
          <StatBlock name="Constitution" value={stats.con} />
          <StatBlock name="Intelligence" value={stats.int} />
          <StatBlock name="Wisdom" value={stats.wis} />
          <StatBlock name="Charisma" value={stats.cha} />
        </div>
        <CharImage />
      </div>
    </div>
  );
};

export default StatsBlock;
