const Item = ({ item, onDeleteItems, onToggleItem }) => {
  let { id, description, quantity, packed } = item;
  return (
    <li>
      <input type="checkbox" value={packed} onChange={() => onToggleItem(id)} />
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <button
        onClick={() => {
          onDeleteItems(id);
        }}
      >
        ❌
      </button>
    </li>
  );
};

export default Item;
