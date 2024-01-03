import {FC} from 'react';
import {Figure} from '../models/figures/Figure';

interface LostFiguresProps {
    title: string
    figures: Figure[]
    isBlack?: boolean;
}

const LostFigures: FC<LostFiguresProps> = ({title, figures , isBlack}) => {

    return (
        <div className={`lost${isBlack ? '-black' : '-white'}`}>
            <h3>{title}</h3>
            {figures.map(figure =>
                <div key={figure.id} className='lost-figures'>
                    {figure.name}{figure.logo && <img width={20} height={20} src={figure.logo}/>}
                </div>
            )}
        </div>
    );
};

export default LostFigures;