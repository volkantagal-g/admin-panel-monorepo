/* eslint-disable camelcase */
import { isEmpty, isString } from 'lodash';

import { getirMarketBulkUploadDomainTypes } from '@app/pages/MarketFees/BulkFeeUpload/constants';
import {
  dynamicDeliveryFeeSourceCsv,
  fixedDeliveryFeeSourceCsv,
  layeredDeliveryFeeSourceCsv,
  dynamicServiceFeeSourceCsv,
  fixedServiceFeeSourceCsv,
  layeredServiceFeeSourceCsv,
  basketAmountSourceCsv,
  zoneBasedBasketAmountSourceCsv,
  zoneBasedFixedDeliveryFeeSourceCsv,
  zoneBasedLayeredDeliveryFeeSourceCsv,
} from '../feeSourceConfig';

const isValidFeeValue = fee => {
  return fee !== null && Number(fee) >= 0;
};

const hasZeroMinAndFeeValue = fees => {
  const hasZeroFee = !!fees?.find(({ fee }) => fee === 0);
  const hasZeroMin = !!fees?.find(({ min }) => min === 0);
  return {
    isValid: hasZeroFee && hasZeroMin,
    hasZeroFee,
    hasZeroMin,
  };
};

const validateDynamicAndLayeredFeesAndMinOrder = (key, fees = []) => {
  return !!fees?.reduce(
    (prev, fee) => (key === 'min' ? fee?.[key] > prev?.[key] : fee?.[key] < prev?.[key]) &&
      fee,
  );
};
const validateNonZeroDynamicAndLayeredFees = (fees, t) => {
  const feeValues = Object.values(fees)?.filter(fee => !isEmpty(fee));
  feeValues.forEach(feeValue => {
    if (!hasZeroMinAndFeeValue(feeValue).hasZeroMin) {
      throw Error(t('bulkFeeUpload:ERRORS.INVALID_MIN_BASKET_VALUE'));
    }
    else if (!hasZeroMinAndFeeValue(feeValue).hasZeroFee) {
      throw Error(t('bulkFeeUpload:ERRORS.INVALID_MIN_FEE_VALUE'));
    }
    if (!validateDynamicAndLayeredFeesAndMinOrder('min', feeValue)) {
      throw Error(t('bulkFeeUpload:ERRORS.INVALID_MIN_BASKET_VALUE_ORDER'));
    }
    else if (!validateDynamicAndLayeredFeesAndMinOrder('fee', feeValue)) {
      throw Error(t('bulkFeeUpload:ERRORS.INVALID_MIN_FEE_VALUE_ORDER'));
    }
  });
};

