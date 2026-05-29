'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { ToastProvider } from '@/components/admin/ToastProvider'
import {
  BarChart3,
  FileText,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  PanelLeftClose,
  Search,
  Settings,
  Sun,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/posts', label: 'Posts', icon: FileText },
  { href: '/admin/pages', label: 'Pages', icon: PanelLeftClose },
  { href: '/admin/media', label: 'Media', icon: ImageIcon },
  { href: '/admin/seo', label: 'SEO', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

function ThemeButton() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.05] dark:text-gray-300 dark:hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}

export default function AdminShell({ children, userEmail }: { children: React.ReactNode; userEmail?: string | null }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const supabase = createClient()

  async function logout() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const sidebar = (
    <aside className="flex h-full w-72 flex-col border-r border-gray-200 bg-white dark:border-white/10 dark:bg-gray-950">
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-5 dark:border-white/10">
        <Link href="/admin" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-950 text-white dark:bg-white dark:text-gray-950">
            H
          </span>
          <span>
            <span className="block text-sm font-extrabold text-gray-950 dark:text-white">Hasif CMS</span>
            <span className="block text-xs text-gray-500">Content studio</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 lg:hidden dark:hover:bg-white/10"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${
                active
                  ? 'bg-gray-950 text-white dark:bg-white dark:text-gray-950'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-950 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-gray-200 p-4 dark:border-white/10">
        <p className="truncate text-xs font-medium text-gray-500">{userEmail}</p>
        <button
          type="button"
          onClick={logout}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/10"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  )

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50 text-gray-950 dark:bg-gray-950 dark:text-white">
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:block">{sidebar}</div>
        {open && <div className="fixed inset-0 z-50 bg-gray-950/50 lg:hidden" onClick={() => setOpen(false)} />}
        <div className={`fixed inset-y-0 left-0 z-[60] transition-transform lg:hidden ${open ? 'translate-x-0' : '-translate-x-full'}`}>
          {sidebar}
        </div>
        <div className="lg:pl-72">
          <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-gray-200 bg-white/90 px-4 backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/85 sm:px-6">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 lg:hidden dark:border-white/10 dark:bg-white/[0.05] dark:text-gray-300"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="relative hidden flex-1 sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                className="h-10 w-full max-w-lg rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm outline-none focus:border-gray-300 dark:border-white/10 dark:bg-white/[0.05] dark:focus:border-white/20"
                placeholder="Search content, media, settings"
              />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Link
                href="/"
                className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.05] dark:text-gray-200 dark:hover:bg-white/10"
              >
                View site
              </Link>
              <ThemeButton />
            </div>
          </header>
          <main className="p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </ToastProvider>
  )
}

