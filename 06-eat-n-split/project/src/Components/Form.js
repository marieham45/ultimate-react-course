import React, { useState } from "react";

const Form = ({ onAddFriend }) => {
  const [name, setName] = useState("");
  //const [formOpen, setFormOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFriend = {
      id: new Date(),
      name: name,
      image: "https://i.pravatar.cc/480",
      balance: 0,
    };
    onAddFriend(newFriend);
    setName("");
  };
  return (
    <>
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>🧑‍🤝‍🧑Friend name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>🌄 Image URL</label>
        <input type="text" placeholder="https://i.pravatar.cc/480" />
        <button className="button">Add</button>
      </form>
    </>
  );
};

export default Form;
