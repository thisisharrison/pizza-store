import React from "react";

interface State<T, E> {
    loading: number;
    error: E;
    data: T;
}

type Action<T, E = string> = { type: "pending" } | { type: "resolved"; data: T } | { type: "rejected"; error: E };

function reducer<T, E>(state: State<T, E>, action: Action<T, E>) {
    switch (action.type) {
        case "pending":
            return {
                ...state,
                error: null,
                loading: state.loading + 1,
            };
        case "resolved":
            return {
                ...state,
                error: null,
                loading: state.loading - 1,
                data: action.data,
            };
        case "rejected":
            return {
                ...state,
                error: action.error,
                loading: state.loading - 1,
            };
        default:
            throw new Error(`Unhandled action type: ${action}`);
    }
}

export function useAsync<T, E>(fn: () => Promise<T>, deps: any[]) {
    const [state, dispatch] = React.useReducer(reducer, {
        error: null,
        loading: 0,
        data: null,
    });

    React.useEffect(() => {
        const promise = fn();
        if (!promise) {
            return;
        }
        dispatch({ type: "pending" });
        promise.then(
            (response: any) => {
                dispatch({ type: "resolved", data: response.data });
            },
            (error: E) => {
                dispatch({ type: "rejected", error });
            }
        );
        // eslint-disable-next-line
    }, deps);

    return state;
}
