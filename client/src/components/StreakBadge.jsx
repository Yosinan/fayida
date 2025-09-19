import { useEffect, useState } from "react";
import { getStreak } from "../api/api";

export default function StreakBadge() {
    const [streak, setStreak] = useState(0);
    console.log("Current streak:", streak);

    useEffect(() => {
        getStreak().then((res) => setStreak(res.data.count)).catch(() => { });
    }, []);

    return (
        <div className="fixed bottom-4 right-4 bg-yellow-200 text-yellow-900 px-4 py-2 rounded-full shadow">
            🔥 {streak} day streak
        </div>
    );
}
