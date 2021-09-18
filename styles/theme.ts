import { createTheme } from '@mui/material/styles';
import colors from './colors';
import typography from './typography';

const theme = createTheme({
  palette: {
    ...colors,
    background: {
      default: colors.primary.main,
    },
  },
  spacing: 8,
  typography,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
  },
});

export default theme;
