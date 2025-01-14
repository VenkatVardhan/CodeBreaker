import { useState } from 'react'
import { languages } from './languages.js'
import Chips from './components/Chips.jsx'
function App() {
  const[currentWord,setCurrentWord]=useState("react")

  const alphabet="abcdefghijklmnopqrstuvwxyz"

  const keyboard=alphabet.split("").map((ele)=>{
    return <button  className='keyboard-button'key={ele}>{ele.toUpperCase()}</button>
  })

  const word =Array.from(currentWord).map((char,ind)=>{
    const styles={textTransform:"uppercase",
      borderBottom:"2px solid white",
      width:"40px",
      height:"40px",
      textAlign:"center",
      display:"block",
      backgroundColor:"#323232",


    }
    return <span   key={ind} style={styles}>{char}</span>
  })
  

  const languageArray= languages.map((obj)=>{
    return <Chips key={obj.name} name={obj.name} backgroundColor={obj.backgroundColor} color={obj.color} />
  })

  return (
    <main>
      <header className='Heading'>
      <h1>Code Breaker</h1>
      <p>Break the code by guessing the word in under 8 attempts to save Programming Languages</p>
      </header>
      <section className='game-status'>
        <h2>You win!</h2>
        <p>Well Done 🎉</p>
      </section>
      <section className='languages'>
{languageArray}

      </section>
      <section className='word'>{word}</section>
      <section className='keyboard'>{keyboard}</section>
      <button className="new-game">New Game</button>
    </main>
  )
}

export default App
