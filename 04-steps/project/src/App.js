import { useState } from "react";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const App = () => {
  return (
    <div>
      <Steps />
    </div>
  );
};

const Steps = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handlePrevious = () => {
    if (step > 1) {
      setStep((s) => s - 1); // using a callback function when updating th state based on the current state
    }
  };
  const handleNext = () => {
    if (step < 3) {
      setStep((s) => s + 1);
    }
  };

  const handleClose = () => {
    setIsOpen((isOp) => !isOp);
  };

  return (
    <>
      <button className="close" onClick={handleClose}>
        {`${isOpen ? "×" : "+"}`}
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button
              textColor="#fff"
              bgColor="#7950f2"
              onclickHandler={handlePrevious}
            >
              <span>👈 Previous</span>
            </Button>
            <Button
              textColor="#fff"
              bgColor="#7950f2"
              onclickHandler={handleNext}
            >
              <span>Next 👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const StepMessage = ({ step, children }) => {
  return (
    <div className="message">
      <h3>Step {step} </h3>
      {children}
    </div>
  );
};

const Button = ({ textColor, bgColor, onclickHandler, children }) => {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onclickHandler}
    >
      {children}
    </button>
  );
};

export default App;
