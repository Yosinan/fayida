import { useState } from "react";
import { signup } from "../api/api";
import { useNavigate as navigator } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import "../styles/signup.css";

export default function SignUpPage() {
    const navigate = navigator();
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
            alert("Passwords do not match!");
            return;
        }
        if (!formData.agreeToTerms) {
            alert("You must agree to the terms before signing up.");
            return;
        }
        try {
            await signup({
                email: formData.email,
                password: formData.password,
                firstName: formData.first_name,
                lastName: formData.last_name,
            });
            navigate("/login");
        } catch (err) {
            console.error("Signup error:", err);
            alert("Signup failed. Please try again.");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-wrapper">
                {/* Logo + Header */}
                <div className="signup-header">
                    <div>
                        <img src="https://www.fayidaacademy.com/common_files/main/smallfulllogo.png" alt="Fayida Logo" className="logo-image" />
                    </div>
                    <h1>Fayida Academy</h1>
                    <p>Join us today and start learning!</p>
                </div>

                {/* Form Card */}
                <div className="signup-card">
                    <form onSubmit={handleSubmit} className="signup-form">
                        {/* First + Last Name */}
                        <div className="form-row">
                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    placeholder="First name"
                                    value={formData.first_name}
                                    onChange={(e) => handleInputChange("first_name", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Last name"
                                    value={formData.last_name}
                                    onChange={(e) => handleInputChange("last_name", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-icon">
                                <Mail className="icon" size={18} />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-icon">
                                <Lock className="icon" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create Password"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <div className="input-icon">
                                <Lock className="icon" size={18} />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-btn"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="form-terms">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={formData.agreeToTerms}
                                onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                            />
                            <label htmlFor="terms">
                                I agree to the{" "}
                                <a href="#">Terms of Service</a> and{" "}
                                <a href="#">Privacy Policy</a>
                            </label>
                        </div>

                        {/* Submit */}
                        <button type="submit" className="submit-btn">
                            Create Account
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className="signup-footer">
                    <p>© 2024 Fayida Academy. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
