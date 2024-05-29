import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../components/LoadingButton";
import {
  INITIALIZE_FLASHCARDS,
  useFlashcards,
} from "../context/FlashcardsContext";

export const HomePage = () => {
  const { dispatch } = useFlashcards();
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateFlashcards = async () => {
    console.log("sending");
    try {
      setLoading(true);
      if (query === "") {
        setLoading(false);
        return;
      }
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query,
      });

      dispatch({
        type: INITIALIZE_FLASHCARDS,
        payload: { flashcards: response.data, query },
      });

      navigate("/quiz");
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="search-section flex flex-col w-screen justify-center items-center min-h-screen">
      <h1 className="text-7xl sm:text-9xl sm:font-medium text-blue-600 mb-6 -mt-32 font-mono	 border-y-2 border-blue-600 pb-3">
        MEMORIQ
      </h1>
      <p className="italic text-center text-gray-700 text-lg mb-10 w-3/4 md:w-1/2">
        Hey there! Got something you need to memorize? Just type it in the box
        below, and we'll whip up some flashcards to help you out. It's that
        simple. Make your learning a bit more fun!
      </p>
      <div className="flex flex-col w-4/5 sm:w-1/2">
        <p className="text-left text-gray-600 tracking-wide">{`${query.length}/150`}</p>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What would you like to memorize?"
          className="p-2 border border-gray-300 rounded shadow-lg mb-2 focus:outline-none h-32 resize-none tracking-wide"
        />
      </div>
      {!isLoading && (
        <button
          className="w-4/5 sm:w-1/2 xl:w-1/5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-red-500 hover:to-pink-500 text-white font-bold rounded shadow-lg py-2 sm:px-4 mt-2 tracking-wider"
          onClick={handleGenerateFlashcards}
        >
          Generate Flashcards
        </button>
      )}
      {isLoading && <LoadingButton />}
    </section>
  );
};
