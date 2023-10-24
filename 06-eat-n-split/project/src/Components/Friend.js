const Friend = ({ person, onSelect, selected }) => {
  const { id, name, image, balance } = person;

  return (
    <li>
      <img src={image} alt="profile-pic" />
      <h3>{name}</h3>
      <p className={`${balance < 0 ? "red" : balance === 0 ? "" : "green"}`}>
        {balance < 0
          ? `You owe ${name} ${Math.abs(balance)}$`
          : balance === 0
          ? `You and ${name} are even`
          : `${name} owes you ${balance}$`}
      </p>
      <button className="button" onClick={() => onSelect(id)}>
        {`${selected ? "Close" : "Select"}`}
      </button>
    </li>
  );
};

export default Friend;
