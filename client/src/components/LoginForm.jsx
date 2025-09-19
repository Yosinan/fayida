import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
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
        <div className="card shadow border-0 rounded-4">
            <div className="card-body p-5">
                <h2 className="text-center mb-4 fw-bold">Login</h2>

                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <Mail size={18} />
                            </span>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <Lock size={18} />
                            </span>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                {/* Additional Options */}
                <div className="text-center mt-4">
                    <a href="#" className="text-decoration-none">Forgot password?</a>
                </div>
            </div>
        </div>
    );
}