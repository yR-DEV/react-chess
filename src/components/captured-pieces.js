import React from 'react';

import '../index.css';
import Square from './square.js';

export default class CapturedPieces extends React.Component {

    renderSquare(square, i, squareShading) {
        return <Square 
            key={i}
            keyVal={i}
            piece={square}
            style={square.style}
        />
    };

    render() {
        return (
            <div>
                <div className="board-row">{this.props.whitePiecesCaptured.map((wp, index) =>
                    this.renderSquare(wp, index))}
                </div>
                <div className="board-row">{this.props.blackPiecesCaptured.map((bp, index) =>
                    this.renderSquare(bp, index))}
                </div>
            </div>
        );
    }
} 