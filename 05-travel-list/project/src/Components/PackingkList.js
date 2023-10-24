import { useState } from "react";
import Item from "./Item";

const PackingList = ({ items, onDeleteItems, onToggleItem, onClearItems }) => {
  const [sortMethod, setSortMethod] = useState("input");

  let sortedItems;

  if (sortMethod === "input") {
    sortedItems = items;
  } else if (sortMethod === "description") {
    sortedItems = [...items].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  } else if (sortMethod === "packed") {
    sortedItems = [...items].sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          value={sortMethod}
          onChange={(event) => {
            setSortMethod(event.target.value);
          }}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearItems}>Clear list</button>
      </div>
    </div>
  );
};

export default PackingList;
