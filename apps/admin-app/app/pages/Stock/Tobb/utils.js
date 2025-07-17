import { camelCase, isArray, startCase } from 'lodash';

import { t } from '@shared/i18n';
import { exportExcel } from '@shared/utils/common';

export const getTitle = key => (key ? startCase(camelCase(key)) : '');

export const getPropertyValue = (obj, propertyName) => (obj ? obj[propertyName] || '' : '');

export const getFormattedAddressProperty = (obj, propertyName) => {
  if (isArray(obj)) {
    const address = obj.find(item => item.adresTipi === '2');
    return getPropertyValue(address, propertyName);
  }
  return getPropertyValue(obj, propertyName);
};

export const getFullAddress = address => {
  if (!address) {
    return '';
  }

  const {
    caddeSokak,
    disKapiNo,
    icKapiNo,
    ilAdi,
    ilceAdi,
    ilceKodu,
    mahalleSemt,
  } = address;

  return `${caddeSokak}, Dış Kapı No: ${disKapiNo}, İç Kapı No: ${icKapiNo}, ${ilAdi}, ${ilceAdi}, İlçe Kodu: ${ilceKodu}, Mahalle/Semt: ${mahalleSemt}`;
};

export const getFormattedAddress = obj => {
  if (isArray(obj)) {
    const address = obj.find(item => item.adresTipi === '2');
    return getFullAddress(address);
  }
  return getFullAddress(obj);
};

export const SIRKETIN_TURU_MAPPING = {
  1: 'Gerçek Kişi',
  2: 'Adi Ortaklık',
  3: 'Kollektif Şirket',
  4: 'Adi Komandit Şirket',
  5: 'Eshamlı Komandit Şirket',
  6: 'Limited Şirket',
  7: 'Anonim Şirket',
  8: 'Kooperatif',
  9: 'Diğer Şirket',
  10: 'Avukatlık Ortaklığı',
  11: 'İş Ortaklığı',
  12: 'Banka Şubesi',
};

export const getFormattedTobbGibRequestData = data => data?.map(item => ({
  vkn: item.vkn,
  tckn: item.tckn,
  unvan: item.unvan,
  kimlikUnvani: item.kimlikUnvani,
  ad: item.ad,
  soyad: item.soyad,
  adresBilgileri: getFormattedAddress(item.adresBilgileri),
  caddeSokak: getFormattedAddressProperty(item.adresBilgileri, 'caddeSokak'),
  disKapiNo: getFormattedAddressProperty(item.adresBilgileri, 'disKapiNo'),
  icKapiNo: getFormattedAddressProperty(item.adresBilgileri, 'icKapiNo'),
  ilAdi: getFormattedAddressProperty(item.adresBilgileri, 'ilAdi'),
  ilKodu: getFormattedAddressProperty(item.adresBilgileri, 'ilKodu'),
  ilceAdi: getFormattedAddressProperty(item.adresBilgileri, 'ilceAdi'),
  ilceKodu: getFormattedAddressProperty(item.adresBilgileri, 'ilceKodu'),
  koy: getFormattedAddressProperty(item.adresBilgileri, 'koy'),
  mahalleSemt: getFormattedAddressProperty(item.adresBilgileri, 'mahalleSemt'),
  faalTerkDurumu: item.faalTerkDurumu,
  sirketinTuru: item.sirketinTuru ? SIRKETIN_TURU_MAPPING[item.sirketinTuru] : '',
  vergiDairesiAdi: item.vergiDairesiAdi,
  mersisNo: item.mersisNo,
  basitusuldeKazanc: item.basitusuldeKazanc ? t('global:YES') : t('global:NO'),
  esnafMuafiyeti: item.esnafMuafiyeti ? t('global:YES') : t('global:NO'),
  gelirvrgkanun20bMuafiyeti: item.gelirvrgkanun20bMuafiyeti ? t('global:YES') : t('global:NO'),
}));

export const columns = [
  {
    title: 'VKN',
    key: 'vkn',
    default: '',
  },
  {
    title: getTitle('tckn'),
    key: 'tckn',
    default: '',
  },
  {
    title: getTitle('unvan'),
    key: 'unvan',
    default: '',
  },
  {
    title: getTitle('kimlikUnvani'),
    key: 'kimlikUnvani',
    default: '',
  },
  {
    title: getTitle('ad'),
    key: 'ad',
    default: '',
  },
  {
    title: getTitle('soyad'),
    key: 'soyad',
    default: '',
  },
  {
    title: getTitle('adresBilgileri'),
    key: 'adresBilgileri',
    default: '',
  },
  {
    title: getTitle('caddeSokak'),
    key: 'caddeSokak',
    default: '',
  },
  {
    title: getTitle('disKapiNo'),
    key: 'disKapiNo',
    default: '',
  },
  {
    title: getTitle('icKapiNo'),
    key: 'icKapiNo',
    default: '',
  },
  {
    title: getTitle('ilAdi'),
    key: 'ilAdi',
    default: '',
  },
  {
    title: getTitle('ilKodu'),
    key: 'ilKodu',
    default: '',
  },
  {
    title: getTitle('ilceAdi'),
    key: 'ilceAdi',
    default: '',
  },
  {
    title: getTitle('ilceKodu'),
    key: 'ilceKodu',
    default: '',
  },
  {
    title: getTitle('koy'),
    key: 'koy',
    default: '',
  },
  {
    title: getTitle('mahalleSemt'),
    key: 'mahalleSemt',
    default: '',
  },
  {
    title: getTitle('basitusuldeKazanc'),
    key: 'basitusuldeKazanc',
    default: '',
  },
  {
    title: getTitle('esnafMuafiyeti'),
    key: 'esnafMuafiyeti',
    default: '',
  },
  {
    title: getTitle('faalTerkDurumu'),
    key: 'faalTerkDurumu',
    default: '',
  },
  {
    title: getTitle('gelirvrgkanun20bMuafiyeti'),
    key: 'gelirvrgkanun20bMuafiyeti',
    default: '',
  },
  {
    title: getTitle('sirketinTuru'),
    key: 'sirketinTuru',
    default: '',
  },
  {
    title: getTitle('vergiDairesiAdi'),
    key: 'vergiDairesiAdi',
    default: '',
  },
  {
    title: getTitle('mersisNo'),
    key: 'mersisNo',
    default: '',
  },
];

export const exportTobbGibRequestSuccessRequestsAsCSV = data => {
  exportExcel(getFormattedTobbGibRequestData(data), `TobbGibRequest_Success_VKN_${new Date().getTime()}`, columns);
};

export const exportTobbGibRequestInvalidRequestsAsCSV = data => {
  exportExcel(
    data?.map(item => ({ vkn: item })),
    `TobbGibRequest_Invalid_VKN_${new Date().getTime()}`,
    [{
      title: 'VKN',
      key: 'vkn',
      default: '',
    }],
  );
};

export const exportTobbGibRequestFailedRequestsAsCSV = data => {
  exportExcel(
    data?.map(item => ({ vkn: item })),
    `TobbGibRequest_Failed_VKN_${new Date().getTime()}`,
    [{
      title: 'VKN',
      key: 'vkn',
      default: '',
    }],
  );
};
