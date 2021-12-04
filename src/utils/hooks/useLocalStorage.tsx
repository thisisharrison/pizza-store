import React from "react";

export function useLocalStorage(key: string, initialState: any) {
    const [state, setState] = React.useState(() => {
        const item = window.localStorage.getItem(key);
        if (item) {
            try {
                setState(JSON.parse(item));
            } catch (error) {
                window.localStorage.removeItem(key);
            }
        } else {
            setState(initialState);
        }
    });

    const prev = React.useRef(key);

    React.useEffect(() => {
        const prevKey = prev.current;
        if (prevKey !== key) {
            window.localStorage.removeItem(key);
        }
        prev.current = key;
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
}
