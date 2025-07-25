import { useState } from 'react';
import './App.css'
import {InputBox} from './components/index.js';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo)

  const convert =   () => {
    setConvertedAmount ( amount * currencyInfo[to])
  }

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount); 
    }
  return (
    <div className='w-full min-h-screen flex flex-wrap justify-center items-center bg-cover bg-center bg-no-repeat'
    style={{ backgroundImage: "url('https://media.istockphoto.com/id/1172767690/photo/person-calculating-money-or-monthly-expenses.webp?a=1&b=1&s=612x612&w=0&k=20&c=UNS1whFWaB5XxetxmGMN8uUnX0QXfW-zwsI5ocGfEUc=')" }}>
      <div className='w-full'>
        <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
        <h1 className='text-2xl font-bold text-center mb-4'>Currency Converter</h1>
        <form onSubmit={(e)=>{
          e.preventDefault();
          convert();
        }}>
          <div className='w-full mb-1'>
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange= {(currency)=>setFrom(currency)}
              onAmountChange={(amount) => setAmount(amount)}
              selectedCurrency={from}
            />
          </div>
          <div className='relative w-full h-0.5'>
            <button 
            className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'
            onClick={swap}
            >Swap</button>

          </div>
          <div className='w-full mb-1'>
            <InputBox
              label="to"
              currencyOptions={options}
              amount={convertedAmount.toFixed(3)}
              amountDisabled={true}
              onCurrencyChange= {(currency)=>setTo(currency)}
              selectedCurrency={to}
            />
            <button
            type='submit'
            className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg'
              >Convert {from.toUpperCase} to {to.toUpperCase()}
            </button>
          </div>
        </form>
        </div>
      </div>

    </div>
  )
}

export default App
