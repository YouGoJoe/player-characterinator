import { useContext } from "react";
import AppContext from "../context/AppContext";
import valueToStringMod from "utils/valueToStringMod";

const SkillsView = () => {
  const { stats } = useContext(AppContext);

  return (
    <ul>
      <li>Acrobatics: {valueToStringMod(stats.dex)}</li>
      <li>Animal Handling: {valueToStringMod(stats.wis)}</li>
      <li>Arcana: {valueToStringMod(stats.int)}</li>
      <li>Athletics: {valueToStringMod(stats.str)}</li>
      <li>Deception: {valueToStringMod(stats.cha)}</li>
      <li>History: {valueToStringMod(stats.int)}</li>
      <li>Insight: {valueToStringMod(stats.wis)}</li>
      <li>Intimidation: {valueToStringMod(stats.cha)}</li>
      <li>Investigation: {valueToStringMod(stats.int)}</li>
      <li>Medicine: {valueToStringMod(stats.wis)}</li>
      <li>Nature: {valueToStringMod(stats.int)}</li>
      <li>Perception: {valueToStringMod(stats.wis)}</li>
      <li>Performance: {valueToStringMod(stats.cha)}</li>
      <li>Persuasion: {valueToStringMod(stats.cha)}</li>
      <li>Religion: {valueToStringMod(stats.int)}</li>
      <li>Sleight of Hand: {valueToStringMod(stats.dex)}</li>
      <li>Stealth: {valueToStringMod(stats.dex)}</li>
      <li>Survival: {valueToStringMod(stats.wis)}</li>
    </ul>
  );
};

export default SkillsView;
