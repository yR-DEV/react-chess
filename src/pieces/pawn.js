import Piece from './piece.js';

export default class Pawn extends Piece {
    constructor(player){
        super(player, (player === 1?  "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"));
        this.initialPawnSquares = {
        1: [48, 49, 50, 51, 52, 53, 54, 55],
        2: [8, 9, 10, 11, 12, 13, 14, 15]
        }
    }

    isMovePossible(startSquare, endSquare, isDestintionEnemyOccupied) {
        if (this.player === 1) {
            if((endSquare === startSquare - 8 && !isDestintionEnemyOccupied) || (endSquare === startSquare - 16 && this.initialPawnSquares[1].indexOf(startSquare) !== -1)){
                return true;
            } else if(isDestintionEnemyOccupied && (endSquare === startSquare - 7 || endSquare === startSquare - 9)){
                return true;
            }
        } else if (this.player === 2) {
            if((endSquare === startSquare + 8 && !isDestintionEnemyOccupied) || (endSquare === startSquare + 16 && this.initialPawnSquares[1].indexOf(startSquare) !== -1)){
                return true;
            } else if(isDestintionEnemyOccupied && (endSquare === startSquare + 7 || endSquare === startSquare + 9)){
                return true;
            }
        }
        // Returns false if move is out of bounds or if there is another piece in destination square
        return false;
    }

    // Will ONLY return an array if the pawn moves two spaces initially. 
    // because moving one square has no movement path to add to an array
    getMovePath(startSquare, endSquare) {
        // Checks to see if the move is down or up
        if (endSquare === startSquare - 16) {
            return [startSquare - 8];
        } else if (endSquare === startSquare + 16) {
            return [startSquare + 8];
        }
        // If the move is not an initial move AND a move of 2 spaces return empty array
        return [];
    }
}
