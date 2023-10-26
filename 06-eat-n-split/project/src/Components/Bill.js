import { useState } from "react";
import Button from "./Button";

const Bill = ({ selectedFriend, onBillSubmit }) => {
  const [billValue, setBillValue] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const friendExpense = billValue ? billValue - yourExpense : "";
  const [payer, setPayer] = useState("you");

  const friendName = selectedFriend.name;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!billValue || !yourExpense) return;
    onBillSubmit(payer === "you" ? billValue - yourExpense : 0 - yourExpense);
  };
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {friendName}</h2>
      <label>💰 Bill value</label>
      <input
        type="text"
        value={billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
      />
      <label>🧍‍♀️Your expense</label>
      <input
        type="text"
        value={yourExpense}
        onChange={(e) =>
          setYourExpense(
            Number(e.target.value) > billValue
              ? yourExpense
              : Number(e.target.value)
          )
        }
      />
      <label>{`🧑‍🤝‍🧑 ${friendName}'s expense`}</label>
      <input type="text" value={friendExpense} disabled />
      <label>😛 Who is paying the bill?</label>
      <select value={payer} onChange={(e) => setPayer(e.target.value)}>
        <option value="you">You</option>
        <option value="friend">{friendName}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
};

export default Bill;
