'use client';
import { useEffect } from 'react';

export default function SideMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <>
      <div className={`fixed inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-40`} aria-hidden={!open} onClick={onClose} />
      <aside aria-label="Menu latéral" className={`fixed left-0 top-0 h-full w-72 bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : '-translate-x-full'} z-50`}>
        <div className="p-4 border-b flex items-center justify-between">
          <strong>Menu</strong>
          <button aria-label="Fermer" className="p-2" onClick={onClose}>✕</button>
        </div>
        <nav className="p-4 grid gap-2">
          <a href="/catalog" className="px-2 py-2 rounded hover:bg-neutral-100">Catalog</a>
          <a href="/about" className="px-2 py-2 rounded hover:bg-neutral-100">About</a>
          <a href="/terms" className="px-2 py-2 rounded hover:bg-neutral-100">Terms</a>
          <a href="/privacy" className="px-2 py-2 rounded hover:bg-neutral-100">Privacy</a>
          <a href="/cookies" className="px-2 py-2 rounded hover:bg-neutral-100">Cookies</a>
        </nav>
      </aside>
    </>
  );
}
