import { testSaga } from 'redux-saga-test-plan';

import {
  getAlgorithmDomainConfigDetail,
  getAlgorithmDomainConfigValue, getAlgorithmDomainSettings, getWarehouseDetail, updateAlgorithmDomainConfigValue,
  watchGetAlgorithmDomainConfigDetailRequest,
  watchGetAlgorithmDomainConfigValueRequest, watchGetAlgorithmDomainSettingsRequest, watchGetWarehouseDetail, watchUpdateAlgorithmDomainConfigValueRequest,
} from '@app/pages/Algorithm/Config/Domain/Base/Detail/redux/saga';
import { Creators, Types } from '@app/pages/Algorithm/Config/Domain/Base/Detail/redux/actions';
import { getDomainConfigDetail, getDomainConfigValue, getDomainSettings, updateDomainConfigValue } from '@shared/api/algorithm/config';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getWarehouseById } from '@shared/api/warehouse';

describe('AlgorithmDomainConfigDetail', () => {
  describe('saga #getAlgorithmDomainConfigDetail', () => {
    const fakeRequestData = {
      namespace: 'food',
      key: '123',
    };
    const fakeResponseData = { data: { alias: 'config_value' } };

    it('should call the getAlgorithmDomainConfigDetail (success)', () => {
      testSaga(getAlgorithmDomainConfigDetail, fakeRequestData)
        .next()
        .call(getDomainConfigDetail, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getAlgorithmDomainConfigDetailSuccess(fakeResponseData))
        .next()
        .isDone();
    });

    it('should call the getAlgorithmDomainConfigDetail (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getAlgorithmDomainConfigDetail, fakeRequestData)
        .next()
        .call(getDomainConfigDetail, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getAlgorithmDomainConfigDetailFailure({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetAlgorithmDomainConfigDetailRequest', () => {
    it('should call the watchGetAlgorithmDomainConfigDetailRequest', () => {
      testSaga(watchGetAlgorithmDomainConfigDetailRequest)
        .next()
        .takeLatest(Types.GET_ALGORITHM_DOMAIN_CONFIG_DETAIL_REQUEST, getAlgorithmDomainConfigDetail)
        .next()
        .isDone();
    });
  });

  describe('saga #getAlgorithmDomainConfigValue', () => {
    const fakeRequestData = {
      namespace: 'food',
      key: '123',
    };
    const fakeResponseData = { data: { alias: 'config_value' } };

    it('should call the getAlgorithmDomainConfigValue (success)', () => {
      testSaga(getAlgorithmDomainConfigValue, fakeRequestData)
        .next()
        .call(getDomainConfigValue, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getAlgorithmDomainConfigValueSuccess(fakeResponseData))
        .next()
        .isDone();
    });

    it('should call the getAlgorithmDomainConfigValue (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getAlgorithmDomainConfigValue, fakeRequestData)
        .next()
        .call(getDomainConfigValue, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getAlgorithmDomainConfigValueFailure({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetAlgorithmDomainConfigValueRequest', () => {
    it('should call the watchGetAlgorithmDomainConfigValueRequest', () => {
      testSaga(watchGetAlgorithmDomainConfigValueRequest)
        .next()
        .takeLatest(Types.GET_ALGORITHM_DOMAIN_CONFIG_VALUE_REQUEST, getAlgorithmDomainConfigValue)
        .next()
        .isDone();
    });
  });

  describe('saga #getAlgorithmDomainSettings', () => {
    const fakeRequestData = { namespace: 'food' };
    const fakeResponseData = { data: { alias: 'config_value' } };

    it('should call the getAlgorithmDomainSettings (success)', () => {
      testSaga(getAlgorithmDomainSettings, fakeRequestData)
        .next()
        .call(getDomainSettings, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getAlgorithmDomainSettingsSuccess(fakeResponseData))
        .next()
        .isDone();
    });

    it('should call the getAlgorithmDomainSettings (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getAlgorithmDomainSettings, fakeRequestData)
        .next()
        .call(getDomainSettings, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getAlgorithmDomainSettingsFailure({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetAlgorithmDomainSettingsRequest', () => {
    it('should call the watchGetAlgorithmDomainSettingsRequest', () => {
      testSaga(watchGetAlgorithmDomainSettingsRequest)
        .next()
        .takeLatest(Types.GET_ALGORITHM_DOMAIN_SETTINGS_REQUEST, getAlgorithmDomainSettings)
        .next()
        .isDone();
    });
  });

  describe('saga #updateAlgorithmDomainConfigValue', () => {
    const fakeRequestData = { key: '123', namespace: 'food', value: 'abc' };
    const fakeResponseData = { data: { alias: 'config_value' } };

    it('should call the updateAlgorithmDomainConfigValue (success)', () => {
      testSaga(updateAlgorithmDomainConfigValue, fakeRequestData)
        .next()
        .call(updateDomainConfigValue, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.updateAlgorithmDomainConfigValueSuccess(fakeResponseData))
        .next()
        .put(ToastCreators.success())
        .next()
        .put(Creators.getAlgorithmDomainConfigDetailRequest({ namespace: 'food', key: '123' }))
        .next()
        .put(Creators.getAlgorithmDomainConfigValueRequest({ namespace: 'food', key: '123' }))
        .next()
        .isDone();
    });

    it('should call the updateAlgorithmDomainConfigValue (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(updateAlgorithmDomainConfigValue, fakeRequestData)
        .next()
        .call(updateDomainConfigValue, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.updateAlgorithmDomainConfigValueFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchUpdateAlgorithmDomainConfigValueRequest', () => {
    it('should call the watchUpdateAlgorithmDomainConfigValueRequest', () => {
      testSaga(watchUpdateAlgorithmDomainConfigValueRequest)
        .next()
        .takeLatest(Types.UPDATE_ALGORITHM_DOMAIN_CONFIG_VALUE_REQUEST, updateAlgorithmDomainConfigValue)
        .next()
        .isDone();
    });
  });

  describe('saga #getWarehouseDetail', () => {
    const fakeRequestData = { id: '123' };
    const fakeResponseData = { alias: 'config_value' };

    it('should call the getWarehouseDetail (success)', () => {
      testSaga(getWarehouseDetail, { key: '123' })
        .next()
        .call(getWarehouseById, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getWarehouseDetailSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getWarehouseDetail (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getWarehouseDetail, { key: '123' })
        .next()
        .call(getWarehouseById, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getWarehouseDetailFailure({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetWarehouseDetail', () => {
    it('should call the watchGetWarehouseDetail', () => {
      testSaga(watchGetWarehouseDetail)
        .next()
        .takeLatest(Types.GET_WAREHOUSE_DETAIL_REQUEST, getWarehouseDetail)
        .next()
        .isDone();
    });
  });
});
