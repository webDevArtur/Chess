import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

// Класс, представляющий короля
export class King extends Figure {
    // Конструктор класса, принимающий цвет и ячейку, и вызывающий конструктор родительского класса
    constructor(color: Colors, cell: Cell) {
        super(color, cell);

        // Установка логотипа в зависимости от цвета
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;

        // Установка имени фигуры
        this.name = FigureNames.KING;
    }


    canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false
        }
        // Проверка правил хода для короля
        const deltaX = Math.abs(target.x - this.cell.x);
        const deltaY = Math.abs(target.y - this.cell.y);

        // Король может перемещаться на одну клетку в любом направлении
        if ((deltaX === 1 && deltaY === 0) || (deltaX === 0 && deltaY === 1) || (deltaX === 1 && deltaY === 1)) {
            return true;
        }
        return false
    }

}