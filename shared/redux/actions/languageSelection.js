import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    initializeSelectedLanguageFromStorage: {},
    startLanguageSelectionFlow: { selectedLanguage: '' },
    setSelectedLanguage: { selectedLanguage: '' },
  },
  { prefix: `${REDUX_KEY.LANGUAGE_SELECTION}_` },
);
