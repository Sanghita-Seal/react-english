import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  
  //logic
  //as we are re-rendering or generating the apssword again and again
  //we should use useCallback-search it on google
  const generatePassword = useCallback(()=>{
    let pass= ""
    let str= 
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if(numberAllowed){
      str += "0123456789"
    }
    if(charAllowed){
      str += "!@#$%^&*()_+[]{}|;:,.<>?`~"
    }

    for(let i=1; i<length+1; i++){
      const char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)

  },[numberAllowed, charAllowed, length])
  //useCallback is used to memoize the function so that it does not get recreated on every render
  // The function is only re-created when values in the dependency array change.

  const passwordRef = useRef(null)
  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
    //selecting the text in the input field
  }

  useEffect(()=>{
    generatePassword()
  }, [length, numberAllowed, charAllowed, generatePassword])
  //useEffect is used to call the function when the component mounts or when the dependencies change
  // - If empty [], it runs only once after the initial render (like componentDidMount).
// - If it has values, it runs again when any of those values change.
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
         type="text"
          value={password}
          className='outline-none w-full py-1 px-3 bg-gray-400 text-black'
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
            <input 
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer  accent-blue-600'
              onChange={(e)=>{setLength(Number(e.target.value))}}
            />
            <label htmlFor="length">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1  accent-blue-600'>
           <input 
              type="checkbox" 
              checked={numberAllowed}
              onChange={()=>{
                setNumberAllowed((prev)=> !prev)
              }}
           />
          <label htmlFor="number">Numbers </label>

        </div>
        <div className='flex items-center gap-x-1  accent-blue-600'>
           <input 
              type="checkbox" 
              checked={charAllowed}
              onChange={()=>{
                setCharAllowed((prev)=> !prev)
              }}
           />
          <label htmlFor="charInput">Characters </label>

        </div>
      </div>
     </div>
    </>
  )
}

export default App
