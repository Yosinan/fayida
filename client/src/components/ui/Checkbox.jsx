export function Checkbox({ className = "", ...props }) {
    return (
        <input
            type="checkbox"
            style={{
                width: "1rem",
                height: "1rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.25rem",
                appearance: "none",
                backgroundColor: "white",
                cursor: "pointer",
                transition: "background-color 0.2s, border-color 0.2s",
            }}
            onFocus={(e) => {
                e.target.style.outline = "2px solid #3b82f6";
                e.target.style.outlineOffset = "2px";
            }}
            onBlur={(e) => {
                e.target.style.outline = "none";
            }}
            onChange={(e) => {
                if (e.target.checked) {
                    e.target.style.backgroundColor = "#3b82f6";
                    e.target.style.borderColor = "#3b82f6";
                } else {
                    e.target.style.backgroundColor = "white";
                    e.target.style.borderColor = "#d1d5db";
                }
            }}
            {...props}
        />
    );
}