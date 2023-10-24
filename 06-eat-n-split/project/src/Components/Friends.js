import Friend from "./Friend";

const Friends = ({ data, onSelect, selected }) => {
  return (
    <ul>
      {data.map((person) => {
        return (
          <Friend
            person={person}
            key={person.id}
            onSelect={onSelect}
            selected={selected === person.id ? true : false}
          />
        );
      })}
    </ul>
  );
};

export default Friends;
