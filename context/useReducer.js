import React from "react";
import produce from "immer";

const useReducer = (actionsMap, initialState, init) => {
  const reducer = (state, action) =>
    produce(state, (draft) => {
      const caseReducer = actionsMap[action.type];
      return caseReducer ? caseReducer(draft, action.payload, state) : undefined;
    });

  return React.useReducer(reducer, initialState, init);
};

export default useReducer;
