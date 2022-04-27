const tableID = 'Checkers_Board'
const SOLDIR = 'Soldir';  
const QUEEN = 'Queen';
const BOARD_SIZE = 8;

let selectedPiece;

window.addEventListener('load', () => {
    console.log('HTML page is loaded');
    let table = document.createElement('table');
    table.id = tableID; 
    document.body.appendChild(table); 
    console.log('the table has been append');
    for(let row = 0; row < 8; row++)
    {
        let Row = table.insertRow();
        for(let col =0; col < 8; col++){
            let cell = Row.insertCell(); 
            if((row + col) % 2 === 0)
            {
                cell.className = 'light-cell';
            }
            else
            {
                cell.className = 'dark-cell';
            }
            cell.addEventListener('click',() => onCellClick(row, col));
        }
    }
    let boardInfo = new BoardInfo();
      for (let piece of boardInfo.pieces) {
        const cell = table.rows[piece.row].cells[piece.col];
        addImage(cell, piece.player, piece.type);
      }
    });


  function addImage(cell, name ,player ) { // Damka\Image\Black\Soldir.png
    const image = document.createElement('img');
    image.src = 'Image/' + player + '/' + name + '.png';
    console.log('Image/' + player + '/' + name + '.png');
    image.draggable = false;
    cell.appendChild(image);
  }

  function onCellClick(row,col){
    let pieces = new BoardInfo(); 
    selectedPiece = pieces.getPiece(row,col); 
    console.log('piece was clicked');
    if(selectedPiece !== undefined)
    {
     
    }

  }

  
  