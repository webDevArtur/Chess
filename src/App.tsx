import './App.css';
import BoardComponent from './components/BoardComponent';
import { useState, useEffect } from 'react';
import { Board } from './models/Board';
import { Player } from "./models/Player.ts";
import { Colors } from './models/Colors';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';

function App() {
    const [board, setBoard] = useState(new Board());
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(() => {
        restart();
        setCurrentPlayer(new Player(Colors.WHITE));
    }, []);

    const restart = () => {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    };

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? new Player(Colors.BLACK) : new Player(Colors.WHITE));
    }

    return (
        <div className='app'>
            <div className='lost-container'>
                <Timer
                    restart={restart}
                    currentPlayer={currentPlayer}
                />
                <div className='mobile-lost-container'>
                    <LostFigures
                        title='Черные фигуры'
                        figures={board.lostBlackFigures}
                        isBlack={true}
                    />
                    <LostFigures
                        title='Белые фигуры'
                        figures={board.lostWhiteFigures}
                        isBlack={false}
                    />
                </div>
            </div>
            <BoardComponent
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
            />
        </div>
    );
}

export default App;
