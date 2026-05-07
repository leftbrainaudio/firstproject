import { palette, spacing, typography, radii, shadows, zIndex } from './tokens';
import { lightTheme, darkTheme } from './themes';

type NestedRecord = { [key: string]: string | number | NestedRecord };

function flatten(obj: NestedRecord, prefix = ''): Record<string, string> {
  return Object.entries(obj).reduce<Record<string, string>>((acc, [key, val]) => {
    const name = prefix ? `${prefix}-${key}` : key;
    if (val !== null && typeof val === 'object') {
      return { ...acc, ...flatten(val as NestedRecord, name) };
    }
    return { ...acc, [name]: String(val) };
  }, {});
}

function toVars(record: Record<string, string>, prefix: string): string {
  return Object.entries(record)
    .map(([k, v]) => `  --ds-${prefix}-${k}: ${v};`)
    .join('\n');
}

export function generateCSS(): string {
  const paletteVars    = toVars(flatten(palette as unknown as NestedRecord), 'palette');
  const spacingVars    = toVars(flatten(spacing as unknown as NestedRecord), 'space');
  const typographyVars = [
    toVars(flatten(typography.fontFamilies as unknown as NestedRecord), 'font-family'),
    toVars(flatten(typography.fontSizes as unknown as NestedRecord), 'font-size'),
    toVars(flatten(typography.fontWeights as unknown as NestedRecord), 'font-weight'),
    toVars(flatten(typography.lineHeights as unknown as NestedRecord), 'line-height'),
  ].join('\n');
  const radiiVars      = toVars(flatten(radii as unknown as NestedRecord), 'radius');
  const shadowVars     = toVars(flatten(shadows as unknown as NestedRecord), 'shadow');
  const zVars          = toVars(flatten(zIndex as unknown as NestedRecord), 'z');
  const lightVars      = Object.entries(lightTheme).map(([k, v]) => `  --ds-${k}: ${v};`).join('\n');
  const darkVars       = Object.entries(darkTheme).map(([k, v]) => `  --ds-${k}: ${v};`).join('\n');

  return `:root {\n${paletteVars}\n${spacingVars}\n${typographyVars}\n${radiiVars}\n${shadowVars}\n${zVars}\n${lightVars}\n}\n\n[data-theme="dark"] {\n${darkVars}\n}\n`;
}
