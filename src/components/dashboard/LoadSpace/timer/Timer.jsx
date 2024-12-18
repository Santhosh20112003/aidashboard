import React, { useState, useRef } from 'react';

function Timer() {
    const [time, setTime] = useState({ minutes: 0, seconds: 0 });
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => {
                    let { minutes, seconds } = prevTime;
                    seconds += 1;
                    if (seconds === 60) {
                        minutes += 1;
                        seconds = 0;
                    }
                    return { minutes, seconds };
                });
            }, 1000);
        }
    };

    const stopTimer = () => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <h1 className="text-4xl font-bold">
                {String(time.minutes).padStart(2, '0')}:
                {String(time.seconds).padStart(2, '0')}
            </h1>
            <div className="flex gap-2">
                <button
                    onClick={startTimer}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Start
                </button>
                <button
                    onClick={stopTimer}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Stop
                </button>
            </div>
        </div>
    );
}

export default Timer;
