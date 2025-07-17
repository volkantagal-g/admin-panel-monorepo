import { combineReducers } from 'redux';

import { REDUX_KEY } from '@shared/shared/constants';
import initReducer from './init';
import loadingBarReducer from './loadingBar';
import uiReducer from './ui';
import authReducer from './auth';
import commonReducer from './common';
import coreReducer from './core';
import countrySelectionReducer from './countrySelection';
import languageSelectionReducer from './languageSelection';
import planogramReducer from './planogram';
import franchiseCommon from './franchiseCommon';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    [REDUX_KEY.INIT]: initReducer,
    [REDUX_KEY.LOADING_BAR]: loadingBarReducer,
    [REDUX_KEY.UI]: uiReducer,
    [REDUX_KEY.AUTH]: authReducer,
    [REDUX_KEY.CORE]: coreReducer,
    [REDUX_KEY.COMMON]: commonReducer,
    [REDUX_KEY.COUNTRY_SELECTION]: countrySelectionReducer,
    [REDUX_KEY.LANGUAGE_SELECTION]: languageSelectionReducer,
    [REDUX_KEY.PLANOGRAM.PLANOGRAM_COMMON]: planogramReducer,
    [REDUX_KEY.MARKET_FRANCHISE.COMMON]: franchiseCommon,
    ...injectedReducers,
  });

  return rootReducer;
}
