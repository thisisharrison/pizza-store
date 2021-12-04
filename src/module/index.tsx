import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router-dom";
import ErrorFallback from "../components/ErrorFallback";
import { SnackbarProvider } from "notistack";
import { OrderProvider } from "../context/order";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const Home = React.lazy(() => import("./Home"));

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: grey[400],
            },
            secondary: {
                main: grey[100],
            },
        },
    });

    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <React.Suspense fallback={<div>Loading...</div>}>
                    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reloadPage}>
                        <SnackbarProvider
                            maxSnack={3}
                            autoHideDuration={2000}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                        >
                            <OrderProvider>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                </Routes>
                            </OrderProvider>
                        </SnackbarProvider>
                    </ErrorBoundary>
                </React.Suspense>
            </Container>
        </ThemeProvider>
    );
}

export default App;
