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
    const response = await fetch(
      "https://opentdb.com/api.php?amount=3&category=12&difficulty=easy&type=multiple"
    );
    return response.json();
  };
  const transformed = fetchData().then((data) => {
    //to shuffle the choices
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function generateID() {
      return Math.random().toString(36).substr(2, 9);
    }

    // Map over the array and modify each question object
    const modifiedData = data.results.map((question) => {
      const correctAnswerId = generateID();
      const choices = [
        ...question.incorrect_answers.map((answer) => ({
          id: generateID(),
          text: answer,
          isCorrect: false,
        })),
        {
          id: correctAnswerId,
          text: question.correct_answer,
          isCorrect: true,
        },
      ];

      // Shuffle the choices
      const shuffledAnswersOption = shuffleArray(choices);

      return {
        id: generateID(),
        prompt: question.question,
        choices: shuffledAnswersOption,
        answer: correctAnswerId,
      };
    });

    return modifiedData;
  });

  const { data, isLoading } = useQuery(["questions"], () => transformed, {
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
                if (state.playerName === "" || state.playerName === null) {
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