export const extractLayeredDeliveryFees = (data, t) => {
  const fees = data.reduce(
    (acc, curr) => {
      const {
        high,
        high_delfee: highDelfee,
        mid,
        mid_delfee: midDelfee,
        yazlik1,
        yazlik1_delfee: yazlik1Delfee,
        yazlik2,
        yazlik2_delfee: yazlik2Delfee,
        highmid,
        highmid_delfee: highmidDelfee,
        low,
        low_delfee: lowDelFee,
        peak_high,
        peak_high_delfee,
        peak_mid,
        peak_mid_delfee,
        peak_yazlik1,
        peak_yazlik1_delfee,
        peak_yazlik2,
        peak_yazlik2_delfee,
        peak_highmid,
        peak_highmid_delfee,
        peak_low,
        peak_low_delfee,
      } = curr;
      if (isValidFeeValue(high) && isValidFeeValue(highDelfee)) {
        acc.high.push({ min: high, fee: highDelfee });
      }
      if (isValidFeeValue(mid) && isValidFeeValue(midDelfee)) {
        acc.mid.push({ min: mid, fee: midDelfee });
      }
      if (isValidFeeValue(yazlik1) && isValidFeeValue(yazlik1Delfee)) {
        acc.yazlik1.push({ min: yazlik1, fee: yazlik1Delfee });
      }
      if (isValidFeeValue(yazlik2) && isValidFeeValue(yazlik2Delfee)) {
        acc.yazlik2.push({ min: yazlik2, fee: yazlik2Delfee });
      }
      if (isValidFeeValue(highmid) && isValidFeeValue(highmidDelfee)) {
        acc.highmid.push({ min: highmid, fee: highmidDelfee });
      }
      if (isValidFeeValue(low) && isValidFeeValue(lowDelFee)) {
        acc.low.push({ min: low, fee: lowDelFee });
      }
      if (isValidFeeValue(peak_high) && isValidFeeValue(peak_high_delfee)) {
        acc.peak_high.push({ min: peak_high, fee: peak_high_delfee });
      }
      if (isValidFeeValue(peak_mid) && isValidFeeValue(peak_mid_delfee)) {
        acc.peak_mid.push({ min: peak_mid, fee: peak_mid_delfee });
      }
      if (
        isValidFeeValue(peak_yazlik1) &&
        isValidFeeValue(peak_yazlik1_delfee)
      ) {
        acc.peak_yazlik1.push({
          min: peak_yazlik1,
          fee: peak_yazlik1_delfee,
        });
      }
      if (
        isValidFeeValue(peak_yazlik2) &&
        isValidFeeValue(peak_yazlik2_delfee)
      ) {
        acc.peak_yazlik2.push({
          min: peak_yazlik2,
          fee: peak_yazlik2_delfee,
        });
      }
      if (
        isValidFeeValue(peak_highmid) &&
        isValidFeeValue(peak_highmid_delfee)
      ) {
        acc.peak_highmid.push({
          min: peak_highmid,
          fee: peak_highmid_delfee,
        });
      }
      if (isValidFeeValue(peak_low) && isValidFeeValue(peak_low_delfee)) {
        acc.peak_low.push({ min: peak_low, fee: peak_low_delfee });
      }
      return acc;
    },
    {
      high: [],
      mid: [],
      low: [],
      highmid: [],
      yazlik1: [],
      yazlik2: [],
      peak_high: [],
      peak_mid: [],
      peak_low: [],
      peak_highmid: [],
      peak_yazlik1: [],
      peak_yazlik2: [],
    },
  );
  validateNonZeroDynamicAndLayeredFees(fees, t);
  const {
    high,
    mid,
    low,
    highmid,
    yazlik1,
    yazlik2,
    peak_high,
    peak_mid,
    peak_low,
    peak_highmid,
    peak_yazlik1,
    peak_yazlik2,
  } = fees;

  return {
    regular: { high, mid, low, highmid, yazlik1, yazlik2 },
    peak: {
      peak_high,
      peak_mid,
      peak_low,
      peak_highmid,
      peak_yazlik1,
      peak_yazlik2,
    },
  };
};

