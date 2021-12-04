import React from "react";
import ReactDOM from "react-dom";
import { AppProvider } from "./context";
import App from "./module";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <AppProvider>
                    <App />
                </AppProvider>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById("root")
    );
});
