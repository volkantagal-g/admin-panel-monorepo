import { createReducer } from 'reduxsauce';

import { Types } from '@shared/redux/actions/ui';

export const INITIAL_STATE = { pageTitle: undefined };

export const setPageTitle = (state = INITIAL_STATE, { pageTitle }) => {
  return {
    ...state,
    pageTitle,
  };
};

export const HANDLERS = { [Types.SET_PAGE_TITLE]: setPageTitle };

export default createReducer(INITIAL_STATE, HANDLERS);
