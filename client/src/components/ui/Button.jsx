export function Button({ children, className = "", ...props }) {
    return (
        <button
            style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                fontWeight: "500",
                backgroundColor: "#2563eb",
                color: "white",
                transition: "background-color 0.2s",
                cursor: "pointer",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
            {...props}
        >
            {children}
        </button>
    );
}