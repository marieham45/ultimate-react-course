import Accordion from "./Accordion";
import "../styles.css";
import faqs from "../Data";

const App = () => {
  return (
    <div className="accordion">
      <Accordion data={faqs} />
    </div>
  );
};

export default App;
