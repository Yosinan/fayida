import { useEffect, useState } from "react";
import { getBestStreak } from "../api/api";

export default function BestStreakBadge() {
    const [bestStreak, setBestStreak] = useState(0);
    console.log("Current best streak:", bestStreak);

    useEffect(() => {
        getBestStreak().then((res) => setBestStreak(res.data.count)).catch(() => { });
    }, []);

    return (
        <div className="fixed bottom-4 right-4 bg-yellow-200 text-yellow-900 px-4 py-2 rounded-full shadow">
            🔥 {bestStreak} best streak
        </div>
    );
}
