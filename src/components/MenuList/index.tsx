import React from "react";
import { MenuItem } from "../MenuItem";
import { Box } from "@mui/system";
import type { MenuItemI } from "../../shared/types";

const dummyMenu: MenuItemI[] = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    name: `Pizza Name ${i + 1}`,
    price: 99,
}));

console.log(`dummyMenu`, dummyMenu);
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
            {dummyMenu.map((_) => (
                <MenuItem key={_.id} item={_} />
            ))}
        </Box>
    );
};
