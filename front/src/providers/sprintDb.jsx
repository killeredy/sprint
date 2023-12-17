import React, { useState, useEffect } from "react";
import { sprintDefault } from "../objects/Defaunds";
export const SprintContext = React.createContext({});

export const SprintProvider = (prop) => {
  const [sprint, setSprint] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("sprint") !== null) {
      console.log("load");
      const newSprint = JSON.parse(localStorage.getItem("sprint"));
      setSprint(newSprint);
    } else {
      console.log("new");
      const newSprint = [new sprintDefault()];
      newSprint[0].id = 1;
      setSprint(newSprint);
    }
  }, []);

  return (
    <SprintContext.Provider value={{ sprint, setSprint }}>
      {prop.children}
    </SprintContext.Provider>
  );
};

export const useSprint = () => React.useContext(SprintContext);
