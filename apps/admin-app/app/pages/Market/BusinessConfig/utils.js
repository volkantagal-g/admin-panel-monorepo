import {
  marketBusinessConfigFieldValues,
  marketBusinessConfigDomainValues,
} from './constantValues';
import { marketBusinessConfig } from './constants';
import { getLangKey } from '@shared/i18n';

const langKey = getLangKey();

export const getBusinessConfigFields = () => {
  const cards = Object.entries(marketBusinessConfigFieldValues).map(([key, value]) => {
    return {
      key,
      description: value[langKey],
    };
  });
  return cards;
};

export const getBusinessConfigDomains = () => {
  const panels = Object.entries(marketBusinessConfigDomainValues).map(([key, value]) => {
    return {
      key,
      description: value[langKey],
    };
  });
  return panels;
};

export const getBusinessConfigKeysByDomains = ({ configKeys }) => {
  const businessDomainConfigKeys = Object.entries(configKeys).map(([key, value]) => {
    return {
      key,
      configType: value.configType,
      description: value.description[langKey],
    };
  });
  return businessDomainConfigKeys;
};

export const getAllConfigKeyTypePairs = () => {
  const configKeys = [];
  getBusinessConfigFields().forEach(businessConfigField => {
    getBusinessConfigDomains().forEach(businessConfigDomain => {
      const marketBusinessConfigField = marketBusinessConfig[businessConfigField.key];
      const marketBusinessConfigDomain = marketBusinessConfigField.configKeys[businessConfigDomain.key];
      const marketBusinessConfigDomainConfigKeys = getBusinessConfigKeysByDomains({ configKeys: marketBusinessConfigDomain.configKeys })
        .map(configKeyByDomain => {
          return {
            key: configKeyByDomain.key,
            type: configKeyByDomain.configType,
          };
        });
      configKeys.push(...marketBusinessConfigDomainConfigKeys);
    });
  });
  return configKeys;
};
