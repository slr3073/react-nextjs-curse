import {useState} from "react";

const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑"
]

export default function App() {
    return <>
        <Step/>
        {/*<Message step={1}>*/}
        {/*    <p>Pass in content</p>*/}
        {/*</Message>*/}
        {/*<Step/>*/}
    </>
}

function Step() {
    const [step, setStep] = useState(1)
    const [isOpen, setIsOpen] = useState(true)

    function handlePrevious() {
        // if (step > 1) setStep(step - 1)
        if (step > 1) setStep((s) => s - 1)
    }

    function handleNext() {
        // if (step < 3) setStep(step + 1) lorsqu'on modifie un état avec sa valeur on fait une callback
        if (step < 3) setStep((s) => s + 1)
    }

    return (
        <>
            <button className="close" onClick={() => (setIsOpen((s) => !s))}>&times;</button>

            {isOpen && (
                <div className="steps">
                    <div className="numbers">
                        <div className={step >= 1 ? "active" : ""}>1</div>
                        <div className={step >= 2 ? "active" : ""}>2</div>
                        <div className={step >= 3 ? "active" : ""}>3</div>
                    </div>

                    <Message step={step}>
                        {messages[step-1]}
                        <div className="buttons">
                            <Button
                                bgColor="#e7e7e7"
                                textColor="#333"
                                onClick={()=>alert(`Learn how to ${messages[step - 1]}`)}
                            >
                                Click me
                            </Button>
                        </div>
                    </Message>

                    <div className="buttons">
                        <Button textColor="#fff" bgColor='#7950f2' onClick={handlePrevious}>
                            <span>👈</span> Previous <span>😊</span>
                        </Button>
                        <Button textColor="#fff" bgColor='#7950f2' onClick={handleNext}>
                            <span>👉</span> Next <span>❤️️</span>
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}

function Button({textColor, bgColor, onClick, children}) {
    return (
        <button
            style={{backgroundColor: bgColor, color: textColor}}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

function Message({step, children}){
    return (
        <div className="message">
            <h3>Step {step}:</h3>
            {children}
        </div>
        )
}