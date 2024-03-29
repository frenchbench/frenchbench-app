import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { FbApiContextProvider, FbI18nContextProvider } from './contexts';
import { newAppConfig } from './appConfig';
import { defaultLocaleCode } from './utils/i18n';

// TODO: for now, include all CSS here; SSR does not work with CSS imported by a component
import 'semantic-ui-css/semantic.min.css';
import './styles/index.css';

let initialState = {};
if (window && window['__INITIAL_STATE__']) {
  initialState = window.__INITIAL_STATE__;
  delete window.__INITIAL_STATE__;
}

const lang       = window.navigator.language ?? null; // TODO: pick from browser, cookie, etc.
const localeCode = defaultLocaleCode(lang);
const appConfig  = newAppConfig(process.env);
const appProps   = { appConfig, localeCode, initialState, pageProps: {}, ssr: false, hydrating: false };

const rootElement = document.getElementById('root');

if (rootElement) {
  const Root = (props) => (
    <React.StrictMode>
      <FbApiContextProvider apiConfig={props.appConfig.api}>
        <FbI18nContextProvider localeCode={props.localeCode}>
          <BrowserRouter>
            <App {...props} />
          </BrowserRouter>
        </FbI18nContextProvider>
      </FbApiContextProvider>
    </React.StrictMode>
  );
  if (rootElement.hasChildNodes()) {
    // HTML has server-side rendered code. hydrate() faster than render()
    console.info('client-side hydrate due to SSR');
    appProps.hydrating = true;
    ReactDOM.hydrate(Root(appProps), rootElement);
  } else {
    // client-side rendering without SSR
    console.info('client-side render');
    ReactDOM.render(Root(appProps), rootElement);
  }
} else {
  console.error('root element not found');
}
