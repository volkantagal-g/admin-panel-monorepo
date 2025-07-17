import { createReducer } from 'reduxsauce';

import { Types } from '@shared/redux/actions/init';

const INITIAL_STATE = {
  isAfterLoginInitFinished: false,
  isAfterLoginInitFailed: false,
};

const finishAfterLoginInit = (state = INITIAL_STATE) => {
  return {
    ...state,
    isAfterLoginInitFinished: true,
  };
};

const failAfterLoginInit = (state = INITIAL_STATE) => {
  return {
    ...state,
    isAfterLoginInitFailed: true,
    isAfterLoginInitFinished: true,
  };
};

const HANDLERS = {
  [Types.FINISH_AFTER_LOGIN_INIT]: finishAfterLoginInit,
  [Types.FAIL_AFTER_LOGIN_INIT]: failAfterLoginInit,
};

export default createReducer(INITIAL_STATE, HANDLERS);