export const extractDynamicDeliveryFees = (data, t) => {
  const fees = data.reduce(
    (acc, curr) => {
      const {
        level_one,
        level_one_fee,
        level_two,
        level_two_fee,
        level_three,
        level_three_fee,
        level_four,
        level_four_fee,
        level_five,
        level_five_fee,
      } = curr;
      if (isValidFeeValue(level_one) && isValidFeeValue(level_one_fee)) {
        acc.level_one.push({ min: level_one, fee: level_one_fee });
      }
      if (isValidFeeValue(level_two) && isValidFeeValue(level_two_fee)) {
        acc.level_two.push({ min: level_two, fee: level_two_fee });
      }
      if (isValidFeeValue(level_three) && isValidFeeValue(level_three_fee)) {
        acc.level_three.push({ min: level_three, fee: level_three_fee });
      }
      if (isValidFeeValue(level_four) && isValidFeeValue(level_four_fee)) {
        acc.level_four.push({ min: level_four, fee: level_four_fee });
      }
      if (isValidFeeValue(level_five) && isValidFeeValue(level_five_fee)) {
        acc.level_five.push({ min: level_five, fee: level_five_fee });
      }
      return acc;
    },
    {
      level_one: [],
      level_two: [],
      level_three: [],
      level_four: [],
      level_five: [],
    },
  );
  const { level_one, level_two, level_three, level_four, level_five } = fees;
  validateNonZeroDynamicAndLayeredFees(fees, t);
  return {
    1: level_one,
    2: level_two,
    3: level_three,
    4: level_four,
    5: level_five,
  };
};
export const extractLayeredServiceFees = (data, t) => {
  const fees = data.reduce(
    (acc, curr) => {
      const {
        high,
        high_service_fee,
        mid,
        mid_service_fee,
        yazlik1,
        yazlik1_service_fee,
        yazlik2,
        yazlik2_service_fee,
        highmid,
        highmid_service_fee,
        low,
        low_service_fee,
        peak_high,
        peak_high_service_fee,
        peak_mid,
        peak_mid_service_fee,
        peak_yazlik1,
        peak_yazlik1_service_fee,
        peak_yazlik2,
        peak_yazlik2_service_fee,
        peak_highmid,
        peak_highmid_service_fee,
        peak_low,
        peak_low_service_fee,
      } = curr;
      if (isValidFeeValue(high) && isValidFeeValue(high_service_fee)) {
        acc.high.push({ min: high, fee: high_service_fee });
      }
      if (isValidFeeValue(mid) && isValidFeeValue(mid_service_fee)) {
        acc.mid.push({ min: mid, fee: mid_service_fee });
      }
      if (isValidFeeValue(yazlik1) && isValidFeeValue(yazlik1_service_fee)) {
        acc.yazlik1.push({ min: yazlik1, fee: yazlik1_service_fee });
      }
      if (isValidFeeValue(yazlik2) && isValidFeeValue(yazlik2_service_fee)) {
        acc.yazlik2.push({ min: yazlik2, fee: yazlik2_service_fee });
      }
      if (isValidFeeValue(highmid) && isValidFeeValue(highmid_service_fee)) {
        acc.highmid.push({ min: highmid, fee: highmid_service_fee });
      }
      if (isValidFeeValue(low) && isValidFeeValue(low_service_fee)) {
        acc.low.push({ min: low, fee: low_service_fee });
      }
      if (
        isValidFeeValue(peak_high) &&
        isValidFeeValue(peak_high_service_fee)
      ) {
        acc.peak_high.push({ min: peak_high, fee: peak_high_service_fee });
      }
      if (isValidFeeValue(peak_mid) && isValidFeeValue(peak_mid_service_fee)) {
        acc.peak_mid.push({ min: peak_mid, fee: peak_mid_service_fee });
      }
      if (
        isValidFeeValue(peak_yazlik1) &&
        isValidFeeValue(peak_yazlik1_service_fee)
      ) {
        acc.peak_yazlik1.push({
          min: peak_yazlik1,
          fee: peak_yazlik1_service_fee,
        });
      }
      if (
        isValidFeeValue(peak_yazlik2) &&
        isValidFeeValue(peak_yazlik2_service_fee)
      ) {
        acc.peak_yazlik2.push({
          min: peak_yazlik2,
          fee: peak_yazlik2_service_fee,
        });
      }
      if (
        isValidFeeValue(peak_highmid) &&
        isValidFeeValue(peak_highmid_service_fee)
      ) {
        acc.peak_highmid.push({
          min: peak_highmid,
          fee: peak_highmid_service_fee,
        });
      }
      if (isValidFeeValue(peak_low) && isValidFeeValue(peak_low_service_fee)) {
        acc.peak_low.push({ min: peak_low, fee: peak_low_service_fee });
      }
      return acc;
    },
    {
      high: [],
      mid: [],
      low: [],
      highmid: [],
      yazlik1: [],
      yazlik2: [],
      peak_high: [],
      peak_mid: [],
      peak_low: [],
      peak_highmid: [],
      peak_yazlik1: [],
      peak_yazlik2: [],
    },
  );
  const {
    high,
    mid,
    low,
    highmid,
    yazlik1,
    yazlik2,
    peak_high,
    peak_mid,
    peak_low,
    peak_highmid,
    peak_yazlik1,
    peak_yazlik2,
  } = fees;
  validateNonZeroDynamicAndLayeredFees(fees, t);
  return {
    regular: { high, mid, low, highmid, yazlik1, yazlik2 },
    peak: {
      peak_high,
      peak_mid,
      peak_low,
      peak_highmid,
      peak_yazlik1,
      peak_yazlik2,
    },
  };
};
export const extractDynamicServiceFees = (data, t) => {
  const fees = data.reduce(
    (acc, curr) => {
      const {
        level_one,
        level_one_fee,
        level_two,
        level_two_fee,
        level_three,
        level_three_fee,
        level_four,
        level_four_fee,
        level_five,
        level_five_fee,
      } = curr;
      if (isValidFeeValue(level_one) && isValidFeeValue(level_one_fee)) {
        acc.level_one.push({ min: level_one, fee: level_one_fee });
      }
      if (isValidFeeValue(level_two) && isValidFeeValue(level_two_fee)) {
        acc.level_two.push({ min: level_two, fee: level_two_fee });
      }
      if (isValidFeeValue(level_three) && isValidFeeValue(level_three_fee)) {
        acc.level_three.push({ min: level_three, fee: level_three_fee });
      }
      if (isValidFeeValue(level_four) && isValidFeeValue(level_four_fee)) {
        acc.level_four.push({ min: level_four, fee: level_four_fee });
      }
      if (isValidFeeValue(level_five) && isValidFeeValue(level_five_fee)) {
        acc.level_five.push({ min: level_five, fee: level_five_fee });
      }
      return acc;
    },
    {
      level_one: [],
      level_two: [],
      level_three: [],
      level_four: [],
      level_five: [],
    },
  );

  const { level_one, level_two, level_three, level_four, level_five } = fees;
  validateNonZeroDynamicAndLayeredFees(fees, t);
  return {
    1: level_one,
    2: level_two,
    3: level_three,
    4: level_four,
    5: level_five,
  };
};

