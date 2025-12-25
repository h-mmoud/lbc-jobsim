import React, { useState, useContext } from "react";
import internal from "stream";

export default function MortgageCalculator() {
    const [loanAmount, setLoanAmount] = useState<string>('');
    const [interestRate, setInterestRate] = useState<string>('');
    const [loanTerm, setLoanTerm] = useState<string>('');
    const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

    const calculateMortgage = (e: React.FormEvent) => {
        e.preventDefault(); 

        const principal = parseFloat(loanAmount);
        const annualRate = parseFloat(interestRate);
        const years = parseFloat(loanTerm);

        const monthlyRate = annualRate / 100 / 12;

        const numberOfPayments = years * 12;

        // Apply mortgage formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
        const payment = 
            principal * 
            (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        setMonthlyPayment(payment);
    };
    

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Mortgage Calculator</h2>

            <form onSubmit={calculateMortgage}>
                {/* loan amount */}
                <div className="mb-4">
                    <label className="block text-green-700 font-medium mb-2">
                        Loan Amount (£)
                    </label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        min={0}
                        className="w-full p-2 border border-green-300 focus:outline-none focus:border-green-700 rounded"
                        placeholder="e.g. 200000"
                    ></input>
                </div>
               
                {/* Interest Rate */}
                <div className="mb-4">
                    <label className="block text-green-700 font-medium mb-2">
                        Interest Rate (%)
                    </label>
                    <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        min={0}
                        max={100}
                        className="w-full p-2 border border-green-300 focus:outline-none focus:border-green-700 rounded"
                        placeholder="e.g. 5.6"
                        step="0.1"
                    ></input>
                </div>

                {/* Interest Rate */}
                <div className="mb-4">
                    <label className="block text-green-700 font-medium mb-2">
                        Loan Term (years)
                    </label>
                    <input
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        min={0}
                        max={100}
                        className="w-full p-2 border border-green-300 focus:outline-none focus:border-green-700 rounded"
                        placeholder="e.g. 25"
                    ></input>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-green-500 font-semibold text-black py-2 px-4 rounded hover:bg-green-600"
                >
                    Calculate
                </button>

            </form>

            {/* Result Display */}
            {monthlyPayment !== null && (
                <div className="mt-6 p-4 bg-green-200 rounded">
                    <p className="text-lg font-bold text-center">
                        Monthly Payment: £{monthlyPayment.toFixed(2)}
                    </p>
                </div>
            )}
        </div>
    );
}
