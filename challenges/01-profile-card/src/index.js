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
            <div className="skill" style={{background: "blue"}}>HTML + CSS 👍</div>
            <div className="skill" style={{background: "red"}}>JavaScript 👍</div>
            <div className="skill" style={{background: "purple"}}>Web Design 👍</div>
            <div className="skill" style={{background: "green"}}>Git & GitHub 👍</div>
            <div className="skill" style={{background: "cyan"}}>React 👍</div>
            <div className="skill" style={{background: "pink"}}>Angular 👍</div>
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
