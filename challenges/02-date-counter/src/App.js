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
                <button onClick={() => setStep((step) => step - 1)}>-</button>
                {`Step: ${step}`}
                <button onClick={() => setStep((step) => step + 1)}>+</button>
            </div>
            <div className="centered">
                <button onClick={handleCountDown}>-</button>
                {`Count: ${count}`}
                <button onClick={handleCountUp}>+</button>
            </div>
            <div className="centered">
                {count === 0 && `Today is: ${date.toDateString()}`}
                {count < 0 && `${Math.abs(count)} days ago it was: ${date.toDateString()}`}
                {count > 0 && `${count} days from now it will be: ${date.toDateString()}`}
            </div>
        </>
    )
}
