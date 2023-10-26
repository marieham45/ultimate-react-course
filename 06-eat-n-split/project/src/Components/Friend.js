import Button from "./Button";

const Friend = ({ person, onSelect, selectedFriend }) => {
  const { id, name, image, balance } = person;

  const isSelected = selectedFriend?.id == person.id;

  return (
    <li className={`${isSelected ? "selected" : ""}`}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p className={`${balance < 0 ? "red" : balance === 0 ? "" : "green"}`}>
        {balance < 0
          ? `You owe ${name} ${Math.abs(balance)}$`
          : balance === 0
          ? `You and ${name} are even`
          : `${name} owes you ${balance}$`}
      </p>
      <Button onClick={() => onSelect(person)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
};

export default Friend;
