import logo from '../../assets/black-king.png';
import {Colors} from "../Colors";
import {Cell} from "../Cell.ts";

// Перечисление для имен фигур
export enum FigureNames {
    FIGURE = 'фигура',
    KING = 'король',
    KNIGHT = 'конь',
    PAWN = 'пешка',
    QUEEN = 'ферзь',
    ROOK = 'ладья',
    BISHOP = 'слон',
}

// Абстрактный класс, представляющий фигуру
export class Figure {
    color: Colors; // Цвет фигуры
    logo: typeof logo | null; // Логотип фигуры
    cell: Cell; // Ячейка, в которой находится фигура
    name: FigureNames; // Имя фигуры
    id: number; // Уникальный идентификатор фигуры

    // Конструктор класса, принимающий цвет и ячейку, и инициализирующий свойства фигуры
    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this; // Установка ссылки на текущую фигуру в свойство ячейки
        this.logo = null; // Изначально логотип не установлен
        this.name = FigureNames.FIGURE; // Изначально имя установлено как "фигура"
        this.id = Math.random(); // Генерация уникального идентификатора фигуры
    }

    // Метод, определяющий возможность хода фигуры в заданную ячейку (заглушка, нужно реализовать для каждой фигуры)
    canMove(target: Cell): boolean {
        if(target.figure?.color === this.color){
            return false
        }
        if(target.figure?.name === FigureNames.KING){
            return false
        }
        return true
    }



    // Обновленный метод для перемещения фигуры в заданную ячейку
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    moveFigure(_target: Cell){

    }
}