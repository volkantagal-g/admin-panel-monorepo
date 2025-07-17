import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = { exportPagesExcel: { error: null } };

const exportPagesExcel = {
  failure: (state = INITIAL_STATE, { error = {} }) => ({
    ...state,
    exportPagesExcel: {
      ...state.exportPagesExcel,
      error,
    },
  }),
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.EXPORT_PAGES_EXCEL_FAILURE]: exportPagesExcel.failure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
