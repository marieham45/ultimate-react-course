import {useEffect, useState} from "react";
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
    const [amount, setAmount] = useState("")
    const [from, setFrom] = useState("USD")
    const [to, setTo] = useState("USD")
    const [convertedAmount, setConvertedAmount] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {


        async function getConversion() {

            setIsLoading(true)
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
            const data = await res.json()
            setIsLoading(false)
            const rate = data.rates[to]

            setConvertedAmount(rate)


        }

        if (Number(amount) > 0) {
            if (from === to) {
                setConvertedAmount(Number(amount))
                return
            } else {
                getConversion()

            }
        }

    }, [amount, from, to])
    return (
        <div>
            <input disabled={isLoading} value={amount} type="text" onChange={(e) => setAmount(e.target.value)}/>
            <select disabled={isLoading} value={from} onChange={(e) => setFrom(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <select disabled={isLoading} value={to} onChange={(e) => setTo(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <p>{convertedAmount}</p>
        </div>
    );
}
