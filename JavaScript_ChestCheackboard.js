
window.addEventListener('load', () => { //creating the chess board
let link = document.createElement('link'); 
link.rel = 'stylesheet'; 
link.type = 'text/css';
link.href = 'C:\Users\nanar\Documents\Cyber4s_Project\check_Board_JS\Checkboard_JS\Checkboard_Css.css';
let body = document.getElementsByTagName("body")[0];
let tbl = document.createElement("table");
tbl.tagName = 'tbl'; 
let tblBody = document.createElement("tbody");
const Letters = ['A','B','C','D','E','f','G','H'];
const numbers = ['1','2','3','4','5','6','7','8'];
for (let j = 0; j < 10; j++) {
  let row = document.createElement("tr");
  for (let i = 0; i < 10; i++) {   
    let cell = document.createElement("td");
    let cellText = document.createTextNode("");
    if(i === 0 || i === 9 || j === 0 || j === 9)  // if the loops are scanning the surrondings of the check board, then they will insert the indexes of the board
    {
        if((i === 0 || i === 9) && (j === 0 || j === 9))
        {
          
        }
         else if((i === 0 || i === 9) && (j !== 0 && j !== 9)){
         cell.innerText = Letters[j - 1]; 
         }
         else
         {
           let x = i - 1;
           cell.innerText =  numbers[i - 1]; 
         }
    }
    else // in this condition all the work is inside the board, so if i want to paint the colors then its here, and maybe add the game characters
    {
     

        if(j % 2 === 0 && i % 2 === 0 ) // painting the cells
         {  
           cell.style.backgroundColor = '#A52A2A';    
         }
       else if(j % 2 !== 0 && i % 2 !== 0)
         {
           cell.style.backgroundColor = '#A52A2A';  
         }
         else{
           cell.style.backgroundColor = '#DEB887'
         }
         if(j === 1) // putting the White characters
         {
           let s = document.createElement('div'); 
           
           body.appendChild(s); 
           if(i === 1 || i === 8 && j === 1)
           {
             let x = new WRook(); 
             cell.style.backgroundImage = x.pictureURL;  
           }
           else if(i === 2 || i === 7)
           {
             let x = new Wknight();
             cell.style.backgroundImage = x.pictureURL; 
           }
           else if(i === 3 || i === 6)
           {
             let x = new Wbishop(); 
             cell.style.backgroundImage = x.pictureURL; 
           }
           else if(i === 4)
           {
             let x = new WQueen(); 
             cell.style.backgroundImage = x.pictureURL; 
           }
           else
           {
             let x = new WKing(); 
             cell.style.backgroundImage = x.pictureURL; 
           }
         }
         else if(j === 2)
         {
           let x = new Wpawn(); 
           cell.style.backgroundImage = x.pictureURL; 
         }
         if(j === 8) // putting the Black characters
         {
           if(i === 1 || i === 8)
           {
             let x = new BRook(); 
             cell.style.backgroundImage = x.pictureURL;  
           }
           else if(i === 2 || i === 7)
           {
             let x = new Bknight();
             cell.style.backgroundImage = x.pictureURL; 
           }
           else if(i === 3 || i === 6)
           {
             let x = new Bbishop(); 
             cell.style.backgroundImage = x.pictureURL; 
           }
           else if(i === 4)
           {
             let x = new BQueen(); 
             cell.style.backgroundImage = x.pictureURL; 
           }
           else
           {
             let x = new BKing(); 
             cell.style.backgroundImage = x.pictureURL; 
           }
         }
         else if(j === 7)
         {
           let x = new Bpawn(); 
           cell.style.backgroundImage = x.pictureURL; 
         }
         makeCellCSS(cell)
    }
    cell.addEventListener('click', onCellClick);
    row.style.borderCollapse = "collapse";
    cell.appendChild(cellText);
    row.appendChild(cell);
    cell.style.padding = '20px';
  }  
  tblBody.appendChild(row);
}
tbl.style.backgroundColor = 'wheat'; 
tbl.className = 'checkBoard';
tbl.style.margin = '50px 650px';
tbl.appendChild(tblBody);
body.appendChild(tbl);
//puting pawns in the place and trying to make them move titles like a queen (evreywhere i can)
});

function onCellClick(e){
  console.log(e.currentTarget)
  if(e.selectedCell !== undefined)
  {
    e.currentTarget.classList.remove('yellow');
  }
  else{
     selectedCell.classList.add('yellow'); 
  }
  selectedCell = e.currentTarget; 
  
  console.log('i was clicked!');
}




function check(table)
{
  let totalRowCount = table.rows.length;
  let tbodyRowCount = table.tBodies[0].rows.length;
  for(let i = 0; i < totalRowCount; i++)
  {
    for(let j = 0; j < tbodyRowCount; j++)
    {
      if(table.rows[i].cells[j].style.backgroundColor == 'black'){
      //   if(j % 2 === 0 && i % 2 === 0 ) // painting the cells
      //   {  
      //     cell.style.backgroundColor = '#A52A2A';    
      //   }
      // else if(j % 2 !== 0 && i % 2 !== 0)
      //   {
      //     cell.style.backgroundColor = '#A52A2A';  
      //   }
      //   else{
      //     cell.style.backgroundColor = '#DEB887'
      return false; 
        }
      }
     
  }
  return true

}
// function highlight(td)
// {
//   td.style.backgroundColor = 'yellow'; 
// }

// tbl.addEventListener('click', (event) => {

// let targ = event.target.closest('td'); 

// if (!td) return; // (2)

//   if (!table.contains(td)) return; // (3)

//   highlight(td); // (4)

// });


function makeCellCSS(cell)
{
  cell.style.border = 'solid black 1px'
  margin='0px'; 
}
class Bpawn{
  constructor()
  {
    this.name = 'Black Pawn'
    this.pictureURL = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/50px-Chess_pdt45.svg.png')";
  }
}

class Bknight{
  constructor(){
    this.name = 'Black Knight'
    this.pictureURL = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/50px-Chess_ndt45.svg.png')";
  }
}

class Bbishop{
  constructor(){
    this.name = 'Black Bishop'
    this.pictureURL = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/50px-Chess_bdt45.svg.png')";
  }
}

class BRook{
  constructor(){
    this.name = 'Black Rook'
    this.pictureURL = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/50px-Chess_rdt45.svg.png')"
  }
}
class BQueen{
  constructor(){
    this.name = 'Black Queen'
    this.pictureURL = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/50px-Chess_qdt45.svg.png')";
  }
}
class BKing{
  constructor(){
  this.name = 'Black King'; 
  this.pictureURL = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/50px-Chess_kdt45.svg.png')";
  }
}

class Wpawn{
  constructor()
  {
    this.name = 'White Pawn'
    this.pictureURL = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/50px-Chess_plt45.svg.png')";
  }
}

class Wknight{
  constructor(){
    this.name = 'white Knight'
    this.pictureURL = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/50px-Chess_nlt45.svg.png')";
  }
}

class Wbishop{
  constructor(){
    this.name = 'white Bishop'
    this.pictureURL = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/50px-Chess_blt45.svg.png')";
  }
}

class WRook{
  constructor(){
    this.name = 'white Rook'
    this.pictureURL = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/50px-Chess_rlt45.svg.png')";
  }
}
class WQueen{
  constructor(){
    this.name = 'white Queen'
    this.pictureURL = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/50px-Chess_qlt45.svg.png')";
  }
}
class WKing{
  constructor(){
  this.name = 'white King'; 
  this.pictureURL = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/50px-Chess_klt45.svg.png')";
  }
}

