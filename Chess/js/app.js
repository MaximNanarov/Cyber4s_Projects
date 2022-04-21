// Add all pieces to the board "from js list"
// When user clicks, show possible movements by a different color, without worrying about other pieces (as if the piece was along on the board).

const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white_rotated';
const DARK_PLAYER = 'dark';

let moveFlag = true;
let selectedCell;
let pieces = [];

class boardData{

  constructor(B, pieces){
    this.table = B;
    this.pieces = pieces;
  }

  getCell(row,col){
    return this.table.rows[row].cells[col]; 
  }

  getpiece(row,col){
    let pLength = this.pieces.length;
    for(let i = 0; i < pLength; i++)
    {
      if(this.pieces[i].row === row && this.pieces[i].col === col)
      {
        return this.pieces[i]; 
      }
    }
  }
  
  paintCell(cell, CssClass){
    cell.classList.add(CssClass);
  }

  allRookMoves(cI, rI)
  {
    let result = [,];
    for(let i = 1; i < 8; i++)
    {
      result.push(i,cI);
      result.push(-i,cI);
      result.push(rI,-i);
      result.push(rI,i);
    }
    return result;
  }

  rookFliterdMoves(cI,rI)
  {
    let possibleMoves = this.allRookMoves(cI, rI);
    let filterMoves = [,]; 
    
  }


  cleanBoardFromMoves() {
    for(let i = 0; i < 8; i++){
     for(let j = 0; j < 8; j++){
      this.table.rows[i].cells[j].classList.remove('Movable');
      } 
     }

  }  
}

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

function addImage(cell, player, name) {
  const image = document.createElement('img');
  image.src ='images/' + player + '/' + name + '.png';   //Chess\images\dark\bishop.png
  cell.appendChild(image);
}

//the click that chooses a cell
function onCellClick(event) {
  if (selectedCell !== undefined) {
    selectedCell.classList.remove('selected');
  }
  let BoardData = new boardData(document.getElementById('table1'), pieces);
  BoardData.cleanBoardFromMoves();
  selectedCell = event.currentTarget;
  BoardData.paintCell(selectedCell, 'selected');
  // selectedCell.classList.add('selected');
  let cI = selectedCell.cellIndex;
  let rI = selectedCell.parentNode.rowIndex;
  let pType = BoardData.getpiece(rI,cI); // getThePieceByIndex(cI, rI);
  
  
   moveFlag = pieceMove(pType,cI, rI); 
}

function getThePieceByIndex(cI, rI)//get's the index of the cell that's been clikced and getting the piece placed in it
  {
   let pLength = pieces.length;
   let result = [,];  
   for(let i = 0; i < pLength; i++)
   {
     if(pieces[i].row === rI && pieces[i].col === cI)
     {
       return pieces[i]; 
     }
   }
  }
