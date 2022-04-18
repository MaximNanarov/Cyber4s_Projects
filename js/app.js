// Add all pieces to the board "from js list"
// When user clicks, show possible movements by a different color, without worrying about other pieces (as if the piece was along on the board).

const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white_rotated';
const DARK_PLAYER = 'dark';

let selectedCell;
let pieces = [];

class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }
}

function getInitialBoard() {

  let result = [];                                    // the white pieces
  result.push(new Piece(0, 0, "rook", WHITE_PLAYER))
  result.push(new Piece(0, 1, "knight", WHITE_PLAYER))
  result.push(new Piece(0, 2, "bishop", WHITE_PLAYER))
  result.push(new Piece(0, 3, "queen", WHITE_PLAYER))
  result.push(new Piece(0, 4, "king", WHITE_PLAYER)) 
  result.push(new Piece(0, 5, "bishop", WHITE_PLAYER))
  result.push(new Piece(0, 6, "knight", WHITE_PLAYER))
  result.push(new Piece(0, 7, "rook", WHITE_PLAYER))

  result.push(new Piece(7, 0, "rook", DARK_PLAYER))
  result.push(new Piece(7, 1, "knight", DARK_PLAYER))
  result.push(new Piece(7, 2, "bishop", DARK_PLAYER))
  result.push(new Piece(7, 3, "queen", DARK_PLAYER))
  result.push(new Piece(7, 4, "king", DARK_PLAYER)) 
  result.push(new Piece(7, 5, "bishop", DARK_PLAYER))
  result.push(new Piece(7, 6, "knight", DARK_PLAYER))
  result.push(new Piece(7, 7, "rook", DARK_PLAYER))
  // let piecesName = ['rook','knight','bishop','queen', 'king','bishop','knight','rook'];
  // result.push(SetStartingPieces(piecesName, WHITE_PLAYER, result))
  for(let i = 0; i<8; i++){
  result.push(new Piece(1,i,"pawn", WHITE_PLAYER));
  result.push(new Piece(6,i,"pawn", DARK_PLAYER));
  }

  return result;
}

// function SetStartingPieces(piecesName, typePLayer, result)
// {
//   let piecesNameLength = piecesName.Length; 
//   for(let i = 0; i < piecesNameLength; i++)
//   {
//     if(typePLayer !== 'dark')
//     result.push(new Piece(0, i, piecesName[i], typePLayer))
//     else
//     result.push(new Piece(7, i, piecesName[i], typePLayer))
//   }
//   return result;
// }

function addImage(cell, player, name) {
  const image = document.createElement('img');
  image.src = 'images/' + player + '/' + name + '.png';   //images\white_rotated\knight.png
  cell.appendChild(image);
}

//the click that chooses a cell
function onCellClick(event) {
  if (selectedCell !== undefined) {
    selectedCell.classList.remove('selected');
  }
  selectedCell = event.currentTarget;
  selectedCell.classList.add('selected');
  let cI = selectedCell.cellIndex;
  let rI = selectedCell.parentNode.rowIndex;
  let pType = getThePieceByIndex(cI, rI );
  pieceMove(table1,pType,cI, rI ); 
  }

function getThePieceByIndex(cI, rI)//get's the index of the cell that's been clikced and getting the piece placed in it
  {
   let pLength = pieces.length; 
   for(let i = 0; i < pLength; i++)
   {
     if(pieces[i].row === rI && pieces[i].col === cI)
     {
       return pieces[i].type; 
     }
   }
  }

function pieceMove(table,type, cI ,rI)
{
  let down =7;
  let up =0;
  let right =7; 
  let left =0;
  let cell; 
  if(type === 'rook')
  {
    while(up + rI >= 0)
    {
      console.log(rI + ' ' + cI);
      console.log(table.row[rI].rowIndex+' '+table.row[rI].cell[cI].cellIndex)
      table.row[rI].cell[cI].classList.add('Movable');
      rI--;
    }
  }
}


// creats the chess board
function createChessBoard() {
  const table1 = document.createElement('table');
  document.body.appendChild(table1);
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = table1.insertRow();
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cell = row.insertCell();
      cell.id = "cell-" + i.toString() + "_" + j.toString();
      if ((i + j) % 2 === 0) {
        cell.className = 'light-cell';
      } else {
        cell.className = 'dark-cell';
      }
      cell.addEventListener('click', onCellClick);
    }
  }
  pieces = getInitialBoard();

  for (let piece of pieces) {
    
    addImage(table1.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }
}

window.addEventListener('load', createChessBoard);