export const extractZoneBasedLayeredDeliveryFees = (data, t) => {
  const fees = data.reduce(
    (layeredDeliveryFeeMap, currentValue) => {
      const {
        zone_one,
        zone_one_fee,
        zone_two,
        zone_two_fee,
        zone_three,
        zone_three_fee,
      } = currentValue;
      if (isValidFeeValue(zone_one) && isValidFeeValue(zone_one_fee)) {
        layeredDeliveryFeeMap.level_one.push({
          min: zone_one,
          fee: zone_one_fee,
        });
      }
      if (isValidFeeValue(zone_two) && isValidFeeValue(zone_two_fee)) {
        layeredDeliveryFeeMap.level_two.push({
          min: zone_two,
          fee: zone_two_fee,
        });
      }
      if (isValidFeeValue(zone_three) && isValidFeeValue(zone_three_fee)) {
        layeredDeliveryFeeMap.level_three.push({
          min: zone_three,
          fee: zone_three_fee,
        });
      }
      return layeredDeliveryFeeMap;
    },
    {
      level_one: [],
      level_two: [],
      level_three: [],
    },
  );
  const { level_one, level_two, level_three } = fees;
  const zoneFees = { level_two, level_three };
  validateNonZeroDynamicAndLayeredFees(zoneFees, t);
  // validate level_one fee and min values separately to allow 0 value
  const hasInvalidLevelOneFees = level_one?.some(
    ({ min, fee } = {}) => !isValidFeeValue(min) || !isValidFeeValue(fee),
  );
  if (hasInvalidLevelOneFees) {
    throw Error(t('bulkFeeUpload:ERRORS.INVALID_ZONE_LEVEL_ONE_FEE'));
  }
  return {
    1: level_one,
    2: level_two,
    3: level_three,
  };
};
export const parseLayeredDeliveryFeeCSVImport = (data, t) => {
  const { regular, peak } = extractLayeredDeliveryFees(data, t);
  return data.map(feeDetails => {
    const {
      warehouse_id: warehouseId,
      service,
      peak_delfee_segment,
      delfee_segment,
    } = feeDetails;
    return {
      warehouseId,
      domainType: getirMarketBulkUploadDomainTypes[service],
      deliveryFee: {
        deliveryFeeSource: 'LayeredDeliveryFee',
        layeredDeliveryFee: {
          regular: regular[delfee_segment],
          peak: peak[peak_delfee_segment],
        },
      },
    };
  });
};
export const parseZoneBasedLayeredDeliveryFeeCSVImport = (data, t) => {
  const zoneBasedLayeredDeliveryFee = extractZoneBasedLayeredDeliveryFees(
    data,
    t,
  );
  return data.map(feeDetails => {
    const { warehouse_id: warehouseId, service } = feeDetails;
    return {
      warehouseId,
      domainType: getirMarketBulkUploadDomainTypes[service],
      deliveryFee: {
        deliveryFeeSource: 'ZoneBasedLayeredDeliveryFee',
        zoneBasedLayeredDeliveryFee,
      },
    };
  });
};

