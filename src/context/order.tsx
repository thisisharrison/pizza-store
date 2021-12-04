import React from "react";
import type { OrderState, Order } from "../shared/types";

type ActionType =
    | { type: "create"; payload: Omit<Order, "id"> }
    | { type: "update"; payload: Order }
    | { type: "delete"; payload: number }
    | { type: "edit"; payload: null | Partial<Order> }
    | { type: "clear" };

function reducer(state: OrderState, action: ActionType) {
    let newOrders = Object.assign({}, state.orders);
    switch (action.type) {
        case "create":
            let newId = state.count + 1;
            let newPaylod = { id: newId, ...action.payload };
            console.log(`create`, action);
            return {
                ...state,
                count: newId,
                editing: null,
                orders: {
                    ...state.orders,
                    [newId]: newPaylod,
                },
            };
        case "update":
            console.log(`update`, action);
            return {
                ...state,
                editing: null,
                orders: {
                    ...state.orders,
                    [action.payload.id]: action.payload,
                },
            };
        case "delete":
            console.log(`delete`, action);
            delete newOrders[action.payload];
            return {
                ...state,
                orders: newOrders,
            };
        case "edit":
            return {
                ...state,
                editing: action.payload,
            };
        case "clear":
            return {
                ...state,
                orders: null,
            };
        default:
            return state;
    }
}

type ContextType = [OrderState, React.Dispatch<ActionType>];

const OrderContext = React.createContext<ContextType | null>(null);
OrderContext.displayName = "OrderContext";

// Add a lot of orders
// const x = Array.from({ length: 10 }).map((_, i) => ({
//     id: i,
//     name: `Pizza ${i + 1}`,
//     // @ts-ignore
//     toppings: Array.from({ length: 20 }).map((i) => `Pizza Topping #${i + 1}`),
//     price: 99,
//     quantity: 1,
//     size: "Pizza Size #1",
// }));

// const y: {
//     [key: string]: Order;
// } = {};

// for (const i of x) {
//     y[i.id] = i;
// }

const initialState: OrderState = {
    editing: null,
    count: 0,
    orders: null,
};

export function OrderProvider(props: React.PropsWithChildren<{}>) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return <OrderContext.Provider value={[state, dispatch]} {...props} />;
}

export function useOrderContext() {
    const context = React.useContext(OrderContext);
    if (!context) {
        throw new Error("useOrderContext must be used within OrderProvider");
    }
    return context;
}
