import { supabase } from "@/integrations/supabase/client";

export interface ErrorContext {
  errorType: 'auth' | 'network' | 'component' | 'validation' | 'unknown';
  componentStack?: string;
  additionalInfo?: Record<string, any>;
}

/**
 * Centralized error logging utility
 * Logs errors to console in development and to Supabase in all environments
 * @param error - The error object to log
 * @param context - Additional context about the error
 */
export async function logError(error: Error, context?: ErrorContext): Promise<void> {
  const errorType = context?.errorType || 'unknown';
  const timestamp = new Date().toISOString();
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const userAgent = typeof window !== 'undefined' ? navigator.userAgent : '';

  // Console logging with structured format
  console.error(`[ERROR] [${errorType}] ${timestamp} - ${error.message}`);

  if (error.stack) {
    console.error('Stack trace:', error.stack);
  }

  if (context?.componentStack) {
    console.error('Component stack:', context.componentStack);
  }

  if (context?.additionalInfo) {
    console.error('Additional info:', JSON.stringify(context.additionalInfo, null, 2));
  }

  // Supabase logging - handle failures silently
  try {
    const { error: insertError } = await supabase
      .from('error_logs')
      .insert({
        error_type: errorType,
        error_message: error.message,
        error_stack: error.stack || null,
        component_stack: context?.componentStack || null,
        url: url || null,
        user_agent: userAgent || null,
        additional_info: context?.additionalInfo || null,
      });

    if (insertError) {
      // Log the Supabase error to console, but don't throw
      console.error('[ERROR] Failed to log error to Supabase:', insertError.message);
    }
  } catch (loggingError) {
    // Silently fail - don't break the app if logging fails
    console.error('[ERROR] Exception while logging to Supabase:', loggingError);
  }
}
