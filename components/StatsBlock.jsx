import { useContext } from "react";
import StatBlock from "./StatBlock";
import AppContext from "../context/AppContext";
import { Button } from "@mui/material";

const WeakAlert = () => {
  const { isWeak } = useContext(AppContext);
  if (!isWeak) return null;

  return (
    <div>
      <alert>Weak char alert!</alert>
    </div>
  );
};

const BoringAlert = () => {
  const { isBoring } = useContext(AppContext);

  if (!isBoring) return null;

  return (
    <div>
      <alert>All-rounder alert!</alert>
    </div>
  );
};

const StatsBlock = () => {
  const { stats, actions } = useContext(AppContext);

  return (
    <div>
      <h2>Your Stats:</h2>
      <h3>Your race is: {stats.race}</h3>
      <StatBlock name="Strength" value={stats.str} />
      <StatBlock name="Dexterity" value={stats.dex} />
      <StatBlock name="Constitution" value={stats.con} />
      <StatBlock name="Intelligence" value={stats.int} />
      <StatBlock name="Wisdom" value={stats.wis} />
      <StatBlock name="Charisma" value={stats.cha} />
      <WeakAlert />
      <BoringAlert />
      <Button variant="contained" onClick={() => actions.reRoll()}>
        Re-roll stats
      </Button>
    </div>
  );
};

export default StatsBlock;
