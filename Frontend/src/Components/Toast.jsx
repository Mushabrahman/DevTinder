import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const toastContainerStyle = {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 9999,
};

const toastStyle = {
    background: "rgba(0,0,0,0.8)",
    color: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: "200px",
    maxWidth: "300px",
    opacity: 0,
    transform: "translateY(-20px)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
};

const toastVisibleStyle = {
    opacity: 1,
    transform: "translateY(0)",
};

export default function Toast({ message, onClose, duration = 3000 }) {
    // we manage mounting/unmounting + animation
    const [visible, setVisible] = React.useState(false);

    useEffect(() => {
        // show it (animate in)
        setVisible(true);

        // auto close after duration
        const timerId = setTimeout(() => {
            handleClose();
        }, duration);

        return () => {
            clearTimeout(timerId);
        };
    }, []);

    const handleClose = () => {
        // animate out
        setVisible(false);
        // after animation time, call onClose to unmount
        setTimeout(() => {
            onClose();
        }, 300); // should match the CSS transition duration
    };

    return createPortal(
        <div style={toastContainerStyle}>
            <div
                style={{
                    ...toastStyle,
                    ...(visible ? toastVisibleStyle : {}),
                }}
            >
                <span>{message}</span>
                <button
                    onClick={handleClose}
                    style={{
                        marginLeft: "12px",
                        background: "transparent",
                        border: "none",
                        color: "white",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    ×
                </button>
            </div>
        </div>,
        document.body
    );
}
