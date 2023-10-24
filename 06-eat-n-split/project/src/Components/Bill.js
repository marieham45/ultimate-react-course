import React, { useState } from "react";

const Bill = ({ data, selected, onBillSubmit }) => {
  const [billValue, setBillValue] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [friendExpense, setFriendExpense] = useState("");

  const friendName = data.find((person) => person.id === selected).name;

  const handleSubmit = (e) => {
    e.preventDefault();
    onBillSubmit(billValue, yourExpense, friendExpense);
    console.log({ billValue, yourExpense, friendExpense });
  };
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <label>💰Bill value</label>
      <input
        type="text"
        value={billValue}
        onChange={(e) => setBillValue(e.target.value)}
      />
      <label>🧍‍♀️Your expense</label>
      <input
        type="text"
        value={yourExpense}
        onChange={(e) => setYourExpense(e.target.value)}
      />
      <label>{`🧑‍🤝‍🧑${friendName}'s expense`}</label>
      <input
        type="text"
        value={friendExpense}
        onChange={(e) => setFriendExpense(e.target.value)}
      />
      <label>😛Who is paying the bill?</label>
      <select>
        <option value="">You</option>
        <option value="">{friendName}</option>
      </select>
      <button className="button">Split bill</button>
    </form>
  );
};

export default Bill;
