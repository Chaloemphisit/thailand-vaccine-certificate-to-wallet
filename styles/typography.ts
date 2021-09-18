import { TypographyOptions } from '@mui/material/styles/createTypography';

const htmlFontSize = 16;
export const getLineHeight = (pxLineHeight: number, pxFontSize: number): number => pxLineHeight / pxFontSize;
export const pxToRem = (pxFontSize: number): string => `${pxFontSize / htmlFontSize}rem`;

const typography: TypographyOptions = {
  fontFamily: `IBM Plex Sans Thai, Tahoma, Helvetica, Arial, sans-serif`,
  h1: {
    fontSize: pxToRem(36),
    fontWeight: 800,
    lineHeight: getLineHeight(50, 36),
    letterSpacing: 0,
  },
  h2: {
    fontSize: pxToRem(28),
    fontWeight: 700,
    lineHeight: getLineHeight(40, 28),
    letterSpacing: 0,
  },
  h3: {
    fontSize: pxToRem(24),
    fontWeight: 700,
    lineHeight: getLineHeight(30, 24),
    letterSpacing: 0,
  },
  h4: {
    fontSize: pxToRem(20),
    fontWeight: 700,
    lineHeight: getLineHeight(28, 20),
    letterSpacing: 0,
  },
  h5: {
    fontSize: pxToRem(16),
    fontWeight: 700,
    lineHeight: getLineHeight(22, 16),
    letterSpacing: 0,
  },
  body1: {
    fontSize: pxToRem(16),
    fontWeight: 400,
    lineHeight: getLineHeight(22, 16),
    letterSpacing: 0,
  },
  body2: {
    fontSize: pxToRem(14),
    fontWeight: 400,
    lineHeight: getLineHeight(20, 14),
    letterSpacing: 0,
  },
  caption: {
    fontSize: pxToRem(12),
    fontWeight: 400,
    lineHeight: getLineHeight(20, 12),
    letterSpacing: 0,
  },
  button: {
    fontSize: pxToRem(18),
    fontWeight: 400,
    lineHeight: getLineHeight(22, 18),
    letterSpacing: 0,
  },
};

export default typography;
