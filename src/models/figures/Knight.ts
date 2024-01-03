import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-knight.png";
import whiteLogo from "../../assets/white-knight.png";

// Класс, представляющий коня
export class Knight extends Figure {
    // Конструктор класса, принимающий цвет и ячейку, и вызывающий конструктор родительского класса
    constructor(color: Colors, cell: Cell) {
        super(color, cell);

        // Установка логотипа в зависимости от цвета
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;

        // Установка имени фигуры
        this.name = FigureNames.KNIGHT;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false
        }
        const dx = Math.abs(this.cell.x - target.x)
        const dy = Math.abs(this.cell.y - target.y)


        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1)
    }
}