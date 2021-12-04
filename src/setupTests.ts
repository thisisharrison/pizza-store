// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { render as rtlrender } from "@testing-library/react";
import { OrderProvider } from "./context/order";
import type React from "react";

function render(ui: React.ReactElement, { ...options }: Record<string, any> = {}) {
    return rtlrender(ui, { wrapper: OrderProvider, ...options });
}

export * from "@testing-library/react";
export { render };
