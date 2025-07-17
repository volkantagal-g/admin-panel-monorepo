import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.LANGUAGE_SELECTION;

export const getSelectedLanguage = (state : any) : string => {
  let selectedLanguage;
  if (state) {
    selectedLanguage = state[reducerKey].selectedLanguage;
  }
  if (!selectedLanguage) {
    selectedLanguage = JSON.parse(localStorage.getItem('selectedLanguage') || '"en"');
  }
  return selectedLanguage || 'en';
};
