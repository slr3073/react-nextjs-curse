import "./styles.css";
import {useState} from "react";

const faqs = [
    {
        title: "Where are these chairs assembled?",
        text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
    },
    {
        title: "How long do I have to return my chair?",
        text:
            "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
    },
    {
        title: "Do you ship to countries outside the EU?",
        text:
            "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
    }
];

export default function App() {
    return (
        <div>
            <Accordion data={faqs}/>
        </div>
    );
}

function Accordion({data}) {
    const [openItemId, setOpenItemId] = useState(1)

    function handleToggle(itemId){
        if (openItemId === itemId){
            setOpenItemId(undefined)
            return
        }

        setOpenItemId(itemId)

    }

    return (
        <div className="accordion">
            {data.map((e, i) =>
                <Item
                    title={e.title}
                    num={i}
                    key={i}
                    openItemId={openItemId}
                    onClick={() => handleToggle(i)}
                >
                    {e.text}
                </Item>
            )}
            <Item
                title="Test 1"
                num={22}
                openItemId={openItemId}
                onClick={() => handleToggle(22)}
            >
                <p>Allows React developers to :</p>
                <ul>
                    <li>Break up UI into components</li>
                    <li>Make components reusable</li>
                    <li>Place state efficiently</li>
                </ul>
            </Item>
        </div>
    )
}

function Item({num, title, openItemId, onClick, children}) {
    const isOpen = openItemId === num

    return (
        <div className={`item ${isOpen ? "open" : ""}`} onClick={onClick}>
            <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
            <p className="title">{title}</p>
            <p className="icon">{isOpen ? "-" : "+"}</p>
            {isOpen && <div className="content-box">{children}</div>}
        </div>
    )
}
