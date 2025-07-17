import { all, fork, put, take } from 'redux-saga/effects';

import { isNullOrEmpty } from '@shared/utils/common';
import { Types } from '@shared/redux/actions/languageSelection';
import { changeLanguage, getLangKey } from '@shared/i18n';
import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';

export const setSelectedLanguageToLocalStorage = selectedLanguage => {
  localStorage.setItem('selectedLanguage', selectedLanguage);
};

export function* initializeSelectedLanguageFromStorage() {
  while (true) {
    yield take(Types.INITIALIZE_SELECTED_LANGUAGE_FROM_STORAGE);
    const selectedLanguageFromStorage = yield localStorage.getItem('selectedLanguage');
    const selectedLanguage = JSON.parse(selectedLanguageFromStorage);
    yield put({ type: Types.START_LANGUAGE_SELECTION_FLOW, selectedLanguage });
  }
}

export function* languageSelectionFlow() {
  while (true) {
    const { selectedLanguage } = yield take(Types.START_LANGUAGE_SELECTION_FLOW);
    const currentLanguage = getLangKey();
    setSelectedLanguageToLocalStorage(JSON.stringify(selectedLanguage));
    yield put({ type: Types.SET_SELECTED_LANGUAGE, selectedLanguage });
    changeLanguage(selectedLanguage);

    if (!isNullOrEmpty(selectedLanguage) && selectedLanguage !== currentLanguage) {
      AnalyticsService.track(PANEL_EVENTS.APP_LANGUAGE_CHANGED.EVENT_NAME, {
        ...(selectedLanguage ? { new: selectedLanguage } : undefined),
        ...(currentLanguage ? { old: currentLanguage } : undefined),
      });
    }
  }
}

export default function* languageSelection() {
  yield all([fork(initializeSelectedLanguageFromStorage), fork(languageSelectionFlow)]);
}
