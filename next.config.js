//const withPWA = require('next-pwa');
//const runtimeCaching = require('next-pwa/cache');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {

  const poweredByHeader = false;
  const generateEtags = false;
  const compress = false;
  const distDir = 'dist';

  const serverRuntimeConfig = { // will only be available on the server side
    host:       process.env.NEXT_PUBLIC_HOST || 'NO-HOST',
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  };

  const publicRuntimeConfig = { // will be available on both server and client
    // staticFolder: '/static',
    host:       process.env.NEXT_PUBLIC_HOST || '',
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      poweredByHeader,
      generateEtags,
      compress,
      distDir,
      serverRuntimeConfig,
      publicRuntimeConfig,
      async rewrites() {
        return [
          // we need to define a no-op rewrite to trigger checking
          // all pages/static files before we attempt proxying
          {
            source: '/:path*',
            destination: '/:path*',
          },
          {
            source: '/:path*',
            destination: `http://127.0.0.1:12000/:path*`,
          },
        ]
      },
    };
  }

  return {
    poweredByHeader,
    generateEtags,
    compress,
    distDir,
    serverRuntimeConfig,
    publicRuntimeConfig,
  };
};
