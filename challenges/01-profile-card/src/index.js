import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./styles.css";

const skills = [
    {
        name: "HTML + CSS",
        level: "advanced",
        color: "blue"
    },
    {
        name: "JavaScript",
        level: "medium",
        color: "red"
    },
    {
        name: "Git & GitHub",
        level: "advanced",
        color: "purple"
    },
    {
        name: "Angular",
        level: "medium",
        color: "green"
    },
    {
        name: "React",
        level: "beginner",
        color: "orange"
    },
]

function App() {
    return (
        <div className="card">
            <Avatar/>
            <div className="data">
                <Intro/>
                <SkillList/>
            </div>
        </div>
    );
}

function Avatar() {
    return (
        <img className="avatar" src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600"/>
    )
}

function Intro() {
    return (
        <div>
            <h1>Romain SALVAN</h1>
            <p>Developpeur fullstack à la recherche d'un poste en Suisse Romande</p>
        </div>
    )
}

function SkillList() {
    return (
        <div className="skill-list">
            {skills.map(skill => <Skill name={skill.name} color={skill.color} level={skill.level}/>)}
        </div>
    )
}

function Skill({name, color, level}) {
    function getEmote(){
        if (level === "beginner") return  "👶"
        if (level === "medium") return "👍"
        return "💪"
    }
    return (
        <div className="skill" style={{background: color}}>
            {name} {getEmote()}
        </div>
    )
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App/>
    </StrictMode>
);
