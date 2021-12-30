import { groupBy } from "lodash";
import pickClass from "context/pickClass";
import rollStats from "context/rollStats";

console.log(
  groupBy(
    new Array(10000)
      .fill()
      .map(() =>
        pickClass(rollStats({ allowBoring: true, allowWeak: false }).stats)
      )
  )
);
