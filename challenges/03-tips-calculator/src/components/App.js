import {useState} from "react";

export default function App() {
    const [bill, setBill] = useState(0)
    const [customersTipsPercentage, setCustomersTipsPercentage] = useState([0, 0])
    const tipsAmount = customersTipsPercentage.length > 0 ?
        (customersTipsPercentage.reduce((acc, e) => acc + e) * bill) : 0

    function handleReset() {
        setBill(0)
        setCustomersTipsPercentage([0, 0])
    }

    function handleChangeBill(billAmount) {
        setBill(billAmount)
    }

    function handleChangeTips(id, amount) {
        const newArray = customersTipsPercentage.slice()
        newArray[id] = amount
        setCustomersTipsPercentage(() => newArray)
    }

    return (
        <>
            <BillAmount bill={bill} onChangeBill={handleChangeBill}/>
            <CustomerRating id={0} amount={customersTipsPercentage[0]} onChangeTips={handleChangeTips}>How did you like
                the service ?</CustomerRating>
            <CustomerRating id={1} amount={customersTipsPercentage[1]} onChangeTips={handleChangeTips}>How did your
                friend like the service ?</CustomerRating>
            <FinalBill bill={bill} tipsAmount={tipsAmount}/>
            <Button onReset={handleReset}>Reset</Button>
        </>
    )
}

function BillAmount({bill, onChangeBill}) {
    return (
        <div style={{"padding": "10px"}}>
            <span>How much was the bill ?</span>
            <input
                type="number"
                value={bill}
                onChange={(e) => onChangeBill(Number(e.target.value))}
            />
        </div>
    )
}

function CustomerRating({id, amount, onChangeTips, children}) {
    return (
        <div style={{"padding": "10px"}}>
            <span>{children}</span>
            <select value={amount} onChange={(e) => onChangeTips(id, Number(e.target.value))}>
                <option value={0}>Dissatisfied (0%)</option>
                <option value={0.05}>It was okay (5%)</option>
                <option value={0.1}>It was good (10%)</option>
                <option value={0.2}>Absolutely amazing (20%)</option>
            </select>
        </div>
    )
}

function Button({onReset, children}) {
    return (
        <button onClick={onReset}>{children}</button>
    )
}

function FinalBill({bill, tipsAmount}) {
    if(bill<=0) return null
    return (
        <h1>{`You should pay ${'$' + (bill + tipsAmount)} (${'$' + bill} + ${'$' + Math.round(tipsAmount)})`}</h1>
    )
}

