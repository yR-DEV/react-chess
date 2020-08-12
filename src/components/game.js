import React from 'react';

import '../index.css'
import Board from './board.js';
import InitializeChessBoard from '../helpers/initializeChessBoard.js';

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: InitializeChessBoard(),
            player: 1,
            turn: 'white',
            selectedSquare: -1,
            status: 'YOU SUCK'
        }
    }

    handleClick(i) {
        const squares = [...this.state.squares];

        if (this.state.selectedSquare === -1) {
            if(!squares[i] || squares[i].player !== this.state.player) {
                this.setState({status: "WRONGK"});
            } else {
                squares[i].style = {... squares[i].style, backgroundColor: "#ff0569"}
                this.setState({
                    status: "Choose Destination Square",
                    selectedSquare: i
                });
            }
        } 
        // else if (this.state.selectedSquare > -1) {
        //     delete squares[this.state.selectedSquare].style.backgroundColor;
        //     if(squares[i] && squares[i].player === this.state.player) {
        //         this.setState({
        //             status: "NOPE",
        //             selectedSquare: -1
        //         })
        //     }
        // } 
        else {
            const squares = this.state.squares.slice();
            const isDestSquareOccupied = squares[i] ? true : false;
            const isMovePossible = squares[this.state.selectedSquare].isMovePossible(this.state.selectedSquare, i,isDestSquareOccupied );
            const getMovePath = squares[this.state.selectedSquare].getMovePath(this.state.selectedSquare, i);
            const isMoveLegal = this.isMoveLegal(getMovePath);
        }
    }

    isMoveLegal(getMovePath) {
        let isLegal = true;
        for(let i = 0; i < getMovePath.length; i++) {
            if(this.state.squares[getMovePath[i]] !== null) {
                isLegal = false;
            }
        }
        return isLegal;
    }

    render() {

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={this.state.squares}
                        onClick = {(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-status">{this.state.status}</div>
            </div>
        )
    }
}