const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';

const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';

const CHESS_BOARD_ID = 'chess-board';

let boardData;
let table;
let selectedPiece;
let turnCounter;





function getInitialPieces() {
  let result = [];

  addFirstRowPieces(result, 0, WHITE_PLAYER);
  addFirstRowPieces(result, 7, BLACK_PLAYER);

  for (let i = 0; i < BOARD_SIZE; i++) {
    result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
    result.push(new Piece(6, i, PAWN, BLACK_PLAYER));
  }
  return result;
}

function addFirstRowPieces(result, row, player) {
  result.push(new Piece(row, 0, ROOK, player));
  result.push(new Piece(row, 1, KNIGHT, player));
  result.push(new Piece(row, 2, BISHOP, player));
  result.push(new Piece(row, 3, KING, player));
  result.push(new Piece(row, 4, QUEEN, player));
  result.push(new Piece(row, 5, BISHOP, player));
  result.push(new Piece(row, 6, KNIGHT, player));
  result.push(new Piece(row, 7, ROOK, player));
}

// Adds an image to cell with the piece's image
function addImage(cell, player, name) {
  const image = document.createElement('img');
  image.src = 'images/' + player + '/' + name + '.png';
  cell.appendChild(image);
}

function showMovesForPiece(row, col) {
    console.log('showMovesForPiece');
    // Clear all previous possible moves
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        table.rows[i].cells[j].classList.remove('possible-move');
        table.rows[i].cells[j].classList.remove('selected');
      }
    }

    // Show possible moves
    const piece = boardData.getPiece(row, col);
    if (piece !== undefined) {
      let possibleMoves = piece.getPossibleMoves(boardData);
      for (let possibleMove of possibleMoves) {
        const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
        cell.classList.add('possible-move');
      }
    }
    table.rows[row].cells[col].classList.add('selected');
    selectedPiece = piece;
}
function onCellClick(event, row, col) {
  // selectedPiece - The current selected piece (selected in previous click)
  // row, col - the currently clicked cell - it may be empty, or have a piece.
  if (selectedPiece === undefined) {
    showMovesForPiece(row, col);
  } else {
     if (tryMove(selectedPiece, row, col) && WhichTurn(selectedPiece, turnCounter)) {
      SetPiece(boardData, selectedPiece, row, col)
      selectedPiece = undefined;  
       // Recreate whole board - this is not efficient, but doesn't affect user experience
       createChessBoard(boardData);
       //turn gets over and then the counter goes up      
      } else {
        showMovesForPiece(row, col);
      }
      console.log(turnCounter);
    }
  }

// Tries to actually make a move. Returns true if successful.
function tryMove(piece, row, col) {
  const possibleMoves = piece.getPossibleMoves(boardData);
  // possibleMoves looks like this: [[1,2], [3,2]]
  for (const possibleMove of possibleMoves) {
    // possibleMove looks like this: [1,2]
    if (possibleMove[0] === row && possibleMove[1] === col) {
      // There is a legal move
      console.log('true');
      return true;
    }
  }
  console.log('false');
  return false;
}

function initGame() {
  // Create list of pieces (32 total)
  let headLine = document.createElement('h1');
  document.body.appendChild(headLine); 
  headLine.textContent = 'Maxim Chess';
  turnCounter = 1;
  boardData = new BoardData(getInitialPieces());
  createChessBoard(boardData);
}

function createChessBoard(boardData) {
  table = document.getElementById(CHESS_BOARD_ID);
  if (table !== null) {
    table.remove();
  }

  // Create empty chess board HTML:
  table = document.createElement('table');
  table.id = CHESS_BOARD_ID;
  document.body.appendChild(table);
  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowElement = table.insertRow();
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = rowElement.insertCell();
      if ((row + col) % 2 === 0) {
        cell.className = 'light-cell';
      } else {
        cell.className = 'dark-cell';
      }
      cell.addEventListener('click', (event) => onCellClick(event, row, col));
    }
  }

  // Add pieces images to board
  for (let piece of boardData.pieces) {
    const cell = table.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }
}
// figures out if the piece is selected
function WhichTurn(piece, turnCounter)
{
if(piece !== undefined)
  {
    return(piece.player === 'black' && turnCounter % 2 === 0) || (piece.player === 'white' && turnCounter % 2 !== 0);
  }
}
//sets the piece placement and deletes the previous one
function SetPiece(boardData, selectedPiece, row, col)
{
  boardData.removePiece(row, col);
  selectedPiece.row = row;
  selectedPiece.col = col;
  turnCounter++;
}

window.addEventListener('load', initGame);