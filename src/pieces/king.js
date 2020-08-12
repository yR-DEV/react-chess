import Piece from './piece.js';

export default class King extends Piece {
    constructor(player) {
        // Super inheriting contructor from Piece whhich includes which player is it, and the icon for the particular chess piece
        super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg" 
                        : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"));
    }

    isMovePossible(startSquare, endSquare) {
        return (startSquare + 1 === endSquare ||
                startSquare - 1 === endSquare ||
                startSquare + 7 === endSquare ||
                startSquare - 7 === endSquare ||
                startSquare + 8 === endSquare ||
                startSquare - 8 === endSquare ||
                startSquare + 9 === endSquare ||
                startSquare - 9 === endSquare);
    }

    // For King and pawn, this will always return an empty array as they can only move 1 square
    // in pawn, we check whether or not it is in its initial position to determine a second 2 square move invalid
    getMovePath(startSquare, endSquare) {
        return [];
    }
}