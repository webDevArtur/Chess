import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-bishop.png";
import whiteLogo from "../../assets/white-bishop.png";


// Класс, представляющий слона
export class Bishop extends Figure {
    // Конструктор класса, принимающий цвет и ячейку, и вызывающий конструктор родительского класса
    constructor(color: Colors, cell: Cell) {
        super(color, cell);

        // Установка логотипа в зависимости от цвета
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;

        // Установка имени фигуры
        this.name = FigureNames.BISHOP;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false
        }
        if (this.cell.isEmptyDiagonal(target)) {
            return true
        }
        return false
    }
}