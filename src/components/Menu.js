import React from "react";
import { useQuery } from "react-query";
import Button from "./Button";
import logo from "../logo.png";
const Menu = ({ state, dispatch }) => {
  function newPromise() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  const fetchData = async () => {
    await newPromise();
    const response = await fetch("http://localhost:5000/questions");
    return response.json();
  };
  const { data, isLoading } = useQuery(["questions"], () => fetchData(), {
    staleTime: 30000,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return (
    <>
      {isLoading && (
        <div className="w-full h-screen flex justify-center items-center">
          {" "}
          <h1 className=" text-5xl text-center mx-auto  text-gray-500">
            Loading...
          </h1>{" "}
        </div>
      )}
      {data && (
        <div className="w-96 h-80 rounded-md  bg-black flex  justify-center flex-col  items-center gap-y-4">
          <div className="flex justify-center flex-col items-center mb-5">
            <img src={logo} alt="" width={220} />
            <div className="text-2xl text-white">Spotify Trivia</div>
          </div>
          <div className="flex flex-col w-full items-center">
            <>
              <div className="text-white ">
                {state.isLogin && <h2>Player name: {state.playerName}</h2>}{" "}
              </div>
            </>

            <>
              {state.isLogin === false && (
                <input
                  type="text"
                  placeholder="Enter name"
                  onChange={(e) =>
                    dispatch({ type: "add_name", name: e.target.value })
                  }
                  className="placeholder:italic placeholder:text-slate-400  bg-white   border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-orange-500 focus:border-orange-500 focus:ring-5 sm:text-sm w-80 h-10"
                />
              )}
            </>
            <>
              {state.isLogin && (
                <Button
                  text="Logout"
                  className="btn bg-light-gray w-80"
                  onClick={() => dispatch({ type: "login", isLogin: false })}
                />
              )}
            </>
            <Button
              text="Start"
              className="btn bg-green w-80"
              onClick={() => {
<<<<<<< HEAD
                  if (state.playerName === "" || state.playerName === null) {
=======
                if (state.playerName === "" || state.playerName === null) {
>>>>>>> 6d3394f267ed918f88401e2db92bc87b62254636
                  var id = Math.floor(Math.random() * 100000000);

                  dispatch({ type: "add_name", name: `player${id}` });
                }
                dispatch({ type: "game_state", gameState: "playing" });
                dispatch({ type: "login", isLogin: true });
                dispatch({ type: "load_questions", loadQuestions: data });
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
