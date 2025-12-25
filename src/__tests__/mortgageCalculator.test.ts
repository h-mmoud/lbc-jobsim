import * as XLSX from 'xlsx';
import * as path from 'path';

interface TestCase {
  scenario: string;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  mortgageType: string;
}

function calculateMortgage(
  principal: number,
  annualRate: number,
  years: number,
  mortgageType: string
): number {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;

  switch (mortgageType.toLowerCase().replace(/[-\s]/g, '')) {
    case 'fixed':
    case 'fixedrate':
      return (
        principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      );
    case 'adjustable':
    case 'adjustablerate':
      return (
        principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      );
    case 'interestonly':
      return principal * monthlyRate;
    default:
      return 0;
  }
}

// Expected payments calculated manually for verification
const expectedPayments: { [key: string]: number } = {
  'Basic Mortgage': 751,
  'Large Loan Amount': 2445,
  'Shorter Term Loan': 1381,
  'High Interest Rate': 825,
  'Low Loan Amount, Adjustable Rate': 717,
  'Interest-Only Mortgage': 833,
  'High Loan-to-Value (LTV) Ratio': 1773,
  'Low LTV Ratio': 593,
};

function getTestCases(): TestCase[] {
  const filePath = path.resolve(__dirname, '../../mortgage_calculator_sample_data.xlsx');
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  return data
    .map((row: any) => ({
      scenario: String(row['Scenario']),
      loanAmount: Number(row['Loan Amount (£)']),
      interestRate: Number(row['Interest Rate (%)']),
      loanTerm: Number(row['Loan Term (Years)']),
      mortgageType: String(row['Mortgage Type'] || 'fixed'),
    }))
    .filter((testCase) =>
      !isNaN(testCase.loanAmount) &&
      !isNaN(testCase.interestRate) &&
      !isNaN(testCase.loanTerm) &&
      testCase.loanAmount > 0 &&
      testCase.interestRate > 0 &&
      testCase.loanTerm > 0
    );
}

describe('Mortgage Calculator', () => {
  const testCases = getTestCases();

  console.log(`Found ${testCases.length} valid test cases`);

  if (testCases.length === 0) {
    it('should have valid test cases in Excel file', () => {
      throw new Error('No valid test cases found. Check column headers.');
    });
  }

  testCases.forEach((testCase) => {
    it(`${testCase.scenario}: £${testCase.loanAmount} at ${testCase.interestRate}% for ${testCase.loanTerm} years (${testCase.mortgageType})`, () => {
      const result = calculateMortgage(
        testCase.loanAmount,
        testCase.interestRate,
        testCase.loanTerm,
        testCase.mortgageType
      );

      const expected = expectedPayments[testCase.scenario];

      expect(result).toBeCloseTo(expected, 0);
    });
  });
});