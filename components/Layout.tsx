import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { FC, memo, ReactNode } from 'react';
import useWindowOrientation from 'use-window-orientation';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));
  const smUp = useMediaQuery(theme.breakpoints.up('md'));
  const { orientation, portrait, landscape } = useWindowOrientation();

  return <>{(landscape && smUp) || portrait ? <>{children}</> : <>not support</>}</>;
};

export default memo(Layout);
