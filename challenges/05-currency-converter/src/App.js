// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import {useEffect, useState} from "react";

export default function App() {
    const [amount, setAmount] = useState("")
    const [convertedAmout, setConvertedAmout] = useState("")
    const [sourceCurrency, setSourceCurrency] = useState("EUR")
    const [targetCurrency, setTargetCurrency] = useState("CHF")
    const [isLoading, setIsLoading] = useState(false)

    function handleChangeAmount(newAmount) {
        setAmount(newAmount)
    }

    useEffect(() => {
        if (!amount) {
            setConvertedAmout(undefined)
            return
        }

        if (sourceCurrency === targetCurrency || amount === "0") {
            setConvertedAmout(amount)
            return
        }

        async function getConvertedAmount() {
            setIsLoading(true)
            const result = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${sourceCurrency}&to=${targetCurrency}`)
            const data = await result.json()
            setConvertedAmout(data.rates[targetCurrency])
            setIsLoading(false)
        }

        getConvertedAmount()
    }, [sourceCurrency, targetCurrency, amount]);

    return (
        <div>
            <input type="text" value={amount} disabled={isLoading} onChange={e => handleChangeAmount(e.target.value)}/>
            <select value={sourceCurrency} disabled={isLoading} onChange={e => setSourceCurrency(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
                <option value="CHF">CHF</option>
            </select>
            <select value={targetCurrency} disabled={isLoading} onChange={e => setTargetCurrency(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
                <option value="CHF">CHF</option>
            </select>
            <p>
                {isLoading && "LOADING ..."}
                {!isLoading && convertedAmout && `(${targetCurrency}) ${convertedAmout}`}
            </p>
        </div>
    );
}
