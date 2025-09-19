import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
    const { loginUser } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(form);
            navigate("/dashboard");
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-white shadow rounded space-y-4">
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border rounded p-2"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border rounded p-2"
                required
            />
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
                Sign In
            </button>
        </form>
    );
}
