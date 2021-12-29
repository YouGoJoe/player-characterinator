import { useContext } from "react";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";

import AppContext from "../context/AppContext";

const CharOptions = () => {
  const { allowWeak, weakThreshold, allowBoring, boringThreshold } =
    useContext(AppContext);

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={allowBoring} />}
        label={`Allow 'Boring' Characters (No Stat above ${boringThreshold})`}
      />
      <FormControlLabel
        control={<Switch checked={allowWeak} />}
        label={`Allow 'Weak' Characters (Combined Stat total not above ${weakThreshold})`}
      />
    </FormGroup>
  );
};

export default CharOptions;
