import React from "react";
import ReactDOM from "react-dom";

export const Toast = () => {
    return <div></div>;
};

export function createToast(message: string, status: "success" | "warning" | "error") {
    const node = document.createElement("div");
    document.body.appendChild(node);
    ReactDOM.render(<Toast />, node);
    setTimeout(() => {
        document.body.removeChild(node);
    }, 2000);
}
