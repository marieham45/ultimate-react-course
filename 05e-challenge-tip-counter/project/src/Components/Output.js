import React from "react";

const Output = ({ billAmount, tipOverall }) => {
  return (
    <h3>
      {`You pay $${billAmount + tipOverall}`}
      {tipOverall > 0 ? ` ($${billAmount} + $${tipOverall} tip)` : ""}
    </h3>
  );
};

export default Output;
