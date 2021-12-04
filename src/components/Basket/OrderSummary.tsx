import React from "react";
import { IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

interface OrderProps {
    id: number;
    quantity: number;
    name: string;
    size: string;
    toppings: string[];
}

export const OrderSummary = ({ orders }: { orders: OrderProps[] }) => {
    return (
        <List>
            {orders.map((_) => (
                <OrderItem key={_.id} order={_} />
            ))}
        </List>
    );
};

const OrderItem = React.memo(({ order }: { order: OrderProps }) => (
    <ListItem disablePadding>
        <ListItemIcon>
            <IconButton>
                <CancelIcon color="primary" aria-label="delete" />
            </IconButton>
        </ListItemIcon>
        <ListItemText primary={`${order.quantity} x ${order.name}`} secondary={`${order.size}, ${order.toppings}`} />
    </ListItem>
));
