import { useState, useEffect } from "react";

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  useEffect(() => {
    setFlip(false);
  }, [flashcard]);

  return (
    <div
      className={`card ${flip ? "flip" : ""} w-2/3 lg:w-1/3 h-48 ${
        flashcard.isCorrect ? "border-green-500 border-2" : ""
      }`}
      onClick={() => setFlip(!flip)}
    >
      <div className="front text-center">{flashcard.question}</div>
      <div className="back text-center">{flashcard.answer}</div>
    </div>
  );
}
