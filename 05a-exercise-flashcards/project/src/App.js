import { useState } from "react";
import "./index.css";

export default function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
}

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];

const FlashCards = () => {
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (id) => {
    setSelectedId(id !== selectedId ? id : null);
  };

  return (
    <div className="flashcards">
      {questions.map((card) => {
        const { id, question, answer } = card;

        return (
          <div
            key={id}
            onClick={() => handleClick(id)}
            className={id === selectedId ? "selected" : ""}
          >
            <p>{id === selectedId ? answer : question}</p>
          </div>
        );
      })}
    </div>
  );
};

// const Card = ({ card }) => {
//   const [showAnswer, setShowAnswer] = useState(false);

//   const handleClick = () => {
//     setShowAnswer(!showAnswer);
//   };

//   const { id, question, answer } = card;
//   return (
//     <div onClick={handleClick} className={`${!showAnswer ? "" : "selected"}`}>
//       {!showAnswer ? question : answer}
//     </div>
//   );
// };
