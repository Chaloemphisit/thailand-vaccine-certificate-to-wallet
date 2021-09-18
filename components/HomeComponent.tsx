import { styled } from '@mui/material';
import React, { FC, memo } from 'react';
import MainCard from './MainCard';
import Header from './Header';

const Root = styled('div')(({ theme }) => ({
  position: 'absolute',
  margin: 'auto',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',

  [theme.breakpoints.up('md')]: {
    maxWidth: theme.spacing(100),
  },
}));

const HomeComponent: FC = (props) => {
  const x = null;
  return (
    <Root>
      <Header />
      <MainCard />
    </Root>
  );
};

export default memo(HomeComponent);
