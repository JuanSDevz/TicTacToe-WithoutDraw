function Boxes({ theme, updateBoard, index, firstPositionX, firstPositionO, children }) {
  //The board position is updated when the box is clicked
  const handleClick = () => {
    updateBoard(index);
  };

  //Check if the box is the first position of X or O
  const isFirstX = index === firstPositionX;
  const isFirstO = index === firstPositionO;

  //Return the box with the corresponding style
  return (
    <div
      className={`font-rubik flex justify-center items-center text-center text-4xl cursor-pointer border border-slate-950 h-20 w-20 sm:h-28 sm:w-28 rounded-md 
        ${theme === "light" ? "bg-blue-200" : "bg-blue-900"} 
        ${theme === "light" ? (children === "X" ? "text-red-700" : "text-green-700") : (children === "X" ? "text-pink-500" : "text-emerald-300")}
        ${theme === "light" ? "hover:bg-blue-300" : "hover:bg-blue-950"}
        ${isFirstX ? "text-red-400 bg-pink-800" : ""}
        ${isFirstO ? "text-green-400 bg-emerald-800" : ""}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

export default Boxes;
