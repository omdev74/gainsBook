import React, { useEffect, useState } from "react";

interface WorkoutTimerProps {
  startDate: string; // ISO string or timestamp string
}

const WorkoutTimer: React.FC<WorkoutTimerProps> = ({ startDate }) => {
  const [elapsed, setElapsed] = useState(0); // in seconds

  useEffect(() => {
    const startTime = new Date(startDate).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diffInSeconds = Math.floor((now - startTime) / 1000);
      setElapsed(diffInSeconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <span className="text-xl font-bold text-foreground">
      {formatTime(elapsed)}
    </span>
  );
};

export default WorkoutTimer;
