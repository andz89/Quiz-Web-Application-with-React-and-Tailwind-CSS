import React from "react";
import Button from "./Button";
import logo from "../logo.png";
import ReviewAnswer from "./ReviewAnswer";

const Result = ({ state, dispatch }) => {
  return (
    <>
      <div>
        <div className="w-[600px]  p-8 rounded-md  bg-black flex    flex-col    text-white">
          <div className="flex justify-center flex-col items-center">
            <img src={logo} alt="" width={150} />
            <div className="text-sm">Spotify Trivia</div>
          </div>
          <div className="flex flex-col w-full items-center mt-3">
            <h3>Player name: {state.name}</h3>

            <div>
              Score: {state.score}/{state.questions.length}
            </div>
          </div>
          <div className="flex flex-col w-full items-center">
            <Button
              text=" Menu"
              className="btn bg-light-gray w-80"
              onClick={() => {
                dispatch({
                  //delete recorded answer
                  type: "remove_answer",
                });
                dispatch({ type: "game_state", gameState: "menu" });
              }}
            />

            <Button
              text="Try Again"
              className="btn btn bg-green w-80"
              onClick={() => {
                dispatch({
                  //delete recorded answer
                  type: "remove_answer",
                });
                dispatch({ type: "game_state", gameState: "playing" });
              }}
            />
          </div>
          <div className="mt-5 ">
            {state.questions.map((question, index) => {
              return (
                <div
                  key={question.id}
                  className="flex flex-col gap-3 mt-2 w-full"
                >
                  <hr className="my-2 border-gray-400"></hr>
                  {state.playerAnswers[question.id] === question.answer && (
                    <>
                      <h2 className="text-green">1 point</h2>
                    </>
                  )}
                  <div className="flex items-center gap-2">
                    {index + 1}. {question.prompt}
                  </div>

                  <div className="flex flex-col gap-1  ">
                    {question.choices.map((option) => (
                      <ReviewAnswer
                        playerAnswer={
                          state.playerAnswers[question.id] === option.id
                        }
                        key={option.id}
                        answerKey={question.answer === option.id}
                        choices={option}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
