import { createReducer } from 'reduxsauce';

import { Types } from '@shared/redux/actions/languageSelection';
import { defaultLang } from '@shared/i18n';

export const INITIAL_STATE = { selectedLanguage: defaultLang };

export const setSelectedLanguage = (state = INITIAL_STATE, { selectedLanguage }) => {
  return {
    ...state,
    selectedLanguage: selectedLanguage || defaultLang,
  };
};

export const HANDLERS = { [Types.SET_SELECTED_LANGUAGE]: setSelectedLanguage };

export default createReducer(INITIAL_STATE, HANDLERS);
