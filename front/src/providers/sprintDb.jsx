import React, { useState, useEffect } from "react";
import { sprintDefault } from "../objects/Defaunds";
export const SprintContext = React.createContext({});

// export const SprintProvider = (prop) => {
//   const [sprints, setSprints] = useState("teste");

//   // useEffect(() => {
//   //   if (localStorage.getItem("studeSprint") !== null) {
//   //     const newSprint = JSON.parse(localStorage.getItem("studeSprint"));
//   //     setSprints(newSprint);
//   //   } else {
//   //     const newSprint = [new sprintDefault()];
//   //     newSprint[0].id = parseInt(1);
//   //     setSprints(newSprint);
//   //   }
//   // }, []);

//   consolelog(sprints);

//   return (
//     <SprintContext.Provider value={{ sprints, setSprints }}>
//       {prop.children}
//     </SprintContext.Provider>
//   );
// };

// export const useSprint = () => React.useContext(SprintContext);
