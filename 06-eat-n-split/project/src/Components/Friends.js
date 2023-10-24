import Friend from "./Friend";

const Friends = ({ data, onBillOpen, onSelect, selected }) => {
  console.log(data);
  return (
    <ul>
      {data.map((person) => {
        return (
          <Friend
            person={person}
            key={person.id}
            onBillOpen={onBillOpen}
            onSelect={onSelect}
            selected={selected === person.id ? true : false}
          />
        );
      })}
    </ul>
  );
};

export default Friends;
