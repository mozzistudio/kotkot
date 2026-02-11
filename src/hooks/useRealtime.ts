'use client';
import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useRealtime(
  table: string,
  filter: string,
  callback: (payload: { new: Record<string, unknown>; old: Record<string, unknown>; eventType: string }) => void
) {
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`${table}-changes`)
      .on(
        'postgres_changes' as never,
        { event: '*', schema: 'public', table, filter },
        (payload: Record<string, unknown>) => {
          callback({
            new: payload.new as Record<string, unknown>,
            old: payload.old as Record<string, unknown>,
            eventType: payload.eventType as string,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, filter, callback]);
}
