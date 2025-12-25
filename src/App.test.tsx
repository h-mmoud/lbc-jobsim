import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation', () => {
  render(<App />);
  const navElement = screen.getByText(/Lloyds Banking Group/i);
  expect(navElement).toBeInTheDocument();
});

test('renders mortgage calculator heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Mortgage Calculator/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders nav buttons', () => {
  render(<App />);
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
});