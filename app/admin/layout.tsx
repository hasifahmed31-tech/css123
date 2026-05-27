'use client';

import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import {
  LayoutDashboard, FileText, LogOut, Menu, X, Plus, Home, Settings,
  Image as ImageIcon, Search, ChevronDown, ExternalLink, Sun, Moon,
  FileStack, Globe,
} from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import AdminThemeProvider, { useAdminTheme } from '@/components/admin/AdminThemeProvider';

const sidebarNav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  {
    label: 'Posts',
    icon: FileText,
    children: [
      { href: '/admin/posts', label: 'All Posts' },
      { href: '/admin/posts/new', label: 'Add New' },
    ],
  },
  { href: '/admin/pages', label: 'Pages', icon: FileStack },
  { href: '/admin/media', label: 'Media', icon: ImageIcon },
  { href: '/admin/seo', label: 'SEO', icon: Globe },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [postsExpanded, setPostsExpanded] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const { theme, toggle } = useAdminTheme();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) setUserEmail(user.email);
    });
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[--cms-sidebar]">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--cms-card)',
            color: 'var(--cms-text)',
            border: '1px solid var(--cms-border)',
            borderRadius: '8px',
            fontSize: '13px',
          },
          success: { iconTheme: { primary: '#00a32a', secondary: '#fff' } },
          error: { iconTheme: { primary: '#d63638', secondary: '#fff' } },
        }}
      />

      {/* Top Admin Bar */}
      <header className="flex h-10 shrink-0 items-center bg-[--cms-sidebar] px-3 text-[--cms-sidebar-text] border-b border-[--cms-sidebar-border]">
        <div className="flex items-center gap-3 text-xs">
          <Link href="/" className="flex items-center gap-1.5 rounded px-2 py-1 hover:bg-[--cms-sidebar-hover] hover:text-white transition-colors" title="Visit Site">
            <Home className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Hasif Online</span>
            <ExternalLink className="h-3 w-3 opacity-50" />
          </Link>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-xs">
          <button onClick={toggle} className="flex items-center gap-1 rounded px-2 py-1 hover:bg-[--cms-sidebar-hover] hover:text-white transition-colors" title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
          </button>
          <Link href="/admin/posts/new" className="flex items-center gap-1 rounded px-2 py-1 hover:bg-[--cms-sidebar-hover] hover:text-white transition-colors">
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">New Post</span>
          </Link>
          <span className="text-[--cms-sidebar-text] opacity-40">|</span>
          <span className="hidden sm:inline text-[--cms-sidebar-text] opacity-60 truncate max-w-[140px]">{userEmail}</span>
          <button onClick={handleLogout} className="flex items-center gap-1 rounded px-2 py-1 hover:bg-[--cms-sidebar-hover] hover:text-white transition-colors">
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`fixed inset-y-10 left-0 z-50 flex w-[200px] flex-col bg-[--cms-sidebar] transition-transform duration-200 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center gap-2 px-3 py-3 lg:hidden">
            <button onClick={() => setSidebarOpen(false)} className="rounded p-1 text-[--cms-sidebar-text] hover:bg-[--cms-sidebar-hover]">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Search */}
          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[--cms-sidebar-text] opacity-50" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-md bg-[--cms-sidebar-hover] py-1.5 pl-8 pr-3 text-xs text-[--cms-sidebar-text] placeholder:opacity-50 border-none focus:outline-none focus:ring-1 focus:ring-[--cms-accent]"
              />
            </div>
          </div>

          <nav className="flex-1 overflow-auto py-1">
            {sidebarNav.map((item) => {
              if ('children' in item && item.children) {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => setPostsExpanded(!postsExpanded)}
                      className={`flex w-full items-center gap-2.5 px-4 py-2 text-[13px] transition-colors ${
                        isActive('/admin/posts')
                          ? 'bg-[--cms-accent] text-white'
                          : 'text-[--cms-sidebar-text] hover:bg-[--cms-sidebar-hover] hover:text-white'
                      }`}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${postsExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    {postsExpanded && (
                      <div className="bg-[--cms-sidebar-hover]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`block px-4 py-1.5 pl-11 text-[13px] transition-colors ${
                              pathname === child.href ? 'text-white font-semibold' : 'text-[--cms-sidebar-text] hover:text-white'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-2 text-[13px] transition-colors ${
                    isActive(item.href!, 'exact' in item && !!item.exact)
                      ? 'bg-[--cms-accent] text-white'
                      : 'text-[--cms-sidebar-text] hover:bg-[--cms-sidebar-hover] hover:text-white'
                  }`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-[--cms-sidebar-border] px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6 overflow-hidden rounded-full">
                <NextImage src="/hasif-logo-new.png" alt="Hasif" fill sizes="24px" className="object-cover" />
              </div>
              <span className="text-[11px] text-[--cms-sidebar-text] opacity-60 truncate">Hasif Online CMS</span>
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <div className="flex flex-1 flex-col overflow-hidden bg-[--cms-bg]">
          <div className="flex items-center gap-2 border-b border-[--cms-border] bg-[--cms-card] px-4 py-2 lg:hidden">
            <button onClick={() => setSidebarOpen(true)} className="rounded p-1 text-[--cms-muted] hover:bg-[--cms-hover]">
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium text-[--cms-text]">Menu</span>
          </div>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <AdminShell>{children}</AdminShell>
    </AdminThemeProvider>
  );
}
