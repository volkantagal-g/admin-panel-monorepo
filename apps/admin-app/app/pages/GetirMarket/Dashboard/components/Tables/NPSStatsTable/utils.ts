import { intersection, isEmpty } from 'lodash';

import { NPS_ENABLED_DOMAIN_TYPES } from '../../../constants';
import { GETIR_DRIVE_DOMAIN_TYPE } from '@shared/shared/constants';

type NPSStatsType = {
  domainType: number | string;
  totalPromoterCount: number;
  totalDetractorCount: number;
  totalSurveyCount: number;
};

type BreakdownsType = {
  [key: string]: string[];
};

const BREAKDOWNS: BreakdownsType = { [GETIR_DRIVE_DOMAIN_TYPE]: ['GETIR', 'MOOV'] };

export const getFormattedNPSStats = (data: NPSStatsType[], availableDomainTypes: (string | number)[]) => {
  if (isEmpty(data)) return data;

  const commonDomainTypes = intersection(availableDomainTypes, NPS_ENABLED_DOMAIN_TYPES);
  const commonDomainTypesMap: { [x: string | number]: any } = {};

  commonDomainTypes.forEach((domainType: string | number) => {
    if (BREAKDOWNS[domainType]) {
      BREAKDOWNS[domainType].forEach(breakdown => {
        commonDomainTypesMap[`${domainType}__${breakdown}`] = { domainType: `${domainType}__${breakdown}`, ratio: 'N/A' };
      });
    }
    else {
      commonDomainTypesMap[domainType] = { domainType, ratio: 'N/A' };
    }
  });

  data.forEach((item: NPSStatsType) => {
    if (commonDomainTypesMap[item.domainType]) {
      commonDomainTypesMap[item.domainType].ratio = (((item.totalPromoterCount - item.totalDetractorCount) * 100) / item.totalSurveyCount);
    }
  });

  return Object.values(commonDomainTypesMap);
};
