export const typography = {
  // Display — Hero headings
  'display-2xl': ['4.5rem', { lineHeight: '5.625rem', letterSpacing: '-0.02em', fontWeight: '700' }],
  'display-xl':  ['3.75rem', { lineHeight: '4.5rem',  letterSpacing: '-0.02em', fontWeight: '700' }],
  'display-lg':  ['3rem',    { lineHeight: '3.75rem', letterSpacing: '-0.02em', fontWeight: '700' }],
  'display-md':  ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.02em', fontWeight: '600' }],
  'display-sm':  ['1.875rem',{ lineHeight: '2.375rem',letterSpacing: '-0.01em', fontWeight: '600' }],
  // Text — Body copy
  'text-xl':     ['1.25rem', { lineHeight: '1.875rem', fontWeight: '400' }],
  'text-lg':     ['1.125rem',{ lineHeight: '1.75rem',  fontWeight: '400' }],
  'text-md':     ['1rem',    { lineHeight: '1.5rem',   fontWeight: '400' }],
  'text-sm':     ['0.875rem',{ lineHeight: '1.25rem',  fontWeight: '400' }],
  'text-xs':     ['0.75rem', { lineHeight: '1.125rem', fontWeight: '400' }],
} as const;

export const spacing = {
  0: '0px',     1: '4px',     2: '8px',    3: '12px',
  4: '16px',    5: '20px',    6: '24px',   7: '28px',
  8: '32px',    10: '40px',   12: '48px',  14: '56px',
  16: '64px',   20: '80px',   24: '96px',  32: '128px',
} as const;

export const colorTokens = {
  // Brand
  'brand-primary':    { light: 'hsl(222, 89%, 55%)',  dark: 'hsl(217, 91%, 68%)' },
  'brand-secondary':  { light: 'hsl(262, 80%, 58%)',  dark: 'hsl(262, 80%, 70%)' },
  'brand-accent':     { light: 'hsl(25, 95%, 60%)',   dark: 'hsl(25, 95%, 68%)'  },
  // Semantic
  'success':          { light: 'hsl(142, 69%, 38%)',  dark: 'hsl(142, 69%, 58%)' },
  'warning':          { light: 'hsl(38, 92%, 50%)',   dark: 'hsl(38, 92%, 65%)'  },
  'error':            { light: 'hsl(4, 86%, 54%)',    dark: 'hsl(4, 86%, 66%)'   },
  'info':             { light: 'hsl(200, 98%, 39%)',  dark: 'hsl(200, 98%, 58%)' },
  // Surface
  'surface-base':     { light: 'hsl(0, 0%, 100%)',   dark: 'hsl(220, 13%, 8%)'  },
  'surface-raised':   { light: 'hsl(220, 14%, 98%)', dark: 'hsl(220, 13%, 12%)' },
  'surface-overlay':  { light: 'hsl(220, 14%, 95%)', dark: 'hsl(220, 13%, 16%)' },
  // Text
  'text-primary':     { light: 'hsl(220, 13%, 9%)',  dark: 'hsl(0, 0%, 97%)'    },
  'text-secondary':   { light: 'hsl(220, 9%, 38%)',  dark: 'hsl(220, 9%, 65%)'  },
  'text-tertiary':    { light: 'hsl(220, 9%, 56%)',  dark: 'hsl(220, 9%, 48%)'  },
  'text-disabled':    { light: 'hsl(220, 9%, 75%)',  dark: 'hsl(220, 9%, 32%)'  },
  // Border
  'border-default':   { light: 'hsl(220, 13%, 90%)', dark: 'hsl(220, 13%, 20%)' },
  'border-strong':    { light: 'hsl(220, 13%, 80%)', dark: 'hsl(220, 13%, 28%)' },
} as const;
