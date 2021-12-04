import React from "react";

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: any;
    errorInfo: any;
}

export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // console.log(`error`, error.message);
        // console.log(`errorInfo`, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        return this.state.hasError ? <FallbackComponent error={this.state.error} /> : this.props.children;
    }
}

const FallbackComponent = React.memo(({ error }: { error: Error }) => {
    console.log(error);
    return (
        <div>
            <h2>Opps! Somehting went wrong.</h2>
            <p>{error && error.message}</p>
        </div>
    );
});
