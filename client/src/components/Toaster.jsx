import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

const Toaster = () => {
    const [toasts, setToasts] = useState([]);

    // Listen for custom toast events
    useEffect(() => {
        const handleToast = (event) => {
            const { type, message, duration = 5000 } = event.detail;
            addToast(type, message, duration);
        };

        window.addEventListener('showToast', handleToast);
        return () => window.removeEventListener('showToast', handleToast);
    }, []);

    const addToast = (type, message, duration) => {
        const id = Date.now();
        const newToast = { id, type, message };

        setToasts(prev => [...prev, newToast]);

        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <div className="toaster-container position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`toast show mb-2 ${toast.type === 'success' ? 'bg-success' : 'bg-danger'}`}
                    role="alert"
                >
                    <div className="toast-header">
                        {toast.type === 'success' ? (
                            <CheckCircle size={18} className="text-success me-2" />
                        ) : (
                            <AlertCircle size={18} className="text-danger me-2" />
                        )}
                        <strong className="me-auto">
                            {toast.type === 'success' ? 'Success' : 'Error'}
                        </strong>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => removeToast(toast.id)}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="toast-body text-white">
                        {toast.message}
                    </div>
                </div>
            ))}
        </div>
    );
};

// Helper function to show toasts
export const showToast = (type, message, duration = 5000) => {
    const event = new CustomEvent('showToast', {
        detail: { type, message, duration }
    });
    window.dispatchEvent(event);
};

export default Toaster;