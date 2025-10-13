import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { logError } from '@/utils/errorLogger';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session with error handling
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      })
      .catch((error) => {
        // Log the error
        logError(error, { 
          errorType: 'auth', 
          additionalInfo: { operation: 'getSession' } 
        });

        // Show error toast
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });

        // Set safe state
        setUser(null);
        setSession(null);
        setLoading(false);
      });

    return () => subscription.unsubscribe();
  }, [toast]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      
      // Show success toast
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully',
      });
    } catch (error: any) {
      // Log the error
      logError(error, { 
        errorType: 'auth', 
        additionalInfo: { operation: 'signOut' } 
      });

      // Show error toast with retry action
      toast({
        title: 'Sign out failed',
        description: error.message,
        variant: 'destructive',
        action: {
          label: 'Retry',
          onClick: () => signOut(),
        } as any,
      });
    }
  };

  return { user, session, loading, signOut };
}
