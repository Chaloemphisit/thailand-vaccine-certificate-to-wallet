import { styled } from '@mui/material';
import Hidden from '@mui/material/Hidden';
import Typography from '@mui/material/Typography';
import React, { FC, memo } from 'react';

const Root = styled('div')(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.common.white,
  padding: theme.spacing(4, 2),

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4, 3),
  },
}));

const Header: FC = (props) => {
  const x = null;
  return (
    <Root>
      <Typography variant="h1">Thailand COVID-19 Vaccine Certificate</Typography>
      <Hidden smDown>
        <Typography>
          This unofficial app lets you import a Ministry of Public Health paper certificate to Apple Wallet and Android
          Wallet. We do not retain any data nor keep any record of your information.
        </Typography>
      </Hidden>
    </Root>
  );
};

export default memo(Header);
