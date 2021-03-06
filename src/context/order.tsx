import React from "react";
import type { OrderState, Order } from "../shared/types";

type ActionType =
    | { type: "create"; payload: Omit<Order, "id"> }
    /** App does not update orders after they have been added to basket, but this action can handle it */
    | { type: "update"; payload: Order }
    | { type: "delete"; payload: number }
    /** When user click `Choose`, they're editing an order. If they choose to `Add to Basket`, then order is created, otherwise, it will be `clear` */
    | { type: "edit"; payload: null | Partial<Order> }
    | { type: "clear" }
    | { type: "submit" };

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
        case "submit":
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
