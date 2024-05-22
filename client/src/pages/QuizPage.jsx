import { useState } from "react";
import { CheckCircle, Cancel } from "@mui/icons-material";
import ReplaySharpIcon from "@mui/icons-material/ReplaySharp";
import {
  MARK_ANSWER_INCORRECT,
  MARK_ANSWER_CORRECT,
  useFlashcards,
} from "../context/FlashcardsContext";
import Flashcard from "../components/Flashcard";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";

export const QuizPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const { state, dispatch, fetchNewQuestion } = useFlashcards();
  const { flashcards } = state;

  const handleClickNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handleClickBack = () => {
    setIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
  };

  const handleMarkAnswer = (index, isCorrect) => {
    if (isCorrect === true) {
      dispatch({ type: MARK_ANSWER_CORRECT, payload: { index } });
    } else {
      dispatch({ type: MARK_ANSWER_INCORRECT, payload: { index } });
    }
  };

  const handleBackToHomepage = () => {
    navigate("/");
  };

  const handleFetchNewQuestion = async () => {
    setIsLoading(true);
    await fetchNewQuestion(dispatch, state.flashcards, index);
    setIsLoading(false);
  };

  return (
    <div className="relative w-screen h-screen flex flex-col justify-center items-center">
      <button
        className="absolute top-5 left-5 btn text-5xl"
        onClick={handleBackToHomepage}
      >
        &larr;
      </button>
      <div className="flex w-2/3 lg:w-1/3 justify-between">
        <ReplaySharpIcon
          className={`text-gray-600 w-9 h-9 hover:text-gray-900 cursor-pointer ${
            isLoading ? "animate-spin" : ""
          }`}
          onClick={handleFetchNewQuestion}
        />
        <p className="mb-2 text-gray-600">{`${index + 1}/${
          flashcards.length
        }`}</p>
      </div>

      <Flashcard flashcard={flashcards[index]} />

      <div className="flex justify-between w-2/3 lg:w-1/3">
        <button
          className="btn bg-blue-500 text-white rounded text-xl font-semibold shadow-md py-2 px-4 hover:bg-blue-700 l mt-4"
          onClick={handleClickBack}
        >
          Back
        </button>
        <div className="flex justify-between w-1/6 h-full mt-4">
          <Cancel
            className={`text-red-700 w-9 h-9 hover:text-red-900 cursor-pointer`}
            onClick={() => handleMarkAnswer(index, false)}
          />

          <CheckCircle
            className="text-green-700 h-9 w-9 hover:text-green-900 cursor-pointer"
            onClick={() => handleMarkAnswer(index, true)}
          />
        </div>
        <button
          className="btn bg-blue-500 text-white rounded text-xl font-semibold shadow-md py-2 px-4 hover:bg-blue-700 l mt-4"
          onClick={handleClickNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};
