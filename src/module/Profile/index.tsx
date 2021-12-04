import axios from "axios";
import React from "react";
import { useAsync } from "../../utils/hooks/useAsync";

interface Joke {
    id: string;
    joke: string;
    status: number;
}
export default function Todo() {
    const fetchUser = () =>
        axios.get<Joke>("https://icanhazdadjoke.com/", {
            headers: {
                accept: "application/json",
            },
        });

    const state = useAsync(fetchUser, []);

    const createTroubles = React.useCallback(() => {
        throw new Error("bar!");
    }, []);

    return (
        <div>
            <h2 onClick={createTroubles}>Profile</h2>
            <pre>{JSON.stringify(state, undefined, 2)}</pre>
        </div>
    );
}
