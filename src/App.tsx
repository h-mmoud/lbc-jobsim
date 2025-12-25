import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import lbc from './lloyds_bank-logo.png'
import MortgageCalculator from './MortgageCalculator';
import './App.css';

const navButtonClass = 'bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded';

function App() {
  return (
    <div className="App">
      <nav>
        <div className="max-w-7xl mx-auto border">
          <div className='flex mx-auto justify-between w-5/6'>
            {/* menu bar */}
            <div className='flex items-center gap-16 my-12'>
              <div>
                <a
                  href="/"
                  className="flex gap-1 font-bold text-gray-800 items-center "
                >
                  <span>Lloyds Banking Group</span>
                </a>
              </div>

              {/* options */}
              <div className='hidden lg:flex gap-8'>
                <a href="#" className={navButtonClass}>
                  Home
                </a>
                <a href='#' className={'bg-green-300 hover:bg-green-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded'}>Mortgage Calculator</a>
                <a href='#' className={navButtonClass}>Contact Us</a>
              </div>   

 
              {/* logo */}
              <div className='flex items-right'>
                <img 
                  src={lbc} 
                  alt="Lloyds Logo" 
                  className="h-10 w-30"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>      

      <MortgageCalculator></MortgageCalculator>

    </div>
  );
}

export default App;
