import "./index.css"
import {useState} from "react";

export default function App() {
    const [step, setStep] = useState(1)
    const [count, setCount] = useState(0)

    const date = new Date()
    date.setDate(date.getDate() + count)

    function handleCountDown() {
        setCount((count) => count - step)
    }

    function handleCountUp() {
        setCount((count) => count + step)
    }

    return (
        <>
            <div className="centered">
                <input type="range" min="1" max="10" value={step} onChange={e => setStep(Number(e.target.value))}/>
                <span>{step}</span>
            </div>
            <div className="centered">
                <button onClick={handleCountDown}>-</button>
                <input type="number" value={count} onChange={e => setCount(Number(e.target.value))}/>
                <button onClick={handleCountUp}>+</button>
            </div>
            <div className="centered">
                {count === 0 && `Today is: ${date.toDateString()}`}
                {count < 0 && `${Math.abs(count)} days ago it was: ${date.toDateString()}`}
                {count > 0 && `${count} days from now it will be: ${date.toDateString()}`}
            </div>
            {
                (step !== 1 || count !== 0) &&
                <div className="centered">
                    <button onClick={() => {
                        setStep(1)
                        setCount(0)
                    }}>
                        Reset
                    </button>
                </div>
            }

        </>
    )
}
