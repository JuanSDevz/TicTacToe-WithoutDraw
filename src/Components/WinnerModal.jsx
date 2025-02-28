function WinnerModal({ winner, resetGame, continueGame }) {
    if (winner === null) return null // Don't show the modal if there is no winner

    const winnerText = winner === false ? 'Draw' : 'Winner' // Change the text based on the winner
  
    // Return the modal with the winner text and buttons to reset or continue the game
    return (
      <section className=' w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center'>
        <div className='bg-slate-500 p-4 rounded-md'>
          <h1 className="text-center font-rubik text-white text-3xl">{winnerText}</h1>
            <h2 className="text-center font-rubik text-red-600 text-5xl">{winner}</h2>
          <footer className="flex justify-center gap-4 mt-4">
            <button className="font-rubik bg-slate-600 py-2 px-4 text-blue-300 hover:bg-slate-700 rounded-md border-none" onClick={resetGame}>Reset</button>
            <button className="font-rubik bg-slate-600 py-2 px-4 text-blue-300 hover:bg-slate-700 rounded-md border-none" onClick={continueGame}>Continue</button>
          </footer>
        </div>
      </section>
    )
}

export default WinnerModal