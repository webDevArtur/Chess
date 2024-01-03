import {FC, useState, useRef, useEffect} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    },[currentPlayer])

    useEffect(() => {
        // Проверка на достижение времени 0 и завершение игры
        if (blackTime === 0 || whiteTime === 0) {
            clearInterval(timer.current!);
            handleGameOver();
            setBlackTime(300)
            setWhiteTime(300)
            restart();
            startTimer()
        }
    }, [blackTime, whiteTime]);

    const handleGameOver = () => {
        // Определение победителя
        if (blackTime === 0 && whiteTime === 0) {
            // Ничья
            alert('Ничья!');
        } else if (blackTime === 0) {
            // Победили белые
            alert('Победили белые!');
        } else {
            // Победили чёрные
            alert('Победили черные!');
        }
    };

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1)
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1)
    }

    const handleRestart = () => {
        setBlackTime(300)
        setWhiteTime(300)
        restart()
    }

    return (
        <div className='timer'>
            <div>
                <button onClick={() => {handleRestart()}} className='restart-btn'>
                    Перезапуск игры
                </button>
            </div>
            <h2 className='timer-header'>Чёрные - {blackTime}</h2>
            <h2 className='timer-header'>Белые - {whiteTime}</h2>
        </div>
    );
};

export default Timer;