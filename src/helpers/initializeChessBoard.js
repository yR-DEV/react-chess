import King from '../pieces/king.js';
import Queen from '../pieces/queen.js';
import Knight from '../pieces/knight.js';

export default function InitializeChessboard() {
    // Initialize a squares array with a length of 64 and fill values with null
    // this is important later because squares without a piece in them will have
    // a null value that lets us know the square is empty
    const squares = Array(64).fill(null);

    squares[4] = new King(2);
    squares[60] = new King(1);

    squares[3] = new Queen(2);
    squares[59] = new Queen(1);
    //1, 6, 57, 62
    squares[1] = new Knight(2);
    squares[6] = new Knight(2);
    squares[57] = new Knight(1);
    squares[62] = new Knight(1);

    return squares;
}