import React from "react";

const BillInput = ({ billAmount, onBillAmountChange }) => {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="text"
        value={billAmount}
        onChange={(e) => onBillAmountChange(Number(e.target.value))}
      />
    </div>
  );
};

export default BillInput;
