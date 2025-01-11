function Boxes({ theme, updateBoard, index, firstPositionX, firstPositionO, children }) {
  const handleClick = () => {
    updateBoard(index);
  };

  const isFirstX = index === firstPositionX;
  const isFirstO = index === firstPositionO;

  return (
    <div
      className={`font-rubik flex justify-center items-center text-center text-4xl cursor-pointer border border-slate-950 h-28 w-28 rounded-md 
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
