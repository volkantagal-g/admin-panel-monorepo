import { renderHook } from '@testing-library/react-hooks';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import globalSagas from '@app/redux/sagas';
import Providers from '@app/containers/App/Providers';
import configureStore from '@app/redux/configureStore';

const DefaultWrapper = ({ children }) => children;

const defaultRouteOptions = { path: '/', url: '/' };

export default function renderHookWithProviders(cbWithHooks, { path, url } = defaultRouteOptions, rtlOptions = {}) {
  const { wrapper: CustomWrapper = DefaultWrapper } = rtlOptions;

  // if custom hooks use redux, react-router-dom related hooks, we need the providers and other parts

  const FakeRouter = ({ children }) => (
    <MemoryRouter initialEntries={[url]}>
      {children}
    </MemoryRouter>
  );

  const getFakeComponent = children => () => (
    <CustomWrapper>
      {children}
    </CustomWrapper>
  );

  const history = createMemoryHistory({ initialEntries: [url] });
  const store = configureStore({});
  store.runSaga(globalSagas);

  const CombinedWrapper = ({ children }) => {
    const FakeComponent = getFakeComponent(children);
    return (
      <Providers RouteProvider={FakeRouter} store={store} history={history}>
        <Routes>
          <Route path={path} element={<FakeComponent />} />
        </Routes>
      </Providers>
    );
  };

  return renderHook(cbWithHooks, { ...rtlOptions, wrapper: CombinedWrapper });
}
