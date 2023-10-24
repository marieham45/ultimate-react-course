const AccordionItem = ({ title, number, currentlyOpen, onOpen, children }) => {
  const isOpen = number === currentlyOpen;

  return (
    <div
      className={`item ${isOpen ? "open" : ""}`}
      onClick={() => onOpen(isOpen ? null : number)}
    >
      <p className="number">{number < 10 ? `0${number + 1}` : number + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
};

export default AccordionItem;
