import React from "react";
import { MenuItem } from "../MenuItem";
import { Box } from "@mui/system";
import type { MenuItemI } from "../../shared/types";

const dummyMenu: MenuItemI[] = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    name: `Pizza Name ${i + 1}`,
    price: 99,
}));

export const MenuList = React.memo(() => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                width: [1, 1, 0.7],
                display: "flex",
                flexWrap: "wrap",
                my: 1,
            }}
        >
            {dummyMenu.map((_) => (
                <MenuItem key={_.id} item={_} />
            ))}
        </Box>
    );
});
