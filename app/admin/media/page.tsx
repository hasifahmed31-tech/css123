'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase';
import { Upload, Trash2, Image as ImageIcon, Loader2, Copy, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import ConfirmModal from '@/components/admin/ConfirmModal';
import type { MediaItem } from '@/lib/types';

export default function MediaLibraryPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; item: MediaItem | null }>({ open: false, item: null });
  const [copied, setCopied] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const loadMedia = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('media').select('*').order('created_at', { ascending: false });
    if (data) setItems(data as MediaItem[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { loadMedia(); }, [loadMedia]);

  const uploadFile = async (file: File) => {
    const ext = file.name.split('.').pop();
    const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadErr } = await supabase.storage.from('media').upload(path, file);
    if (uploadErr) {
      toast.error(uploadErr.message);
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
  };

  const handleUpload = async (files: FileList | File[]) => {
    setUploading(true);
    const fileArray = Array.from(files);
    for (const file of fileArray) {
      await uploadFile(file);
    }
    await loadMedia();
    setUploading(false);
    toast.success(`${fileArray.length} file${fileArray.length > 1 ? 's' : ''} uploaded`);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      await handleUpload(e.dataTransfer.files);
    }
  };

  const handleDelete = async (item: MediaItem) => {
    await supabase.storage.from('media').remove([item.storage_path]);
    await supabase.from('media').delete().eq('id', item.id);
    setDeleteModal({ open: false, item: null });
    setSelected(null);
    toast.success('File deleted');
    loadMedia();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('URL copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[--cms-text]">Media Library</h1>
        <button onClick={() => fileInput.current?.click()} className="flex items-center gap-2 rounded-lg bg-[--cms-accent] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
          <Upload className="h-4 w-4" /> Upload
        </button>
        <input ref={fileInput} type="file" accept="image/*" multiple onChange={(e) => e.target.files && handleUpload(e.target.files)} className="hidden" />
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`mb-6 flex items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors ${
          dragOver ? 'border-[--cms-accent] bg-[--cms-accent]/5' : 'border-[--cms-border] bg-[--cms-card]'
        }`}
      >
        {uploading ? (
          <div className="flex items-center gap-3 text-[--cms-muted]">
            <Loader2 className="h-5 w-5 animate-spin" /> Uploading...
          </div>
        ) : (
          <div className="text-center text-[--cms-muted]">
            <Upload className="mx-auto h-8 w-8 mb-2 opacity-40" />
            <p className="text-sm">Drag & drop images here, or click Upload</p>
            <p className="text-xs mt-1 opacity-60">PNG, JPG, GIF, WebP supported</p>
          </div>
        )}
      </div>

      <div className="flex gap-6">
        {/* Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-lg bg-[--cms-skeleton]" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-[--cms-muted]">
              <ImageIcon className="h-16 w-16 mb-4 opacity-20" />
              <p className="text-lg font-medium">No media files</p>
              <p className="text-sm mt-1">Upload your first image to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className={`group relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selected?.id === item.id ? 'border-[--cms-accent] ring-2 ring-[--cms-accent]/30' : 'border-[--cms-border] hover:border-[--cms-accent]/50'
                  }`}
                >
                  <Image src={item.url} alt={item.alt_text || item.name} fill className="object-cover" sizes="200px" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="truncate text-xs text-white">{item.name}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-4 rounded-xl border border-[--cms-border] bg-[--cms-card] p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[--cms-text]">Details</h3>
                <button onClick={() => setSelected(null)} className="rounded p-1 text-[--cms-muted] hover:bg-[--cms-hover]">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-lg mb-3">
                <Image src={selected.url} alt={selected.alt_text || selected.name} fill className="object-cover" sizes="300px" />
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs font-medium text-[--cms-muted]">Name</p>
                  <p className="text-[--cms-text] truncate">{selected.name}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[--cms-muted]">Size</p>
                  <p className="text-[--cms-text]">{formatSize(selected.size)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[--cms-muted]">Type</p>
                  <p className="text-[--cms-text]">{selected.mime_type}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[--cms-muted] mb-1">URL</p>
                  <button onClick={() => copyUrl(selected.url)} className="flex w-full items-center gap-2 rounded-lg border border-[--cms-border] px-3 py-2 text-xs text-[--cms-text] hover:bg-[--cms-hover]">
                    {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                    Copy URL
                  </button>
                </div>
              </div>
              <button
                onClick={() => setDeleteModal({ open: true, item: selected })}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        open={deleteModal.open}
        title="Delete Media"
        message={`Are you sure you want to delete "${deleteModal.item?.name}"? This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={() => deleteModal.item && handleDelete(deleteModal.item)}
        onCancel={() => setDeleteModal({ open: false, item: null })}
      />
    </div>
  );
}
