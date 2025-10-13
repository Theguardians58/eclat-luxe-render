import { ErrorBoundary as ErrorBoundaryLib, FallbackProps } from 'react-error-boundary';
import { useToast } from '@/hooks/use-toast';
import { toast as sonnerToast } from 'sonner';
import { logError } from '@/utils/errorLogger';
import { ReactNode, useEffect } from 'react';

/**
 * Error fallback component displayed when a component crashes
 */
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const isDev = import.meta.env.DEV;

  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center p-8">
      <div className="max-w-md text-center space-y-6">
        {/* Error Icon */}
        <div className="text-6xl">⚠️</div>

        {/* Error Message */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground">
            A component has encountered an error. Please try reloading the page.
          </p>
        </div>

        {/* Reload Button */}
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Reload Page
        </button>

        {/* Stack Trace (Development Only) */}
        {isDev && (
          <div className="mt-8 text-left">
            <details className="cursor-pointer">
              <summary className="text-sm font-medium mb-2">Error Details (Dev Only)</summary>
              <div className="mt-2 p-4 bg-muted rounded-md max-h-[300px] overflow-auto">
                <div className="text-xs font-mono space-y-2">
                  <div>
                    <strong>Message:</strong> {error.message}
                  </div>
                  {error.stack && (
                    <div>
                      <strong>Stack:</strong>
                      <pre className="mt-1 whitespace-pre-wrap">{error.stack}</pre>
                    </div>
                  )}
                </div>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error, errorInfo: { componentStack: string }) => void;
}

/**
 * ErrorBoundary wrapper component
 * Catches React component errors and prevents full app crash
 * Logs errors to centralized logging system and shows toast notifications
 */
export function ErrorBoundary({ children, onError }: ErrorBoundaryProps) {
  const { toast } = useToast();

  const handleError = (error: Error, errorInfo: { componentStack: string }) => {
    // Log to centralized error logging system
    logError(error, {
      errorType: 'component',
      componentStack: errorInfo.componentStack,
    });

    // Show critical error toast on both systems for maximum visibility
    toast({
      title: 'Critical Error',
      description: 'A component has crashed',
      variant: 'destructive',
    });

    sonnerToast.error('Critical Error: A component has crashed');

    // Call custom onError callback if provided
    if (onError) {
      onError(error, errorInfo);
    }
  };

  return (
    <ErrorBoundaryLib FallbackComponent={ErrorFallback} onError={handleError}>
      {children}
    </ErrorBoundaryLib>
  );
}
