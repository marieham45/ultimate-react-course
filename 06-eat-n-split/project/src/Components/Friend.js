const Friend = ({ person, onBillOpen, onSelect, selected }) => {
  const { id, name, image, balance } = person;

  const handleClick = () => {
    onBillOpen();
    onSelect(id);
  };
  return (
    <li>
      <img src={image} alt="profile-pic" />
      <h3>{name}</h3>
      <p>
        {balance < 0
          ? `You owe ${name} ${Math.abs(balance)}$`
          : balance === 0
          ? `You and ${name} are even`
          : `${name} owes you ${balance}$`}
      </p>
      <button className="button" onClick={handleClick}>
        {`${selected ? "Close" : "Select"}`}
      </button>
    </li>
  );
};

export default Friend;
