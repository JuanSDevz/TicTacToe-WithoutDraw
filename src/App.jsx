//Necessary imports of React
import React, { useState } from "react";
import { useEffect } from "react";

//Import of project components
import Boxes from "./Components/Boxes";
import { checkWinner } from "./Logic/CheckWinner";
import WinnerModal from "./Components/WinnerModal";

//Import of external components
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { RiResetLeftLine } from "react-icons/ri";

//Defines constants for the player's turn
const turns = {
  X: "X",
  O: "O",
};

function App() {
  //Variables that manage the state of the game
  const [board, setBoard] = useState(Array(9).fill(null)); //Traks the state of the board
  const [turn, setTurn] = useState(turns.X); //Tracks the current turn
  const [winner, setWinner] = useState(null); //Tracks the winner
  const [winX, setWinX] = useState(0); //Tracks the wins of player X
  const [winO, setWinO] = useState(0); //Tracks the wins of player O
  const [continueGame, setContinueGame] = useState(true); //Tracks if the game continues
  const [positionX, setPositionX] = useState([]); //Tracks the positions of player X
  const [positionO, setPositionO] = useState([]); //Tracks the positions of player O
  const [firstPositionX, setFirstPositionX] = useState(null);  //Tracks the first position of player X
  const [firstPositionO, setFirstPositionO] = useState(null); //Tracks the first position of player O

  //Handles continuing the game after a win
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

  //State that manages the theme of the application
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  //Function that changes the theme of the application
  const handleColorTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  //Function that changes the theme of the application
  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  //Reset the game to its initial state
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

  //Function that updates the board with the player's move
  const updateBoard = (index) => {
    if (board[index] || winner) return; //Prevents the player from marking a box that is already marked or if there is a winner

    const newBoard = [...board];
    newBoard[index] = turn;

    if (turn === turns.X) {
      const newPositionX = [...positionX, index];

      if (newPositionX.length > 3) {
        const [firstPosition, ...rest] = newPositionX; //Delete the first position
        newBoard[firstPosition] = null; //Delete the mark on the board
        setPositionX(rest);
        setFirstPositionX(rest[0]); //Update the new first position
      } else {
        setPositionX(newPositionX);
        setFirstPositionX(newPositionX[0]); //Keep the first position updated
      }
    } else {
      const newPositionO = [...positionO, index];

      if (newPositionO.length > 3) {
        const [firstPosition, ...rest] = newPositionO; //Delete the first position
        newBoard[firstPosition] = null; //Delete the mark on the board
        setPositionO(rest);
        setFirstPositionO(rest[0]); //Update the new first position
      } else {
        setPositionO(newPositionO);
        setFirstPositionO(newPositionO[0]); //Deep the first position updated
      }
    }

    setBoard(newBoard); //Update the board
    setTurn(turn === turns.X ? turns.O : turns.X);  //Change the turn

    //Check if there is a winner
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
      setWinner(false); //Draw
      setContinueGame(true);
    }
  };

  //Render the game interface
  return (
    <main className="h-screen dark:bg-gray-900">
      <div className="pt-10 flex flex-col w-full items-center sm:relative">
        <h1 className="text-center text-4xl sm:text-6xl font-rubik text-transparent bg-clip-text bg-gradient-to-r from-violet-900 via-green-500 to-blue-900 tracking-[-3px]">
          TIC TAC TOE
        </h1>
        <h1 className="text-center text-3xl font-rubik text-transparent bg-clip-text bg-gradient-to-r from-violet-900 via-green-500 to-blue-900 tracking-[-3px]">
          (WITHOUT DRAW)
        </h1>
        <div className="block sm:hidden mt-4 flex justify-center gap-4">
          <div className="bg-indigo-900 flex flex-col items-center p-2 rounded-md">
            <h1 className="font-rubik text-3xl text-slate-200">Win<span className="text-pink-700">X</span></h1>
            <span className="font-rubik text-4xl text-slate-100">{winX}</span>
          </div>
          <div className="bg-indigo-900 flex flex-col items-center p-2 rounded-md">
            <h1 className="font-rubik text-3xl text-slate-200">Win<span className="text-emerald-400">O</span></h1>
            <span className="font-rubik text-4xl text-slate-100">{winO}</span>
          </div>
        </div>
        {theme === "light" ? (
          <FaMoon
            onClick={handleColorTheme}
            className="absolute end-10 bottom-8 text-blue-950 text-5xl cursor-pointer bg-slate-200 rounded-full p-1"
          />
        ) : (
          <FaSun
            onClick={handleColorTheme}
            className="absolute end-10 bottom-8 text-white text-5xl cursor-pointer bg-indigo-700 rounded-full p-1"
          />
        )}
      </div>
      <section className="flex justify-center mt-6 sm:mt-10">
        <div className="sm:flex-1 text-center hidden sm:block">
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
        <div className="sm:flex-1 text-center hidden sm:block">
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
      <section className="flex justify-center items-center gap-6 sm:gap-10 mt-6 sm:mt-10">
        <div
          className={`${
            turn === turns.X ? "bg-orange-400 p-2 sm:p-3 rounded-md" : "p-2 sm:p-3"
          }`}
        >
          <h2
            className={`text-4xl sm:text-5xl font-rubik
        ${theme === "light" ? "text-gray-950" : "text-slate-100"}`}
          >
            {turns.X}
          </h2>
        </div>
        <div>
          <RiResetLeftLine
            className={`text-4xl sm:text-5xl cursor-pointer
        ${theme === "light" ? "text-gray-950" : "text-slate-100"}`}
            onClick={resetGame}
          />
        </div>
        <div
          className={`${
            turn === turns.O ? "bg-orange-400 p-2 sm:p-3 rounded-md" : "p-2 sm:p-3"
          }`}
        >
          <h2
            className={`text-4xl sm:text-5xl font-rubik
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
