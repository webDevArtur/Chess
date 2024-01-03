import { FC } from "react";
import { Cell } from "../models/Cell.ts";

// Определение интерфейса для пропсов компонента CellComponent
interface CellProps {
    cell: Cell; // Пропс cell должен быть объектом типа Cell
    selected: boolean; // Пропс selected - булевое значение, показывающее, выбрана ли ячейка
    click: (cell: Cell) => void; // Пропс click - функция клика по ячейке
}

// Функциональный компонент CellComponent, принимающий пропсы типа CellProps
const CellComponent: FC<CellProps> = ({ cell, selected , click}) => {
    return (
        // Возвращаем JSX элемент, представляющий ячейку доски
        <div className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
        onClick={() => click(cell)}
        style={{background: cell.available && cell.figure ? 'green' : ''}}
        >
            {cell.available && !cell.figure && <div className="available"></div>}
            {cell.figure && <img src={cell.figure.logo} alt="" />}
        </div>
    );
};

export default CellComponent;
