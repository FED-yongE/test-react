import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


class Square extends React.Component {
    constructor(props){
        super(props);
        this.state={
            value : null,
        }
    };

    render(){
        return (
            <button 
                className="square"
                onClick={this.props.onClick}
            >
                {this.props.value}
            </button>
        );
    }
}

// function Square(props){
//     return (
//         <button 
//             className="square"
//         >
//         </button>
//     );
// }

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
        <div>
            {/* <div className="status">{status}</div> */}
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
        </div>
        );
    }
}

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state={
            squares : Array(9).fill(null),
            isNext : true,
        }
    }

    handleClick(i){
        const squares = this.state.squares.slice();
        
        console.log(calculateWinner(squares))

        if( squares[i] || calculateWinner(squares) ){
            return;
        }
        
        squares[i] =  this.state.isNext ? "X" : "O";
        this.setState({
            squares : squares,
            isNext : !this.state.isNext
        })
        console.log(this.state.squares)
    }

    render() {
        let status = "다음 플레이어 : " + (this.state.isNext ? "X" : "O" );

        if( calculateWinner(this.state.squares) ){
            status = "승자는 : " + calculateWinner(this.state.squares);
        } 

        return (
        <div className="game">
            <div className="game-board">
            <Board 
                squares={this.state.squares}
                onClick={(i) => this.handleClick(i)}
            />
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{/* TODO */}</ol>
            </div>
        </div>
        );
    }
}

function calculateWinner(squares){
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for(let i=0; i<lines.length; i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
