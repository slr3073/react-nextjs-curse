import "./styles.css";
import {useState} from "react";

export default function App() {
    return (
        <div className="layout">
            <TextExpander>
                Space travel is the ultimate adventure! Imagine soaring past the stars
                and exploring new worlds. It's the stuff of dreams and science fiction,
                but believe it or not, space travel is a real thing. Humans and robots
                are constantly venturing out into the cosmos to uncover its secrets and
                push the boundaries of what's possible.
            </TextExpander>

            <TextExpander
                collapsedNumWords={20}
                expandButtonText="Show text"
                collapseButtonText="Collapse text"
                buttonColor="#ff6622"
            >
                Space travel requires some seriously amazing technology and
                collaboration between countries, private companies, and international
                space organizations. And while it's not always easy (or cheap), the
                results are out of this world. Think about the first time humans stepped
                foot on the moon or when rovers were sent to roam around on Mars.
            </TextExpander>

            <TextExpander expanded={true} className="box">
                Space missions have given us incredible insights into our universe and
                have inspired future generations to keep reaching for the stars. Space
                travel is a pretty cool thing to think about. Who knows what we'll
                discover next!
            </TextExpander>
            <TextExpander expanded={true} className="box">
                Space missions have
            </TextExpander>
        </div>
    );
}

function TextExpander({
                          collapsedNumWords = 10,
                          expandButtonText = "More",
                          collapseButtonText = "Less",
                          buttonColor = "blue",
                          expanded = false,
                          className,
                          children
                      }) {
    const [collapsed, setCollapsed] = useState(!expanded)
    const collapsedArrayText = children
        .split(" ")
        .splice(0, collapsedNumWords)
    const collapsable = collapsedArrayText.length >= collapsedNumWords
    const collapsedText = collapsedArrayText.join(" ") + (collapsable ? "... " : "")

    return (
        <div className={className}>
            {collapsed ? collapsedText : children}
            {collapsable && (
                collapsed
                    ? (
                        <span style={{color: buttonColor}} onClick={() => setCollapsed(false)}>
                            {expandButtonText}
                        </span>
                    )
                    : (
                        <span style={{color: buttonColor}} onClick={() => setCollapsed(true)}>
                            {collapseButtonText}
                        </span>
                    )
            )

            }
        </div>
    );
}
