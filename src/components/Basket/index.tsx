import React from "react";
import { OrderSummary } from "./OrderSummary";
import { useOrderContext } from "../../context/order";
import { ObjectUtil } from "../../utils/ObjectUtil";
import { Box } from "@mui/system";
import { Button, Divider, Link, Typography } from "@mui/material";

export const Basket = () => {
    const [state, dispatch] = useOrderContext();

    const { orders } = state;

    const orderItems = React.useMemo(() => {
        if (orders === null) return [];
        return ObjectUtil.toArray(orders as Record<string, any>);
    }, [orders]);

    const orderTotal = React.useMemo(() => {
        if (orders === null) return 0;
        return ObjectUtil.reduceByKey(orders as Record<string, any>, "price");
    }, [orders]);

    const emptyBasket = React.useCallback(() => {
        dispatch({ type: "clear" });
    }, [dispatch]);

    const orderActive = orderTotal > 0;

    return (
        <Box
            sx={{
                p: 1,
                m: 1,
                width: [1, 1, 0.4],
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    bgcolor: "#f3f2f2",
                    borderRadius: 1,
                    p: 4,
                }}
            >
                {orderTotal ? (
                    <OrderSummary orders={orderItems} />
                ) : (
                    <Typography variant="body1" align="center">
                        No items in your basket
                    </Typography>
                )}

                <Divider variant="middle" sx={{ my: 3 }} />

                <Box display="flex" flexWrap="wrap" justifyContent="flex-end">
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        Total
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, ml: 4 }}>
                        $ {orderTotal}
                    </Typography>
                </Box>

                <Button variant="contained" fullWidth disabled={!orderActive} sx={{ my: 4 }}>
                    Checkout
                </Button>
            </Box>

            <Link
                variant="h6"
                component="button"
                disabled={!orderActive}
                align="center"
                href="#"
                underline={orderActive ? "always" : "none"}
                sx={{
                    fontWeight: 400,
                    color: orderActive ? "grey[400]" : "#d5d5d5",
                    my: 3,
                    ":hover": {
                        cursor: orderActive ? "pointer" : "auto",
                    },
                }}
                onClick={emptyBasket}
            >
                Empty Basket
            </Link>
        </Box>
    );
};
