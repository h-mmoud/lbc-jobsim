import React, { useState, useContext } from "react";
import internal from "stream";

type MortgageType = 'fixed' | 'adjustable' | 'interestOnly';

export default function MortgageCalculator() {
    const [loanAmount, setLoanAmount] = useState<string>('');
    const [interestRate, setInterestRate] = useState<string>('');
    const [loanTerm, setLoanTerm] = useState<string>('');
    const [mortgageType, setMortgageType] = useState<MortgageType>('fixed');
    const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
    const [propertyValue, setPropertyValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    const calculateMortgage = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMonthlyPayment(null);

        const principal = parseFloat(loanAmount);
        const annualRate = parseFloat(interestRate);
        const years = parseFloat(loanTerm);
        const property = parseFloat(propertyValue);

        // Validation
        if (!loanAmount || !interestRate || !loanTerm) {
            setError('Please fill in all fields');
            return;
        }

        if (principal <= 0 || annualRate <= 0 || years <= 0) {
            setError('All values must be greater than zero');
            return;
        }

        const monthlyRate = annualRate / 100 / 12;
        const numberOfPayments = years * 12;

        let payment: number;


        if (propertyValue && property > 0) {
            if (principal > property) {
                setError('Loan amount cannot exceed property value');
                return;
            }
        }

        switch (mortgageType) {
            case 'fixed':
                payment = 
                    principal * 
                    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
                break;

            case 'adjustable':
                payment = 
                    principal * 
                    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
                break;

            case 'interestOnly':
                // Interest only: just pay the interest each month
                payment = principal * monthlyRate;
                break;

            default:
                payment = 0;
        }

        setMonthlyPayment(payment);
    };
    

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Mortgage Calculator</h2>

            <form onSubmit={calculateMortgage}>

                {/* Mortgage Type */}
                <div className="mb-4">
                    <label className="block text-green-700 font-medium mb-2">
                        Mortgage Type
                    </label>
                    <select
                        value={mortgageType}
                        onChange={(e) => setMortgageType(e.target.value as MortgageType)}
                        className="w-full p-2 border border-green-300 focus:outline-none focus:border-green-700 rounded bg-white"
                    >
                        <option value="fixed">Fixed Rate</option>
                        <option value="adjustable">Adjustable Rate</option>
                        <option value="interestOnly">Interest Only</option>
                    </select>
                </div>

                {/* Property Value */}
                <div className="mb-4">
                    <label className="block text-green-700 font-medium mb-2">
                        Property Value (£) <span className="text-gray-500 text-sm">(optional)</span>
                    </label>
                    <input
                        type="number"
                        value={propertyValue}
                        onChange={(e) => setPropertyValue(e.target.value)}
                        min={0}
                        className="w-full p-2 border border-green-300 focus:outline-none focus:border-green-700 rounded"
                        placeholder="e.g. 250000"
                    />
                </div>

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
                    <p className="text-sm text-center text-gray-600 mt-2">
                        {mortgageType === 'fixed' && 'Fixed rate mortgage - payment stays the same'}
                        {mortgageType === 'adjustable' && 'Adjustable rate - payment may change over time'}
                        {mortgageType === 'interestOnly' && 'Interest only - principal not included'}
                    </p>
                </div>
            )}
        </div>
    );
}
