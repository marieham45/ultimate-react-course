import AccordionItem from "./AccordionItem";

const Accordion = ({ data }) => {
  return (
    <div>
      {data.map((faq, i) => (
        <AccordionItem
          key={i}
          item={faq}
          number={i < 10 ? `0${i + 1}` : i + 1}
        />
      ))}
    </div>
  );
};

export default Accordion;
