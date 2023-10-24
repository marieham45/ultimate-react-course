import { useState } from "react";
import BillInput from "./BillInput";
import SelectPercentage from "./SelectPercentage";
import ResetButton from "./ResetButton";
import Output from "./Output";

const App = () => {
  const [billAmount, setBillAmount] = useState("");
  const [tip, setTip] = useState(0);
  const [tipFriend, setTipFriend] = useState(0);

  const handleReset = () => {
    setBillAmount("");
    setTip(0);
    setTipFriend(0);
  };

  const tipOverall = (tip + tipFriend) / 2;

  return (
    <div>
      <BillInput billAmount={billAmount} onBillAmountChange={setBillAmount} />
      <SelectPercentage tip={tip} onTipChange={setTip}>
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage tip={tipFriend} onTipChange={setTipFriend}>
        How did your friend like the service?
      </SelectPercentage>
      <br />
      {billAmount > 0 && (
        <>
          <Output billAmount={billAmount} tipOverall={tipOverall} />
          <br />
          <ResetButton onReset={handleReset} />
        </>
      )}
    </div>
  );
};

export default App;
