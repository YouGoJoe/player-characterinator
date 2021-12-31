import { useContext } from "react";
import StatBlock from "./StatBlock";
import AppContext from "../context/AppContext";
import { Button } from "@mui/material";

const WeakAlert = () => {
  const { isWeak } = useContext(AppContext);
  if (!isWeak) return null;

  return <div>Weak char alert!</div>;
};

const BoringAlert = () => {
  const { isBoring } = useContext(AppContext);

  if (!isBoring) return null;

  return <div>All-rounder alert!</div>;
};

const StatsBlock = () => {
  const { stats, race, recommendedClass, armourClass, charImage, actions } =
    useContext(AppContext);

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
        {charImage ? <img src={charImage} height="250px" /> : null}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "16px",
        }}
      >
        <WeakAlert />
        <BoringAlert />
        <Button variant="contained" onClick={() => actions.reRoll()}>
          Re-roll stats
        </Button>
      </div>
    </div>
  );
};

export default StatsBlock;
