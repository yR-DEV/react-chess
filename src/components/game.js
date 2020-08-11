import React from 'react';

import '../index.css'
import Board from './board.js';

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className="board">
                <div className="game-board">
                    <Board />
                </div>
            </div>
        )
    }
}