export const parseFixedDeliveryFeeCSVImport = (data, t) => {
  return data?.map(feeDetails => {
    const {
      warehouse_id: warehouseId,
      fixed_del_fee: fixedDeliveryFeeAmount,
      service,
    } = feeDetails;
    if (!isValidFeeValue(fixedDeliveryFeeAmount)) {
      throw Error(t('feeDetailsPage:ERRORS.INVALID_DELIVERY_FIXED_AMOUNT'));
    }
    return {
      warehouseId,
      domainType: getirMarketBulkUploadDomainTypes[service],
      deliveryFee: {
        deliveryFeeSource: 'FixedDeliveryFee',
        fixedDeliveryFeeAmount,
      },
    };
  });
};
export const parseZoneBasedFixedDeliveryFeeCSVImport = (data, t) => {
  return data?.map(feeDetails => {
    const {
      warehouse_id: warehouseId,
      zone_one_fee,
      zone_two_fee,
      zone_three_fee,
      service,
    } = feeDetails;
    if (
      !isValidFeeValue(zone_one_fee) ||
      !isValidFeeValue(zone_two_fee) ||
      !isValidFeeValue(zone_three_fee)
    ) {
      throw Error(t('feeDetailsPage:ERRORS.INVALID_DELIVERY_FIXED_AMOUNT'));
    }
    return {
      warehouseId,
      domainType: getirMarketBulkUploadDomainTypes[service],
      deliveryFee: {
        deliveryFeeSource: 'ZoneBasedFixedDeliveryFee',
        zoneBasedFixedDeliveryFeeAmount: {
          1: { fee: zone_one_fee },
          2: { fee: zone_two_fee },
          3: { fee: zone_three_fee },
        },
      },
    };
  });
};

export const parseDynamicDeliveryFeeCSVImport = (data, t) => {
  const dynamicDeliveryFee = extractDynamicDeliveryFees(data, t);
  return data.map(feeDetails => {
    const { warehouse_id: warehouseId, service } = feeDetails;
    return {
      warehouseId,
      domainType: getirMarketBulkUploadDomainTypes[service],
      deliveryFee: {
        deliveryFeeSource: 'DynamicDeliveryFee',
        dynamicDeliveryFee,
      },
    };
  });
};

export const parseBasketAmountsFeeCSVImport = (data, t) => {
  return data?.map(basketAmount => {
    const {
      warehouse_id: warehouseId,
      service,
      min_basket: minDiscountedAmount,
      max_basket: maxDiscountedAmount,
    } = basketAmount;
    if (maxDiscountedAmount && maxDiscountedAmount < 0) {
      throw Error(t('error:MIN_ZERO'));
    }
    return {
      warehouseId,
      domainType: getirMarketBulkUploadDomainTypes[service],
      minDiscountedAmount,
      maxDiscountedAmount,
    };
  });
};
export const parseZoneBasedBasketAmountsFeeCSVImport = (data, t) => {
  return data?.map(basketAmount => {
    const {
      warehouse_id: warehouseId,
      service,
      zone_one_min_basket,
      zone_one_max_basket,
      zone_two_min_basket,
      zone_two_max_basket,
      zone_three_min_basket,
      zone_three_max_basket,
    } = basketAmount;
    if (
      [
        zone_one_min_basket,
        zone_one_max_basket,
        zone_two_min_basket,
        zone_two_max_basket,
        zone_three_min_basket,
        zone_three_max_basket,
      ].some(amount => amount < 0)
    ) {
      throw Error(t('error:MIN_ZERO'));
    }
    return {
      warehouseId,
      domainType: getirMarketBulkUploadDomainTypes[service],
      zoneBasedBasketAmounts: {
        1: {
          minDiscountedAmount: zone_one_min_basket,
          maxDiscountedAmount: zone_one_max_basket,
        },
        2: {
          minDiscountedAmount: zone_two_min_basket,
          maxDiscountedAmount: zone_two_max_basket,
        },
        3: {
          minDiscountedAmount: zone_three_min_basket,
          maxDiscountedAmount: zone_three_max_basket,
        },
      },
    };
  });
};

