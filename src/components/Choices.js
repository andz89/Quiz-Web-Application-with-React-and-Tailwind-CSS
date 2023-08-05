import React from "react";

const Choices = ({ handleSelectAnswer, choices, selectedAnswer }) => {
  return (
    <div className=" option p-1 ">
      <label
        className={` p-2 rounded cursor-pointer ${
          selectedAnswer
            ? "bg-gray-800   hover:bg-gray-700"
            : "hover-bg-light-gray "
        }`}
      >
        <input
          type="radio"
          onChange={() => {
            handleSelectAnswer({ answer: choices.option, id: choices.id });
          }}
          checked={selectedAnswer}
          className="cursor-pointer  "
        />

        <span> {choices.text}</span>
      </label>
    </div>
  );
};

export default Choices;
