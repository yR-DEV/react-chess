import React from 'react';

import '../index.css'
import Board from './board.js';
import InitializeChessBoard from '../helpers/initializeChessBoard.js';

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: InitializeChessBoard()
        }
    }

    render() {

        return (
            <div className="board">
                <div className="game-board">
                    <Board 
                        squares={this.state.squares}
                    />
                </div>
            </div>
        )
    }
}