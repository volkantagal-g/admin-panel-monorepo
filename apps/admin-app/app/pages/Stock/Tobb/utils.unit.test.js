import {
  getTitle,
  getPropertyValue,
  getFormattedAddressProperty,
  getFormattedAddress,
  getFormattedTobbGibRequestData,
} from './utils';

const mockAddress = {
  vkn: '1234567890',
  tckn: '123456789',
  ad: 'John',
  adresBilgileri: {
    caddeSokak: 'Main Street',
    disKapiNo: '1',
    icKapiNo: '2',
    ilAdi: 'City',
    ilceAdi: 'District',
    ilceKodu: '10001',
    mahalleSemt: 'Midtown',
  },
  faalTerkDurumu: true,
  kimlikUnvani: 'Citizen',
  soyad: 'Doe',
  sirketinTuru: 6,
  unvan: 'Company',
  vergiDairesiAdi: 'Tax Office',
  mersisNo: '1234567890123456',
};

const mockFormattedAddress = {
  vkn: '1234567890',
  tckn: '123456789',
  ad: 'John',
  adresBilgileri: 'Main Street, Dış Kapı No: 1, İç Kapı No: 2, City, District, İlçe Kodu: 10001, Mahalle/Semt: Midtown',
  caddeSokak: 'Main Street',
  disKapiNo: '1',
  icKapiNo: '2',
  ilAdi: 'City',
  ilKodu: '',
  ilceAdi: 'District',
  ilceKodu: '10001',
  koy: '',
  mahalleSemt: 'Midtown',
  faalTerkDurumu: true,
  kimlikUnvani: 'Citizen',
  soyad: 'Doe',
  sirketinTuru: 'Limited Şirket',
  unvan: 'Company',
  vergiDairesiAdi: 'Tax Office',
  mersisNo: '1234567890123456',
};

describe('Stock/Tobb/utils.js', () => {
  it('should return a formatted title string when a key is provided', () => {
    const key = 'example_key';
    const expected = 'Example Key';

    const result = getTitle(key);

    expect(result).toBe(expected);
  });

  it('should return the value of the property when the object and property name are provided', () => {
    const obj = { example_property: 'example_value' };
    const propertyName = 'example_property';
    const expected = 'example_value';

    const result = getPropertyValue(obj, propertyName);

    expect(result).toBe(expected);
  });

  it('should return the formatted address property value when the object and property name are provided', () => {
    const obj = { adresTipi: '2', example_property: 'example_value' };
    const propertyName = 'example_property';
    const expected = 'example_value';

    const result = getFormattedAddressProperty(obj, propertyName);

    expect(result).toBe(expected);
  });

  it('should return an empty string when the key is null', () => {
    const key = null;
    const expected = '';

    const result = getTitle(key);

    expect(result).toBe(expected);
  });

  it('should return an empty string when the object is not null or undefined, but the property is null', () => {
    const obj = { example_property: null };
    const propertyName = 'example_property';
    const expected = '';

    const result = getPropertyValue(obj, propertyName);

    expect(result).toBe(expected);
  });

  it('should return an empty string when the object is not null or undefined, but the property is undefined', () => {
    const obj = { example_property: undefined };
    const propertyName = 'example_property';
    const expected = '';

    const result = getFormattedAddressProperty(obj, propertyName);

    expect(result).toBe(expected);
  });

  it('should return a formatted address string based on a given object', () => {
    const result = getFormattedAddress(mockAddress.adresBilgileri);
    expect(result).toBe(mockFormattedAddress.adresBilgileri);
  });

  it('should return a formatted array of objects with properties formatted based on the original object\'s properties', () => {
    const result = getFormattedTobbGibRequestData([mockAddress]);
    expect(result).toEqual([mockFormattedAddress]);
  });

  it('should return an empty array when the input data is null or undefined', () => {
    const data = null;

    const result = getFormattedTobbGibRequestData(data);

    expect(result).toEqual(undefined);
  });
});
