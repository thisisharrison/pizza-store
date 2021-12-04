import React from "react";
import { Basket } from "../../components/Basket";
import { MenuList } from "../../components/MenuList";
// import { useAppContext } from "../../context";
import { Box } from "@mui/system";
import { CustomizeModal } from "../../components/Modal/CustomizeModal";

export default function Home() {
    // React
    // const [state] = useAppContext();

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: ["column", "column", "row"], alignItems: "flex-start", minHeight: "100vh" }}>
                <MenuList />
                <Basket />
            </Box>
            <CustomizeModal />
        </>
    );
}
