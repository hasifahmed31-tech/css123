'use client';

import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import {
  LayoutDashboard,
  FileText,
  LogOut,
  Menu,
  X,
  Plus,
  Home,
  Settings,
  MessageSquare,
  BarChart3,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

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
  { href: '/admin/comments', label: 'Comments', icon: MessageSquare, badge: 0, disabled: true },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, disabled: true },
  { href: '/admin/settings', label: 'Settings', icon: Settings, disabled: true },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [postsExpanded, setPostsExpanded] = useState(true);
  const [userEmail, setUserEmail] = useState('');

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
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#1d2327]">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1d2327',
            color: '#f0f0f1',
            border: '1px solid #3c434a',
            borderRadius: '4px',
            fontSize: '13px',
          },
          success: { iconTheme: { primary: '#00a32a', secondary: '#fff' } },
          error: { iconTheme: { primary: '#d63638', secondary: '#fff' } },
        }}
      />

      {/* WP Admin Bar */}
      <header className="flex h-8 shrink-0 items-center bg-[#1d2327] px-3 text-[#c3c4c7] border-b border-[#2c3338]">
        <div className="flex items-center gap-3 text-xs">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded px-2 py-0.5 hover:bg-[#32373c] hover:text-white transition-colors"
            title="Visit Site"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Hasif Online</span>
            <ExternalLink className="h-3 w-3 opacity-50" />
          </Link>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-xs">
          <Link
            href="/admin/posts/new"
            className="flex items-center gap-1 rounded px-2 py-0.5 hover:bg-[#32373c] hover:text-white transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">New Post</span>
          </Link>
          <span className="text-[#8c8f94]">|</span>
          <span className="hidden sm:inline text-[#8c8f94] truncate max-w-[140px]">{userEmail}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 rounded px-2 py-0.5 hover:bg-[#32373c] hover:text-white transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* WP Sidebar */}
        <aside
          className={`fixed inset-y-8 left-0 z-50 flex w-[160px] flex-col bg-[#1d2327] transition-transform duration-200 lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center gap-2 px-3 py-3 lg:hidden">
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded p-1 text-[#c3c4c7] hover:bg-[#32373c]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex-1 overflow-auto py-2">
            {sidebarNav.map((item) => {
              if (item.children) {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => setPostsExpanded(!postsExpanded)}
                      className={`flex w-full items-center gap-2 px-3 py-[6px] text-[13px] transition-colors ${
                        isActive('/admin/posts')
                          ? 'bg-[#2271b1] text-white'
                          : 'text-[#c3c4c7] hover:bg-[#32373c] hover:text-white'
                      }`}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${
                          postsExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {postsExpanded && (
                      <div className="bg-[#2c3338]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`block px-3 py-[5px] pl-9 text-[13px] transition-colors ${
                              pathname === child.href
                                ? 'text-white font-semibold'
                                : 'text-[#c3c4c7] hover:text-white'
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

              if (item.disabled) {
                return (
                  <span
                    key={item.label}
                    className="flex items-center gap-2 px-3 py-[6px] text-[13px] text-[#8c8f94] cursor-not-allowed"
                    title="Coming soon"
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </span>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2 px-3 py-[6px] text-[13px] transition-colors ${
                    isActive(item.href!, item.exact)
                      ? 'bg-[#2271b1] text-white'
                      : 'text-[#c3c4c7] hover:bg-[#32373c] hover:text-white'
                  }`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="border-t border-[#2c3338] px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6 overflow-hidden rounded-full">
                <Image src="/hasif-logo-new.png" alt="Hasif" fill sizes="24px" className="object-cover" />
              </div>
              <span className="text-[11px] text-[#8c8f94] truncate">Admin CMS</span>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden bg-[#f0f0f1]">
          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 border-b border-[#c3c4c7] bg-white px-4 py-2 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded p-1 text-[#50575e] hover:bg-[#f0f0f1]"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium text-[#1d2327]">Admin Menu</span>
          </div>

          {/* Page content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
