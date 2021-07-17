import React, {Component, ErrorInfo} from 'react';

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: JSON.stringify(error).slice(0, 300)};
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <>
        <h1>Something went wrong.</h1>
        <p>Open console for more info, error snippet is:</p>
        <code>
          {this.state.error}
        </code>
      </>;
    }

    return this.props.children;
  }
}
