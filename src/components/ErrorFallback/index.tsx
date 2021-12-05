import React from "react";
import type { FallbackProps } from "react-error-boundary";

/** Simple fallback component that just reload the page */
const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
    return (
        <div>
            <h2>Opps</h2>
            <button onClick={resetErrorBoundary}>Reset App</button>
        </div>
    );
};

export default ErrorFallback;
