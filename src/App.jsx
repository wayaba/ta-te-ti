import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'

import { TURNS } from './constants'
import Square from './components/Square'
import WinnerModal from './components/WinnerModal'
import { checkEndGame, checkWinner } from './logic/board'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  //null es no hay ganador, y false es hay empate
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  return (
    <main className="board">
      <h1>Ta Te Ti</h1>
      <button onClick={resetGame}>Reiniciar juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} updateBoard={updateBoard} index={index}>
              {square}
            </Square>
          )
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
