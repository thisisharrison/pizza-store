import React from "react";
import ReactDOM from "react-dom";
import App from "./module";
import { HashRouter } from "react-router-dom";
import "./index.scss";

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <React.StrictMode>
            <HashRouter>
                <App />
            </HashRouter>
        </React.StrictMode>,
        document.getElementById("root")
    );
});
