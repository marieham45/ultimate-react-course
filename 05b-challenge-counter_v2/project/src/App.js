import { useState } from "react";

const App = () => {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const [date, setDate] = useState(new Date());

  const handleCountDecrease = () => {
    setCount((c) => c - step);
    setDate((date) => new Date(date.getTime() - step * 24 * 60 * 60 * 1000));
  };

  const handleCountIncrease = () => {
    setCount((c) => c + step);
    setDate((date) => new Date(date.getTime() + step * 24 * 60 * 60 * 1000));
  };

  const handleStepChange = (value) => {
    setStep(value);
  };

  const handleCountChange = (value) => {
    setCount(value);
    setDate(new Date(new Date().getTime() + value * 24 * 60 * 60 * 1000));
  };

  return (
    <div style={{ textAlign: "center", fontSize: "1.5rem" }}>
      <div>
        <input
          type="range"
          min="1"
          max="10"
          onChange={(e) => handleStepChange(Number(e.target.value))}
          value={step}
        />
        <span>{step}</span>
      </div>
      <div>
        <button onClick={handleCountDecrease}>-</button>
        <input
          type="text"
          value={count}
          onChange={(e) => handleCountChange(Number(e.target.value))}
        />
        <button onClick={handleCountIncrease}>+</button>
      </div>
      <br />
      <br />
      <p>
        {count !== 0 && Math.abs(count)}
        {count < -1 && " days ago was "}
        {count === -1 && " day ago was "}
        {count === 0 && "Today is "}
        {count === 1 && " day from today will be "}
        {count > 1 && " days from today will be "}
        {date.toLocaleDateString()}
      </p>
      {count !== 0 || step !== 1 ? (
        <button
          onClick={() => {
            setCount(0);
            setStep(1);
            setDate(new Date());
          }}
        >
          Reset
        </button>
      ) : null}
    </div>
  );
};

export default App;
