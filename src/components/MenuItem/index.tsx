import React from "react";
import { MenuImage } from "./MenuImage";
import { useOrderContext } from "../../context/order";
import type { MenuItemI } from "../../shared/types";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

export const MenuItem = React.memo(({ item }: { item: MenuItemI }) => {
    const [, dispatch] = useOrderContext();

    const { name, price } = item;

    const handleClick = () => {
        dispatch({ type: "edit", payload: { name, price } });
    };

    return (
        <Card variant="outlined" sx={{ width: [1, 1, 0.3], m: 1, borderColor: "#e9e9e9", textAlign: "center", borderRadius: 4 }}>
            <CardContent>
                <MenuImage onClick={handleClick} />
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    {name} - {`$` + price}
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                    mx: 1,
                }}
            >
                <Button variant="contained" fullWidth onClick={handleClick} role="dialog-button">
                    Choose
                </Button>
            </CardActions>
        </Card>
    );
});
