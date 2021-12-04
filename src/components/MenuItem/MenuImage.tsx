import React from "react";
import Pizza from "../../assets/pizza.jpg";
import { styled } from "@mui/material/styles";
import { ButtonBase } from "@mui/material";
import { Box } from "@mui/system";
import type { Theme } from "@mui/material";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: 140,
    [theme.breakpoints.down("md")]: {
        width: "100% !important", // Overrides inline-style
        height: 300,
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

const ImageBackdrop = styled("span")(({ theme }: { theme: Theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 8,
    backgroundColor: theme.palette.common.black,
    opacity: 0.2,
    transition: theme.transitions.create("opacity"),
    ":hover": {
        opacity: 0,
    },
}));

interface MenuImageProps {
    onClick: () => void;
}

export const MenuImage = React.memo(({ onClick }: MenuImageProps) => {
    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
            <ImageButton focusRipple style={{ width: "100%" }} onClick={onClick} role="dialog-image">
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
