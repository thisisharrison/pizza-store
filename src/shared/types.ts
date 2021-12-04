export interface Order {
    id: number;
    quantity: number;
    name: string;
    size: string;
    toppings: string[];
    price: number;
}

export interface OrderState {
    editing: Partial<Order> | null;
    count: number;
    orders: {
        [key: string]: Order;
    } | null;
}

export interface MenuItemI {
    id: number;
    name: string;
    price: number;
}
