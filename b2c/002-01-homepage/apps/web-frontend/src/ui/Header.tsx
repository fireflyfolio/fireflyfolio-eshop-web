'use client';
import { useState } from 'react';

import SideMenu from './SideMenu';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="w-full border-b">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center gap-3">
        <button aria-label="Ouvrir le menu" aria-controls="sidemenu" aria-expanded={open} className="p-2" onClick={() => setOpen(true)}>☰</button>
        <a href="/" className="font-bold text-lg">eShop</a>
        <form role="search" className="flex-1">
          <input className="w-full border rounded px-3 py-2" placeholder="Search..." />
        </form>
        <select aria-label="Langue" defaultValue="fr" className="border rounded px-2 py-2">
          <option value="fr">FR</option>
          <option value="en">EN</option>
        </select>
      </div>
      <SideMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
