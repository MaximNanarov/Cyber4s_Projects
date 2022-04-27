class BoardInfo{

    constructor(){
    this.pieces = this.initPieces(); 
    }
    initPieces() {
        // Create list of pieces (24 total)
        this.pieces = [];
        for(let i = 0; i < 4; i++)
        {
          this.pieces.push(new Piece(0, i * 2 + 1, 'Black', SOLDIR));
          this.pieces.push(new Piece(1, i * 2, 'Black', SOLDIR));
          this.pieces.push(new Piece(2, i * 2 + 1, 'Black', SOLDIR));
          this.pieces.push(new Piece(5, i * 2, 'White', SOLDIR));
          this.pieces.push(new Piece(6, i * 2 + 1, 'White', SOLDIR));
          this.pieces.push(new Piece(7, i * 2, 'White', SOLDIR));
         }
         return this.pieces;
      }
    
    getPiece(row,col)
    {
        let pieces = this.initPieces();
        for(let i = 0; i < this.pieces.length; i++)
        {
                if(pieces[i].row === row && pieces[i].col === col)
                {
                    return pieces[i];
                } 
        }
    }
}

