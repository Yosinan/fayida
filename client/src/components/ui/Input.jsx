export function Input({ className = "", ...props }) {
    return (
        <input
            style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                outline: "none",
                transition: "box-shadow 0.2s",
            }}
            onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #3b82f6")}
            onBlur={(e) => (e.target.style.boxShadow = "none")}
            {...props}
        />
    );
}