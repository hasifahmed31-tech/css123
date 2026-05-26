'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

const NOT_CONFIGURED_MSG = 'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.';

function chainable(result: { data: unknown; error: { message: string } | null }) {
  const resolve = () => Promise.resolve(result);
  const chain: Record<string, unknown> = {};
  const handler: ProxyHandler<Record<string, unknown>> = {
    get(_t, prop) {
      if (prop === 'then') return resolve().then.bind(resolve());
      return new Proxy(chain, handler);
    },
    apply() {
      return new Proxy(chain, handler);
    },
  };
  return new Proxy(chain, handler);
}

function createMockClient(): SupabaseClient {
  const err = { message: NOT_CONFIGURED_MSG };
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      signInWithPassword: async () => ({ data: { user: null, session: null }, error: err }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => chainable({ data: null, error: err }),
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: err }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
        remove: async () => ({ data: null, error: err }),
        list: async () => ({ data: [], error: err }),
      }),
    },
  } as unknown as SupabaseClient;
}

let client: SupabaseClient | null = null;

export function createClient(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    client = createMockClient();
    return client;
  }

  client = createBrowserClient(url, key);
  return client;
}
