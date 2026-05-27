import { createServerSupabaseClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from('settings').select('key, value');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result: Record<string, unknown> = {};
  if (data) {
    for (const row of data) {
      result[row.key] = row.value;
    }
  }

  return NextResponse.json(result);
}

export async function PUT(request: Request) {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const results = await Promise.all(
    Object.entries(body).map(([key, value]) =>
      supabase.from('settings').upsert({ key, value }, { onConflict: 'key' })
    )
  );

  const errors = results.filter((r) => r.error);
  if (errors.length > 0) {
    return NextResponse.json({ error: 'Failed to save some settings' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
