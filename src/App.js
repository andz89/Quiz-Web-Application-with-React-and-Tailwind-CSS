import Menu from "./components/Menu";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

import { initialState, reducer } from "./reducer";
import React, { useReducer, useRef, useEffect } from "react";
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

 

  return (
    <>
      <div className="bg-light-black   flex  flex-col justify-center items-center    ">
   
        {state.gameState === "menu" && 
                  <div className="h-screen flex  flex-col justify-center items-center ">
          <Menu state={state} dispatch={dispatch} />
          </div>
        }

        {state.gameState === "playing" && 
            <div className="h-screen flex  flex-col justify-center items-center ">
          <Quiz state={state} dispatch={dispatch} />
          </div>
        }
  
      {state.gameState === "result" && 
        <div className="my-5">
      <Result state={state} dispatch={dispatch} />
      </div>
      }
   
       
      </div>
    </>
  );
}

export default App;
