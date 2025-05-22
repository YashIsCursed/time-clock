'use client'
import { useEffect, useRef, useState } from "react";

const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
    };
};

export default function Stopwatch() {
    const [milliseconds, setMilliseconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        if (isRunning) {
            startTimeRef.current = Date.now() - milliseconds;

            intervalRef.current = setInterval(() => {
                setMilliseconds(Date.now() - startTimeRef.current);
            }, 10);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
        document.addEventListener('keydown',(e)=>{
            if(e.key === ' ')handleStartStop()
            if(e.key === 'l')handleLap()
            if(e.key === 'l' && e.ctrlKey)handleResetLaps()
            if(e.key === 'r')handleReset()
        });

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            document.removeEventListener('keydown',()=>{});
        };
    }, [isRunning, milliseconds]);

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setMilliseconds(0);
        handleResetLaps()

    };

    const [laps, setLaps] = useState<number[]>([]);
    const handleLap = () => {
        if (isRunning) {
            setLaps(prevLaps => [...prevLaps, milliseconds]);
        }
    }
    const handleResetLaps = () => {
        setLaps([]);
    }

    const displayTime = formatTime(milliseconds);

    let startStopButtonText: string;
    if (isRunning) {
        startStopButtonText = "Stop";
    } else {
        if (milliseconds === 0) {
            startStopButtonText = "Start";
        } else {
            startStopButtonText = "Resume";
        }
    }

    return (
        <div className="w-full h-full flex flex-col md:flex-row p-4">
            <div className="h-auto md:h-full flex-grow md:flex-3 justify-center items-center flex flex-col gap-8 py-8">
                <div className='text-5xl sm:text-7xl font-bold relative text-[#e1e1e1] w-max h-max flex justify-evenly items-center gap-2 sm:gap-4'>
                    <p>{displayTime.hours}</p>:<p>{displayTime.minutes}</p>:<p>{displayTime.seconds}</p>
                </div>

                <div className="flex flex-row gap-4">
                    <button
                        onClick={handleStartStop}
                        className="p-3 sm:p-4 bg-[#fff2] rounded-xl sm:rounded-3xl text-xl sm:text-2xl border-white/50 border-2 min-w-[100px] sm:min-w-[120px]"
                    >
                        {startStopButtonText}
                    </button>
                    <button
                        onClick={handleReset}
                        disabled={milliseconds === 0 && !isRunning}
                        className="p-3 sm:p-4 bg-[#fff2] rounded-xl sm:rounded-3xl text-xl sm:text-2xl border-white/50 border-2 min-w-[100px] sm:min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Reset
                    </button>
                    {(isRunning || laps.length > 0) && (
                        <button
                            onClick={isRunning ? handleLap : handleResetLaps}
                            disabled={!isRunning && laps.length === 0}
                            className="p-3 sm:p-4 bg-[#fff2] rounded-xl sm:rounded-3xl text-xl sm:text-2xl border-white/50 border-2 min-w-[100px] sm:min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isRunning ? "Lap" : (laps.length > 0 ? "Clear Laps" : "Lap")}
                        </button>
                    )}
                </div>
            </div>
            <div className="flex-1 mt-8 md:mt-0 md:ml-4 p-4 bg-[#fff1] rounded-lg max-h-[300px] md:max-h-full overflow-y-auto">
                <h3 className="text-2xl font-semibold text-[#e1e1e1] mb-2">Laps:</h3>
                {laps.length === 0 ? (
                    <p className="text-[#c1c1c1]">No laps recorded yet.</p>
                ) : (
                    <ol className="list-decimal list-inside text-[#e1e1e1]">
                        {laps.map((lapTime, index) => {
                            const formattedLap = formatTime(lapTime - (laps[index - 1] || 0));
                            const formattedTotal = formatTime(lapTime);
                            return (
                                <li key={index} className="py-1 border-b border-white/20 last:border-b-0">
                                    Lap {index + 1}: {formattedLap.minutes}:{formattedLap.seconds}
                                    <span className="text-sm text-[#aaa] ml-2">(Total: {formattedTotal.hours}:{formattedTotal.minutes}:{formattedTotal.seconds})</span>
                                </li>
                            );
                        })}
                    </ol>
                )}
            </div>
        </div>
    );
}