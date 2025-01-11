import React, { useState } from "react";
import { useEffect } from "react";

import Boxes from "./Components/Boxes";
import { checkWinner } from "./Logic/CheckWinner";
import WinnerModal from "./Components/WinnerModal";

import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { RiResetLeftLine } from "react-icons/ri";

const turns = {
  X: "X",
  O: "O",
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(turns.X);
  const [winner, setWinner] = useState(null);
  const [winX, setWinX] = useState(0);
  const [winO, setWinO] = useState(0);
  const [continueGame, setContinueGame] = useState(true);
  const [positionX, setPositionX] = useState([]);
  const [positionO, setPositionO] = useState([]);
  const [firstPositionX, setFirstPositionX] = useState(null);
  const [firstPositionO, setFirstPositionO] = useState(null);

  const continueG = () => {
    setContinueGame(false);
    setTurn(turns.X);
    setWinner(null);
    setBoard(Array(9).fill(null));
    setFirstPositionX(null);
    setFirstPositionO(null);
    setPositionX([]);
    setPositionO([]);
  };

  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  const handleColorTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(turns.X);
    setWinner(null);
    setWinX(0);
    setWinO(0);
    setFirstPositionX(null);
    setFirstPositionO(null);
    setPositionX([]);
    setPositionO([]);
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;

    if (turn === turns.X) {
      const newPositionX = [...positionX, index];

      if (newPositionX.length > 3) {
        const [firstPosition, ...rest] = newPositionX; // Eliminar la primera posición
        newBoard[firstPosition] = null; // Eliminar la marca en el tablero
        setPositionX(rest);
        setFirstPositionX(rest[0]); // Actualizar la nueva primera posición
      } else {
        setPositionX(newPositionX);
        setFirstPositionX(newPositionX[0]); // Mantener la primera posición actualizada
      }
    } else {
      const newPositionO = [...positionO, index];

      if (newPositionO.length > 3) {
        const [firstPosition, ...rest] = newPositionO; // Eliminar la primera posición
        newBoard[firstPosition] = null; // Eliminar la marca en el tablero
        setPositionO(rest);
        setFirstPositionO(rest[0]); // Actualizar la nueva primera posición
      } else {
        setPositionO(newPositionO);
        setFirstPositionO(newPositionO[0]); // Mantener la primera posición actualizada
      }
    }

    setBoard(newBoard);
    setTurn(turn === turns.X ? turns.O : turns.X);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      if (newWinner === "X") {
        setWinX(winX + 1);
      } else {
        setWinO(winO + 1);
      }
      setWinner(newWinner);
      setContinueGame(true);
    } else if (!newBoard.includes(null)) {
      setWinner(false); // Empate
      setContinueGame(true);
    }
  };

  return (
    <main className="h-screen dark:bg-gray-900">
      <div className="pt-10 flex flex-col w-full items-center relative">
        <h1 className="text-center text-6xl font-rubik text-transparent bg-clip-text bg-gradient-to-r from-violet-900 via-green-500 to-blue-900 tracking-[-3px]">
          TIC TAC TOE
        </h1>
        <h1 className="text-center text-3xl font-rubik text-transparent bg-clip-text bg-gradient-to-r from-violet-900 via-green-500 to-blue-900 tracking-[-3px]">
          (WITHOUT DRAW)
        </h1>
        {theme === "light" ? (
          <FaMoon
            onClick={handleColorTheme}
            className="absolute end-10 text-blue-950 text-4xl cursor-pointer"
          />
        ) : (
          <FaSun
            onClick={handleColorTheme}
            className="absolute end-10 text-white text-4xl cursor-pointer"
          />
        )}
      </div>
      <section className="flex justify-center mt-10">
        <div className="flex-1 text-center">
          <h1
            className={`font-rubik text-5xl
            ${theme === "light" ? "text-slate-900" : "text-slate-200"}`}
          >
            Win <span className="text-pink-700">X</span>
          </h1>
          <span
            className={`font-rubik text-9xl
            ${theme === "light" ? "text-slate-950" : "text-slate-100"}`}
          >
            {winX}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 ">
          {board.map((box, index) => {
            return (
              <Boxes
                key={index}
                index={index}
                theme={theme}
                updateBoard={updateBoard}
                firstPositionX={firstPositionX}
                firstPositionO={firstPositionO}
              >
                {box}
              </Boxes>
            );
          })}
        </div>
        <div className="flex-1 text-center">
          <h1
            className={`font-rubik text-5xl
            ${theme === "light" ? "text-slate-900" : "text-slate-200"}`}
          >
            Win <span className="text-emerald-700">O</span>
          </h1>
          <span
            className={`font-rubik text-9xl
            ${theme === "light" ? "text-slate-950" : "text-slate-100"}`}
          >
            {winO}
          </span>
        </div>
      </section>
      <section className="flex justify-center items-center gap-10 mt-10">
        <div
          className={`${
            turn === turns.X ? "bg-orange-400 p-3 rounded-md" : "p-3"
          }`}
        >
          <h2
            className={`text-5xl font-rubik
        ${theme === "light" ? "text-gray-950" : "text-slate-100"}`}
          >
            {turns.X}
          </h2>
        </div>
        <div>
          <RiResetLeftLine
            className={`text-5xl cursor-pointer
        ${theme === "light" ? "text-gray-950" : "text-slate-100"}`}
            onClick={resetGame}
          />
        </div>
        <div
          className={`${
            turn === turns.O ? "bg-orange-400 p-3 rounded-md" : "p-3"
          }`}
        >
          <h2
            className={`text-5xl font-rubik
        ${theme === "light" ? "text-gray-950" : "text-slate-100"}`}
          >
            {turns.O}
          </h2>
        </div>
      </section>
      {continueGame && (
        <WinnerModal
          winner={winner}
          resetGame={resetGame}
          continueGame={continueG}
        />
      )}
    </main>
  );
}

export default App;
