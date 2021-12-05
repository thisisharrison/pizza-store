import React from "react";
import { OrderSummary } from "./OrderSummary";
import { useOrderContext } from "../../context/order";
import { createOrder } from "../../utils/api";
import { ObjectUtil } from "../../utils/ObjectUtil";
import { useSnackbar } from "notistack";
import { Box } from "@mui/system";
import { Button, Divider, Link, Typography } from "@mui/material";

export const Basket = ({ api }: { api: boolean }) => {
    const [state, dispatch] = useOrderContext();
    const { enqueueSnackbar } = useSnackbar();

    const { orders } = state;

    /** ObjectUtil.toArray transforms the {id: Order} structure to an array of [{Order}]*/
    const orderItems = React.useMemo(() => {
        if (orders === null) return [];
        return ObjectUtil.toArray(orders as Record<string, any>);
    }, [orders]);

    /** ObjectUtil.reduceByKey sums up the prices of all orders */
    const orderTotal = React.useMemo(() => {
        if (orders === null) return 0;
        return ObjectUtil.reduceByKey(orders as Record<string, any>, "price");
    }, [orders]);

    const emptyBasket = () => {
        dispatch({ type: "clear" });
        enqueueSnackbar("Basket cleared!", { variant: "info" });
    };

    /** Only send API request if an API is available, otherwise refresh the UI and console.log to mock order submission */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!orders) return;
        const transaction = Object.values(orders);
        if (api) {
            // submit to api service
            createOrder(transaction)
                .then((res) => {
                    dispatch({ type: "submit" });
                    console.info("submit to API: ", res);
                    enqueueSnackbar("The kitchen has received your order!", { variant: "success" });
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        const {
                            response: {
                                data: { name, errors },
                            },
                        } = error;
                        console.error("api error: ", name);
                        const fields = Object.keys(errors).join(", ");
                        enqueueSnackbar(`Your order was not successful! Check ${fields}.`, { variant: "error" });
                    }
                });
        } else {
            dispatch({ type: "submit" });
            console.info("mocking API submission: ", transaction);
            enqueueSnackbar("Your order is in the kitchen!", { variant: "success" });
        }
    };

    const orderActive = orderTotal > 0;

    return (
        <Box
            sx={{
                p: 1,
                m: 1,
                width: [1, 1, 0.3],
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
            data-testid="basket"
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    bgcolor: "#f3f2f2",
                    borderRadius: 1,
                    overflow: "hidden",
                    p: 2,
                }}
            >
                <Box
                    component="div"
                    sx={{
                        maxHeight: "65vh",
                        height: "75%",
                        overflow: "auto",
                        overflowY: "scroll",
                    }}
                >
                    {orderTotal ? (
                        <OrderSummary orders={orderItems} />
                    ) : (
                        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
                            No items in your basket
                        </Typography>
                    )}
                </Box>

                <Divider variant="middle" sx={{ my: 3 }} />

                <Box display="flex" flexWrap="wrap" justifyContent="flex-end" role="order-total">
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        Total
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, ml: 4 }}>
                        $ {orderTotal}
                    </Typography>
                </Box>

                <Button type="submit" variant="contained" fullWidth disabled={!orderActive} sx={{ my: 4 }}>
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
