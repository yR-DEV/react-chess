import King from '../pieces/king.js';
import Queen from '../pieces/queen.js';
import Bishop from '../pieces/bishop.js';
import Knight from '../pieces/knight.js';
import Rook from '../pieces/rook.js';
import Pawn from '../pieces/pawn.js';


export default function InitializeChessboard() {
    // Initialize a squares array with a length of 64 and fill values with null
    // this is important later because squares without a piece in them will have
    // a null value that lets us know the square is empty
    const squares = Array(64).fill(null);

    squares[4] = new King(2);
    squares[60] = new King(1);

    squares[3] = new Queen(2);
    squares[59] = new Queen(1);

    // 2, 5, 58, 61
    squares[2] = new Bishop(2);
    squares[5] = new Bishop(2);
    squares[58] = new Bishop(1);
    squares[61] = new Bishop(1);

    squares[1] = new Knight(2);
    squares[6] = new Knight(2);
    squares[57] = new Knight(1);
    squares[62] = new Knight(1);

    squares[0] = new Rook(2);
    squares[7] = new Rook(2);
    squares[56] = new Rook(1);
    squares[63] = new Rook(1);

    for (let i = 8; i < 16; i++) {
        squares[i] = new Pawn(2);
        // adds 40 to get to bottom of board for player 1s pawns
        squares[i + 40] = new Pawn(1);
    }

    return squares;
}