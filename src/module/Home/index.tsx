import React from "react";
import { Basket } from "../../components/Basket";
import { MenuList } from "../../components/MenuList";
import { Box } from "@mui/system";

export default function Home({ api }: { api: boolean }) {
    return (
        <>
            <Box sx={{ display: "flex", flexDirection: ["column", "column", "row"], alignItems: "flex-start", minHeight: "100vh" }}>
                <MenuList />
                <Basket api={api} />
            </Box>
        </>
    );
}
