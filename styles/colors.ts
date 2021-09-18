interface BasePalette {
  charcoal: string;
  darkGrey: string;
  grey: string;
  lightGrey: string;
  lightGrey2: string;
  silverGrey: string;
  silverGrey2: string;
  fakeWhite: string;
}

const baseColors: BasePalette = {
  // base
  charcoal: '#212121',
  darkGrey: '#4B4B4B',
  grey: '#7B7B7B',
  lightGrey: '#999999',
  lightGrey2: '#DCDDDD',
  silverGrey: '#F2F2F2',
  silverGrey2: '#F7F7F7',
  fakeWhite: '#FAFAFA',
};

declare module '@mui/material' {
  interface Palette {
    base: BasePalette;
  }
}

const colors = {
  primary: {
    main: '#309e77',
  },
  secondary: {
    main: '#7fbb78',
  },
  warning: {
    main: '#f79717',
  },
  error: {
    main: '#d32f2f',
  },
  info: {
    main: '#78bbf9',
  },
  base: baseColors,
};

export default colors;
