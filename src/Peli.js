import React, {Component} from 'react';
import './Peli.css';




const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

class Peli extends Component {
    constructor(){
        super();

        this.rows = HEIGHT / CELL_SIZE;
        this.cols = WIDTH / CELL_SIZE;
        this.board = this.makeEmptyBoard();
    }
    state = {
        cells: [],
        interval: 100,
        isRunning: false,
    }

    makeEmptyBoard() {
        let board = [];
        for (let y = 0; y< this.rows; y++){
            board[y] = [];
            for (let x = 0; x < this.cols; x++){
                board[y][x]= false;
            }
        }
        return board;
    }

    makeCells() {
        let cells = [];
        for (let y = 0; y < this.rows; y++){
            for (let x = 0; x < this.cols; x++){
                if (this.board[y][x]){
                    cells.push({x, y});
                }
            }
        }
        return cells;
    }
    getElementOffset(){
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;
        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }
    handleClick = (event) => {
        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);
        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows){
            this.board[y][x] = !this.board[y][x];
        }
        this.setState({ cells: this.makeCells()});
    }
    runGame = () => {
        this.setState({isRunning: true});
        this.runIteration();
    };

    stopGame = () => {
        this.setState({isRunning: false});
        if (this.timeoutHandler){
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    };

    runIteration() {
        console.log('running iteration');
        let newBoard = this.makeEmptyBoard();
        for (let y = 0; y < this.rows; y++){
            for (let x = 0; x < this.cols; x ++){
                let neighours = this.calculateNeighbours(this.board, x, y);
                if (this.board[y][x]) {
                    if (neighours === 2 || neighours === 3) {
                        newBoard[y][x] = true;
                    }else{
                        newBoard[y][x] = false;
                    }
                }else{
                    if (!this.board[y][x]&& neighours === 3){
                        newBoard[y][x] = true;
                    }
                }
            }
        }
        this.board = newBoard;
        this.setState({ cells: this.makeCells()});
        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration();
        }, this.state.interval);
    }


    handleIntervalChange = (event) => {
        this.setState({interval: event.target.value });
    };

    calculateNeighbours(board, x, y) {
        let neighbours = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
                neighbours++;
            }
        }

        return neighbours;
    }
    reloadPage() {
        window.location.reload()
    }
    render() {
        const { cells } = this.state;
        return(
            <div>

            <div className="Board"
                 style={{width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
                 onClick={this.handleClick} ref={(n) => {
                this.boardRef = n;
            }}>
                {cells.map(cell => (
                    <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                ))}
            </div>
            <div className="controls">
                Pelin päivitysnopeus <input value={this.state.interval}
                                    onChange={this.handleIntervalChange}/> millisekuntia
                {this.isRunning ? <button className="button" onClick={this.stopGame}>STOP</button> :
                    <button className="aloitabutton" onClick={this.runGame}>PELAA</button>}
                <button className="alustabutton" onClick={() => this.reloadPage()}>ALOITA ALUSTA</button>
            </div>
            </div>
            );
        }

} export default Peli;

class Cell extends Component {
    render() {
        const {x, y} = this.props;
        return (
            <div className="Cell" style={{ left: `${CELL_SIZE * x + 1}px`, top: `${CELL_SIZE * y + 1}px`, width: `${CELL_SIZE - 1}px`, height: `${CELL_SIZE - 1}px`,
            }} ></div> )
    }
}

