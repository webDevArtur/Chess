import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-queen.png";
import whiteLogo from "../../assets/white-queen.png";

// Класс, представляющий королеву
export class Queen extends Figure {
    // Конструктор класса, принимающий цвет и ячейку, и вызывающий конструктор родительского класса
    constructor(color: Colors, cell: Cell) {
        super(color, cell);

        // Установка логотипа в зависимости от цвета
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;

        // Установка имени фигуры
        this.name = FigureNames.QUEEN;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false
        }
        if (this.cell.isEmptyVertical(target)) {
            return true
        }
        if (this.cell.isEmptyHorizontal(target)) {
            return true
        }
        if (this.cell.isEmptyDiagonal(target)) {
            return true
        }
        return false
    }

}