import { ButtonBase } from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";
import Pizza from "../../assets/pizza.jpg";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: 140,
    [theme.breakpoints.down("sm")]: {
        width: "100% !important", // Overrides inline-style
        height: 100,
    },
    "&:hover, &.Mui-focusVisible": {
        zIndex: 1,
        "& .MuiImageBackdrop-root": {
            opacity: 0.15,
        },
        "& .MuiImageMarked-root": {
            opacity: 0,
        },
        "& .MuiTypography-root": {
            border: "4px solid currentColor",
        },
    },
}));

const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 8,
});

const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 8,
    backgroundColor: theme.palette.common.black,
    opacity: 0.2,
    // @ts-ignore
    transition: theme.transitions.create("opacity"),
    ":hover": {
        opacity: 0,
    },
}));

export const MenuImage = React.memo(() => {
    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
            <ImageButton focusRipple style={{ width: "100%" }}>
                <ImageSrc
                    style={{
                        backgroundImage: `url(${Pizza})`,
                    }}
                />
                <ImageBackdrop />
            </ImageButton>
        </Box>
    );
});
