import { BANNER_COMPONENT_IMAGE_SIZE, COMPONENT_TYPE } from '@app/pages/Banner/constants';
import { t as translationKey } from '@shared/i18n';

export const statusTypeOptions = {
  1: { en: 'Inactive', tr: 'İnaktif' },
  2: { en: 'Active', tr: 'Aktif' },
};

export const requestErrorReasonOptions = {
  INVALID_PATH_VARIABLE: {
    en: 'İnvalid path variable',
    tr: 'Hatalı url parametresi',
  },
  ENTITY_NOT_FOUND: {
    en: 'Banner Not Found',
    tr: 'Banner Bulunamadı',
  },
  ACCESS_DENIED: {
    en: 'You need to change the country selection to see this banner.',
    tr: 'Bu banneri görebilmek için ülke seçimini değiştirmeniz gerekmektedir.',
  },
};

export const bannerTypes = {
  1: { en: 'Generic', tr: 'Jenerik' },
  2: { en: 'Promo', tr: 'Promosyon' },
  3: { en: 'Advert Banner', tr: 'Reklam Bannerı' },
};

export const componentTypes = {
  [COMPONENT_TYPE.MINI]: { en: 'Mini', tr: 'Mini' },
  [COMPONENT_TYPE.DYNAMIC_CARD]: { en: 'Dynamic Card', tr: 'Dinamik Kart' },
  [COMPONENT_TYPE.GAME_COMPONENT]: { en: 'Game Component', tr: 'Game Component' },
  [COMPONENT_TYPE.STANDARD]: { en: 'Standard', tr: 'Standard' },
  [COMPONENT_TYPE.MAXI]: { en: 'Maxi', tr: 'Maxi' },
};

export const imageCarousel = {
  MAIN_IMAGE: {
    name: 'picName',
    cdnUrlFieldName: 'picUrl',
    label: translationKey('marketing:MAIN_IMAGE'),
    eligableComponentTypes: [COMPONENT_TYPE.STANDARD],
    width: BANNER_COMPONENT_IMAGE_SIZE[COMPONENT_TYPE.STANDARD].width,
    height: BANNER_COMPONENT_IMAGE_SIZE[COMPONENT_TYPE.STANDARD].height,
  },
  MINI_IMAGE: {
    name: 'picName',
    cdnUrlFieldName: 'picUrl',
    label: translationKey('marketing:MAIN_IMAGE'),
    eligableComponentTypes: [COMPONENT_TYPE.MINI],
    width: BANNER_COMPONENT_IMAGE_SIZE[COMPONENT_TYPE.MINI].width,
    height: BANNER_COMPONENT_IMAGE_SIZE[COMPONENT_TYPE.MINI].height,
  },
  BACKGROUND_IMAGE: {
    name: 'picBackgroundName',
    cdnUrlFieldName: 'picBackgroundUrl',
    label: translationKey('marketing:BACKGROUND_IMAGE'),
    eligableComponentTypes: [COMPONENT_TYPE.MAXI],
    width: BANNER_COMPONENT_IMAGE_SIZE[COMPONENT_TYPE.MAXI].width,
    height: BANNER_COMPONENT_IMAGE_SIZE[COMPONENT_TYPE.MAXI].height,
  },
  FOREGROUND_IMAGE: {
    name: 'picForegroundName',
    cdnUrlFieldName: 'picForegroundUrl',
    label: translationKey('marketing:FOREGROUND_IMAGE'),
    eligableComponentTypes: [COMPONENT_TYPE.MAXI],
    width: BANNER_COMPONENT_IMAGE_SIZE[COMPONENT_TYPE.MAXI].width,
    height: BANNER_COMPONENT_IMAGE_SIZE[COMPONENT_TYPE.MAXI].height,
  },
  DYNAMIC_COMPONENT_IMAGE: {
    name: 'picName',
    cdnUrlFieldName: 'picUrl',
    label: translationKey('marketing:MAIN_IMAGE'),
    eligableComponentTypes: [COMPONENT_TYPE.DYNAMIC_CARD],
    width: BANNER_COMPONENT_IMAGE_SIZE[COMPONENT_TYPE.DYNAMIC_CARD].width,
    height: BANNER_COMPONENT_IMAGE_SIZE[COMPONENT_TYPE.DYNAMIC_CARD].height,
  },
};

export const supportedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
