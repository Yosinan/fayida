import SignupForm from "../components/SignupForm";
import { Link } from "react-router-dom";

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                {/* <h1 className="text-3xl font-bold text-center mb-6">Create an Account</h1> */}
                <SignupForm />
            </div>
        </div>
    );
}
