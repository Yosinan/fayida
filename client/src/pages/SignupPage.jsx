import { useState } from "react";
import { signup } from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import Toaster, { showToast } from "../components/Toaster";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export default function SignupPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            showToast("error", "Passwords do not match.");
            return;
        }
        if (!formData.agreeToTerms) {
            showToast("error", "You must agree to the terms before signing up.");
            return;
        }
        try {
            await signup({
                email: formData.email,
                password: formData.password,
                firstName: formData.first_name,
                lastName: formData.last_name,
            });
            showToast("success", "Signup successful! Please log in.");
            navigate("/login");
        } catch (err) {
            console.error("Signup error:", err);
            showToast("error", "Signup failed. Please try again.");
        }
    };

    return (
        <>
            {/* Toaster Component */}
            <Toaster />
            <div className="min-vh-100 bg-light d-flex align-items-center py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6">
                            {/* Card */}
                            <div className="card shadow border-0 rounded-4">
                                <div className="card-body p-5">
                                    {/* Header */}
                                    <div className="text-center mb-4">
                                        <img
                                            src="https://www.fayidaacademy.com/common_files/main/smallfulllogo.png"
                                            alt="Fayida Logo"
                                            className="img-fluid mb-3"
                                            style={{ maxHeight: '60px' }}
                                        />
                                        <h2 className="card-title fw-bold">Fayida Academy</h2>
                                        <p className="text-muted">Join us today and start learning!</p>
                                    </div>

                                    <h5 className="text-center mb-4">Create an Account</h5>

                                    {/* Form */}
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="firstName" className="form-label">First Name</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <User size={18} />
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="firstName"
                                                        placeholder="First name"
                                                        value={formData.first_name}
                                                        onChange={(e) => handleInputChange("first_name", e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <User size={18} />
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="lastName"
                                                        placeholder="Last name"
                                                        value={formData.last_name}
                                                        onChange={(e) => handleInputChange("last_name", e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

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
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <Lock size={18} />
                                                </span>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className="form-control"
                                                    id="password"
                                                    placeholder="Create Password"
                                                    value={formData.password}
                                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <Lock size={18} />
                                                </span>
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    className="form-control"
                                                    id="confirmPassword"
                                                    placeholder="Confirm Password"
                                                    value={formData.confirmPassword}
                                                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="terms"
                                                    checked={formData.agreeToTerms}
                                                    onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                                                />
                                                <label className="form-check-label" htmlFor="terms">
                                                    I agree to the <a href="#" className="text-decoration-none">Terms of Service</a> and <a href="#" className="text-decoration-none">Privacy Policy</a>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="d-grid mb-4">
                                            <button type="submit" className="btn btn-primary btn-lg">
                                                Create Account
                                            </button>
                                        </div>
                                    </form>

                                    <div className="text-center">
                                        <p className="mb-0">
                                            Already have an account?{" "}
                                            <Link to="/login" className="text-decoration-none">
                                                Log in
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="text-center mt-4">
                                <p className="text-muted small">© 2025 Fayida Academy. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}