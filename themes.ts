
export interface Theme {
  name: string;
  background: string;
  accent: string;
  button: string;
}

export const themes: Record<string, Theme> = {
  fierySunset: {
    name: 'Fiery Sunset',
    background: 'bg-gradient-to-br from-amber-500 via-red-500 to-violet-600',
    accent: 'text-amber-300',
    button: 'bg-amber-400 hover:bg-amber-300 text-slate-900',
  },
  electricSpring: {
    name: 'Electric Spring',
    background: 'bg-gradient-to-br from-yellow-300 via-green-400 to-cyan-500',
    accent: 'text-yellow-200',
    button: 'bg-yellow-300 hover:bg-yellow-200 text-slate-900',
  },
  royalTwilight: {
    name: 'Royal Twilight',
    background: 'bg-gradient-to-br from-indigo-700 via-fuchsia-600 to-orange-500',
    accent: 'text-fuchsia-400',
    button: 'bg-fuchsia-500 hover:bg-fuchsia-400 text-white',
  },
  crimsonPassion: {
    name: 'Crimson Passion',
    background: 'bg-gradient-to-br from-orange-500 via-red-600 to-pink-600',
    accent: 'text-red-300',
    button: 'bg-red-400 hover:bg-red-300 text-white',
  },
  mysticOcean: {
    name: 'Mystic Ocean',
    background: 'bg-gradient-to-br from-rose-700 via-purple-700 to-indigo-600',
    accent: 'text-purple-300',
    button: 'bg-purple-500 hover:bg-purple-400 text-white',
  },
  neonDream: {
    name: 'Neon Dream',
    background: 'bg-gradient-to-br from-sky-400 via-blue-600 to-fuchsia-500',
    accent: 'text-sky-300',
    button: 'bg-sky-400 hover:bg-sky-300 text-slate-900',
  },
};
