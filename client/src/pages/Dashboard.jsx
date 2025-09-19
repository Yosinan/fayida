import { Card, CardContent } from "../components/ui/Card";
import { useEffect, useState } from "react";
import { Calendar, Trophy, Flame } from "lucide-react";
import { getBestStreak, getStreak, fetchStudentDetail } from "../api/api";
import "../styles/dashboard.css";

export default function DashboardPage() {
    const [studentDetail, setStudentDetail] = useState(null);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            fetchStudentDetail(userId)
                .then((res) => setStudentDetail(res.data))
                .catch(() => { });
        }
    }, []);

    useEffect(() => {
        getBestStreak()
            .then((res) => setBestStreak(res.data.count))
            .catch(() => { });
    }, []);

    useEffect(() => {
        getStreak()
            .then((res) => setStreak(res.data.count))
            .catch(() => { });
    }, []);

    return (
        <div className="dashboard">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-inner">
                    <div className="header-left">
                        <div>
                            <img src="https://www.fayidaacademy.com/common_files/main/smallfulllogo.png" alt="Fayida Logo" className="logo-image" />
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="streak-display" onClick={() => setShowModal(true)}>
                            <Flame className="icon-orange" />
                            <span className="streak-count">{streak}</span>
                        </div>
                        <div className="user-avatar">{studentDetail?.name.charAt(0)}</div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            {showModal ? (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="text-center">
                            <h1 className="title">Login Streak</h1>
                            <p className="subtitle">Keep the fire burning!</p>
                            <div className="flame-icon">
                                <Flame className="icon-orange-lg" />
                            </div>

                            {/* Main Streak Circle */}
                            <div className="streak-circle">
                                <div className="circle-inner">
                                    <Flame className="icon-red" />
                                </div>
                                <div className="circle-text">
                                    <div className="streak-number">{streak}</div>
                                    <div className="streak-label">Day Streak</div>
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div className="stats-grid">
                                <Card className="stat-card">
                                    <CardContent className="stat-content">
                                        <div className="stat-icon green">
                                            <Calendar className="icon-white" />
                                        </div>
                                        <div className="stat-value">{streak}</div>
                                        <div className="stat-label">Current Streak</div>
                                    </CardContent>
                                </Card>

                                <Card className="stat-card">
                                    <CardContent className="stat-content">
                                        <div className="stat-icon yellow">
                                            <Trophy className="icon-white" />
                                        </div>
                                        <div className="stat-value">{bestStreak}</div>
                                        <div className="stat-label">Best Streak</div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <main className="dashboard-main">
                    <div className="">
                        <h2>Welcome to Fayida Academy!</h2>
                        <p>Click on the streak in the top-right corner to view your streak details.</p>
                    </div>
                </main>
            )}
        </div>
    );
}