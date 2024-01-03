import './App.css';
import BoardComponent from './components/BoardComponent';
import { useState, useEffect } from 'react';
import { Board } from './models/Board';
import { Player } from "./models/Player.ts";
import { Colors } from './models/Colors';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';

function App() {
    // Состояние, хранящее текущее состояние доски
    const [board, setBoard] = useState(new Board());
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    // Эффект, вызывающий функцию restart при монтировании компонента
    useEffect(() => {
        restart();
        setCurrentPlayer(whitePlayer);
    }, []);

    // Функция restart, инициализирующая новую доску и устанавливающая ее в состояние
    const restart = () => {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    };

    // Функция для смены текущего игрока
    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
    }

    // Отображение компонента App
    return (
        <div className='app'>
            <div className='lost-container'>
                {/* Вставка компонента Timer с передачей функции restart и текущего игрока */}
                <Timer
                    restart={restart}
                    currentPlayer={currentPlayer}
                />
                <div className='mobile-lost-container'>
                    {/* Вставка компонента LostFigures для черных фигур */}
                    <LostFigures
                        title='Черные фигуры'
                        figures={board.lostBlackFigures}
                        isBlack={true}
                    />
                    {/* Вставка компонента LostFigures для белых фигур */}
                    <LostFigures
                        title='Белые фигуры'
                        figures={board.lostWhiteFigures}
                        isBlack={false}
                    />
                </div>
            </div>

            {/* Вставка компонента BoardComponent с передачей состояния доски и функции установки состояния */}
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
