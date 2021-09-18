import React, { FC, memo } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import QrScan from './QrScan';

const PREFIX = 'MainCard';
const classes = {
  root: `${PREFIX}-root`,
};

const Root = styled('div')(({ theme }) => ({
  boxShadow: `0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 
    0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12)`,
  background: theme.palette.common.white,
  borderRadius: theme.spacing(2),
  height: '100vh',
  minHeight: theme.spacing(4),
  width: '100%',
  padding: theme.spacing(4, 2, 2, 2),
  borderTopLeftRadius: theme.spacing(3),
  borderTopRightRadius: theme.spacing(3),
  borderBottomLeftRadius: theme.spacing(0),
  borderBottomRightRadius: theme.spacing(0),

  [theme.breakpoints.up('md')]: {
    height: theme.spacing(80),
    padding: theme.spacing(3),

    borderRadius: theme.spacing(3),
  },
}));

const MainCard: FC = (props) => (
  <Root className={classes.root}>
    <QrScan />
  </Root>
);

export default memo(MainCard);
