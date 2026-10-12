// Field-readable palette: strong contrast for outdoor use, status never shown by colour alone.
export const colors = {
  ink: '#1E2B24',
  pine: '#2F5D48',
  field: '#EDF0E8',
  surface: '#FFFFFF',
  amber: '#F2B134',
  amberText: '#5C3C00',
  danger: '#B3382C',
  line: '#D3D9CC',
  muted: '#55635A',
  strong: '#2F7D4F',
  medium: '#9A6A00',
  weak: '#B3382C',
  dead: '#5E5E5E',
};
export const radius = { sm: 8, md: 14 };
export const TOUCH = 52; // minimum touch target (gloves, sun glare)
export const statusColor = (s: string) => (colors as any)[s] ?? colors.muted;
