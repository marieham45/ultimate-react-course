import { useState } from "react";

const App = () => {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const [date, setDate] = useState(new Date());

  const handleStepDecrease = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  const handleStepIncrease = () => {
    setStep((s) => s + 1);
  };

  const handleCountDecrease = () => {
    setCount((c) => c - step);
    setDate((date) => new Date(date.getTime() - step * 24 * 60 * 60 * 1000));
  };

  const handleCountIncrease = () => {
    setCount((c) => c + step);
    setDate((date) => new Date(date.getTime() + step * 24 * 60 * 60 * 1000));
  };

  return (
    <div style={{ textAlign: "center", fontSize: "1.5rem" }}>
      <div>
        <button onClick={handleStepDecrease}>-</button>
        <span>Step: {step}</span>
        <button onClick={handleStepIncrease}>+</button>
      </div>
      <div>
        <button onClick={handleCountDecrease}>-</button>
        <span>Count: {count}</span>
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
    </div>
  );
};

export default App;
