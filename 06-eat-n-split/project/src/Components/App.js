import React, { useState } from "react";
import initialFriends from "../Data";
import Friends from "./Friends";
import Bill from "./Bill";
import Form from "./Form";

const App = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [billOpen, setBillOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [billValue, setBillValue] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [friendExpense, setFriendExpense] = useState("");

  const handleAddFriend = (friend) => {
    setFriends((friends) => (friends = [...friends, friend]));
    console.log(friends);
    setFormOpen(false);
  };

  const handleBillSubmit = (billValue, yourExpense, friendExpense) => {
    setBillValue(billValue);
    setYourExpense(yourExpense);
    setFriendExpense(friendExpense);
  };

  const handleBillOpen = () => {
    setBillOpen(!billOpen);
  };
  const handleSelect = (id) => {
    setSelected(id === selected ? null : id);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <Friends
          data={friends}
          onAddFriends={handleAddFriend}
          onBillOpen={handleBillOpen}
          onSelect={handleSelect}
          selected={selected}
        />
        {formOpen && <Form onAddFriend={handleAddFriend} />}
        <button className="button" onClick={() => setFormOpen(!formOpen)}>
          {`${formOpen ? "Close" : "Add friend"}`}
        </button>
      </div>
      {billOpen && (
        <Bill
          data={friends}
          selected={selected}
          onBillSubmit={handleBillSubmit}
        />
      )}
    </div>
  );
};

export default App;
