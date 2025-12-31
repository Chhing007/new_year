
export interface Theme {
  name: string;
  gradient: string;
  accentColor: string;
  buttonClass: string;
}

export const themes: Record<string, Theme> = {
  default: {
    name: 'Golden Night',
    gradient: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
    accentColor: 'text-amber-300',
    buttonClass: 'bg-amber-400 hover:bg-amber-300 text-slate-900',
  },
  winter: {
    name: 'Winter Sky',
    gradient: 'linear-gradient(-45deg, #021B79, #0575E6, #4E65FF, #7283ff)',
    accentColor: 'text-sky-300',
    buttonClass: 'bg-sky-400 hover:bg-sky-300 text-slate-900',
  },
  festive: {
    name: 'Festive Fire',
    gradient: 'linear-gradient(-45deg, #B80303, #6B0101, #D7330F, #F89B29)',
    accentColor: 'text-red-300',
    buttonClass: 'bg-red-400 hover:bg-red-300 text-slate-900',
  },
};
