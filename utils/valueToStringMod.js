import valueToModifier from "./valueToModifier";

const valueToStringMod = (value) => {
  const mod = valueToModifier(value);
  return mod >= 0 ? `+${mod}` : mod;
};

export default valueToStringMod;
