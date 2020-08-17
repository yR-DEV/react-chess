import Piece from './piece.js';

export default class Knight extends Piece {

    constructor(player) {
        super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" 
            : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"));
    }

    // Hard coded knight movement because it jumps around and is a different kind of piece
    isMovePossible(startSquare, endSquare) {
        return (startSquare + 6 === endSquare ||
                startSquare - 6 === endSquare ||
                startSquare + 10 === endSquare ||
                startSquare - 10 === endSquare ||
                startSquare + 15 === endSquare ||
                startSquare - 15 === endSquare ||
                startSquare + 17 === endSquare ||
                startSquare - 17 === endSquare);
    }

    // will always return empty array because knight doesnt move in linear directions
    getMovePath(startSquare, endSquare) {
        return [];
    }
}