import React from "react";
import type { RootState } from "../shared/state";

type ActionType = { type: "something"; payload: any } | { type: "pending" } | { type: "resolved" };

export function reducer(state: RootState, action: ActionType) {
    switch (action.type) {
        case "something":
            return state;
        case "pending":
            return {
                ...state,
                loading: state.loading + 1,
            };
        case "resolved":
            return {
                ...state,
                loading: state.loading - 1,
            };
        default:
            throw new Error(`Unknown action: ${action}`);
    }
}

type ContextType = [RootState, React.Dispatch<ActionType>];

export const AppContext = React.createContext<ContextType | null>(null);
AppContext.displayName = "AppContext";

const initialState: RootState = {
    hello: "world",
    loading: 0,
};

export function AppProvider(props: any) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return <AppContext.Provider value={[state, dispatch]} {...props} />;
}

export function useAppContext() {
    const context = React.useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within AppProvider");
    }
    return context;
}
