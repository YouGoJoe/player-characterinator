import { useContext } from "react";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";

import AppContext from "../context/AppContext";

const CharOptions = () => {
  const {
    allowWeak,
    weakThreshold,
    allowBoring,
    boringThreshold,
    showMore,
    actions,
  } = useContext(AppContext);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={showMore}
            onChange={() => actions.toggleShowMore()}
          />
        }
        label={`Show advanced info`}
      />
      <FormControlLabel
        control={
          <Switch
            checked={allowBoring}
            onChange={() => actions.toggleAllowBoring()}
          />
        }
        label={`Allow 'Boring' Characters ${
          showMore && `(No Stat above ${boringThreshold})`
        }`}
      />
      <FormControlLabel
        control={
          <Switch
            checked={allowWeak}
            onChange={() => actions.toggleAllowWeak()}
          />
        }
        label={`Allow 'Weak' Characters ${
          showMore && `(Combined Stat total not above ${weakThreshold})`
        }`}
      />
    </FormGroup>
  );
};

export default CharOptions;
