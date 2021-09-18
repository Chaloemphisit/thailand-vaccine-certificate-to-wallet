const withImages = require('next-images');

module.exports = withImages({
  reactStrictMode: false,
  dynamicAssetPrefix: true,
  i18n: {
    // These are all the locales you want to support in application
    locales: ['en', 'th'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'th',
    localeDetection: false,
  },
});
