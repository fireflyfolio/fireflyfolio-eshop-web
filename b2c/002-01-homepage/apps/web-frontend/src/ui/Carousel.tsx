'use client';
import { useState } from 'react';

export function Carousel({ slides }: { slides: { image: string; href: string; alt: string }[] }) {
  const [idx, setIdx] = useState(0);
  return (
    <div className="relative z-0" aria-roledescription="carousel" aria-label="Catégories">
      {slides.length > 0 && (
        <a href={slides[idx].href}>
          <img src={slides[idx].image} alt={slides[idx].alt} className="w-full aspect-[16/6] object-cover" />
        </a>
      )}
      <button className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded" aria-label="Précédent" onClick={() => setIdx((idx - 1 + slides.length) % slides.length)}>‹</button>
      <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded" aria-label="Suivant" onClick={() => setIdx((idx + 1) % slides.length)}>›</button>
      <div className="absolute bottom-2 w-full flex justify-center gap-2">
        {slides.map((_, i) => (
          <button key={i} aria-label={`Aller au slide ${i + 1}`} onClick={() => setIdx(i)} className={`h-2 w-2 rounded-full ${i === idx ? 'bg-black' : 'bg-white/70'}`} />
        ))}
      </div>
    </div>
  );
}
