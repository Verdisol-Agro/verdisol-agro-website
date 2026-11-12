import { Component, type ReactNode } from "react";

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <main className="mx-auto max-w-xl px-6 py-24 text-center">
          <h1 className="text-3xl font-bold text-gray-900">This page could not load</h1>
          <p className="mt-4 text-gray-600">
            Please check your connection and reload the page. Any unsent form
            details may need to be entered again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-8 rounded-xl bg-[#1F5D3A] px-6 py-3 font-semibold text-white"
          >
            Reload page
          </button>
        </main>
      );
    }
    return this.props.children;
  }
}
