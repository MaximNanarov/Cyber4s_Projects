const tableID = 'Checkers_Board'
const SOLDIR = 'Soldir';  
const QUEEN = 'Queen';
const BOARD_SIZE = 8;


window.addEventListener('load', () => {
    console.log('HTML page is loaded');
    let table = document.createElement('table');
    table.id = tableID; 
    document.body.appendChild(table); 
    console.log('the table has been append');
    for(let i = 0; i < 8; i++)
    {
        let Row = table.insertRow();
        for(let j =0; j < 8; j++){
            let cell = Row.insertCell(); 
            if((i + j) % 2 === 0)
            {
                cell.className = 'light-cell';
            }
            else
            {
                cell.className = 'dark-cell';
            }
        }
    }
    let boardInfo = new BoardInfo();
      for (let piece of boardInfo.pieces) {
        const cell = table.rows[piece.row].cells[piece.col];
        console.log(piece.player+' '+piece.type);
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

  }

  
  