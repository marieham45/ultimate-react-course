// using derived state
const Stats = ({ data }) => {
  // early return when there is nothing in the packingList
  if (!data.length) {
    return (
      <footer className="stats">
        <em>Time to pack, start adding items!</em>
      </footer>
    );
  }
  const itemsNumber = data.length;
  const packedItemsNumber = data.filter((item) => item.packed).length;
  const percentagePacked = Math.round((packedItemsNumber / itemsNumber) * 100);

  return (
    <footer className="stats">
      <em>
        {percentagePacked === 100
          ? `You got everything! Ready to go ✈️`
          : `💼 You have ${itemsNumber}
          ${(itemsNumber === 0 || itemsNumber > 1) && " items "}
          ${itemsNumber === 1 && " item "}
          on your list${
            itemsNumber > 0
              ? `, and you already packed ${packedItemsNumber} (
          ${percentagePacked ? percentagePacked : 0}%)`
              : "."
          }`}
      </em>
    </footer>
  );
};

export default Stats;
