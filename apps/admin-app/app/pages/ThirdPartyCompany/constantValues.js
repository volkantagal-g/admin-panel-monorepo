import {
  THIRD_PARTY_COMPANY_STATUSES,
  THIRD_PARTY_COMPANY_CREDENTIAL_ENVIRONMENTS,
  THIRD_PARTY_COMPANY_CREDENTIAL_ENVIRONMENTS_IN_STRINGS,
} from '@app/pages/ThirdPartyCompany/constants';

export const thirdPartyCompanyCredentialEnvironments = {
  [THIRD_PARTY_COMPANY_CREDENTIAL_ENVIRONMENTS.DEV]: { en: 'dev', tr: 'dev' },
  [THIRD_PARTY_COMPANY_CREDENTIAL_ENVIRONMENTS.PROD]: { en: 'prod', tr: 'prod' },
  [THIRD_PARTY_COMPANY_CREDENTIAL_ENVIRONMENTS.TEST]: { en: 'test', tr: 'test' },
  [THIRD_PARTY_COMPANY_CREDENTIAL_ENVIRONMENTS.STAGE]: { en: 'stage', tr: 'stage' },
};

export const thirdPartyCompanyCredentialEnvironmentsByStrings = {
  [THIRD_PARTY_COMPANY_CREDENTIAL_ENVIRONMENTS_IN_STRINGS.DEV]: { en: 'dev', tr: 'dev' },
  [THIRD_PARTY_COMPANY_CREDENTIAL_ENVIRONMENTS_IN_STRINGS.PROD]: { en: 'prod', tr: 'prod' },
  [THIRD_PARTY_COMPANY_CREDENTIAL_ENVIRONMENTS_IN_STRINGS.TEST]: { en: 'test', tr: 'test' },
  [THIRD_PARTY_COMPANY_CREDENTIAL_ENVIRONMENTS_IN_STRINGS.STAGE]: { en: 'stage', tr: 'stage' },
};

export const thirdPartyCompanyStatuses = {
  [THIRD_PARTY_COMPANY_STATUSES.DELETED]: { en: 'Deleted', tr: 'Silinmiş' },
  [THIRD_PARTY_COMPANY_STATUSES.INACTIVE]: { en: 'Inactive', tr: 'İnaktif' },
  [THIRD_PARTY_COMPANY_STATUSES.ACTIVE]: { en: 'Active', tr: 'Aktif' },
};

export const thirdPartyCompanyCredentialEnvironmentsFlat = [
  'dev',
  'prod',
  'test',
  'stage',
];
