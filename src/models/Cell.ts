import { Colors } from "./Colors";
import { Board } from "./Board";
import { Figure } from "./figures/Figure";

// Класс представляющий ячейку доски
export class Cell {
    readonly x: number; // Координата x ячейки
    readonly y: number; // Координата y ячейки
    readonly color: Colors; // Цвет ячейки (черный или белый)
    figure: Figure | null; // Фигура, которая может находиться в ячейке (или null, если ячейка пуста)
    board: Board; // Доска, к которой принадлежит ячейка
    available: boolean; // Переменная, указывающая, доступна ли ячейка для хода
    id: number; // Уникальный идентификатор ячейки

    // Конструктор класса, инициализирующий свойства ячейки
    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false; // Изначально ячейка недоступна для хода
        this.id = Math.random(); // Устанавливаем уникальный идентификатор для ячейки
    }



    isEmpty(){
        return this.figure === null
    }

    isEnemy(target: Cell): boolean {
        if (target.figure === null) {
            return false
        }
        return this.figure?.color !== target.figure.color
    }

    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) {
            return false
        }

        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);
        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false
            }
        }
        return true
    }

    isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y) {
            return false
        }
        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);
        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false
            }
        }
        return true
    }

    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);
        if (absX !== absY) {
            return false
        }
        const dy = this.y < target.y ? 1 : -1;
        const dx = this.x < target.x ? 1 : -1;

        for(let i = 1; i < absY; i++){
            if(!this.board.getCell(this.x + dx*i, this.y + dy*i).isEmpty()){
                return false
            }
        }
        return true
    }

    setFigure(figure: Figure) {
        this.figure = figure
        this.figure.cell = this
    }

    addLostFigure(figure: Figure) {
        figure.color === Colors.BLACK
            ? this.board.lostBlackFigures.push(figure)
            : this.board.lostWhiteFigures.push(figure)
    }

    moveFigure(target: Cell) {
        if(this.figure && this.figure?.canMove(target)){
            this.figure.moveFigure()
            if (target.figure) {
                this.addLostFigure(target.figure)
            }
            target.setFigure(this.figure)
            this.figure = null
        }
    }
}