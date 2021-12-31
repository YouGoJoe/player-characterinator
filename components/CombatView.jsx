import { useContext } from "react";
import AppContext from "../context/AppContext";
import deriveToHit from "context/deriveToHit";

const modToString = (mod) => {
  return mod >= 0 ? `+${mod}` : mod;
};

const CombatView = () => {
  const { armourClass, recommendedClass, stats } = useContext(AppContext);

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

      {armourClass <= 10 ? <div>(This is kinda low; you're going to want to duck)</div> : null}

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
      {spellMod <= 0 ? (
        <div>(I probably won't be casting spells)</div>
      ) : null}
      <div>
        If I'm <strong>casting a spell</strong>, I should have a{" "}
        <strong>{modToString(spellMod + 2)} to hit</strong> the enemy, and a{" "}
        <strong>{modToString(spellMod)} to the damage</strong> I deal
      </div>
    </div>
  );
};

export default CombatView;
