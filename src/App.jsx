import { useState } from 'react'
import { languages } from './languages.js'
import Chips from './components/Chips.jsx'
import {clsx} from 'clsx';
function App() {
  //state
  const[currentWord,setCurrentWord]=useState("react")
  const[guessed, setGuessed]=useState([]);

  //derived state
  const wrongGuessArray=guessed.filter((letter)=>(!currentWord.includes(letter)))
  const wrongGuessCount=wrongGuessArray.length;
  const alphabet="abcdefghijklmnopqrstuvwxyz"

  
  const keyboard=alphabet.split("").map((ele)=>{
    const isGuessed=guessed.includes(ele)
    const isCorrect=isGuessed&&currentWord.includes(ele)
    const isWrong =isGuessed&&(!currentWord.includes(ele))
    const className=clsx(
      {'guessed-correct':isCorrect,
        'guessed-wrong':isWrong,
        'keyboard-button':true
      }
    )
    return <button 
    onClick={(event)=>addKey(event,ele)}
    className={className}
    key={ele}>
      {ele.toUpperCase()}
      </button>
  })
  
  const word =Array.from(currentWord).map((char,ind)=>{
    const isPressed=guessed.includes(char)
    const styles={textTransform:"uppercase",
      borderBottom:"1px solid white",
      width:"40px",
      height:"40px",
      textAlign:"center",
      display:"block",
      backgroundColor:"#323232",
      
      
    }

    return <span   key={ind} style={styles}>{(isPressed)?char:null}</span>
  })
  

  const languageArray= languages.map((obj,ind)=>{
    return <Chips ind ={ind} wrongGuessCount={wrongGuessCount} key={obj.name} name={obj.name} backgroundColor={obj.backgroundColor} color={obj.color} />
  })

      function addKey(event,ele){
  
      setGuessed(prevGuessed=>
  
        prevGuessed.includes(ele)?prevGuessed:[...prevGuessed,ele]
        )
    }

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
      <section className={'keyboard'}>{keyboard}</section>
      <button className="new-game">New Game</button>
    </main>
  )
}

export default App
