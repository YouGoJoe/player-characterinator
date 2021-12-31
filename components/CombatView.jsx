import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import deriveToHit from "context/deriveToHit";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const modToString = (mod) => {
  return mod >= 0 ? `+${mod}` : mod;
};

const hitChance = (enemyAC, mod) => {
  return (20 - enemyAC + mod + 1) * 5;
};

const enemies = [
  {
    name: "Goblin",
    label: "goblin",
    armourClass: 15,
    toHitBonus: 4,
  },
  {
    name: "Kobold",
    label: "kobold",
    armourClass: 12,
    toHitBonus: 4,
  },
];

const CombatView = () => {
  const { armourClass, recommendedClass, stats } = useContext(AppContext);
  const [selectedEnemy, changeSelectedEnemy] = useState(enemies[0]);
  const { martialMod, spellMod } = deriveToHit(recommendedClass, stats);

  return (
    <div>
      <h2>Getting Hit</h2>
      <div>
        The enemy needs to roll{" "}
        <strong>
          at <i>least</i> a {armourClass}
        </strong>{" "}
        to hit me (if they roll <strong>exactly {armourClass}, they hit</strong>
        )
      </div>

      {armourClass <= 10 ? (
        <div>(This is kinda low; you're going to want to duck)</div>
      ) : null}

      <h2>Hitting with a Weapon</h2>
      {martialMod <= 0 ? (
        <div>(I probably shouldn't be swinging a weapon)</div>
      ) : null}
      <div>
        If I'm <strong>swinging a weapon</strong>, I should have a{" "}
        <strong>{modToString(martialMod + 2)} to hit</strong> the enemy, and a{" "}
        <strong>{modToString(martialMod)} to the damage</strong> I deal
      </div>

      <h2>Hitting with a Spell</h2>
      {spellMod <= 0 ? <div>(I probably won't be casting spells)</div> : null}
      <div>
        If I'm <strong>casting a spell</strong>, I should have a{" "}
        <strong>{modToString(spellMod + 2)} to hit</strong> the enemy, and a{" "}
        <strong>{modToString(spellMod)} to the damage</strong> I deal
      </div>
      <h2 style={{ display: "flex", alignItems: "center" }}>
        Compared to a
        <FormControl style={{ marginLeft: "8px" }}>
          <InputLabel id="enemy-selector">Enemy</InputLabel>
          <Select
            labelId="enemy-selector"
            id="enemy-selector"
            value={selectedEnemy.label}
            label="enemy-selector"
            onChange={({ target }) =>
              changeSelectedEnemy(
                enemies.find((enemy) => enemy.label === target.value)
              )
            }
          >
            {enemies.map((enemy) => (
              <MenuItem value={enemy.label} key={enemy.label}>
                {enemy.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </h2>

      <div>
        I should be able to hit the enemy about{" "}
        <strong>
          {hitChance(selectedEnemy.armourClass, martialMod + 2)}% of the time
          with a weapon
        </strong>
      </div>
      <div>
        I should be able to hit the enemy about{" "}
        <strong>
          {hitChance(selectedEnemy.armourClass, spellMod + 2)}% of the time with
          a spell
        </strong>
      </div>
      <div>
        They should be able to hit me about{" "}
        <strong>
          {hitChance(armourClass, selectedEnemy.toHitBonus)}% of the time {" "}
        </strong>
        {armourClass <= 10 ? (
          <>
            (again, <i>duck</i>)
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CombatView;
