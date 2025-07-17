import { testSaga } from 'redux-saga-test-plan';

import { SAMPLE_POPUP_ID, samplePopupRequest } from '@app/pages/Popup/index.mock.data';

import { Creators } from '@app/pages/Popup/New/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createPopup } from '@shared/api/popup';
import { createPopupRequest } from '@app/pages/Popup/New/redux/saga';

describe('Popup/New ', () => {
  const fakeError = new Error('404 Not Found');

  describe('saga #createPopupRequest', () => {
    it('should call the createPopup (success)', () => {
      testSaga(createPopupRequest, { data: samplePopupRequest })
        .next()
        .call(createPopup, samplePopupRequest)
        .next({ data: { id: SAMPLE_POPUP_ID, ...samplePopupRequest } })
        .put(Creators.createPopupSuccess({ data: { id: SAMPLE_POPUP_ID, ...samplePopupRequest } }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the createPopup (failure)', () => {
      testSaga(createPopupRequest, { data: samplePopupRequest })
        .next()
        .call(createPopup, samplePopupRequest)
        .throw(fakeError)
        .put(Creators.createPopupFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
});
