import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import React, { FC, memo, useCallback, useRef, useState } from 'react';

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false });

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100%',
}));

const BrowseButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2, 4),
  flexDirection: 'column',
  '& > span': {
    marginTop: theme.spacing(2),
  },
}));

const QrScan: FC = (props) => (
  <Root>
    <BrowseButton variant="outlined">
      <img alt="browse file" src="/browse-file-icon.png" />
      <span>Browse QR Code</span>
    </BrowseButton>
  </Root>
);

export default memo(QrScan);
