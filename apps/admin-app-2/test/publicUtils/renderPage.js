import '../utils/configureRtl';
import { act, render as rtlRender } from '@testing-library/react';

import Joi from 'joi';

import App from '@app/app';
import { INITIAL_ROUTE } from '@app/routes';
import history from '@app/utils/history';
import getAppRenderUtils from '../utils/getAppUtils';
import waitForLoading from '../utils/waitForLoading';

const pageOptionsSchema = Joi.object({
  pagePermKey: Joi.string().required(),
  pageUrl: Joi.string().required(),
  pageComponent: Joi.func().required(),
}).required();

export default async function renderPage(pageOptions, rtlOptions) {
  const { error, value } = pageOptionsSchema.validate(pageOptions, { abortEarly: false });

  if (error) {
    throw new Error(error);
  }

  const { pagePermKey, pageUrl, pageComponent } = value;
  const utils = getAppRenderUtils();
  const routeKey = pagePermKey.replace(/^PAGE_/, '');
  const routesMap = { [routeKey]: pageComponent };
  const view = rtlRender(<App routeComponentsMap={routesMap} />, { ...rtlOptions });
  act(() => {
    // since history is global variable, we need to reset it before each render, in case multiple renders in the same test file
    history.push(INITIAL_ROUTE.path);
  });

  await waitForLoading();

  act(() => {
    utils.setUserPermissions([pagePermKey]);
  });
  act(() => {
    history.push(pageUrl);
  });
  await waitForLoading();

  // return extra utils as well as render result of the library
  return { ...view, ...utils };
}
