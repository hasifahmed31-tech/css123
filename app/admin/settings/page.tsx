'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { Save, Loader2, Globe, Palette, Share2, Image as ImageIcon, X } from 'lucide-react';
import toast from 'react-hot-toast';
import MediaPicker from '@/components/admin/MediaPicker';

interface SettingsData {
  general: { site_title: string; site_description: string; contact_email: string; phone: string };
  social: { linkedin: string; twitter: string; github: string };
  branding: { logo_url: string; favicon_url: string; footer_text: string };
}

const defaultSettings: SettingsData = {
  general: { site_title: 'Hasif Online', site_description: '', contact_email: '', phone: '' },
  social: { linkedin: '', twitter: '', github: '' },
  branding: { logo_url: '', favicon_url: '', footer_text: '' },
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'social' | 'branding'>('general');
  const [mediaPicker, setMediaPicker] = useState<{ open: boolean; field: string }>({ open: false, field: '' });
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('settings').select('key, value');
      if (data) {
        const mapped: SettingsData = { ...defaultSettings };
        for (const row of data) {
          const key = row.key as string;
          const val = row.value as Record<string, string>;
          if (key === 'general') mapped.general = { ...mapped.general, ...val };
          else if (key === 'social') mapped.social = { ...mapped.social, ...val };
          else if (key === 'branding') mapped.branding = { ...mapped.branding, ...val };
        }
        setSettings(mapped);
      }
      setLoading(false);
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const promises = (Object.keys(settings) as (keyof SettingsData)[]).map((key) =>
      supabase.from('settings').upsert({ key, value: settings[key] }, { onConflict: 'key' })
    );
    const results = await Promise.all(promises);
    const hasError = results.some((r) => r.error);
    if (hasError) toast.error('Failed to save some settings');
    else toast.success('Settings saved!');
    setSaving(false);
  };

  const updateField = (section: keyof SettingsData, field: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const tabs = [
    { key: 'general' as const, label: 'General', icon: Globe },
    { key: 'social' as const, label: 'Social Links', icon: Share2 },
    { key: 'branding' as const, label: 'Branding', icon: Palette },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[--cms-muted]" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[--cms-text]">Settings</h1>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-lg bg-[--cms-accent] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save All
        </button>
      </div>

      <div className="flex gap-6">
        {/* Tab nav */}
        <div className="hidden w-48 shrink-0 lg:block">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  activeTab === tab.key ? 'bg-[--cms-accent] text-white' : 'text-[--cms-muted] hover:bg-[--cms-hover] hover:text-[--cms-text]'
                }`}
              >
                <tab.icon className="h-4 w-4" /> {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile tab bar */}
        <div className="lg:hidden mb-4 flex gap-2 w-full">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                activeTab === tab.key ? 'bg-[--cms-accent] text-white' : 'bg-[--cms-card] text-[--cms-muted] border border-[--cms-border]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="rounded-xl border border-[--cms-border] bg-[--cms-card] p-6">
            {activeTab === 'general' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[--cms-text] mb-4">General Settings</h2>
                {[
                  { key: 'site_title', label: 'Site Title', type: 'text' },
                  { key: 'site_description', label: 'Site Description', type: 'textarea' },
                  { key: 'contact_email', label: 'Contact Email', type: 'email' },
                  { key: 'phone', label: 'Phone Number', type: 'tel' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="mb-1.5 block text-sm font-medium text-[--cms-text]">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={settings.general[field.key as keyof typeof settings.general]}
                        onChange={(e) => updateField('general', field.key, e.target.value)}
                        rows={3}
                        className="w-full rounded-lg border border-[--cms-border] bg-[--cms-input-bg] px-4 py-2.5 text-sm text-[--cms-text] focus:border-[--cms-accent] focus:outline-none resize-none"
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={settings.general[field.key as keyof typeof settings.general]}
                        onChange={(e) => updateField('general', field.key, e.target.value)}
                        className="w-full rounded-lg border border-[--cms-border] bg-[--cms-input-bg] px-4 py-2.5 text-sm text-[--cms-text] focus:border-[--cms-accent] focus:outline-none"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'social' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[--cms-text] mb-4">Social Links</h2>
                {[
                  { key: 'linkedin', label: 'LinkedIn URL' },
                  { key: 'twitter', label: 'Twitter/X URL' },
                  { key: 'github', label: 'GitHub URL' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="mb-1.5 block text-sm font-medium text-[--cms-text]">{field.label}</label>
                    <input
                      type="url"
                      value={settings.social[field.key as keyof typeof settings.social]}
                      onChange={(e) => updateField('social', field.key, e.target.value)}
                      placeholder={`https://${field.key}.com/...`}
                      className="w-full rounded-lg border border-[--cms-border] bg-[--cms-input-bg] px-4 py-2.5 text-sm text-[--cms-text] placeholder:text-[--cms-muted] focus:border-[--cms-accent] focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'branding' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[--cms-text] mb-4">Branding</h2>
                {/* Logo */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[--cms-text]">Logo</label>
                  {settings.branding.logo_url ? (
                    <div className="relative inline-block mb-2">
                      <img src={settings.branding.logo_url} alt="Logo" className="h-12 rounded" />
                      <button onClick={() => updateField('branding', 'logo_url', '')} className="absolute -top-1 -right-1 rounded-full bg-red-500 p-0.5 text-white">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : null}
                  <button onClick={() => setMediaPicker({ open: true, field: 'logo_url' })} className="w-full rounded-lg border border-[--cms-border] py-2 text-sm font-medium text-[--cms-text] hover:bg-[--cms-hover]">
                    {settings.branding.logo_url ? 'Change Logo' : 'Select Logo'}
                  </button>
                </div>

                {/* Favicon */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[--cms-text]">Favicon</label>
                  {settings.branding.favicon_url ? (
                    <div className="relative inline-block mb-2">
                      <img src={settings.branding.favicon_url} alt="Favicon" className="h-8 rounded" />
                      <button onClick={() => updateField('branding', 'favicon_url', '')} className="absolute -top-1 -right-1 rounded-full bg-red-500 p-0.5 text-white">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : null}
                  <button onClick={() => setMediaPicker({ open: true, field: 'favicon_url' })} className="w-full rounded-lg border border-[--cms-border] py-2 text-sm font-medium text-[--cms-text] hover:bg-[--cms-hover]">
                    {settings.branding.favicon_url ? 'Change Favicon' : 'Select Favicon'}
                  </button>
                </div>

                {/* Footer Text */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[--cms-text]">Footer Text</label>
                  <textarea
                    value={settings.branding.footer_text}
                    onChange={(e) => updateField('branding', 'footer_text', e.target.value)}
                    rows={2}
                    className="w-full rounded-lg border border-[--cms-border] bg-[--cms-input-bg] px-4 py-2.5 text-sm text-[--cms-text] focus:border-[--cms-accent] focus:outline-none resize-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <MediaPicker
        open={mediaPicker.open}
        onSelect={(url) => {
          updateField('branding', mediaPicker.field, url);
          setMediaPicker({ open: false, field: '' });
        }}
        onClose={() => setMediaPicker({ open: false, field: '' })}
      />
    </div>
  );
}
