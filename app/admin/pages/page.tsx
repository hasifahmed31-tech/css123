'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import { FileStack, Edit, Loader2, Plus, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import type { CmsPage } from '@/lib/types';

export default function PagesListPage() {
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const loadPages = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('pages').select('*').order('title');
    if (data) setPages(data as CmsPage[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { loadPages(); }, [loadPages]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[--cms-text]">Pages</h1>
      </div>

      <p className="mb-4 text-sm text-[--cms-muted]">
        Edit content for your website pages. Changes are stored in the CMS database and can be fetched dynamically.
      </p>

      <div className="rounded-xl border border-[--cms-border] bg-[--cms-card] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-[--cms-muted]" />
          </div>
        ) : pages.length === 0 ? (
          <div className="py-16 text-center text-[--cms-muted]">
            <FileStack className="mx-auto h-12 w-12 mb-3 opacity-40" />
            <p>No pages configured yet.</p>
            <p className="text-xs mt-1">Run the SQL schema to create default pages.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[--cms-border] bg-[--cms-hover] text-left">
                <th className="px-5 py-3 font-medium text-[--cms-muted]">Page</th>
                <th className="hidden px-5 py-3 font-medium text-[--cms-muted] sm:table-cell">Slug</th>
                <th className="hidden px-5 py-3 font-medium text-[--cms-muted] md:table-cell">Last Updated</th>
                <th className="w-24 px-5 py-3 font-medium text-[--cms-muted] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} className="border-b border-[--cms-border] last:border-0 hover:bg-[--cms-hover] transition-colors">
                  <td className="px-5 py-3">
                    <Link href={`/admin/pages/${page.id}`} className="font-medium text-[--cms-accent] hover:underline">
                      {page.title}
                    </Link>
                  </td>
                  <td className="hidden px-5 py-3 text-[--cms-muted] sm:table-cell">/{page.slug}</td>
                  <td className="hidden px-5 py-3 text-[--cms-muted] md:table-cell">{formatDate(page.updated_at)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/pages/${page.id}`} className="rounded p-1.5 text-[--cms-muted] hover:bg-[--cms-hover] hover:text-[--cms-accent]" title="Edit">
                        <Edit className="h-4 w-4" />
                      </Link>
                      <Link href={`/${page.slug === 'home' ? '' : page.slug}`} target="_blank" className="rounded p-1.5 text-[--cms-muted] hover:bg-[--cms-hover] hover:text-[--cms-accent]" title="View">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
