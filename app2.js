import React, { useState } from "https://cdn.skypack.dev/react@17.0.1";
import "./TicTacToe.css"; // CSS file for styling

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const checkWinner = () => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes("")) {
      setWinner("Draw");
    }
  };

  const handleCellClick = (index) => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      checkWinner();
    }
  };

  const renderCell = (index) => (
    <div className="cell" onClick={() => handleCellClick(index)}>
      {board[index]}
    </div>
  );

  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setWinner(null);
    setCurrentPlayer("X");
  };

  return (
    <div className="tic-tac-toe">
      <div className="board">
        {board.map((cell, index) => renderCell(index))}
      </div>
      <div className="status">
        {winner ? `Winner: ${winner}` : `Next player: ${currentPlayer}`}
      </div>
      {winner && (
        <button className="restart-button" onClick={restartGame}>
          Restart
        </button>
      )}
    </div>
  );
};

export default TicTacToe;
