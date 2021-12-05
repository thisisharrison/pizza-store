import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router-dom";
import ErrorFallback from "../components/ErrorFallback";
import { SnackbarProvider } from "notistack";
import { OrderProvider } from "../context/order";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { testApi } from "../utils/api";

/** If we have more routes, then code-splitting can help lazy-load the things that are needed by the user */
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

    /** This is just for not breaking the demo. In production, API endpoint is stable and we don't need to check first */
    const [apiAvailable, setApiAvailable] = React.useState(false);
    React.useEffect(() => {
        testApi().then((res) => {
            setApiAvailable(true);
        });
    }, []);

    /** Simple FallbackComponent onReset handler */
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
                                    <Route path="/" element={<Home api={apiAvailable} />} />
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
