import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";
const ReviewAnswer = ({ answerKey, choices, playerAnswer }) => {
  return (
    <div className="   p-1  flex items-center gap-2">
      <label
        className={` p-2 rounded cursor-pointer ${answerKey && "bg-gray-800 "}`}
      >
        <input
          readOnly
          type="radio"
          checked={answerKey}
          className="cursor-pointer  "
        />

        <span> {choices.text}</span>
      </label>
      {answerKey && <BsFillCheckCircleFill size={20} className="text-green" />}
      {!answerKey && playerAnswer && (
        <IoMdCloseCircle size={25} className="text-red-500" />
      )}
    </div>
  );
};

export default ReviewAnswer;
