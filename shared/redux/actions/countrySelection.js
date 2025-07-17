import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    initializeSelectedCountryFromStorage: {},
    // NOTE: since on app start, we check localStorage for initial selectedCountry, we can immediately reload after setting local storage
    // Updating country state is not enough for the old getSelectedCountry() util,it doesn't trigger re-renders, since it reads from store/localStorage directly
    // So we are forced to reload the page
    // Only time we can avoid reloading is on app start
    // Ideally we want to get rid of getSelectedCountry() and use a version which uses useSelector (v2)
    // that way we can update the country without reload and all the selectors will trigger components to re-render
    // Any effect which has a dependecy of selectedCountry will also re-run
    startCountrySelectionFlow: { selectedCountry: null, shouldReloadAfterLocalStorage: false },
    startCountrySelectionFlowWithPrompt: { selectedCountry: null, message: null },
    setSelectedCountry: { selectedCountry: null, selectedCountryDivision: null },
    startCountrySelectionRemovalFlow: {},
  },
  { prefix: `${REDUX_KEY.COUNTRY_SELECTION}_` },
);
