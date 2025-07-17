import { testSaga } from 'redux-saga-test-plan';

import {
  SAMPLE_POPUP_ID,
  sampleGenericPopupRequest,
  sampleGenericPopupResponse,
} from '@app/pages/Popup/index.mock.data';

import { Creators } from '@app/pages/Popup/Detail/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getPopup, updatePopup } from '@shared/api/popup';
import { getPopupRequest, updatePopupRequest } from '@app/pages/Popup/Detail/redux/saga';

describe('Popup/Detail ', () => {
  const fakeError = new Error('404 Not Found');

  describe('saga #getPopupRequest', () => {
    it('should call the getPopupRequest (success)', () => {
      testSaga(getPopupRequest, { popupId: SAMPLE_POPUP_ID })
        .next()
        .call(getPopup, { popupId: SAMPLE_POPUP_ID })
        .next(sampleGenericPopupResponse)
        .put(Creators.getPopupSuccess({ sampleGenericPopupResponse }))
        .next()
        .isDone();
    });

    it('should call the getPopupRequest (failure)', () => {
      testSaga(getPopupRequest, { popupId: SAMPLE_POPUP_ID })
        .next()
        .call(getPopup, { popupId: SAMPLE_POPUP_ID })
        .next(sampleGenericPopupRequest)
        .throw(fakeError)
        .put(Creators.getPopupFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #updatePopupRequest ', () => {
    it('should call the updatePopupRequest (success)', () => {
      testSaga(updatePopupRequest, { data: sampleGenericPopupRequest, popupId: SAMPLE_POPUP_ID })
        .next()
        .call(updatePopup, { data: sampleGenericPopupRequest, id: SAMPLE_POPUP_ID })
        .next({ data: sampleGenericPopupResponse })
        .put(Creators.updatePopupSuccess({ popupDetail: sampleGenericPopupResponse }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the updatePopupRequest (failure)', () => {
      testSaga(updatePopupRequest, { data: sampleGenericPopupRequest, popupId: SAMPLE_POPUP_ID })
        .next()
        .call(updatePopup, { data: sampleGenericPopupRequest, id: SAMPLE_POPUP_ID })
        .next(sampleGenericPopupRequest)
        .throw(fakeError)
        .put(Creators.updatePopupFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
});