export const parseLayeredServiceFeeCSVImport = (data, t) => {
  const { regular, peak } = extractLayeredServiceFees(data, t);
  return data.map(feeDetails => {
    const {
      warehouse_id: warehouseId,
      service,
      peak_service_fee_segment,
      service_fee_segment,
    } = feeDetails;
    return {
      warehouseId,
      domainType: getirMarketBulkUploadDomainTypes[service],
      serviceFee: {
        serviceFeeSource: 'LayeredServiceFee',
        layeredServiceFee: {
          regular: regular[service_fee_segment],
          peak: peak[peak_service_fee_segment],
        },
      },
    };
  });
};
export const parseFixedServiceFeeCSVImport = (data, t) => {
  return data?.map(feeDetails => {
    const {
      warehouse_id: warehouseId,
      fixed_service_fee: fixedServiceFeeAmount,
      service,
    } = feeDetails;
    if (!isValidFeeValue(fixedServiceFeeAmount)) {
      throw Error(t('feeDetailsPage:ERRORS.INVALID_SERVICE_FIXED_AMOUNT'));
    }
    return {
      warehouseId,
      domainType: getirMarketBulkUploadDomainTypes[service],
      serviceFee: {
        serviceFeeSource: 'FixedServiceFee',
        fixedServiceFeeAmount,
      },
    };
  });
};

export const parseDynamicServiceFeeCSVImport = (data, t) => {
  const dynamicServiceFee = extractDynamicServiceFees(data, t);
  return data.map(feeDetails => {
    const { warehouse_id: warehouseId, service } = feeDetails;
    return {
      warehouseId,
      domainType: getirMarketBulkUploadDomainTypes[service],
      serviceFee: {
        serviceFeeSource: 'DynamicServiceFee',
        dynamicServiceFee,
      },
    };
  });
};

export const getExampleCsv = (mode = '') => {
  const exampleCsvMap = {
    FixedDeliveryFee: fixedDeliveryFeeSourceCsv,
    ZoneBasedFixedDeliveryFee: zoneBasedFixedDeliveryFeeSourceCsv,
    DynamicDeliveryFee: dynamicDeliveryFeeSourceCsv,
    LayeredDeliveryFee: layeredDeliveryFeeSourceCsv,
    ZoneBasedLayeredDeliveryFee: zoneBasedLayeredDeliveryFeeSourceCsv,
    FixedServiceFee: fixedServiceFeeSourceCsv,
    DynamicServiceFee: dynamicServiceFeeSourceCsv,
    LayeredServiceFee: layeredServiceFeeSourceCsv,
    BASKET_AMOUNT: basketAmountSourceCsv,
    ZONE_BASED_BASKET_AMOUNT: zoneBasedBasketAmountSourceCsv,
  };
  return exampleCsvMap?.[mode.toLowerCase()];
};

export const getParsedData = (data = [], mode = '', t) => {
  const parseConfigMap = {
    FixedDeliveryFee: parseFixedDeliveryFeeCSVImport,
    ZoneBasedFixedDeliveryFee: parseZoneBasedFixedDeliveryFeeCSVImport,
    DynamicDeliveryFee: parseDynamicDeliveryFeeCSVImport,
    LayeredDeliveryFee: parseLayeredDeliveryFeeCSVImport,
    ZoneBasedLayeredDeliveryFee: parseZoneBasedLayeredDeliveryFeeCSVImport,
    FixedServiceFee: parseFixedServiceFeeCSVImport,
    DynamicServiceFee: parseDynamicServiceFeeCSVImport,
    LayeredServiceFee: parseLayeredServiceFeeCSVImport,
    BASKET_AMOUNT: parseBasketAmountsFeeCSVImport,
    ZONE_BASED_BASKET_AMOUNT: parseZoneBasedBasketAmountsFeeCSVImport,
  };
  return parseConfigMap?.[mode](data, t);
};

export const findStringAndGetKeyFromObject = object => {
  const foundKey = Object.keys(object).find(key => isString(object[key]));
  return foundKey || null;
};
