const GameBoard = (() => {
    const board = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
    
    const getBoard = () => board;
    
    return { getBoard };
})(); 

const Players = (name,symbol) => {
    return {name, symbol}
} 

const gameboard = document.querySelector('.board');
const boardArray = GameBoard.getBoard();

boardArray.forEach(symbol => {
    const newCell = document.createElement('div');
    newCell.textContent = symbol;
    newCell.style.border = '1px solid gray';
    newCell.style.padding = '30px';
    gameboard.appendChild(newCell);
});
 