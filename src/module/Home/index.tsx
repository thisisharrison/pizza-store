import React from "react";
import { useAppContext } from "../../context";

export default function Home() {
    // React
    const [state] = useAppContext();

    return (
        <div>
            <h1>Hello {state.hello}!</h1>
        </div>
    );
}
