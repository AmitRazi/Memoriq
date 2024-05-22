import { createContext, useContext, useReducer } from "react";
import axios from "axios";

export const INITIALIZE_FLASHCARDS = "initializeFlashcards";
export const GENERATE_NEW_FLASHCARD = "generateFlashcard";
export const FETCH_NEW_QUESTION = "fetchNewQuestion";
export const MARK_ANSWER_CORRECT = "markCorrect";
export const MARK_ANSWER_INCORRECT = "markIncorrect";

const initialState = {
  flashcards: [],
  query: "",
};

const fetchNewQuestion = async (dispatch, query, index) => {
  try {
    const response = await axios.post("http://localhost:5000/gemini/single", {
      query: JSON.stringify(query),
      question: JSON.stringify(query[index]),
    });
    const newQuestion = response.data;
    dispatch({
      type: FETCH_NEW_QUESTION,
      payload: { question: newQuestion, index },
    });
    return newQuestion;
  } catch (error) {
    console.error("Failed to fetch new question", error);
  }
};
function reducer(state, action) {
  switch (action.type) {
    case INITIALIZE_FLASHCARDS:
      return action.payload;
    case FETCH_NEW_QUESTION: {
      const newFlashcards = state.flashcards.map((flashcard, idx) =>
        idx === action.payload.index ? action.payload.question[0] : flashcard
      );
      return {
        ...state,
        flashcards: newFlashcards,
      };
    }
    case MARK_ANSWER_CORRECT:
      return {
        ...state,
        flashcards: state.flashcards.map((flashcard, idx) =>
          idx === action.payload.index
            ? { ...flashcard, isCorrect: true }
            : flashcard
        ),
      };
    case MARK_ANSWER_INCORRECT:
      return {
        ...state,
        flashcards: state.flashcards.map((flashcard, idx) =>
          idx === action.payload.index
            ? { ...flashcard, isCorrect: false }
            : flashcard
        ),
      };
    default:
      throw new Error("Unknown action type");
  }
}

const FlashcardsContext = createContext();

export const FlashcardsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FlashcardsContext.Provider value={{ state, dispatch, fetchNewQuestion }}>
      {children};
    </FlashcardsContext.Provider>
  );
};

export const useFlashcards = () => {
  const context = useContext(FlashcardsContext);

  return context;
};
