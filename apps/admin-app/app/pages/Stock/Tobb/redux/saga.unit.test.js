import { testSaga } from 'redux-saga-test-plan';
import { put } from 'redux-saga-test-plan/matchers';

import { getTobbGibRequest } from '@shared/api/tobb';
import { mockedVKNId, mockedGetTobbGibRequest } from '@shared/api/tobb/index.mock.data';
import { Types, Creators } from '@app/pages/Stock/Tobb/redux/actions';
import {
  getTobbGibRequestRequest,
  watchGetTobbGibRequestRequest,
  exportTobbGibRequestSuccessRequests,
  watchExportTobbGibRequestSuccessRequests,
  exportTobbGibRequestInvalidRequests,
  watchExportTobbGibRequestInvalidRequests,
  exportTobbGibRequestFailedRequests,
  watchExportTobbGibRequestFailedRequests,
} from '@app/pages/Stock/Tobb/redux/saga';
import { getTobbGibRequestSelector } from '@app/pages/Stock/Tobb/redux/selectors';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

global.URL.createObjectURL = jest.fn(); // needed for exportExcel()

const processedRequests = [
  {
    ad: '',
    adresBilgileri: {
      adresTipi: '2',
      adresTipiAciklamasi: 'İşyeri Adresi',
      beldeBucak: '',
      caddeSokak: 'MANAS BLV.',
      disKapiNo: '39',
      icKapiNo: '3809',
      ilAdi: 'İZMİR',
      ilKodu: '35',
      ilceAdi: 'BAYRAKLI',
      ilceKodu: '2056',
      koy: '',
      mahalleSemt: 'ADALET MAH.',
    },
    babaAdi: '',
    dogumYeri: '1819',
    durum: {
      durumKodAciklamasi: 'işlem Başarılı.',
      durumKodu: '1000',
      hataDetayBilgisi: '',
      sonuc: true,
    },
    faalTerkDurumu: '1',
    iseBaslamaTarihi: '20170614',
    isiBirakmaTarihi: '',
    kimlikPotansiyel: '1',
    kimlikUnvani: 'PASAPORT HAZIR YİYECEK SANAYİ VE TİCARET ANONİM ŞİRKETİ',
    kurulusTarihi: '20151221',
    NACEFaaliyetKoduveTanimi: {
      faaliyetAdi: 'BELLİ BİR MALA TAHSİS EDİLMEMİŞ MAĞAZALARDA GIDA (DONDURULMAMIŞ), İÇECEK VE TÜTÜN TOPTAN TİCARETİ',
      faaliyetKodu: '463902',
      sira: '1',
    },
    sirketinTuru: '7',
    soyad: '',
    tamDarMukellefiyet: '1',
    tckn: '',
    unvan: 'PASAPORT HAZIR YİYECEK SANAYİ VE TİCARET ANONİM ŞİRKETİ',
    vergiDairesiAdi: 'KARŞIYAKA VERGİ DAİRESİ MÜD.',
    vergiDairesiKodu: '035256',
    vkn: '7220492047',
    mersisNo: '0722049204700001',
    mersisDurum: '1',
  },
];

const processedInvalidRequests = ['30683923778'];

