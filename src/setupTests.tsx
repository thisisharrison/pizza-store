// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from "react";
import "@testing-library/jest-dom";
import { render as rtlrender } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { OrderProvider } from "./context/order";

function render(ui: React.ReactElement, { ...options }: Record<string, any> = {}) {
    const Wrapper = ({ children }: { children?: React.ReactNode }) => (
        <OrderProvider>
            <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
        </OrderProvider>
    );

    return rtlrender(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
export { render };
