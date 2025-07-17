import '../utils/configureRtl';
import { act, render as rtlRender } from '@testing-library/react';

import App from '@app/app';
import ROUTE_COMPONENTS from '@app/routeComponents';
import history from '@app/utils/history';
import getAppRenderUtils from '../utils/getAppUtils';
import waitForLoading from '../utils/waitForLoading';

export default async function renderApp({ initialPermKeys, initialPath, initialCountryId } = {}, rtlOptions = {}) {
  const view = rtlRender(<App routeComponentsMap={ROUTE_COMPONENTS} />, { ...rtlOptions });
  const utils = getAppRenderUtils();

  act(() => {
    if (initialPermKeys) {
      utils.setUserPermissions(initialPermKeys, initialCountryId);
    }
  });
  act(() => {
    if (initialPath) {
      history.push(initialPath);
    }
  });
  await waitForLoading();

  // return extra utils as well as render result of the library
  return { ...view, ...utils };
}
