import StatBlock from "./StatBlock";

import { sum, max } from "lodash";

const d6 = () => Math.ceil(Math.random() * 6);

const rollIt = () => sum([d6(), d6(), d6(), d6()].sort().slice(1));

const StatsBlock = () => {
  return (
    <div>
      <StatBlock name="Strength" value={rollIt()} />
      <StatBlock name="Dexterity" value={rollIt()} />
      <StatBlock name="Constitution" value={rollIt()} />
      <StatBlock name="Intelligence" value={rollIt()} />
      <StatBlock name="Wisdom" value={rollIt()} />
      <StatBlock name="Charisma" value={rollIt()} />
    </div>
  );
};

export default StatsBlock;
