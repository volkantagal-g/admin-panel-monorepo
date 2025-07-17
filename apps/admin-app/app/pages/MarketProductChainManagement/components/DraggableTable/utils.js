import { get } from 'lodash';
import { useMemo } from 'react';

import { Tag } from '@shared/components/GUI';

import {
  DOMAIN_TYPE,
  getirMarketColors,
  getirMarketDomainTypes,
} from '@app/pages/MarketProductChainManagement/constants';

const getDomainTypeInfo = domainType => {
  if (!domainType) return { domainTypeText: '', color: 'inactive' };

  const domainTypeText = get(
    getirMarketDomainTypes,
    [domainType, 'name'],
    domainType.toString(),
  );
  let color = get(getirMarketColors, [domainType], 'inactive');

  if (domainTypeText === getirMarketDomainTypes[DOMAIN_TYPE.GETIR_MORE].name) {
    color = 'secondary';
  }

  return { domainTypeText, color };
};

export const useDomainTags = (domainTypes = []) => {
  return useMemo(() => {
    if (!Array.isArray(domainTypes)) return null;
    if (!domainTypes.length) return null;

    return domainTypes.map(domainType => {
      const { domainTypeText, color } = getDomainTypeInfo(domainType);
      if (!domainTypeText) return null;

      return (
        <Tag key={domainType} color={color}>
          {domainTypeText}
        </Tag>
      );
    }).filter(Boolean);
  }, [domainTypes]);
};

export const renderDomainTags = (domainTypes = []) => {
  if (!Array.isArray(domainTypes)) return null;
  if (!domainTypes.length) return null;

  return domainTypes.map(domainType => {
    const { domainTypeText, color } = getDomainTypeInfo(domainType);
    if (!domainTypeText) return null;

    return (
      <Tag key={domainType} color={color}>
        {domainTypeText}
      </Tag>
    );
  }).filter(Boolean);
};
