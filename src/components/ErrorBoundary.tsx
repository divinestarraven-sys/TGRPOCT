import { Component, type ReactNode } from 'react';
import SacredGeometry from './SacredGeometry';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  isChunkError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, isChunkError: false };

  static getDerivedStateFromError(error: Error): State {
    const isChunkError =
      error.name === 'ChunkLoadError' ||
      error.message.includes('Failed to fetch dynamically imported module') ||
      error.message.includes('Loading chunk');
    return { hasError: true, isChunkError };
  }

  handleRetry = () => {
    this.setState({ hasError: false, isChunkError: false });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-cosmic-black">
        <div className="mb-8" aria-hidden="true">
          <SacredGeometry size={100} opacity={0.12} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-display tracking-wider text-moonlight-white mb-4">
          {this.state.isChunkError
            ? 'The page could not be loaded'
            : 'Something unexpected happened'}
        </h1>

        <p className="font-body text-moonlight-white/50 max-w-md mb-8 leading-relaxed">
          {this.state.isChunkError
            ? 'This usually means the site was updated while you had it open. A quick reload should fix it.'
            : 'An error occurred while rendering this page. You can try again, or head back to familiar ground.'}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {this.state.isChunkError ? (
            <button
              onClick={this.handleReload}
              className="px-6 py-3 rounded-xl font-display text-sm tracking-wider bg-solarpunk-biolum/15 text-solarpunk-biolum border border-solarpunk-biolum/25 hover:bg-solarpunk-biolum/25 transition-colors"
            >
              Reload the page
            </button>
          ) : (
            <>
              <button
                onClick={this.handleRetry}
                className="px-6 py-3 rounded-xl font-display text-sm tracking-wider bg-solarpunk-biolum/15 text-solarpunk-biolum border border-solarpunk-biolum/25 hover:bg-solarpunk-biolum/25 transition-colors"
              >
                Try again
              </button>
              <a
                href="/"
                className="px-6 py-3 rounded-xl font-display text-sm tracking-wider text-moonlight-white/60 border border-moonlight-white/10 hover:bg-moonlight-white/5 transition-colors"
              >
                Return to the garden
              </a>
            </>
          )}
        </div>
      </section>
    );
  }
}
