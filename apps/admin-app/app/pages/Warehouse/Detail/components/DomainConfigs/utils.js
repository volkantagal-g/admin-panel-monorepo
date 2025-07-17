import { cloneDeep, forEach, entries, get, isNumber, isObject, isEmpty } from 'lodash';

import { removeNullOrUndefinedDeep } from '@shared/utils/common';
import { ORDER_FEE_TYPE } from '@shared/shared/constants';

const formatLayers = (config, orderFeeType) => {
  const { LAYERS, SURGE_FEE_LAYERS } = config;

  if (!orderFeeType && !LAYERS && !SURGE_FEE_LAYERS) {
    return undefined;
  }
  const newOrderDeliveryFee = {
    ...orderFeeType,
    LAYERS: LAYERS && LAYERS.length ? LAYERS.map(layer => ({ min: layer.min, fee: layer.fee })) : undefined,
    SURGE_FEE_LAYERS: SURGE_FEE_LAYERS && SURGE_FEE_LAYERS.length ? SURGE_FEE_LAYERS.map(layer => ({ min: layer.min, fee: layer.fee })) : undefined,
  };
  return newOrderDeliveryFee;
};

export const getFormattedConfigsForSave = ({ configs, warehouseDomainTypes }) => {
  const tempConfigs = cloneDeep(configs);
  forEach(entries(tempConfigs), ([domainType, value]) => {
    const cleanedValue = removeNullOrUndefinedDeep(value);
    Object.assign(value, cleanedValue);
    const parsedDomainType = parseInt(domainType, 10);
    forEach(entries(value), ([configKey, config]) => {
      if (configKey === ORDER_FEE_TYPE.SERVICE_FEE) {
        const { ORDER_SERVICE_FEE } = config;
        Object.assign(config, formatLayers(config, ORDER_SERVICE_FEE));
        delete tempConfigs[domainType].LAYERS;
      }
      if (configKey === ORDER_FEE_TYPE.DELIVERY_FEE) {
        const { ORDER_DELIVERY_FEE } = config;
        Object.assign(config, formatLayers(config, ORDER_DELIVERY_FEE));
        delete tempConfigs[domainType].LAYERS;
        const deliveryFee = get(config, 'AMOUNT');
        if (isNumber(deliveryFee)) {
          if (deliveryFee > 0) {
            Object.assign(config, { STRIKE_IF_CALCULATED_AMOUNT_IS_ZERO: deliveryFee });
          }
        }
        else {
          // eslint-disable-next-line no-param-reassign
          delete config.STRIKE_IF_CALCULATED_AMOUNT_IS_ZERO;
        }
      }

      if (!isObject(config) || isEmpty(config)) {
        delete tempConfigs[domainType][configKey];
      }
    });

    if (!warehouseDomainTypes.includes(parsedDomainType) || isEmpty(tempConfigs[domainType])) {
      delete tempConfigs[domainType];
    }
  });
  return tempConfigs;
};
