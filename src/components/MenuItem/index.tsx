import React from "react";
import { MenuImage } from "./MenuImage";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

export const MenuItem = () => {
    return (
        <Card variant="outlined" sx={{ width: [1, 1, 0.3], m: 1, borderColor: "#e9e9e9", textAlign: "center", borderRadius: 4 }}>
            <CardContent>
                <MenuImage />
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    Pizza Name - $99
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
                <Button variant="contained" fullWidth>
                    Choose
                </Button>
            </CardActions>
        </Card>
    );
};