//the possible movement of the pieces
function pieceMove(type, cI ,rI)
{
  let bd = new boardData(document.getElementById('table1'), type );
  let table = bd.table;
  let down =7;
  let up =0;
  let right =7; 
  let left =0;
  let colIndex = cI;
  let rowIndex= rI; 
  if(type.type === 'rook') // the movement of rook
  {
    while(colIndex >= 0)                      //cI = col   
    {
      document.getElementById('table1').rows[rowIndex].cells[colIndex].classList.add('Movable');
      colIndex--;
    }
    colIndex = cI;
    rowIndex= rI;
    while(rowIndex >= 0)
    {
      document.getElementById('table1').rows[rowIndex].cells[colIndex].classList.add('Movable');
      rowIndex--;
    }
     colIndex = cI;
     rowIndex= rI; 
    while(colIndex >= 0)
    {
      document.getElementById('table1').rows[rowIndex].cells[colIndex].classList.add('Movable');
      colIndex--;
    }
    colIndex = cI;
    rowIndex= rI; 
    while(rowIndex - 7 <= 0)
    {
      document.getElementById('table1').rows[rowIndex].cells[colIndex].classList.add('Movable');
      rowIndex++;
    }
     colIndex = cI;
     rowIndex= rI; 
    while(right - colIndex >= 0)
    {
      document.getElementById('table1').rows[rowIndex].cells[colIndex].classList.add('Movable');
      colIndex++;
    }
    colIndex = cI;
    rowIndex= rI; 
  }
  if(type.type === 'pawn' && type.player === 'dark')
  {
    table.rows[rowIndex - 1].cells[colIndex].classList.add('Movable');;
  }
  else if(type.type === 'pawn' && type.player === 'white_rotated')
  {
    table.rows[rI + 1].cells[cI].classList.add('Movable');
  }
  if(type.type === 'bishop')
  {//up & left
    while(colIndex > 0 && rowIndex > 0) 
    {
      colIndex--; 
      rowIndex--;
      table.rows[rowIndex].cells[colIndex].classList.add('Movable');
    }
    colIndex = cI;
    rowIndex= rI; 
    //up & right
    while(colIndex < 7 && rowIndex > 0) 
    {
      colIndex++; 
      rowIndex--;
      table.rows[rowIndex].cells[colIndex].classList.add('Movable');
    }
    colIndex = cI;
    rowIndex= rI; 
    //down & left
    while(colIndex > 0 && rowIndex < 7) 
    {
      colIndex--; 
      rowIndex++;
      table.rows[rowIndex].cells[colIndex].classList.add('Movable');
    }
    colIndex = cI;
    rowIndex= rI; 
    //down & right
    while(colIndex < 7 && rowIndex < 7) 
    {
      colIndex++; 
      rowIndex++;
      table.rows[rowIndex].cells[colIndex].classList.add('Movable');
    }
    colIndex = cI;
    rowIndex= rI; 
  }
  if(type.type === 'king')
  {
    let x; 
    let y; 
    let surrondings = [[colIndex + 1 , rowIndex + 1], [colIndex - 1 , rowIndex - 1], [colIndex + 1 , rowIndex - 1],[colIndex - 1 , rowIndex + 1],[colIndex  , rowIndex + 1],[colIndex + 1 , rowIndex ],[colIndex , rowIndex - 1],[colIndex - 1 , rowIndex] ]; 
    for(let i = 0; i < surrondings.length; i++)
    {
      x = surrondings[i][0]; 
      y = surrondings[i][1]; 
      if((x < 8 && x >= 0) && (y < 8 && y >= 0)){ 
      console.log('x: ' + x +' y: ' + y);
      table.rows[y].cells[x].classList.add('Movable');
      }
    }
  }
  if(type.type === 'queen')
  {
    while(colIndex > 0 && rowIndex > 0) 
    {
      colIndex--; 
      rowIndex--;
      table.rows[rowIndex].cells[colIndex].classList.add('Movable');
    }
    colIndex = cI;
    rowIndex= rI; 
    //up & right
    while(colIndex < 7 && rowIndex > 0) 
    {
      colIndex++; 
      rowIndex--;
      table.rows[rowIndex].cells[colIndex].classList.add('Movable');
    }
    colIndex = cI;
    rowIndex= rI; 
    //down & left
    while(colIndex > 0 && rowIndex < 7) 
    {
      colIndex--; 
      rowIndex++;
      table.rows[rowIndex].cells[colIndex].classList.add('Movable');
    }
    colIndex = cI;
    rowIndex= rI; 
    //down & right
    while(colIndex < 7 && rowIndex < 7) 
    {
      colIndex++; 
      rowIndex++;
      table.rows[rowIndex].cells[colIndex].classList.add('Movable');
    }
    colIndex = cI;
    rowIndex= rI; 
    while(colIndex >= 0)
    {
      document.getElementById('table1').rows[rowIndex].cells[colIndex].classList.add('Movable');
      colIndex--;
    }
    colIndex = cI;
    rowIndex= rI;
    while(rowIndex >= 0)
    {
      document.getElementById('table1').rows[rowIndex].cells[colIndex].classList.add('Movable');
      rowIndex--;
    }
     colIndex = cI;
     rowIndex= rI; 
    while(colIndex >= 0)
    {
      document.getElementById('table1').rows[rowIndex].cells[colIndex].classList.add('Movable');
      colIndex--;
    }
    colIndex = cI;
    rowIndex= rI; 
    while(down - rowIndex >= 0)
    {
      document.getElementById('table1').rows[rowIndex].cells[colIndex].classList.add('Movable');
      rowIndex++;
    }
     colIndex = cI;
     rowIndex= rI; 
    while(right - colIndex >= 0)
    {
      document.getElementById('table1').rows[rowIndex].cells[colIndex].classList.add('Movable');
      colIndex++;
    }
    colIndex = cI;
    rowIndex= rI; 
  }
  if(type.type === 'knight')
  {
    let x; 
    let y; 
    let surrondings = [[colIndex - 2 , rowIndex - 1],[colIndex - 2 , rowIndex + 1],[colIndex - 1 , rowIndex - 2],[colIndex - 1 , rowIndex + 2], [colIndex + 1 , rowIndex - 2], [colIndex + 1 , rowIndex + 2], [colIndex + 2 , rowIndex - 1], [colIndex + 2 , rowIndex + 1]]; 
    for(let i = 0; i < surrondings.length; i++)
    {
      x = surrondings[i][0]; 
      y = surrondings[i][1]; 
      if((x < 8 && x >= 0) && (y < 8 && y >= 0)){ 
      console.log('x: ' + x +' y: ' + y);
      table.rows[y].cells[x].classList.add('Movable');
      }
    }
  }
}

// creats the chess board
function createChessBoard() {
  const table1 = document.createElement('table');
  table1.setAttribute('id','table1'); 
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

//possible movment is only for the same row or column

