import { useState } from 'react'
import { languages } from './languages.js'
import Chips from './components/Chips.jsx'
import { clsx } from 'clsx'
import { getFarewellText ,randomWord} from './utils.js'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
function App() {
  //state
  //
  const [currentWord, setCurrentWord] = useState(() => randomWord())
  const [guessed, setGuessed] = useState([])

  //derived state
  const wrongGuessArray = guessed.filter(
    (letter) => !currentWord.includes(letter)
  )
  const wrongGuessCount = wrongGuessArray.length
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const isWon = currentWord
    .split('')
    .every((letter) => guessed.includes(letter))
  const isLost = wrongGuessCount >= languages.length - 1
  const isGameOver = isWon || isLost
  const isCurrWrong =
    guessed.length !== 0 && !currentWord.includes(guessed[guessed.length - 1])
  const { width, height } = useWindowSize()

  const keyboard = alphabet.split('').map((ele) => {
    const isGuessed = guessed.includes(ele)
    const isCorrect = isGuessed && currentWord.includes(ele)
    const isWrong = isGuessed && !currentWord.includes(ele)
    const className = clsx({
      'guessed-correct': isCorrect,
      'guessed-wrong': isWrong,
      'keyboard-button': true,
    })
    return (
      <button
        disabled={isGameOver}
        aria-disabled={guessed.includes(ele)}
        aria-label={`Letter ${ele}`}
        onClick={(event) => addKey(event, ele)}
        className={className}
        key={ele}
      >
        {ele.toUpperCase()}
      </button>
    )
  })

  const word = Array.from(currentWord).map((char, ind) => {
    const isPressed = guessed.includes(char)
    const styles = {
      textTransform: 'uppercase',
      borderBottom: '1px solid white',
      width: '40px',
      height: '40px',
      textAlign: 'center',
      display: 'block',
      backgroundColor: '#323232',
      color: !isPressed && isLost ? 'rgb(248, 104, 104)' : 'white',
    }

    return (
      <span key={ind} style={styles}>
        {isPressed ? char : isLost ? char : null}
      </span>
    )
  })

  const languageArray = languages.map((obj, ind) => {
    return (
      <Chips
        ind={ind}
        wrongGuessCount={wrongGuessCount}
        key={obj.name}
        name={obj.name}
        backgroundColor={obj.backgroundColor}
        color={obj.color}
      />
    )
  })

  function addKey(event, ele) {
    setGuessed((prevGuessed) =>
      prevGuessed.includes(ele) ? prevGuessed : [...prevGuessed, ele]
    )
  }

  function gameStatus() {
    if (isGameOver) {
      return (
        <>
          <h2> {isWon ? 'You win!' : 'Game Over'}</h2>
          <p>{isWon ? 'Well Done 🎉' : 'You Lose'}</p>
        </>
      )
    } else {
      if (isCurrWrong) {
        return getFarewellText(languages[wrongGuessCount - 1].name)
      }
      return null
    }
  }
  function refresh() {
    setCurrentWord(randomWord())
    setGuessed([])
  }

  return (
    <main>
      {isWon && (
        <Confetti
          recycle={false}
          numberOfPieces={1500}
          width={width-30}
          height={height-30}
        />
      )}
      <header className='Heading'>
        <h1>Code Breaker</h1>
        <p>
          Break the code by guessing the word in under 8 attempts to save
          Programming Languages
        </p>
      </header>
      <section
        aria-live='polite'
        role='status'
        className={clsx({
          'game-status': true,
          'game-lost': isLost,
          'game-won': isWon,
          'guessed-wrong': isCurrWrong && !isGameOver,
        })}
      >
        {gameStatus()}
      </section>
      <section className='languages'>{languageArray}</section>

      <section className='word'>{word}</section>
      <section className='sr-only' aria-live='polite' role='status'>
        <p>
          CurrentWord:
          {currentWord
            .split('')
            .map((letter) =>
              guessed.includes(letter) ? letter + '.' : 'blank'
            )}
        </p>
      </section>

      <section className={'keyboard'}>{keyboard}</section>

      {isGameOver && (
        <button className='new-game' onClick={refresh}>
          New Game
        </button>
      )}
    </main>
  )
}

export default App
