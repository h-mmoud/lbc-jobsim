import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

export interface MortgageTestCase {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  mortgageType: string;
  expectedPayment: number;
}

export function readTestCases(filePath: string): MortgageTestCase[] {
  const file = fs.readFileSync(filePath);
  const workbook = XLSX.read(file, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  return data.map((row: any) => ({
    loanAmount: row['Loan Amount'] || row['loanAmount'],
    interestRate: row['Interest Rate'] || row['interestRate'],
    loanTerm: row['Loan Term'] || row['loanTerm'],
    mortgageType: row['Mortgage Type'] || row['mortgageType'] || 'fixed',
    expectedPayment: row['Expected Payment'] || row['expectedPayment'],
  }));
}