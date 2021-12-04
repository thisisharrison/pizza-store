import React from "react";
import ReactDOM from "react-dom";
import { OrderProvider } from "./context/order";
import App from "./module";
import { HashRouter } from "react-router-dom";
import "./index.scss";

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <React.StrictMode>
            <HashRouter>
                <OrderProvider>
                    <App />
                </OrderProvider>
            </HashRouter>
        </React.StrictMode>,
        document.getElementById("root")
    );
});
