import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const skills = [
  { name: "HTML+CSS", color: "red", level: "intermediate" },
  { name: "JavaScript", color: "blue", level: "advanced" },
  { name: "TypeScript", color: "green", level: "intermediate" },
  { name: "React", color: "yellow", level: "beginner" },
];

const App = () => {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList data={skills} />
      </div>
    </div>
  );
};

const Avatar = () => {
  return <img className="avatar" src="img/pic.jpg" alt="marie" />;
};

const Intro = () => {
  return (
    <div>
      <h1>Marie Hamsikova</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod sequi
        quia molestias excepturi commodi adipisci, laborum ab! Voluptate
        corporis illum numquam labore, excepturi nisi consectetur aliquid vero
        nostrum omnis corrupti.
      </p>
    </div>
  );
};

const SkillList = ({ data }) => {
  return (
    <div className="skill-list">
      {data.map((skill) => {
        const { name, color, level } = skill;
        return <Skill name={name} color={color} level={level} />;
      })}
    </div>
  );
};

const Skill = ({ name, color, level }) => {
  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <span>{name}</span>
      <span>
        {level === "beginner" && "👶"}
        {level === "intermediate" && "👍"}
        {level === "advanced" && "💪"}
      </span>
    </div>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
