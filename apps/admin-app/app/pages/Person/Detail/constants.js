import homeMarker from '@shared/assets/markers/marker_home.png';
import { TAG_COLORS } from '@shared/shared/constants';

export const HOME_ADDRESS_PLACEMARK_OPTIONS = {
  iconLayout: 'default#image',
  iconImageHref: homeMarker,
  iconImageSize: [58, 58],
  iconImageOffset: [-29, -58],
};
export const ACTIVENESS_TAG_PROPERTY = {
  true: {
    color: TAG_COLORS.success,
    label: 'ACTIVE',
  },
  false: {
    color: TAG_COLORS.danger,
    label: 'INACTIVE',
  },
};
export const DEFAULT_PERSON_NOTE_TYPE = 'Person';
export const FILTER_COURIERS_FIELDS = 'status isActivated _id courierType personV warehouse';
export const FILTER_PICKERS_FIELDS = 'status isActivated _id personV warehouse';
export const UPLOADABLE_AVATAR_FORMATS = 'image/png, image/jpg, image/jpeg';
export const AVATAR_FORMAT = 'image/png';
export const CLIENT_SEGMENT_EMPLOYEE_DISCOUNT = 988;
export const BUCKET_FOLDER_PATH = 'person/';
export const COURIER_DISABLE_LOGIN_REASONS = {
  1: {
    tr: 'Kural İhlali',
    en: 'Violation of Law',
  },
  2: {
    tr: 'Eğitim Durumu',
    en: 'Education Status',
  },
};
export const COURIER_LOGIN_REASON = {
  tr: 'Açma İşlemi',
  en: 'Login Enabled',
};
export const PERSON_TRAINING_TYPES = {
  1: { tr: 'Güvenli Sürüş', en: 'Safe Riding' },
  2: { tr: 'Geri Kazanım Eğitimi', en: 'Recovery Training' },
  3: { tr: 'Kaza Sonrası Bilinçlendirme', en: 'Awareness After An Accident' },
  4: { tr: 'E-Bisiklet Eğitimi', en: 'E-Bike Training' },
  5: { tr: 'Go4 Eğitimi', en: 'Go4 Training' },
};
export const AVATAR_IMAGE_SIZE = 200;
export const DEFAULT_RESIZER_VALUS = {
  maxWidth: AVATAR_IMAGE_SIZE,
  maxHeight: AVATAR_IMAGE_SIZE,
  compressFormat: 'PNG',
  quality: 100,
  rotation: 0,
  outputType: 'base64',
  minWidth: AVATAR_IMAGE_SIZE,
  minHeight: AVATAR_IMAGE_SIZE,
};
export const ANT_SPACING_24 = 24;
export const DEFAULT_ROW_SPACING = [4, 4];
export const DEFAULT_COL_SPACING = {
  lg: 12,
  xs: ANT_SPACING_24,
};
