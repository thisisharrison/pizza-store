import React from "react";
import { MenuItem } from "../MenuItem";
import { Box } from "@mui/system";

export const MenuList = () => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                display: "flex",
                flexWrap: "wrap",
                m: 1,
            }}
        >
            {Array.from({ length: 6 }).map((_, i) => (
                <MenuItem key={`item-${i}`} />
            ))}
        </Box>
    );
};
