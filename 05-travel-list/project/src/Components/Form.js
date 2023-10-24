import { useState } from "react";

const Form = ({ onAddItems }) => {
  const [packingItem, setPackingItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!packingItem) {
      return;
    }
    const newItem = {
      id: Date.now(),
      description: packingItem,
      quantity: quantity,
      packed: false,
    };

    onAddItems(newItem);
    setPackingItem("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😎 trip?</h3>
      <select
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={packingItem}
        onChange={(event) => setPackingItem(event.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

export default Form;
