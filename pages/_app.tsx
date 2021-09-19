import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import axiosInstance from 'utils/axiosInstance';
import { StyledEngineProvider, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from 'styled-components';
import Layout from 'components/Layout';
import theme from '../styles/theme';
import '../styles/ScannerBorders.css';
import '../styles/QrScanner.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <SWRConfig
      value={{
        fetcher: (url) => axiosInstance.get(url),
      }}
    >
      <Head>
        <link href="/favicon.ico" rel="icon" />
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />

        <meta content="Thailand Vaccine Certificate - unofficial" name="title" />
        <meta
          content="convert existed Thai Ministry of Public Health paper certificate to Apple Wallet and Android Wallet"
          name="description"
        />
      </Head>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </MuiThemeProvider>
      </StyledEngineProvider>
    </SWRConfig>
  );
}

export default MyApp;
