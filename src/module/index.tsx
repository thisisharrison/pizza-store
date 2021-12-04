import { Container } from "@mui/material";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router-dom";
import ErrorFallback from "../components/ErrorFallback";

const Home = React.lazy(() => import("./Home"));
const Profile = React.lazy(() => import("./Profile"));

function App() {
    const reloadPage = React.useCallback(() => {
        window.location.reload();
    }, []);

    return (
        <Container maxWidth="md">
            <React.Suspense fallback={<div>Loading...</div>}>
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reloadPage}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="profile" element={<Profile />} />
                    </Routes>
                </ErrorBoundary>
            </React.Suspense>
        </Container>
    );
}

export default App;
