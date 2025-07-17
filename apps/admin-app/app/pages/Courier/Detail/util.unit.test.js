import {
  getOrderStatusColor,
  getReturnStatusColor,
  getCourierNextArtisanOrderId,
  isCourierDomainTypeGetirLocals,
  getLastBusyOptionText,
  getPersonalInfo,
  getRelativeInfo,
  getCourierBatchOrderAvatars,
  getDefaultMapState,
  getCallerTypeTranslation,
} from './utils';
import {
  courierMockedTasksList,
  courierMockedBatchList,
  mockedLogDiff,
  mockedAvatars,
} from '@shared/api/courier/index.mock.data';
import { courierDetailMock } from '@shared/api/courierHandler/index.mock.data';

const MOCKED_LOCALS_COURIER = {
  domainTypes: '6',
  serviceDomainTypes: '6',
};

const MOCKED_GETIR10_COURIER = {
  domainTypes: '1',
  serviceDomainTypes: '1',
};

describe('Courier Detail utils', () => {
  describe('#getOrderStatusColor', () => {
    it('should return default color', () => {
      expect(getOrderStatusColor(200)).toEqual('default');
    });
    it('should return success color', () => {
      expect(getOrderStatusColor(700)).toEqual('#5cb85c');
    });
    it('should return danger color', () => {
      expect(getOrderStatusColor(1500)).toEqual('#d9534f');
    });
  });

  describe('#getReturnStatusColor', () => {
    it('should return default color', () => {
      expect(getReturnStatusColor(200)).toEqual('default');
    });
    it('should return success color', () => {
      expect(getReturnStatusColor(710)).toEqual('#5cb85c');
    });
    it('should return danger color', () => {
      expect(getReturnStatusColor(900)).toEqual('#d9534f');
    });
  });

  describe('#getCourierNextArtisanOrderId', () => {
    it('should return null', () => {
      expect(getCourierNextArtisanOrderId([])).toBeNull();
    });
  });

  describe('#isCourierDomainTypeGetirLocals', () => {
    it('should return true', () => {
      expect(isCourierDomainTypeGetirLocals(MOCKED_LOCALS_COURIER)).toBeTruthy();
    });
    it('should return false', () => {
      expect(isCourierDomainTypeGetirLocals(MOCKED_GETIR10_COURIER)).toBeFalsy();
    });
  });

  describe('#getLastBusyOptionText', () => {
    it('should return empty string', () => {
      expect(getLastBusyOptionText([], '1')).toEqual();
    });
  });
  describe('#getPersonalInfo', () => {
    it('should return personel info', () => {
      expect(getPersonalInfo(courierDetailMock)).toEqual({
        uniqueIdentifier: '1',
        iban: 'TR11111111111',
        countryGsmCode: null,
        personalGsm: '5998470049',
      });
    });
  });
  describe('#getRelativeInfo', () => {
    it('should return relative info', () => {
      expect(getRelativeInfo(courierDetailMock)).toEqual({
        name: '',
        gsm: '',
        countryGsmCode: null,
        relation: undefined,
      });
    });
  });
  describe('#getCourierBatchOrderAvatars', () => {
    it('should return correct avatars', () => {
      expect(getCourierBatchOrderAvatars(courierMockedTasksList, courierMockedBatchList, mockedLogDiff)).toEqual(mockedAvatars);
    });
  });
  describe('#getDefaultMapState', () => {
    it('should return default map state', () => {
      expect(getDefaultMapState(courierDetailMock)).toEqual({
        center: [41.02111, 29.004115],
        zoom: 11,
        controls: [],
      });
    });
  });

  describe('#getCallerTypeTranslation', () => {
    it('should return undefined if callerType is undefined', () => {
      const callerType = undefined;
      const langKey = 'en';
      const result = getCallerTypeTranslation(callerType, langKey);
      expect(result).toEqual(undefined);
    });

    it('should return undefined if callerType is not one of the defined callerTypes', () => {
      const callerType = -3;
      const langKey = 'en';
      const result = getCallerTypeTranslation(callerType, langKey);
      expect(result).toEqual(undefined);
    });

    it('should return correct translation', () => {
      const callerType = -1;
      const langKey = 'en';
      const result = getCallerTypeTranslation(callerType, langKey);
      expect(result).toEqual('Unknown');
    });
  });
});
