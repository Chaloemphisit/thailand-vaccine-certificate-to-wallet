import React, { FC } from 'react';
import Head from 'next/head';
import HomeComponent from 'components/HomeComponent';

const Home: FC = (props) => (
  <>
    <Head>
      <title>Thailand Vaccine Certificate - unofficial</title>
      {/* <!-- Open Graph / Facebook --> */}
      <meta content="website" property="og:type" />
      <meta content="https://vac-cert.netlify.com" property="og:url" />
      <meta content="Thailand Vaccine Certificate - unofficial" property="og:title" />
      <meta
        content="convert existed Thai Ministry of Public Health paper certificate to Apple Wallet and Android Wallet"
        property="og:description"
      />
      <meta content="https://vac-cert.netlify.com/images/sell-banner.jpg" property="og:image" />

      {/* <!-- Twitter --> */}
      <meta content="summary_large_image" property="twitter:card" />
      <meta content="https://vac-cert.netlify.com/" property="twitter:url" />
      <meta content="Thailand Vaccine Certificate - unofficial" property="twitter:title" />
      <meta
        content="convert existed Thai Ministry of Public Health paper certificate to Apple Wallet and Android Wallet"
        property="twitter:description"
      />
      <meta content="https://vac-cert.netlify.com/images/sell-banner.jpg" property="twitter:image" />
    </Head>
    <HomeComponent />
  </>
);

export default Home;
