import React, {FC, useEffect, useState} from "react";
import { Board } from "../models/Board.ts";
import CellComponent from "./CellComponent.tsx";
import {Cell} from "../models/Cell.ts";
import {Player} from "../models/Player.ts";

interface BoardProps {
    board: Board; // Пропс board должен быть объектом типа Board
    setBoard: (board: Board) => void; // Пропс setBoard - функция установки нового состояния доски
    currentPlayer: Player | null; // Пропс currentPlayer - текущий игрок
    swapPlayer: () => void;
}

// Функциональный компонент BoardComponent, принимающий пропсы типа BoardProps
const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {
    const [selectCell, setSelectCell] = useState<Cell | null>(null);

    function click(cell: Cell) {
        if (selectCell && selectCell !== cell && selectCell.figure?.canMove(cell)) {
            selectCell.moveFigure(cell)
            swapPlayer()
            setSelectCell(null)
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectCell(cell)
            }
        }

    }

    useEffect(() => {
        highlightCells()
    }, [selectCell])

    function highlightCells(){
        board.highlightCells(selectCell)
        updateBoard()
    }

    function updateBoard(){
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
        <div>
            <h1 className='player'>Текущий игрок : {currentPlayer?.color}</h1>
        <div className='board'>
            {/* Маппинг по каждой строке доски */}
            {board.cells.map((row, index) => (
                // Используем React.Fragment для группировки элементов без добавления лишних элементов в DOM
                <React.Fragment key={index}>
                    {/* Маппинг по каждой ячейке в текущей строке */}
                    {row.map((cell) => (
                        // Вставляем компонент ячейки, передавая ему необходимые пропсы
                        <CellComponent
                            click={click}
                            cell={cell}
                            key={cell.id}
                            selected={cell.x === selectCell?.x && cell.y === selectCell?.y}
                        />
                    ))}
                </React.Fragment>
            ))}
        </div>
        </div>
    );
};

export default BoardComponent;
