import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
    const { loginUser } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await loginUser(form);
            navigate("/dashboard");
        } catch (err) {
            alert("Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid px-0 min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="row w-100 justify-content-center mx-0">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 px-0">
                    <div className="card shadow border-0 rounded-0 rounded-top-3 rounded-md-4 mx-2">
                        <div className="card-body p-3 p-sm-4 p-md-5">
                            {/* Header with Logo */}
                            <div className="text-center mb-4">
                                <img
                                    src="https://www.fayidaacademy.com/common_files/main/smallfulllogo.png"
                                    alt="Fayida Academy Logo"
                                    className="img-fluid mb-3"
                                    style={{ maxHeight: '50px' }}
                                />
                                <h2 className="h3 fw-bold mb-2">Welcome Back</h2>
                                <p className="text-muted">Sign in to continue your learning journey</p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Email Input */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                                    <div className="input-group input-group-lg">
                                        <span className="input-group-text bg-transparent">
                                            <Mail size={20} className="text-muted" />
                                        </span>
                                        <input
                                            type="email"
                                            className="form-control border-start-0"
                                            id="email"
                                            placeholder="Enter your email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label htmlFor="password" className="form-label fw-semibold">Password</label>
                                        <Link to="/forgot-password" className="text-decoration-none small">
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <div className="input-group input-group-lg">
                                        <span className="input-group-text bg-transparent">
                                            <Lock size={20} className="text-muted" />
                                        </span>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control border-start-0 pe-5"
                                            id="password"
                                            placeholder="Enter your password"
                                            value={form.password}
                                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                                            required
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-link text-muted position-absolute end-0 top-0 bottom-0 d-flex align-items-center z-1"
                                            style={{ zIndex: 1 }}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me Checkbox */}
                                <div className="mb-4 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="rememberMe"
                                    />
                                    <label className="form-check-label" htmlFor="rememberMe">
                                        Remember me
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <div className="d-grid mb-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg py-2 fw-semibold"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Signing in...
                                            </>
                                        ) : (
                                            "Sign In"
                                        )}
                                    </button>
                                </div>
                            </form>

                            {/* Sign Up Link */}
                            <div className="text-center">
                                <p className="mb-0">
                                    Don't have an account?{" "}
                                    <Link to="/signup" className="text-decoration-none fw-semibold">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}