
export interface Theme {
  name: string;
  background: string;
  accent: string;
}

export const themes: Record<string, Theme> = {
  arcticDawn: {
    name: 'Arctic Dawn',
    background: 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900',
    accent: 'text-cyan-400',
  },
  sunsetBlaze: {
    name: 'Sunset Blaze',
    background: 'bg-gradient-to-br from-slate-900 via-rose-900 to-amber-800',
    accent: 'text-amber-400',
  },
  cosmicMidnight: {
    name: 'Cosmic Midnight',
    background: 'bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900',
    accent: 'text-purple-400',
  },
};
