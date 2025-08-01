import React from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import globalSagas from '@shared/redux/sagas';
import store from '@shared/redux/store';
import history from '@shared/utils/history';
import AppContainer from '@shared/containers/App';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import './style.less';
import 'moment/src/locale/tr';
import Providers from '@shared/containers/App/Providers';

/*
  NOTE: store.runSaga() is not handled inside store.js.
  Because we are getting circular dependency error,
  when globalSagas is imported in store.js.
*/
store.runSaga(globalSagas);

type AppProps = {
  children: React.ReactNode;
  routeComponentsMap: any;
};

const App = ({ children, routeComponentsMap } : AppProps) => (
  <Providers store={store} history={history}>
    {routeComponentsMap && <AppContainer routeComponentsMap={routeComponentsMap} />}
    {children}
  </Providers>
);

export default App;
