import React, { useEffect, useState } from "react";

import Button from "./Button";
import logo from "../logo.png";
import Choices from "./Choices";
const Quiz = ({ state, dispatch }) => {
  const [currQuestion, setCurrQuestion] = useState(0);
  const [isSelect, setSelect] = useState(false);

  //next question
  const nextQuestion = () => {
    if (currQuestion === state.questions.length - 1) {
      //if no questions next

      setCurrQuestion(0);
      dispatch({ type: "game_state", gameState: "result" });
      //count correct answer

      const score = state.questions.filter(
        (question) => question.answer === state.playerAnswers[question.id]
      );
      console.log(score.length);
      dispatch({
        type: "set_score",
        score: score.length === 0 ? 0 : score.length,
      });
    } else {
      setCurrQuestion(currQuestion + 1);
    }
  };

  const restart = () => {
    setSelect(null);
    setCurrQuestion(0);
    dispatch({ type: "game_state", gameState: "menu" });
  };
  //select answer
  const handleSelectAnswer = (choices) => {
    dispatch({
      type: "active_question",
      active_questionId: state.questions[currQuestion].id,
    });
    //record answer
    dispatch({
      type: "add_answer",
      answer: choices?.id,
    });
    setSelect(true);
  };
  const isSavedAnswer = state.playerAnswers[state.questions[currQuestion].id];
  return (
    <>
      <div className="flex flex-col gap-3 bg-black p-6 text-white w-[32rem]   ">
        <div className="flex justify-center flex-col items-center">
          <img src={logo} alt="" width={150} />
          <div className="text-sm">Spotify Trivia</div>
        </div>

        <div className="header   flex justify-between">
          <div>
            {" "}
            <h3 className="text-lg ">
              <span className="font-semibold"> Player name:</span>{" "}
              {state.playerName}
            </h3>{" "}
          </div>
          <div className="text-green">
            <span className="number-of-question">
              {" "}
              {currQuestion + 1} of {state.questions.length} questions
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-2">
          <div>{state.questions[currQuestion].prompt}</div>
          <div className="flex flex-col gap-1  ">
            {state.questions[currQuestion].choices.map((option) => (
              <Choices
                key={option.id}
                selectedAnswer={
                  state.playerAnswers[state.questions[currQuestion].id] ===
                  option.id
                }
                handleSelectAnswer={handleSelectAnswer}
                choices={option}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between items-start items-center">
          <div className="flex gap-2">
            <Button
              text="Back"
              className={
                currQuestion === 0
                  ? "btn bg-gray   py-1   px-3  "
                  : "btn bg-green px-3 py-1  "
              }
              disabled={currQuestion === 0}
              onClick={() => {
                setCurrQuestion(currQuestion - 1);
                setSelect(true);
              }}
            />
            <Button
              text="Restart"
              className="btn  bg-light-gray px-2 "
              onClick={restart}
            />
          </div>

          <Button
            text={
              currQuestion === state.questions.length - 1
                ? "Finish Quiz"
                : "Next"
            }
            onClick={nextQuestion}
            disabled={isSavedAnswer ? false : true}
            className={
              isSavedAnswer
                ? "btn bg-green px-3 py-1  "
                : "btn bg-gray   py-1   px-3  "
            }
          />
        </div>
      </div>
    </>
  );
};

export default Quiz;
