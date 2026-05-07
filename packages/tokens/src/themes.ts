export const lightTheme = {
  'color-bg-primary':       'var(--ds-palette-neutral-0)',
  'color-bg-secondary':     'var(--ds-palette-neutral-50)',
  'color-bg-elevated':      'var(--ds-palette-neutral-0)',
  'color-bg-overlay':       'rgb(0 0 0 / 0.5)',

  'color-text-primary':     'var(--ds-palette-neutral-900)',
  'color-text-secondary':   'var(--ds-palette-neutral-600)',
  'color-text-muted':       'var(--ds-palette-neutral-400)',
  'color-text-inverted':    'var(--ds-palette-neutral-0)',
  'color-text-accent':      'var(--ds-palette-brand-600)',

  'color-border-default':   'var(--ds-palette-neutral-200)',
  'color-border-strong':    'var(--ds-palette-neutral-400)',
  'color-border-focus':     'var(--ds-palette-brand-500)',

  'color-accent-default':   'var(--ds-palette-brand-500)',
  'color-accent-hover':     'var(--ds-palette-brand-600)',
  'color-accent-active':    'var(--ds-palette-brand-700)',
  'color-accent-subtle':    'var(--ds-palette-brand-50)',
  'color-accent-text':      'var(--ds-palette-brand-700)',

  'color-success-default':  'var(--ds-palette-success-500)',
  'color-success-subtle':   'var(--ds-palette-success-50)',
  'color-success-text':     'var(--ds-palette-success-700)',

  'color-error-default':    'var(--ds-palette-error-500)',
  'color-error-subtle':     'var(--ds-palette-error-50)',
  'color-error-text':       'var(--ds-palette-error-700)',

  'color-warning-default':  'var(--ds-palette-warning-500)',
  'color-warning-subtle':   'var(--ds-palette-warning-50)',
  'color-warning-text':     'var(--ds-palette-warning-700)',
} as const;

export const darkTheme: Partial<Record<keyof typeof lightTheme, string>> = {
  'color-bg-primary':       'var(--ds-palette-neutral-900)',
  'color-bg-secondary':     'var(--ds-palette-neutral-800)',
  'color-bg-elevated':      'var(--ds-palette-neutral-800)',
  'color-bg-overlay':       'rgb(0 0 0 / 0.7)',

  'color-text-primary':     'var(--ds-palette-neutral-50)',
  'color-text-secondary':   'var(--ds-palette-neutral-300)',
  'color-text-muted':       'var(--ds-palette-neutral-500)',
  'color-text-inverted':    'var(--ds-palette-neutral-900)',
  'color-text-accent':      'var(--ds-palette-brand-400)',

  'color-border-default':   'var(--ds-palette-neutral-700)',
  'color-border-strong':    'var(--ds-palette-neutral-500)',
  'color-border-focus':     'var(--ds-palette-brand-400)',

  'color-accent-default':   'var(--ds-palette-brand-400)',
  'color-accent-hover':     'var(--ds-palette-brand-300)',
  'color-accent-active':    'var(--ds-palette-brand-200)',
  'color-accent-subtle':    'rgb(99 102 241 / 0.15)',
  'color-accent-text':      'var(--ds-palette-brand-300)',

  'color-success-subtle':   'rgb(34 197 94 / 0.15)',
  'color-error-subtle':     'rgb(239 68 68 / 0.15)',
  'color-warning-subtle':   'rgb(245 158 11 / 0.15)',
};
