import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./styles.css";

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
            <Skill text="HTML + CSS" emote="👍" color="blue"/>
            <Skill text="JavaScript" emote="👍" color="red"/>
            <Skill text="Web Design" emote="👍" color="purple"/>
            <Skill text="Git & GitHub" emote="👍" color="green"/>
            <Skill text="React" emote="👍" color="cyan"/>
            <Skill text="Angular" emote="👍" color="pink"/>
        </div>
    )
}

function Skill(props) {
    return (
        <div className="skill" style={{background: props.color}}>{props.text} {props.emote}</div>
    )
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App/>
    </StrictMode>
);
