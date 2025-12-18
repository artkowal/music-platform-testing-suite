/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, CheckCircle2, Clock } from "lucide-react";
import { lessonsApi } from "@/api/lessons";
import { cn } from "@/lib/utils";

interface Props {
  lessonId: number;
  initialTime: number;
  isCompletedInitial: boolean;
  accentColor: string;
}

export function LessonTimerMinimal({
  lessonId,
  initialTime,
  isCompletedInitial,
  accentColor,
}: Props) {
  const [seconds, setSeconds] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(isCompletedInitial);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  const saveProgress = async (finished = false) => {
    try {
      await lessonsApi.updateProgress(lessonId, seconds, finished);
      if (finished) setIsCompleted(true);
    } catch (err) {
      console.error("Błąd zapisu czasu", err);
    }
  };

  const toggleTimer = () => {
    if (isActive) {
      setIsActive(false);
      saveProgress(false);
    } else {
      setIsActive(true);
    }
  };

  const handleComplete = () => {
    setIsActive(false);
    saveProgress(true);
  };

  return (
    <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm border rounded-lg p-1.5 shadow-sm">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-md min-w-[100px] justify-center">
        <Clock
          className={cn("h-4 w-4", isActive && "animate-pulse text-primary")}
        />
        <span className="font-mono font-bold text-lg tabular-nums">
          {/* Użycie funkcji helpera */}
          {formatTime(seconds)}
        </span>
      </div>

      <div className="h-8 w-px bg-border mx-1" />

      <Button
        variant={isActive ? "secondary" : "outline"}
        size="icon"
        className="h-9 w-9"
        onClick={toggleTimer}
        title={isActive ? "Pauza" : "Start"}
        style={isActive ? { color: accentColor, borderColor: accentColor } : {}}
      >
        {isActive ? (
          <Pause className="h-4 w-4 fill-current" />
        ) : (
          <Play className="h-4 w-4 fill-current ml-0.5" />
        )}
      </Button>

      {!isCompleted ? (
        <Button
          className="h-9 gap-2 px-3"
          onClick={handleComplete}
          style={{ backgroundColor: accentColor }}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span className="text-xs font-semibold">Oznacz jako wykonaną</span>
        </Button>
      ) : (
        <div className="flex items-center gap-1.5 px-3 text-primary font-medium">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm">Ukończono</span>
        </div>
      )}
    </div>
  );
}

// WAŻNE: Funkcja wyeksportowana POZA komponentem (na samym dole)
export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};