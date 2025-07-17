import { ACTIVE_AGREEMENT_TYPES as AAT } from './constants';

export const activeAgreementTypes = {
  [AAT.PRIVACY_NOTICE]: { en: 'Privacy Notice', tr: 'Aydınlatma Metni' },
  [AAT.TERMS_AND_CONDITIONS]: { en: 'Terms and Conditions of Service', tr: 'Getir\'in Hizmete İlişkin Hüküm ve Şartları' },
  [AAT.PRIVACY_POLICY]: { en: 'Privacy Policy', tr: 'Gizlilik Politikası' },
  [AAT.DATA_PROTECTION]: { en: 'Customer Personal Data Protection Policy', tr: 'Müşteri Kişisel Verilerinin Korunması Politikası' },
  [AAT.TERMS_OF_USE_OF_APP]: { en: 'Terms of Use of the App', tr: 'Getir Kullanım Koşulları' },
};
