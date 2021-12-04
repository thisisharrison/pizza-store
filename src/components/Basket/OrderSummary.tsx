import React from "react";
import { useOrderContext } from "../../context/order";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import type { Order } from "../../shared/types";

export const OrderSummary = React.memo(({ orders }: { orders: Order[] }) => {
    const [, dispatch] = useOrderContext();

    const removeItem = (id: number) => {
        dispatch({ type: "delete", payload: id });
    };

    return (
        <List>
            {orders.map((_) => (
                <OrderItem key={_.id} order={_} onRemove={removeItem} />
            ))}
        </List>
    );
});

const OrderItem = React.memo(({ order, onRemove }: { order: Order; onRemove: (id: number) => void }) => (
    <ListItem disablePadding>
        <ListItemIcon>
            <IconButton onClick={() => onRemove(order.id)} role="remove">
                <CancelIcon color="primary" aria-label="remove" />
            </IconButton>
        </ListItemIcon>
        <ListItemText sx={{ width: 0.8 }} primary={`${order.quantity} x ${order.name}`} secondary={`${order.size}, ${order.toppings}`} />
        <ListItemText sx={{ textAlign: "right", width: 0.2 }} primary={`${`$` + order.price}`} />
    </ListItem>
));
