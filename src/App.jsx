import "./App.css";
import Routing from "./Routing";
import { auth } from "./Utility/Firebase.js";
import { Type } from "./Utility/Action.type.js";
import { DataContext } from "./components/DataProvider/DataProvider";
import React, { useContext, useEffect } from "react";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
