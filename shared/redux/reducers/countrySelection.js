import { createReducer } from 'reduxsauce';

import { Types } from '@shared/redux/actions/countrySelection';

export const INITIAL_STATE = {
  selectedCountry: null,
  selectedCountryDivision: null,
  changeInProgress: false,
  initialCountrySet: false,
};

export const setSelectedCountry = (state = INITIAL_STATE, { selectedCountry, selectedCountryDivision }) => {
  return {
    ...state,
    selectedCountry,
    selectedCountryDivision,
    changeInProgress: false,
    initialCountrySet: true,
  };
};

export const startCountrySelectionFlowWithPrompt = (state = INITIAL_STATE) => {
  return {
    ...state,
    changeInProgress: true,
  };
};

export const HANDLERS = {
  [Types.SET_SELECTED_COUNTRY]: setSelectedCountry,
  [Types.START_COUNTRY_SELECTION_FLOW_WITH_PROMPT]: startCountrySelectionFlowWithPrompt,
};

export default createReducer(INITIAL_STATE, HANDLERS);
