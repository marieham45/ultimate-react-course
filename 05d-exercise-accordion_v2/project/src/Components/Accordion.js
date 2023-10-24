import AccordionItem from "./AccordionItem";
import { useState } from "react";

const Accordion = ({ data }) => {
  const [currentlyOpen, setCurrentlyOpen] = useState(null);

  return (
    <div className="accordion">
      {data.map((el, i) => (
        <AccordionItem
          key={i}
          title={el.title}
          number={i}
          currentlyOpen={currentlyOpen}
          onOpen={setCurrentlyOpen}
        >
          {el.text}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
