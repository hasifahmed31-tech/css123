'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import { Upload, X, Check, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import type { MediaItem } from '@/lib/types';

interface MediaPickerProps {
  open: boolean;
  onSelect: (url: string) => void;
  onClose: () => void;
}

export default function MediaPicker({ open, onSelect, onClose }: MediaPickerProps) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const loadMedia = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setItems(data as MediaItem[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    if (open) loadMedia();
  }, [open, loadMedia]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const ext = file.name.split('.').pop();
    const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadErr } = await supabase.storage.from('media').upload(path, file);
    if (uploadErr) {
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from('media').getPublicUrl(path);

    await supabase.from('media').insert({
      name: file.name,
      url: urlData.publicUrl,
      storage_path: path,
      size: file.size,
      mime_type: file.type,
      alt_text: '',
    });

    await loadMedia();
    setUploading(false);
    e.target.value = '';
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative flex h-[80vh] w-full max-w-4xl flex-col rounded-lg border border-[--cms-border] bg-[--cms-card] shadow-xl">
        <div className="flex items-center justify-between border-b border-[--cms-border] px-4 py-3">
          <h2 className="text-lg font-semibold text-[--cms-text]">Media Library</h2>
          <div className="flex items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-[--cms-accent] px-3 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
              <Upload className="h-4 w-4" />
              Upload
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            </label>
            <button onClick={onClose} className="rounded p-1 text-[--cms-muted] hover:bg-[--cms-hover]">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {uploading && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-[--cms-accent]/30 bg-[--cms-accent]/5 px-4 py-3 text-sm text-[--cms-accent]">
              <Loader2 className="h-4 w-4 animate-spin" /> Uploading...
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-lg bg-[--cms-hover]" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-[--cms-muted]">
              <ImageIcon className="h-12 w-12 mb-3 opacity-40" />
              <p>No media uploaded yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onSelect(item.url); onClose(); }}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-[--cms-border] hover:border-[--cms-accent] transition-colors"
                >
                  <Image src={item.url} alt={item.alt_text || item.name} fill className="object-cover" sizes="200px" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
                    <Check className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="absolute bottom-0 left-0 right-0 truncate bg-black/60 px-2 py-1 text-xs text-white">
                    {item.name}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
