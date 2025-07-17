import {
  convertCountryOptions,
  disableLoginOfCouriersRequestParams,
  getCountryById,
  getDefaultMapState,
  removeRegionSubstringInUrl,
  updatePersonalInfoRequestParams,
  updateRelativeInfoRequestParams,
} from './utils';
import { getLangKey } from '@shared/i18n';
import {
  DEFAULT_MAP_COORDINATES,
  DEFAULT_MAP_ZOOM,
} from '@shared/shared/constants';

describe('Person Detail utils', () => {
  const countryList = [
    {
      _id: '55999ad00000010000000000',
      name: {
        en: 'Turkey',
        de: 'Türkei',
        fr: 'Turquie',
        nl: 'Turkije',
        tr: 'Türkiye',
        es: 'Turquía',
        it: 'Turchia',
        pt: 'Turquia',
        'en-US': 'Turkey',
      },
      dialingCode: 90,
    },
    {
      _id: '55999ad00000020000000000',
      name: {
        en: 'United Kingdom',
        de: 'Vereinigtes Königreich',
        fr: 'Royaume-Uni',
        nl: 'Verenigd Koninkrijk',
        tr: 'İngiltere',
        es: 'Reino Unido',
        it: 'Regno Unito',
        pt: 'Reino Unido',
        'en-US': 'United Kingdom',
      },
      dialingCode: 44,
    },
  ];
  describe('convertCountryOptions', () => {
    it('should return correct options', () => {
      const expectedResult = [
        {
          data: {
            code: countryList[0].dialingCode,
            name: countryList[0].name,
          },
          value: countryList[0].name[getLangKey()],
        },
        {
          data: {
            code: countryList[1].dialingCode,
            name: countryList[1].name,
          },
          value: countryList[1].name[getLangKey()],
        },
      ];
      const result = convertCountryOptions({ countryList });

      expect(result).toEqual(expectedResult);
    });
  });
  describe('getCountryById', () => {
    it('should return correct country', () => {
      const countryId = '55999ad00000020000000000';
      const expectedResult = countryList[1];
      const result = getCountryById(countryId, countryList);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('updatePersonalInfoRequestParams', () => {
    it('should return correct country', () => {
      const formValues = {
        uniqueIdentifier: '65455087592',
        country: '55999ad00000010000000000',
        countryGsmCode: '90',
        personalGsm: '5319221767',
        shouldAddEmployeeDiscount: false,
      };
      const expectedResult = {
        uniqueIdentifier: '65455087592',
        tc: '65455087592',
        country: '55999ad00000010000000000',
        countryGsmCode: '90',
        personalGsm: '5319221767',
        shouldAddEmployeeDiscount: false,
      };
      const result = updatePersonalInfoRequestParams({ formValues });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getDefaultMapState', () => {
    it('should return correct default map states if there is coordinates', () => {
      const values = {
        location: {
          type: 'Point',
          coordinates: [29.004115, 41.02111],
        },
        description: 'asdfasd453',
      };
      const expectedResult = {
        center: [41.02111, 29.004115],
        zoom: DEFAULT_MAP_ZOOM,
        controls: [],
      };
      const result = getDefaultMapState({ values });
      expect(result).toEqual(expectedResult);
    });
    it('should return correct default map states if there is no coordinates', () => {
      const values = {
        location: { type: 'Point' },
        description: 'asdfasd453',
      };
      const expectedResult = {
        center: [DEFAULT_MAP_COORDINATES[1], DEFAULT_MAP_COORDINATES[0]],
        zoom: DEFAULT_MAP_ZOOM,
        controls: [],
      };
      const result = getDefaultMapState({ values });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('updateRelativeInfoRequestParams', () => {
    it('should return correct relative info update request params', () => {
      const formValues = {
        name: 'test',
        relation: 1,
        fullGsm: '90-4334343434',
      };
      const expectedResult = {
        relative: {
          name: 'test',
          relation: 1,
          countryGsmCode: '90',
          gsm: '4334343434',
        },
      };
      const result = updateRelativeInfoRequestParams({ formValues });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('disableLoginOfCouriersRequestParams', () => {
    it('should return correct result if login disabled', () => {
      const formValues = {
        isLoginDisabled: true,
        explanation: 'test',
        reason: 2,
      };
      const expectedResult = {
        isLoginDisabled: true,
        courierDisableReason: {
          explanation: 'test',
          reason: {
            tr: 'Eğitim Durumu',
            en: 'Education Status',
          },
        },
      };
      const result = disableLoginOfCouriersRequestParams({ formValues });
      expect(result).toEqual(expectedResult);
    });
    it('should return correct result if login enabled', () => {
      const formValues = {
        isLoginDisabled: false,
        explanation: 'test',
      };
      const expectedResult = {
        isLoginDisabled: false,
        courierDisableReason: {
          explanation: 'test',
          reason: {
            tr: 'Açma İşlemi',
            en: 'Login Enabled',
          },
        },
      };
      const result = disableLoginOfCouriersRequestParams({ formValues });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('removeRegionSubstringInUrl', () => {
    it('should return correct relative info update request params', () => {
      const url =
        'https://getir-dev.s3.eu-west-1.amazonaws.com/person/61d578c24a90159d5ecf2e2e.png?AWSAccessKeyId=ASIAWCUTMFAIGYJFPNMI&Content-Type=image%2Fpng&Expires=1706613870&Signature=i94l1TU8T51ftcB%2Bj5sLGqC35pM%3D&x-amz-acl=public-read&x-amz-security-token=IQoJb3JpZ2luX2VjEEwaCWV1LXdlc3QtMSJGMEQCIHjH%2BTON7pPyVUyrbyb1kxHB3xgpk2hj7eTwJTyu43o0AiAwGMKt000yYgcFYGqPRobT78PNlm58QtyFUVRrd1YAQSqOBQgUEAEaDDQxNzk5NDY0NzU2OCIMVeqvQXor2k4kIRaYKusElFcV9EcPYkVqY%2BUtwYBRqwsAAwrS0rsGB0%2B%2BPtu%2FCh9QLCLNC3Qsfl19530LxqGE6ia7j1f9uqBWcTHrnEWfXKMUVAx4m52EElOzJ7M7Qm2wg8w0QRASm5Pg0anEs%2F2LfHc8HqbxHotxpEjBdJUifz0vOplLIcF0QRCEsmRCY8YJErp0z9LqofjwE2Is42l9RG61W%2BC%2F5jtzL5z9KnmAMJalujVYvlTPfn9efDZcC%2FnIlzak26J3ph2bLSFVcXaddr%2FbpykLhM%2Bl%2FJ9EHpkWFBKS0W5N95smJCHTlcE8dTPCFHXZfq6%2FIQNmZLRe0w%2BlHi6ZoEpi1CvuqfLjw%2Figw6cv0HMASbnCvcUMj08xBUA7Uy4Qp7028x6gEYui9sE8imz6%2B6KDGe1grzoNaF5p5sUuUFSvovQdDVNMDv2O%2BmZzHrmSD9r4Xd6ErsZNWwVQMXYIzi8LNHW87o8wtkqIwKONwPefr9SUK534yIF%2BGdZ40wT5dHgKENPXeEYaFu6%2FJcvo41vwdhd6IqqHRyhTQ7LiFRDIwOavqA6gKDRNVHLuTJTna9%2BZDqhouz%2FkiamgPDwFrx%2BtQflLOcWkZGDcInTZGBPOZ9YMQ7hswmC8OTfkjNQTaSsOBOBGpyoAirDs60a5aSyj0FbglB%2FqCf4dHW158hp7vrhmFbTW7%2Bk2mBM2N0ZqXAzJE1WnGGit0Ts57WmlyISBho3ksTNOJQi7BA9ZfyJNi6s8DnUb7Mci0WiCAUopKvckf2ur%2FIgd9%2FG6KrFRtVtAvGb%2FnSw7jrYL3QZB3GfDnudm9I33h%2FTTRQgVD4rpI6jo%2BvLKsDDCtuOtBjqcAdrRzmrmZ8HreMdfHTKLuVirWwvPv%2BdEztzT%2FLwYjDpdqaEd0x%2FEHjLAxd%2BxB8gpbSf3H5cEB1JCp2aAiV3quL6QbHPpr2uxP78WkS83RM0StkkmpMgVF7q70ujHqR4L5%2FAgHwn3S3hRa7YdJnvtx%2BU12ys%2Be8tWys1eUcyVCtZH5ynCstfcXChk%2FfpEsjj9RMC4np1gCr9dCNupsg%3D%3D';
      const expectedResult =
        'https://getir-dev.s3.amazonaws.com/person/61d578c24a90159d5ecf2e2e.png?AWSAccessKeyId=ASIAWCUTMFAIGYJFPNMI&Content-Type=image%2Fpng&Expires=1706613870&Signature=i94l1TU8T51ftcB%2Bj5sLGqC35pM%3D&x-amz-acl=public-read&x-amz-security-token=IQoJb3JpZ2luX2VjEEwaCWV1LXdlc3QtMSJGMEQCIHjH%2BTON7pPyVUyrbyb1kxHB3xgpk2hj7eTwJTyu43o0AiAwGMKt000yYgcFYGqPRobT78PNlm58QtyFUVRrd1YAQSqOBQgUEAEaDDQxNzk5NDY0NzU2OCIMVeqvQXor2k4kIRaYKusElFcV9EcPYkVqY%2BUtwYBRqwsAAwrS0rsGB0%2B%2BPtu%2FCh9QLCLNC3Qsfl19530LxqGE6ia7j1f9uqBWcTHrnEWfXKMUVAx4m52EElOzJ7M7Qm2wg8w0QRASm5Pg0anEs%2F2LfHc8HqbxHotxpEjBdJUifz0vOplLIcF0QRCEsmRCY8YJErp0z9LqofjwE2Is42l9RG61W%2BC%2F5jtzL5z9KnmAMJalujVYvlTPfn9efDZcC%2FnIlzak26J3ph2bLSFVcXaddr%2FbpykLhM%2Bl%2FJ9EHpkWFBKS0W5N95smJCHTlcE8dTPCFHXZfq6%2FIQNmZLRe0w%2BlHi6ZoEpi1CvuqfLjw%2Figw6cv0HMASbnCvcUMj08xBUA7Uy4Qp7028x6gEYui9sE8imz6%2B6KDGe1grzoNaF5p5sUuUFSvovQdDVNMDv2O%2BmZzHrmSD9r4Xd6ErsZNWwVQMXYIzi8LNHW87o8wtkqIwKONwPefr9SUK534yIF%2BGdZ40wT5dHgKENPXeEYaFu6%2FJcvo41vwdhd6IqqHRyhTQ7LiFRDIwOavqA6gKDRNVHLuTJTna9%2BZDqhouz%2FkiamgPDwFrx%2BtQflLOcWkZGDcInTZGBPOZ9YMQ7hswmC8OTfkjNQTaSsOBOBGpyoAirDs60a5aSyj0FbglB%2FqCf4dHW158hp7vrhmFbTW7%2Bk2mBM2N0ZqXAzJE1WnGGit0Ts57WmlyISBho3ksTNOJQi7BA9ZfyJNi6s8DnUb7Mci0WiCAUopKvckf2ur%2FIgd9%2FG6KrFRtVtAvGb%2FnSw7jrYL3QZB3GfDnudm9I33h%2FTTRQgVD4rpI6jo%2BvLKsDDCtuOtBjqcAdrRzmrmZ8HreMdfHTKLuVirWwvPv%2BdEztzT%2FLwYjDpdqaEd0x%2FEHjLAxd%2BxB8gpbSf3H5cEB1JCp2aAiV3quL6QbHPpr2uxP78WkS83RM0StkkmpMgVF7q70ujHqR4L5%2FAgHwn3S3hRa7YdJnvtx%2BU12ys%2Be8tWys1eUcyVCtZH5ynCstfcXChk%2FfpEsjj9RMC4np1gCr9dCNupsg%3D%3D';
      const result = removeRegionSubstringInUrl({ url });
      expect(result).toEqual(expectedResult);
    });
  });
});
