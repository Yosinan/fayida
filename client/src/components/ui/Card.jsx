export function Card({ children, className = "" }) {
    return (
        <div
            style={{
                backgroundColor: "white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
            }}
        >
            {children}
        </div>
    );
}

export function CardContent({ children, className = "" }) {
    return <div style={{ marginTop: "0.5rem" }}>{children}</div>;
}