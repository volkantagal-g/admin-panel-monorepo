import React from 'react';
import ReactDOM from 'react-dom';
import FontFaceObserver from 'fontfaceobserver';

import { i18nPromise } from '@shared/i18n';
import App from './app';
import ROUTE_COMPONENTS from '@app/routeComponents';

const openSansObserver = new FontFaceObserver('Source Sans Pro', {});

openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const MOUNT_NODE = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <App routeComponentsMap={ROUTE_COMPONENTS} />,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['@shared/i18n', '@shared/containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}
i18nPromise.then(() => {
  render();
});
