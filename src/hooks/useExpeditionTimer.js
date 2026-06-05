import { useEffect, useState } from "react";

export default function useExpeditionTimer(expedition) {
    const [progress, setProgress] = useState(0);
    const [remainingTime, setRemainingTime] = useState("");
    const [finished, setFinished] = useState(false);
    useEffect(() => {
        if (!expedition) return;
        const interval = setInterval(() => {
            const startDate =
                new Date(expedition.date);
            const endDate =
                new Date(expedition.endDate);
            const now =
                new Date();
            const totalDuration =
                endDate - startDate;
            const elapsed =
                now - startDate;
            let percent =
                (elapsed / totalDuration) * 100;
            percent =
                Math.max(
                    0,
                    Math.min(100, percent)
                );
            setProgress(percent);
            const remaining =
                endDate - now;
            if (remaining <= 0) {
                setFinished(true);
                setRemainingTime("");
                clearInterval(interval);
                return;
            }
            const hours =
                Math.floor(
                    remaining / 1000 / 60 / 60
                );
            const minutes =
                Math.floor(
                    (remaining / 1000 / 60) % 60
                );
            const seconds =
                Math.floor(
                    (remaining / 1000) % 60
                );
            setRemainingTime(
                `${hours}h ${minutes}m ${seconds}s`
            );
        }, 1000);
        return () =>
            clearInterval(interval);
    }, [expedition]);
    return {
        progress,
        remainingTime,
        finished
    };
}