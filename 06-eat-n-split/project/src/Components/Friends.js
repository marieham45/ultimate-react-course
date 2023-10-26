import Friend from "./Friend";

const Friends = ({ data, onSelect, selectedFriend }) => {
  return (
    <ul>
      {data.map((person) => {
        return (
          <Friend
            person={person}
            key={person.id}
            onSelect={onSelect}
            selectedFriend={selectedFriend}
          />
        );
      })}
    </ul>
  );
};

export default Friends;
