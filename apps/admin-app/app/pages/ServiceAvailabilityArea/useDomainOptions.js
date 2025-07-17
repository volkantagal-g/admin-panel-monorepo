import { useMemo } from 'react';

import { t } from '@shared/i18n';

import {
  GETIR_10_DOMAIN_TYPE,
  GETIR_DOMAIN_TYPE_CODES,
  GETIR_BITAKSI_DOMAIN_TYPE,
  GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
  GETIR_JOB_DOMAIN_TYPE,
  GETIR_DRIVE_DOMAIN_TYPE,
  GETIR_N11_DOMAIN_TYPE,
  GETIR_N11_QUICK_DOMAIN_TYPE,
  GETIR_SELECT_DOMAIN_TYPE,
  GETIR_GORILLAS_DOMAIN_TYPE,
  N11_DOMAIN_TYPE,
} from '@shared/shared/constants';
import { SAA_GETIR_10_CODE } from './constants';

const SAA_DOMAIN_TYPES = [
  ...GETIR_DOMAIN_TYPE_CODES,
  GETIR_BITAKSI_DOMAIN_TYPE,
  GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
  GETIR_JOB_DOMAIN_TYPE,
  GETIR_DRIVE_DOMAIN_TYPE,
  GETIR_N11_DOMAIN_TYPE,
  GETIR_N11_QUICK_DOMAIN_TYPE,
  GETIR_SELECT_DOMAIN_TYPE,
  GETIR_GORILLAS_DOMAIN_TYPE,
  N11_DOMAIN_TYPE,
];

export const useDomainOptions = () => {
  const domainOptions = useMemo(
    () => SAA_DOMAIN_TYPES.map(code => {
      const codeText = t(`global:GETIR_MARKET_DOMAIN_TYPES:${code}`);
      // replace SAA specific getir10 code
      return { value: code === GETIR_10_DOMAIN_TYPE ? SAA_GETIR_10_CODE : code, label: codeText };
    }),
    [],
  );
  return domainOptions;
};
