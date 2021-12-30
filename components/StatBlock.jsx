import { useContext } from "react";
import AppContext from "../context/AppContext";
import valueToModifier from "utils/valueToModifier";

const StatBlock = ({ name, value }) => {
  const { showMore } = useContext(AppContext);
  const mod = valueToModifier(value);
  return (
    <div style={{ marginBottom: "8px" }}>
      {name} is {value} {showMore ? `(${mod >= 0 ? "+" : ""}${mod} MOD)` : ""}
    </div>
  );
};

export default StatBlock;
