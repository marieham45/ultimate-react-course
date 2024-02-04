import { useState } from "react";
import initialFriends from "../Data";
import Friends from "./Friends";
import Bill from "./Bill";
import Form from "./Form";
import Button from "./Button";

const App = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleAddFriend = (friend) => {
    setFriends((friends) => (friends = [...friends, friend]));
    setFormOpen(false);
  };

  const handleBillSubmit = (value) => {
    setFriends((friends) =>
      friends.map((friend) => {
        return friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend;
      })
    );
    setSelectedFriend(null);
  };

  const handleSelect = (friend) => {
    if (friend.id !== selectedFriend?.id) {
      setSelectedFriend(friend);
    } else {
      setSelectedFriend(null);
    }
    setFormOpen(false);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <Friends
          data={friends}
          onSelect={handleSelect}
          selectedFriend={selectedFriend}
        />
        {formOpen && <Form onAddFriend={handleAddFriend} />}
        <Button onClick={() => setFormOpen(!formOpen)}>
          {formOpen ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <Bill selectedFriend={selectedFriend} onBillSubmit={handleBillSubmit} key={selectedFriend.id} />
      )}
    </div>
  );
};

export default App;
