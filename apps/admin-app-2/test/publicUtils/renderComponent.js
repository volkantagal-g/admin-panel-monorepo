import '../utils/configureRtl';
import { render as rtlRender } from '@testing-library/react';

import App from '@app/app';
import getAppRenderUtils from '../utils/getAppUtils';
import waitForLoading from '../utils/waitForLoading';

export default async function renderComponent({ ui, rtlOptions = {}, doNotWaitForLoading = false } = {}) {
  const utils = getAppRenderUtils();

  const routeMap = { PAGE_FAKE_TEST_PAGE: () => null };

  const wrapper = ({ children }) => <App routeComponentsMap={routeMap}>{children}</App>;

  const view = rtlRender(ui, { wrapper, ...rtlOptions });

  if (!doNotWaitForLoading) {
    await waitForLoading();
  }

  // return extra utils as well as render result of the library
  return { ...view, ...utils };
}
