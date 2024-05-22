import { Routes, Route } from "react-router-dom";
import "./app.css";
import { HomePage } from "./pages/HomePage";
import { QuizPage } from "./pages/QuizPage";
import { FlashcardsProvider } from "./context/FlashcardsContext";

export default function App() {
  return (
    <>
      <FlashcardsProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </FlashcardsProvider>
    </>
  );
}
