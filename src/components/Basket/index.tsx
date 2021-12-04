import React from "react";
import { OrderSummary } from "./OrderSummary";
import { Box } from "@mui/system";
import { Button, Divider, Typography } from "@mui/material";

const dummyOrder = [
    {
        id: 1,
        quantity: 1,
        name: "Pizza",
        size: "Large",
        toppings: ["Topping #1", "Topping #2", "Topping #3"],
    },
    {
        id: 2,
        quantity: 1,
        name: "Pizza",
        size: "Medium",
        toppings: Array.from({ length: 6 }).map((_, i) => `Topping #${i + 1}`),
    },
];

export const Basket = () => {
    return (
        <Box
            sx={{
                p: 1,
                m: 1,
                minWidth: [1, 1, 0.3],
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
                <Typography variant="body1" align="center">
                    No items in your basket
                </Typography>

                <OrderSummary orders={dummyOrder} />

                <Divider variant="middle" sx={{ my: 3 }} />

                <Box display="flex" flexWrap="wrap" justifyContent="flex-end">
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        Total
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, ml: 4 }}>
                        $0
                    </Typography>
                </Box>

                <Button variant="contained" fullWidth disabled sx={{ my: 4 }}>
                    Checkout
                </Button>
            </Box>

            <Typography variant="h6" align="center" sx={{ fontWeight: 400, color: "#d5d5d5", my: 3 }}>
                Empty Basket
            </Typography>
        </Box>
    );
};