describe('Stock/Tobb ', () => {
  const errMessage = '404 Not Found';
  describe('saga #getTobbGibRequestRequest', () => {
    const requestData = { ids: [mockedVKNId], isRetryFailedRequests: true };

    it('should call the getTobbGibRequest - when isRetryFailedRequests is true (success)', () => {
      testSaga(getTobbGibRequestRequest, requestData)
        .next()
        .select(getTobbGibRequestSelector.getData)
        .next(processedRequests)
        .select(getTobbGibRequestSelector.getInvalidRequests)
        .next(processedInvalidRequests)
        .put(Creators.resetTobbGibRequestProcessedRequests({ processedRequests: [processedRequests[0].vkn] }))
        .next()
        .call(getTobbGibRequest, { ids: requestData.ids })
        .next(mockedGetTobbGibRequest)
        .put(Creators.setTobbGibRequestProcessedRequests({ processedRequests: [mockedVKNId] }))
        .next()
        .put(Creators.getTobbGibRequestSuccess({
          data: [...processedRequests, ...mockedGetTobbGibRequest.successRequests],
          invalidRequests: [...processedInvalidRequests, ...mockedGetTobbGibRequest.invalidRequests],
          failedRequests: mockedGetTobbGibRequest.failedRequests,
        }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the getTobbGibRequest - when isRetryFailedRequests is true and throws error (success)', () => {
      testSaga(getTobbGibRequestRequest, requestData)
        .next()
        .select(getTobbGibRequestSelector.getData)
        .next(processedRequests)
        .select(getTobbGibRequestSelector.getInvalidRequests)
        .next(processedInvalidRequests)
        .put(Creators.resetTobbGibRequestProcessedRequests({ processedRequests: [processedRequests[0].vkn] }))
        .next()
        .call(getTobbGibRequest, { ids: requestData.ids })
        .throw({ message: errMessage })
        .put(Creators.setTobbGibRequestProcessedRequests({ processedRequests: requestData.ids }))
        .next()
        .put(Creators.getTobbGibRequestSuccess({
          data: processedRequests,
          invalidRequests: processedInvalidRequests,
          failedRequests: requestData.ids,
        }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the getTobbGibRequest - when isRetryFailedRequests is true (failure)', () => {
      testSaga(getTobbGibRequestRequest, requestData)
        .next()
        .select(getTobbGibRequestSelector.getData)
        .next(processedRequests)
        .select(getTobbGibRequestSelector.getInvalidRequests)
        .next(processedInvalidRequests)
        .put(Creators.resetTobbGibRequestProcessedRequests({ processedRequests: [processedRequests[0].vkn] }))
        .next()
        .call(getTobbGibRequest, { ids: requestData.ids })
        .next(mockedGetTobbGibRequest)
        .put(Creators.setTobbGibRequestProcessedRequests({ processedRequests: [mockedVKNId] }))
        .next()
        .throw({ message: errMessage })
        .put(Creators.getTobbGibRequestFailure({
          error: { message: errMessage },
          data: [...processedRequests, ...mockedGetTobbGibRequest.successRequests],
          invalidRequests: [...processedInvalidRequests, ...mockedGetTobbGibRequest.invalidRequests],
          failedRequests: mockedGetTobbGibRequest.failedRequests,
        }))
        .next()
        .put(ToastCreators.error({ error: { message: errMessage } }))
        .next()
        .isDone();
    });

    it('should call the getTobbGibRequest - when isRetryFailedRequests is false (success)', () => {
      testSaga(getTobbGibRequestRequest, { ids: requestData.ids, isRetryFailedRequests: false })
        .next()
        .put(Creators.resetTobbGibRequestProcessedRequests({ processedRequests: [] }))
        .next()
        .call(getTobbGibRequest, { ids: requestData.ids })
        .next(mockedGetTobbGibRequest)
        .put(Creators.setTobbGibRequestProcessedRequests({ processedRequests: [mockedVKNId] }))
        .next()
        .put(Creators.getTobbGibRequestSuccess({
          data: mockedGetTobbGibRequest.successRequests,
          invalidRequests: mockedGetTobbGibRequest.invalidRequests,
          failedRequests: mockedGetTobbGibRequest.failedRequests,
        }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the getTobbGibRequest - when isRetryFailedRequests is false and throws error (success)', () => {
      testSaga(getTobbGibRequestRequest, { ids: requestData.ids, isRetryFailedRequests: false })
        .next()
        .put(Creators.resetTobbGibRequestProcessedRequests({ processedRequests: [] }))
        .next()
        .call(getTobbGibRequest, { ids: requestData.ids })
        .throw({ message: errMessage })
        .put(Creators.setTobbGibRequestProcessedRequests({ processedRequests: requestData.ids }))
        .next()
        .put(Creators.getTobbGibRequestSuccess({
          data: [],
          invalidRequests: [],
          failedRequests: requestData.ids,
        }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the getTobbGibRequest - when isRetryFailedRequests is false (failure)', () => {
      testSaga(getTobbGibRequestRequest, { ids: requestData.ids, isRetryFailedRequests: false })
        .next()
        .put(Creators.resetTobbGibRequestProcessedRequests({ processedRequests: [] }))
        .next()
        .call(getTobbGibRequest, { ids: requestData.ids })
        .next(mockedGetTobbGibRequest)
        .put(Creators.setTobbGibRequestProcessedRequests({ processedRequests: [mockedVKNId] }))
        .next()
        .throw({ message: errMessage })
        .put(Creators.getTobbGibRequestFailure({
          error: { message: errMessage },
          data: mockedGetTobbGibRequest.successRequests,
          invalidRequests: mockedGetTobbGibRequest.invalidRequests,
          failedRequests: mockedGetTobbGibRequest.failedRequests,
        }))
        .next()
        .put(ToastCreators.error({ error: { message: errMessage } }))
        .next()
        .isDone();
    });

    it('should call the watchGetTobbGibRequestRequest', () => {
      testSaga(watchGetTobbGibRequestRequest)
        .next()
        .takeLatest(Types.GET_TOBB_GIB_REQUEST_REQUEST, getTobbGibRequestRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #exportTobbGibRequestSuccessRequests', () => {
    it('should call the exportTobbGibRequestSuccessRequests (success)', async () => {
      const saga = exportTobbGibRequestSuccessRequests({ data: mockedGetTobbGibRequest.successRequests });

      expect(saga.next().value).toMatchObject(put(Creators.exportTobbGibRequestSuccessRequestsSuccess()));
      expect(saga.next().value).toMatchObject(put(ToastCreators.success()));
      expect(saga.next().done).toBeTruthy();
    });

    it('should call the exportTobbGibRequestSuccessRequests (failure)', () => {
      testSaga(exportTobbGibRequestSuccessRequests, { data: mockedGetTobbGibRequest.successRequests })
        .next()
        .throw({ message: errMessage })
        .put(Creators.exportTobbGibRequestSuccessRequestsFailure({ error: { message: errMessage } }))
        .next()
        .put(ToastCreators.error({ error: { message: errMessage } }))
        .next()
        .isDone();
    });

    it('should call the watchExportTobbGibRequestSuccessRequests', () => {
      testSaga(watchExportTobbGibRequestSuccessRequests)
        .next()
        .takeLatest(Types.EXPORT_TOBB_GIB_REQUEST_SUCCESS_REQUESTS_REQUEST, exportTobbGibRequestSuccessRequests)
        .next()
        .isDone();
    });
  });

  describe('saga #exportTobbGibRequestInvalidRequests', () => {
    it('should call the exportTobbGibRequestInvalidRequests (success)', async () => {
      const saga = exportTobbGibRequestInvalidRequests({ data: mockedGetTobbGibRequest.successRequests });

      expect(saga.next().value).toMatchObject(put(Creators.exportTobbGibRequestInvalidRequestsSuccess()));
      expect(saga.next().value).toMatchObject(put(ToastCreators.success()));
      expect(saga.next().done).toBeTruthy();
    });

    it('should call the exportTobbGibRequestInvalidRequests (failure)', () => {
      testSaga(exportTobbGibRequestInvalidRequests, { data: mockedGetTobbGibRequest.successRequests })
        .next()
        .throw({ message: errMessage })
        .put(Creators.exportTobbGibRequestInvalidRequestsFailure({ error: { message: errMessage } }))
        .next()
        .put(ToastCreators.error({ error: { message: errMessage } }))
        .next()
        .isDone();
    });

    it('should call the watchExportTobbGibRequestInvalidRequests', () => {
      testSaga(watchExportTobbGibRequestInvalidRequests)
        .next()
        .takeLatest(Types.EXPORT_TOBB_GIB_REQUEST_INVALID_REQUESTS_REQUEST, exportTobbGibRequestInvalidRequests)
        .next()
        .isDone();
    });
  });

  describe('saga #exportTobbGibRequestFailedRequests', () => {
    it('should call the exportTobbGibRequestInvalidRequests (success)', async () => {
      const saga = exportTobbGibRequestFailedRequests({ data: mockedGetTobbGibRequest.successRequests });

      expect(saga.next().value).toMatchObject(put(Creators.exportTobbGibRequestFailedRequestsSuccess()));
      expect(saga.next().value).toMatchObject(put(ToastCreators.success()));
      expect(saga.next().done).toBeTruthy();
    });

    it('should call the exportTobbGibRequestFailedRequests (failure)', () => {
      testSaga(exportTobbGibRequestFailedRequests, { data: mockedGetTobbGibRequest.successRequests })
        .next()
        .throw({ message: errMessage })
        .put(Creators.exportTobbGibRequestFailedRequestsFailure({ error: { message: errMessage } }))
        .next()
        .put(ToastCreators.error({ error: { message: errMessage } }))
        .next()
        .isDone();
    });

    it('should call the watchExportTobbGibRequestFailedRequests', () => {
      testSaga(watchExportTobbGibRequestFailedRequests)
        .next()
        .takeLatest(Types.EXPORT_TOBB_GIB_REQUEST_FAILED_REQUESTS_REQUEST, exportTobbGibRequestFailedRequests)
        .next()
        .isDone();
    });
  });
});
