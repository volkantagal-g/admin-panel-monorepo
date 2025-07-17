import React, {Suspense} from 'react';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';
import { ConfigProvider as AntdConfigProvider } from 'antd';

import jssTheme from '@shared/jssTheme';
import { getAntLocale } from '@shared/utils/localization';
import Spinner from '@shared/components/Spinner';

const Providers = ({ store, history, RouteProvider = HistoryRouter, children }) => (
  <Provider store={store}>
    <RouteProvider history={history}>
      <Suspense fallback={<Spinner />}>
        <AntdConfigProvider locale={getAntLocale()}>
          <ThemeProvider theme={jssTheme}>{children}</ThemeProvider>
        </AntdConfigProvider>
      </Suspense>
    </RouteProvider>
  </Provider>
);

export default Providers;
