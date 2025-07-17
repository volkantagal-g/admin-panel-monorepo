import _, { isEmpty } from 'lodash';
import moment from 'moment';

import { t } from '@shared/i18n';
import { GETIR_FOOD_DOMAIN_TYPE, GETIR_LOCALS_DOMAIN_TYPE } from '@shared/shared/constants';

import {
  NEW_NOTIF_DETAIL_MAX_DATE_RANGE_DAY,
  SENT_NOTIF_COUNT_MAX_DATE_RANGE_DAY,
  SEGMENT_KEYS,
  GETIR_LOCALS_STORE_CALCULATION_TYPES,
} from '../constants';
import { NOTIF_FILTER_TYPE, NOTIF_SOURCE_TYPE } from '../components/GetirGeneralDetail/NotifDetailNew/constants';
import { AB_TEST_FILTER_TYPE, AB_TEST_DB_SOURCE_VALUE } from '../components/GetirGeneralDetail/ABTestDetail/constants';

const isDateRangeValid = (startDate, endDate) => moment(startDate).valueOf() < moment(endDate).valueOf();
export const isDateRangeDiffBelowLimit = ({
  startDateType,
  endDateType,
  startDate,
  endDate,
  startDayBeforeToday,
  endDayBeforeToday,
  dayLimit,
}) => {
  if (startDateType === 'static' && endDateType === 'static') {
    return moment(endDate).diff(moment(startDate), 'days') < dayLimit;
  }
  if (startDateType === 'dynamic' && endDateType === 'dynamic') {
    return startDayBeforeToday - endDayBeforeToday < dayLimit;
  }
  return true;
};

const getNumberOrNull = n => (_.isNumber(n) ? n : null);

const setDataScienceField = (params, state, key) => {
  if (state.dataScience?.isEnabled) {
    const { dataScience } = state;
    const tempParams = {
      isEnabled: true,
      mergeType: dataScience.mergeType,
      params: [],
    };

    dataScience.params.forEach(param => {
      const castedParam = param.validationSchema.cast(param.data);
      try {
        param.validationSchema.validateSync(castedParam);
        tempParams.params.push({ ...castedParam, modelId: param.modelId, selectedDomainType: param.selectedDomainType });
      }
      catch (error) {
        const errorMessage = t('clientTargetingPage:INVALID_DATA_SCIENCE_VALUES', { errorMessage: error.message });
        throw new Error(errorMessage);
      }
    });

    _.set(params, `${key}.dataScience`, tempParams);
  }
  else {
    _.set(params, `${key}.dataScience`, { isEnabled: false });
  }
};

export const prepareParams = godData => {
  const data = _.cloneDeep(godData);
  const params = { version: 4 };
  let tempParams = null;
  let errMessage = null;

  const {
    general,
    getir,
    getir10,
    getir30,
    getirVoyager,
    getirFood,
    getirLocals,
    getirBitaksi,
    getirWaterMarketPlace,
    getirJob,
    getirDrive,
    getirN11,
    getirSelect,
    getirFinance,
  } = data;

  if (_.isEmpty(general.listName.trim())) {
    throw new Error(t('clientTargetingPage:LIST_NAME'));
  }

  if (_.isNull(general.maxClientCount) || Number(general.maxClientCount) <= 0) {
    throw new Error(t('clientTargetingPage:MAX_CLIENT_COUNT'));
  }

  if (_.isNull(general.sortBy) || _.isUndefined(general.sortBy)) {
    throw new Error(t('clientTargetingPage:SORT'));
  }

  delete general.isCollapsed;
  params.general = {
    ...general,
    sortBy: Number(general.sortBy),
    maxClientCount: Number(general.maxClientCount),
  };

  if (getir.abTestDetail.isEnabled) {
    const { abTestDetail } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: abTestDetail.mergeType,
      params: [],
    };
    for (let i = 0; i < abTestDetail.params.length; i += 1) {
      const {
        filteringType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        excludeClients,
        abTestCodes,
        ignoreCountry,
        abTestSourceAdminPanel,
      } = abTestDetail.params[i];

      if (_.isNull(filteringType)) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:AB_TEST_FILTER_TYPE')}`;
        break;
      }

      if (filteringType === AB_TEST_FILTER_TYPE.dateRange) {
        if ((startDateType === 'dynamic' && (
          _.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
          || (endDateType === 'dynamic' && (
            _.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
          || (startDateType === 'static' && endDateType === 'static' &&
            !isDateRangeValid(startDate, endDate))) {
          errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:AB_TEST_DATE_RANGE')}`;
          break;
        }

        tempParams.params.push({
          filteringType,
          startDateType,
          startDayBeforeToday,
          startDate,
          endDateType,
          endDayBeforeToday,
          endDate,
          excludeClients,
          ignoreCountry,
        });
      }

      if (filteringType === AB_TEST_FILTER_TYPE.abTestCode) {
        tempParams.params.push({
          filteringType,
          excludeClients,
          abTestCodes,
          abTestSourceAdminPanel: AB_TEST_DB_SOURCE_VALUE[abTestSourceAdminPanel],
        });
      }
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.abTestDetail', tempParams);
  }
  else {
    _.set(params, 'getir.abTestDetail', { isEnabled: false });
  }

  if (getir.visitor.isEnabled) {
    const { visitor } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: visitor.mergeType,
      params: [],
    };
    for (let i = 0; i < visitor.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        geoJson,
      } = visitor.params[i];

      if ((startDateType === 'dynamic' && (
        _.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (
          _.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' &&
          !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:LAST_VISIT')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        geoJson,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.visitor', tempParams);
  }
  else {
    _.set(params, 'getir.visitor', { isEnabled: false });
  }

  if (getir.lastLocation.isEnabled) {
    const { lastLocation } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: lastLocation.mergeType,
      params: [],
    };
    for (let i = 0; i < lastLocation.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, geoJson,
        inOnlyCoverage, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
      } = lastLocation.params[i];

      if ((startDateType === 'dynamic' && (
        _.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (
          _.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' &&
          !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:LAST_LOCATION_DATE_RANGE')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        geoJson,
        inOnlyCoverage,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.lastLocation', tempParams);
  }
  else {
    _.set(params, 'getir.lastLocation', { isEnabled: false });
  }

  if (getir.lastOrder.isEnabled) {
    const { lastOrder } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: lastOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < lastOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, calculationType, domainTypes,
      } = lastOrder.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:LAST_ORDER_DATE_RANGE')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        calculationType,
        domainTypes,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.lastOrder', tempParams);
  }
  else {
    _.set(params, 'getir.lastOrder', { isEnabled: false });
  }

  if (getir.allDomainsLastOrder.isEnabled) {
    const { allDomainsLastOrder } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: allDomainsLastOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < allDomainsLastOrder.params.length; i += 1) {
      const {
        cities, startDateType, startDayBeforeToday, startDate,
        endDateType, endDayBeforeToday, endDate, calculationType, domainTypes,
      } = allDomainsLastOrder.params[i];

      if (
        (startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))
      ) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:ALL_DOMAINS_LAST_ORDER_DETAIL')}/
        ${t('clientTargetingPage:LAST_ORDER_DATE_RANGE')}`;
        break;
      }

      tempParams.params.push({
        cities,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        calculationType,
        domainTypes,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.allDomainsLastOrder', tempParams);
  }
  else {
    _.set(params, 'getir.allDomainsLastOrder', { isEnabled: false });
  }

  if (getir.firstOrder.isEnabled) {
    const { firstOrder } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: firstOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < firstOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, calculationType, domainTypes,
      } = firstOrder.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday)
          || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:FIRST_ORDER_DATE_RANGE')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        calculationType,
        domainTypes,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.firstOrder', tempParams);
  }
  else {
    _.set(params, 'getir.firstOrder', { isEnabled: false });
  }

  if (getir.maxOrder.isEnabled) {
    const { maxOrder } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: maxOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < maxOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, topXOrderType, calculationType, minOrderCount, maxOrderCount, domainTypes,
      } = maxOrder.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday)
          || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:MAX_ORDER_DATE_RANGE')}`;
        break;
      }
      errMessage = getMinMaxNumberValuesError({
        minValue: minOrderCount,
        maxValue: maxOrderCount,
        sectionName: `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/
        ${t('clientTargetingPage:MAX_ORDER_DETAIL')}/ ${t('clientTargetingPage:ORDER_COUNT')}`,
      });
      if (errMessage) break;
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        topXOrderType,
        calculationType,
        minOrderCount,
        maxOrderCount: getNumberOrNull(maxOrderCount),
        domainTypes,
      });
    }
    if (errMessage) throw new Error(errMessage);

    _.set(params, 'getir.maxOrder', tempParams);
  }
  else {
    _.set(params, 'getir.maxOrder', { isEnabled: false });
  }

  if (getir.totalOrder.isEnabled) {
    const { totalOrder } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: totalOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < totalOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, domainTypes, minOrderCount, maxOrderCount,
        shops, restaurants, artisanType, chainId,
      } = totalOrder.params[i];
      if (_.isNull(minOrderCount) || minOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (!_.isNull(minOrderCount) && minOrderCount === 0 && maxOrderCount !== 0) {
        // eslint-disable-next-line max-len
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:ERROR_IF_MIN_0_MAX_SHOULD_BE_0')}`;
        break;
      }
      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        domainTypes,
        cities,
        ignoreCountry,
        warehouses,
        minOrderCount,
        maxOrderCount: getNumberOrNull(maxOrderCount),
        shops: domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE) ? shops : [],
        artisanType: domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE) ? artisanType : null,
        chainId: domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE) ? chainId : null,
        restaurants: domainTypes.includes(GETIR_FOOD_DOMAIN_TYPE) ? restaurants : [],
      });
    }
    if (errMessage) throw new Error(errMessage);

    _.set(params, 'getir.totalOrder', tempParams);
  }
  else {
    _.set(params, 'getir.totalOrder', { isEnabled: false });
  }

  if (getir.notOrdered.isEnabled) {
    const { notOrdered } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: notOrdered.mergeType,
      params: [],
    };
    for (let i = 0; i < notOrdered.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, domainTypes, shops, restaurants, artisanType, chainId,
      } = notOrdered.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:NOT_ORDERED_DETAIL')}/${t('clientTargetingPage:ORDER_DATE_RANGE')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        domainTypes,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        shops: domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE) ? shops : [],
        artisanType: domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE) ? artisanType : null,
        chainId: domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE) ? chainId : null,
        restaurants: domainTypes.includes(GETIR_FOOD_DOMAIN_TYPE) ? restaurants : [],
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.notOrdered', tempParams);
  }
  else {
    _.set(params, 'getir.notOrdered', { isEnabled: false });
  }

  if (getir.orderRating.isEnabled) {
    const { orderRating } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: orderRating.mergeType,
      params: [],
    };

    for (let i = 0; i < orderRating.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, domainTypes, shops, restaurants, orderRate,
        topXOrderType, calculationType, minOrderCount, maxOrderCount,
      } = orderRating.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:GETIR_ORDER_RATING_DETAIL')}/${t('clientTargetingPage:ORDER_DATE_RANGE')}`;
        break;
      }

      if (_.isNull(minOrderCount) || maxOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:GETIR_ORDER_RATING_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }

      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:GETIR_ORDER_RATING_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      if (_.isNull(orderRate)) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:GETIR_ORDER_RATING_DETAIL')}/${t('clientTargetingPage:ORDER_RATING')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        domainTypes,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        shops: domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE) ? shops : [],
        restaurants: domainTypes.includes(GETIR_FOOD_DOMAIN_TYPE) ? restaurants : [],
        orderRate,
        topXOrderType,
        calculationType,
        minOrderCount,
        maxOrderCount,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.orderRating', tempParams);
  }
  else {
    _.set(params, 'getir.orderRating', { isEnabled: false });
  }

  if (getir.boughtProduct.isEnabled) {
    const { boughtProduct } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: boughtProduct.mergeType,
      params: [],
    };
    for (let i = 0; i < boughtProduct.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, domainTypes, products, subCategories, manufacturer, supplier,
        selectedCountType, selectedCountMinValue, selectedCountMaxValue,
      } = boughtProduct.params[i];
      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday)
          || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}\
        /${t('clientTargetingPage:BOUGHT_PRODUCT_FILTER')}/${t('clientTargetingPage:DATE_RANGE')}`;
        break;
      }
      if (_.isEmpty(products)) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/
        ${t('clientTargetingPage:BOUGHT_PRODUCT_FILTER')}/
        ${t('clientTargetingPage:PRODUCTS')}`;
        break;
      }
      if (_.isNull(selectedCountMinValue) || selectedCountMinValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/
        ${t('clientTargetingPage:BOUGHT_PRODUCT_FILTER')}/
        ${t(`clientTargetingPage:${selectedCountType}`)}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(selectedCountMaxValue) && (selectedCountMaxValue < 0 || selectedCountMaxValue < selectedCountMinValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/
        ${t('clientTargetingPage:BOUGHT_PRODUCT_FILTER')}/
        ${t(`clientTargetingPage:${selectedCountType}`)}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        domainTypes,
        cities,
        ignoreCountry,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        products,
        subCategories,
        manufacturer,
        supplier,
        selectedCountType,
        selectedCountMinValue,
        selectedCountMaxValue,
      });
    }
    if (errMessage) throw new Error(errMessage);
    _.set(params, 'getir.boughtProduct', tempParams);
  }
  else {
    _.set(params, 'getir.boughtProduct', { isEnabled: false });
  }

  if (getir.orderProduct.isEnabled) {
    const { orderProduct } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: orderProduct.mergeType,
      params: [],
    };
    for (let i = 0; i < orderProduct.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, domainTypes, subCategories, manufacturers, suppliers, brands, categories,
        selectedCountType, selectedCountMinValue, selectedCountMaxValue, basketDetailType,
      } = orderProduct.params[i];
      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:ORDER_PRODUCT_DETAIL')}/${t('clientTargetingPage:DATE_RANGE')}`;
        break;
      }
      errMessage = getMinMaxNumberValuesError({
        minValue: selectedCountMinValue,
        maxValue: selectedCountMaxValue,
        sectionName: `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')} / ${t('clientTargetingPage:ORDER_PRODUCT_DETAIL')}`,
      });
      if (errMessage) break;

      tempParams.params.push({
        domainTypes,
        cities,
        ignoreCountry,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        categories,
        subCategories,
        manufacturers,
        brands,
        suppliers,
        selectedCountType,
        selectedCountMinValue,
        selectedCountMaxValue,
        basketDetailType,
      });
    }
    if (errMessage) throw new Error(errMessage);
    _.set(params, 'getir.orderProduct', tempParams);
  }
  else {
    _.set(params, 'getir.orderProduct', { isEnabled: false });
  }

  if (getir.nonBoughtProduct.isEnabled) {
    const { nonBoughtProduct } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: nonBoughtProduct.mergeType,
      params: [],
    };
    for (let i = 0; i < nonBoughtProduct.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, domainTypes, products, manufacturer, supplier,
      } = nonBoughtProduct.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday)
          || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:NON_BOUGHT_PRODUCT_FILTER')}/${t('clientTargetingPage:DATE_RANGE')}`;
        break;
      }
      if (_.isEmpty(products)) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/
        ${t('clientTargetingPage:NON_BOUGHT_PRODUCT_FILTER')}/
        ${t('clientTargetingPage:PRODUCTS')}`;
        break;
      }
      tempParams.params.push({
        domainTypes,
        cities,
        ignoreCountry,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        products,
        manufacturer,
        supplier,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.nonBoughtProduct', tempParams);
  }
  else {
    _.set(params, 'getir.nonBoughtProduct', { isEnabled: false });
  }

  if (getir.notif.isEnabled) {
    const { notif } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: notif.mergeType,
      params: [],
    };
    for (let i = 0; i < notif.params.length; i += 1) {
      const {
        startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, notifFilterType, excludedNotifs, includedNotifs, notificationSource, notificationDomainType,
        minNotifCount, maxNotifCount, excludeClients,
      } = notif.params[i];

      if (notifFilterType === NOTIF_FILTER_TYPE.generalFiltering || notifFilterType === NOTIF_FILTER_TYPE.removeSentToday) {
        if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
          || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday)
            || endDayBeforeToday < 0))
          || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
          errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:LAST_NOTIF_RECEIVE_DATE')}`;
          break;
        }

        if (startDateType === 'static' && (moment().diff(moment(startDate), 'days') > NEW_NOTIF_DETAIL_MAX_DATE_RANGE_DAY)) {
          errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:LAST_NOTIF_RECEIVE_DATE')}`;
          errMessage += `/${t(
            'clientTargetingPage:START_DATE_BEFORE_ALLOWED',
            { maxRange: `${NEW_NOTIF_DETAIL_MAX_DATE_RANGE_DAY} ${t('global:TIME:FULL:DAY')}` },
          )}`;
          break;
        }
        // MAX 30 days retention for notifs, one shouldn't send 30 days before today
        if (
          (startDateType === 'dynamic' && startDayBeforeToday > NEW_NOTIF_DETAIL_MAX_DATE_RANGE_DAY) ||
          (endDateType === 'dynamic' && endDayBeforeToday > NEW_NOTIF_DETAIL_MAX_DATE_RANGE_DAY)
        ) {
          errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:LAST_NOTIF_RECEIVE_DATE')}`;
          errMessage += `/${t(
            'clientTargetingPage:START_DATE_BEFORE_ALLOWED',
            { maxRange: `${NEW_NOTIF_DETAIL_MAX_DATE_RANGE_DAY} ${t('global:TIME:FULL:DAY')}` },
          )}`;
          break;
        }

        tempParams.params.push({
          startDateType,
          startDayBeforeToday,
          startDate,
          endDateType,
          endDayBeforeToday,
          endDate,
          notifFilterType,
          includedNotifs,
          excludedNotifs,
          notificationSource: notifFilterType === NOTIF_FILTER_TYPE.removeSentToday ? null : notificationSource,
          notificationDomainType: (notificationSource === NOTIF_SOURCE_TYPE.LEANPLUM.value
            || notifFilterType === NOTIF_FILTER_TYPE.removeSentToday) ? null : notificationDomainType,
        });
      }

      if (notifFilterType === NOTIF_FILTER_TYPE.sendNotifCount) {
        if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
          || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
          || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
          errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:SEND_NOTIF_COUNT_DATE_RANGE')}`;
          break;
        }

        if (startDateType === 'static' && (moment(endDate).diff(moment(startDate), 'days') > SENT_NOTIF_COUNT_MAX_DATE_RANGE_DAY)) {
          errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:SEND_NOTIF_COUNT_DATE_RANGE')}`;
          errMessage += `/${t(
            'clientTargetingPage:START_DATE_BEFORE_ALLOWED',
            { maxRange: `${SENT_NOTIF_COUNT_MAX_DATE_RANGE_DAY} ${t('global:TIME:FULL:DAY')}` },
          )}`;
          break;
        }
        // MAX 2 days retention for notifs, one shouldn't send 2 days before today
        if (
          (startDateType === 'dynamic' && startDayBeforeToday > SENT_NOTIF_COUNT_MAX_DATE_RANGE_DAY) ||
          (endDateType === 'dynamic' && endDayBeforeToday > SENT_NOTIF_COUNT_MAX_DATE_RANGE_DAY)
        ) {
          errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:LAST_NOTIF_RECEIVE_DATE')}`;
          errMessage += `/${t(
            'clientTargetingPage:START_DATE_BEFORE_ALLOWED',
            { maxRange: `${SENT_NOTIF_COUNT_MAX_DATE_RANGE_DAY} ${t('global:TIME:FULL:DAY')}` },
          )}`;
          break;
        }

        if (_.isNull(minNotifCount) || maxNotifCount < 0) {
          errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
          ${t('clientTargetingPage:NOTIF_DETAIL_NEW')}/${t('global:VALUE')}/${t('clientTargetingPage:MIN')}`;
          break;
        }

        if (_.isNumber(maxNotifCount) && (maxNotifCount < 0 || maxNotifCount < minNotifCount)) {
          errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
          ${t('clientTargetingPage:NOTIF_DETAIL_NEW')}/${t('global:VALUE')}/${t('clientTargetingPage:MAX')}`;
          break;
        }

        tempParams.params.push({
          startDateType,
          startDayBeforeToday,
          startDate,
          endDateType,
          endDayBeforeToday,
          endDate,
          notifFilterType,
          minNotifCount: getNumberOrNull(minNotifCount),
          maxNotifCount: getNumberOrNull(maxNotifCount),
          excludeClients,
        });
      }
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.notif', tempParams);
  }
  else {
    _.set(params, 'getir.notif', { isEnabled: false });
  }

  if (getir.promoUsage.isEnabled) {
    const { promoUsage } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: promoUsage.mergeType,
      params: [],
    };
    for (let i = 0; i < promoUsage.params.length; i += 1) {
      const {
        usedPromos, excludeClients, isGetirMarketPromo, startDateType, startDayBeforeToday, startDate,
        endDateType, endDayBeforeToday, endDate, promoObjective,
      } = promoUsage.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:PROMO_DETAIL')}/${t('clientTargetingPage:DATE_RANGE')}`;
        break;
      }

      tempParams.params.push({
        usedPromos,
        excludeClients,
        isGetirMarketPromo,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        promoObjective,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.promoUsage', tempParams);
  }
  else {
    _.set(params, 'getir.promoUsage', { isEnabled: false });
  }

  if (getir.includedClientSegment.isEnabled) {
    const { includedClientSegment } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: includedClientSegment.mergeType,
      params: [],
    };
    for (let i = 0; i < includedClientSegment.params.length; i += 1) {
      const { segments } = includedClientSegment.params[i];
      tempParams.params.push({ segments });
    }
    _.set(params, 'getir.includedClientSegment', tempParams);
  }
  else {
    _.set(params, 'getir.includedClientSegment', { isEnabled: false });
  }

  if (getir.excludedClientSegment.isEnabled) {
    const { excludedClientSegment } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: excludedClientSegment.mergeType,
      params: [],
    };
    for (let i = 0; i < excludedClientSegment.params.length; i += 1) {
      const { segments } = excludedClientSegment.params[i];
      tempParams.params.push({ segments });
    }
    _.set(params, 'getir.excludedClientSegment', tempParams);
  }
  else {
    _.set(params, 'getir.excludedClientSegment', { isEnabled: false });
  }

  if (getir.buildNumber.isEnabled) {
    const { buildNumber } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: buildNumber.mergeType,
      params: [],
    };
    for (let i = 0; i < buildNumber.params.length; i += 1) {
      const { minIOSBuildNumber, maxIOSBuildNumber, minAndroidBuildNumber, maxAndroidBuildNumber } = buildNumber.params[i];
      if (minIOSBuildNumber < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:BUILD_NUMBER_DETAIL')}/${t('clientTargetingPage:IOS')}/${t('clientTargetingPage:MIN_BUILD_NUMBER')}`;
        break;
      }
      if (maxIOSBuildNumber < 0 || (_.isNumber(maxIOSBuildNumber) && maxIOSBuildNumber < minIOSBuildNumber)) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:BUILD_NUMBER_DETAIL')}/${t('clientTargetingPage:IOS')}/${t('clientTargetingPage:MAX_BUILD_NUMBER')}`;
        break;
      }
      if (minAndroidBuildNumber < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:BUILD_NUMBER_DETAIL')}/${t('clientTargetingPage:ANDROID')}/${t('clientTargetingPage:MIN_BUILD_NUMBER')}`;
        break;
      }
      if (maxAndroidBuildNumber < 0 || (_.isNumber(maxAndroidBuildNumber) && maxAndroidBuildNumber < minAndroidBuildNumber)) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:BUILD_NUMBER_DETAIL')}/${t('clientTargetingPage:ANDROID')}/${t('clientTargetingPage:MAX_BUILD_NUMBER')}`;
        break;
      }
      tempParams.params.push({
        minIOSBuildNumber: getNumberOrNull(minIOSBuildNumber),
        maxIOSBuildNumber: getNumberOrNull(maxIOSBuildNumber),
        minAndroidBuildNumber: getNumberOrNull(minAndroidBuildNumber),
        maxAndroidBuildNumber: getNumberOrNull(maxAndroidBuildNumber),
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.buildNumber', tempParams);
  }
  else {
    _.set(params, 'getir.buildNumber', { isEnabled: false });
  }

  if (getir.baseUserClient.isEnabled) {
    const { baseUserClient } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: baseUserClient.mergeType,
      params: [],
    };
    const GETIR_GENERAL_DETAIL = t('clientTargetingPage:GETIR_GENERAL_DETAIL');
    const BASE_USER_CLIENT_DETAIL = t('clientTargetingPage:BASE_USER_CLIENT_DETAIL');
    const MIN_VALUE = t('clientTargetingPage:MIN_VALUE');
    const MAX_VALUE = t('clientTargetingPage:MAX_VALUE');

    const CONSTANTS = {
      BASE_USER_CLIENT_DETAIL: {
        MIN_ALLOWED_POSSIBILITY: 0,
        MAX_ALLOWED_POSSIBILITY: 100,
        MIN_ALLOWED_MIN_MAX_VALUE: 0,
        MAX_ALLOWED_MIN_MAX_VALUE: 5,
      },
    };

    const {
      MAX_ALLOWED_POSSIBILITY,
      MAX_ALLOWED_MIN_MAX_VALUE,
      MIN_ALLOWED_MIN_MAX_VALUE,
      MIN_ALLOWED_POSSIBILITY,
    } = CONSTANTS.BASE_USER_CLIENT_DETAIL;

    for (let i = 0; i < baseUserClient.params.length; i += 1) {
      const { minValue, maxValue, scoreType } = baseUserClient.params[i];
      const MIN_ALLOWED = scoreType === 'minMaxValue' ? MIN_ALLOWED_MIN_MAX_VALUE : MIN_ALLOWED_POSSIBILITY;
      const MAX_ALLOWED = scoreType === 'minMaxValue' ? MAX_ALLOWED_MIN_MAX_VALUE : MAX_ALLOWED_POSSIBILITY;

      if (!_.isNumber(minValue) || minValue < MIN_ALLOWED || minValue > MAX_ALLOWED) {
        errMessage = `${GETIR_GENERAL_DETAIL}/${BASE_USER_CLIENT_DETAIL}/${MIN_VALUE}`;
        break;
      }

      if (!_.isNumber(maxValue) || maxValue < MIN_ALLOWED || maxValue > MAX_ALLOWED) {
        errMessage = `${GETIR_GENERAL_DETAIL}/${BASE_USER_CLIENT_DETAIL}/${MAX_VALUE}`;
        break;
      }

      if (minValue > maxValue) {
        errMessage = `${GETIR_GENERAL_DETAIL}/${BASE_USER_CLIENT_DETAIL}/${MAX_VALUE}`;
        break;
      }

      tempParams.params.push({
        minValue: getNumberOrNull(minValue),
        maxValue: getNumberOrNull(maxValue),
        scoreType,
      });
    }

    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.baseUserClient', tempParams);
  }
  else {
    _.set(params, 'getir.baseUserClient', { isEnabled: false });
  }

  if (getir.earlyChurn.isEnabled) {
    const { earlyChurn } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: earlyChurn.mergeType,
      params: [],
    };
    for (let i = 0; i < earlyChurn.params.length; i += 1) {
      const { minValue, maxValue } = earlyChurn.params[i];
      if (!_.isNumber(minValue) || minValue < 0 || minValue > 100) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:EARLY_CHURN')}/${t('clientTargetingPage:MIN_VALUE')}`;
        break;
      }
      if (!_.isNumber(maxValue) || maxValue < 0 || maxValue > 100) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:EARLY_CHURN')}/${t('clientTargetingPage:MAX_VALUE')}`;
        break;
      }
      if (minValue > maxValue) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:EARLY_CHURN')}/${t('clientTargetingPage:MAX_VALUE')}`;
        break;
      }
      tempParams.params.push({
        minValue: getNumberOrNull(minValue),
        maxValue: getNumberOrNull(maxValue),
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.earlyChurn', tempParams);
  }
  else {
    _.set(params, 'getir.earlyChurn', { isEnabled: false });
  }

  if (getir.productPriceDetails.isEnabled) {
    const { productPriceDetails } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: productPriceDetails.mergeType,
      params: [],
    };

    for (let i = 0; i < productPriceDetails.params.length; i += 1) {
      const {
        domainTypes, financialType, manufacturer, products, category,
        subCategories, supplier, valueType, warehouses, startDateType, cities, ignoreCountry,
        startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        minValue, maxValue,
      } = productPriceDetails.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday)
          || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:PRODUCT_PRICE_DETAILS')}/${t('clientTargetingPage:DATE_RANGE')}`;
        break;
      }

      if (_.isNull(minValue) || maxValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:PRODUCT_PRICE_DETAILS')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }

      if (_.isNumber(maxValue) && (maxValue < 0 || maxValue < minValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:PRODUCT_PRICE_DETAILS')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      if (_.isEmpty(financialType)) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:PRODUCT_PRICE_DETAILS')}/${t('clientTargetingPage:FINANCIAL_TYPE')} ${t('error:REQUIRED')}`;
        break;
      }

      if (_.isEmpty(valueType)) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:PRODUCT_PRICE_DETAILS')}/${t('clientTargetingPage:VALUE_TYPE')} ${t('error:REQUIRED')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        domainTypes,
        manufacturer,
        supplier,
        category,
        subCategories,
        financialType,
        products,
        valueType,
        minValue,
        maxValue,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.productPriceDetails', tempParams);
  }
  else {
    _.set(params, 'getir.productPriceDetails', { isEnabled: false });
  }

  if (getir.orderPrice.isEnabled) {
    const { orderPrice } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: orderPrice.mergeType,
      params: [],
    };
    for (let i = 0; i < orderPrice.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, domainTypes, minValue, maxValue, financialType, valueType,
        startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday,
        shops, artisanType, chainId, topXOrderType, calculationType, minOrderCount, maxOrderCount,
      } = orderPrice.params[i];
      const isCPFinancialTypeSelected = financialType === 'cpVatIncluded' || financialType === 'cpVatExcluded';
      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday)
          || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:ORDER_PRICE_DETAILS')}/${t('clientTargetingPage:DATE_RANGE')}`;
        break;
      }

      if (minValue > maxValue && isCPFinancialTypeSelected) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:ORDER_PRICE_DETAILS')}/${t('global:VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      if (!isCPFinancialTypeSelected && (minValue < 0 || maxValue < 0)) {
        const errorSuffix = minValue < 0 ? t('clientTargetingPage:MIN') : t('clientTargetingPage:MAX');
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:ORDER_PRICE_DETAILS')}/${t('global:VALUE')}/${errorSuffix}`;
        break;
      }

      if ((_.isNull(minValue) || maxValue < 0) && !isCPFinancialTypeSelected) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:ORDER_PRICE_DETAILS')}/${t('global:VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }

      if (_.isNumber(maxValue) && (maxValue < 0 || maxValue < minValue) && !isCPFinancialTypeSelected) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:ORDER_PRICE_DETAILS')}/${t('global:VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      if (_.isNull(minOrderCount) || maxOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:ORDER_PRICE_DETAILS')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }

      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:ORDER_PRICE_DETAILS')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      if (_.isEmpty(financialType)) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:ORDER_PRICE_DETAILS')}/${t('clientTargetingPage:FINANCIAL_TYPE')} ${t('error:REQUIRED')}`;
        break;
      }

      if (_.isEmpty(valueType)) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:ORDER_PRICE_DETAILS')}/${t('clientTargetingPage:VALUE_TYPE')} ${t('error:REQUIRED')}`;
        break;
      }

      tempParams.params.push({
        domainTypes,
        cities,
        ignoreCountry,
        warehouses,
        financialType,
        valueType,
        minValue,
        maxValue: getNumberOrNull(maxValue),
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        shops: domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE) ? shops : [],
        artisanType: domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE) ? artisanType : null,
        chainId: domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE) ? chainId : null,
        topXOrderType,
        calculationType,
        minOrderCount,
        maxOrderCount,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.orderPrice', tempParams);
  }
  else {
    _.set(params, 'getir.orderPrice', { isEnabled: false });
  }

  if (getir.dayDifferenceBetweenOrders.isEnabled) {
    const { dayDifferenceBetweenOrders } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: dayDifferenceBetweenOrders.mergeType,
      params: [],
    };
    for (let i = 0; i < dayDifferenceBetweenOrders.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, domainTypes, minDayValue, maxDayValue,
        startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday,
        topXOrderType, calculationType, minOrderCount, maxOrderCount,
      } = dayDifferenceBetweenOrders.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')} / ${t('clientTargetingPage:DATE_RANGE')}`;
        break;
      }

      errMessage = getMinMaxNumberValuesError({
        minValue: minDayValue,
        maxValue: maxDayValue,
        sectionName: `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')} / ${t('clientTargetingPage:DAY_DIFFERENCE_BETWEEN_ORDERS')} /
        ${t('clientTargetingPage:DAY_INTERVAL')}`,
      });
      if (errMessage) break;

      errMessage = getMinMaxNumberValuesError({
        minValue: minOrderCount,
        maxValue: maxOrderCount,
        sectionName: `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')} / ${t('clientTargetingPage:DAY_DIFFERENCE_BETWEEN_ORDERS')} /
        ${t('clientTargetingPage:ORDER_COUNT')}`,
      });
      if (errMessage) break;

      tempParams.params.push({
        domainTypes,
        cities,
        ignoreCountry,
        warehouses,
        minDayValue,
        maxDayValue: getNumberOrNull(maxDayValue),
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        topXOrderType,
        calculationType,
        minOrderCount,
        maxOrderCount,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.dayDifferenceBetweenOrders', tempParams);
  }
  else {
    _.set(params, 'getir.dayDifferenceBetweenOrders', { isEnabled: false });
  }

  if (getir.paymentMethods.isEnabled) {
    const { paymentMethods } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: paymentMethods.mergeType,
      params: [],
    };
    for (let i = 0; i < paymentMethods.params.length; i += 1) {
      const {
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        minTransactionCount,
        maxTransactionCount,
        paymentMethod,
      } = paymentMethods.params[i];
      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0)) ||
        (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:PAYMENT_METHODS')}`;
        break;
      }
      if (_.isNull(minTransactionCount) || minTransactionCount < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}\
        /${t('clientTargetingPage:PAYMENT_METHODS')}/${t('clientTargetingPage:GA_TRANSACTION_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxTransactionCount) &&
        (maxTransactionCount < 0 || maxTransactionCount < minTransactionCount)) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}\
        /${t('clientTargetingPage:PAYMENT_METHODS')}/${t('clientTargetingPage:GA_TRANSACTION_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        minTransactionCount,
        maxTransactionCount,
        paymentMethod,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.paymentMethods', tempParams);
  }
  else {
    _.set(params, 'getir.paymentMethods', { isEnabled: false });
  }

  if (getir.purchaseFrequency.isEnabled) {
    const { purchaseFrequency } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: purchaseFrequency.mergeType,
      params: [],
    };
    for (let i = 0; i < purchaseFrequency.params.length; i += 1) {
      const {
        cities, ignoreCountry, domainTypes, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, minOrderCount, maxOrderCount, shops, restaurants, artisanType, chainId,
      } = purchaseFrequency.params[i];

      if (_.isNull(minOrderCount) || minOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:PURCHASE_FREQUENCY_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:PURCHASE_FREQUENCY_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday)
          || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:PURCHASE_FREQUENCY_DETAIL')}/${t('clientTargetingPage:FIRST_ORDER_DATE_RANGE')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        domainTypes,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        minOrderCount,
        maxOrderCount,
        shops: domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE) ? shops : [],
        artisanType: domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE) ? artisanType : null,
        chainId: domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE) ? chainId : null,
        restaurants: domainTypes.includes(GETIR_FOOD_DOMAIN_TYPE) ? restaurants : [],
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.purchaseFrequency', tempParams);
  }
  else {
    _.set(params, 'getir.purchaseFrequency', { isEnabled: false });
  }

  if (getir.clientDownloadDate.isEnabled) {
    const { clientDownloadDate } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: clientDownloadDate.mergeType,
      params: [],
    };
    for (let i = 0; i < clientDownloadDate.params.length; i += 1) {
      const {
        cities,
        ignoreCountry,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      } = clientDownloadDate.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:CLIENT_DOWNLOAD_DATE')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.clientDownloadDate', tempParams);
  }
  else {
    _.set(params, 'getir.clientDownloadDate', { isEnabled: false });
  }

  if (getir.signedUp.isEnabled) {
    const { signedUp } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: signedUp.mergeType,
      params: [],
    };
    for (let i = 0; i < signedUp.params.length; i += 1) {
      const {
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      } = signedUp.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:SIGNED_UP_DETAIL')}`;
        break;
      }

      tempParams.params.push({
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.signedUp', tempParams);
  }
  else {
    _.set(params, 'getir.signedUp', { isEnabled: false });
  }

  if (getir.deviceSpesification.isEnabled) {
    const { deviceSpesification } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: deviceSpesification.mergeType,
      params: [],
    };
    for (let i = 0; i < deviceSpesification.params.length; i += 1) {
      const {
        appLanguage,
        deviceTypes,
        // minDevicePrice,
        // maxDevicePrice,
      } = deviceSpesification.params[i];
      // errMessage = getMinMaxNumberValuesError({
      //   minValue: minDevicePrice,
      //   maxValue: maxDevicePrice,
      //   sectionName: `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/${t('clientTargetingPage:DEVICE_PRICE_INTERVAL')}`,
      // });
      // if (errMessage) break;

      tempParams.params.push({
        appLanguage,
        deviceTypes,
        // minDevicePrice,
        // maxDevicePrice: getNumberOrNull(maxDevicePrice),
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.deviceSpesification', tempParams);
  }
  else {
    _.set(params, 'getir.deviceSpesification', { isEnabled: false });
  }

  if (getir.gsmCountryCodeDetail.isEnabled) {
    const { gsmCountryCodeDetail } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: gsmCountryCodeDetail.mergeType,
      params: [],
    };
    for (let i = 0; i < gsmCountryCodeDetail.params.length; i += 1) {
      const {
        gsmCountryCode,
        includeClients,
      } = gsmCountryCodeDetail.params[i];

      if (_.isEmpty(gsmCountryCode)) {
        errMessage = `${t('clientTargetingPage:GETIR_GENERAL_DETAIL')}/\
        ${t('clientTargetingPage:GSM_COUNTRY_CODE_DETAIL')}/${t('clientTargetingPage:GSM_COUNTRY_CODE')} ${t('error:REQUIRED')}`;
        break;
      }

      tempParams.params.push({
        gsmCountryCode,
        includeClients,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.gsmCountryCodeDetail', tempParams);
  }
  else {
    _.set(params, 'getir.gsmCountryCodeDetail', { isEnabled: false });
  }

  if (getir.communicationPreferencesDetail.isEnabled) {
    const { communicationPreferencesDetail } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: communicationPreferencesDetail.mergeType,
      params: [],
    };
    for (let i = 0; i < communicationPreferencesDetail.params.length; i += 1) {
      const {
        allowedCommunicationType,
        notAllowedCommunicationType,
      } = communicationPreferencesDetail.params[i];

      tempParams.params.push({
        allowedCommunicationType,
        notAllowedCommunicationType,
      });
    }
    _.set(params, 'getir.communicationPreferencesDetail', tempParams);
  }
  else {
    _.set(params, 'getir.communicationPreferencesDetail', { isEnabled: false });
  }

  if (getir.lateDeliveryDurationETA.isEnabled) {
    const { lateDeliveryDurationETA } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: lateDeliveryDurationETA.mergeType,
      params: [],
    };
    for (let i = 0; i < lateDeliveryDurationETA.params.length; i += 1) {
      const {
        startDateType,
        startDayBeforeToday,
        startDate: _startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        etaType,
        domainType,
        cities,
        warehouses,
        geoJson,
        minReachDurationTime,
        maxReachDurationTime,
        topXOrderType,
        minOrderCount,
        maxOrderCount,
        excludeQueueUsers,
        excludeScheduledOrders,
        minLateDurationTime,
        maxLateDurationTime,
      } = lateDeliveryDurationETA.params[i];

      if (_.isNil(domainType)) {
        errMessage = `${t('clientTargetingPage:LATE_DELIVERY_BY_ETA_SECTION_NAME')} / ${t('global:DOMAIN_TYPE')}`;
        break;
      }

      if (!areDateInputsValid({ startDate: _startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:LATE_DELIVERY_BY_ETA_SECTION_NAME')} / ${t('clientTargetingPage:CHECKOUT_DATE_RANGE')}`;
        break;
      }

      errMessage = getMinMaxNumberValuesError({
        minValue: minLateDurationTime,
        maxValue: maxLateDurationTime,
        sectionName: `${t('clientTargetingPage:LATE_DELIVERY_BY_ETA_SECTION_NAME')} / ${t('clientTargetingPage:EXCEEDANCE_LIMIT_AS_MINUTE')}`,
      });
      if (errMessage) break;

      errMessage = getMinMaxNumberValuesError({
        minValue: minReachDurationTime,
        maxValue: maxReachDurationTime,
        sectionName: `${t('clientTargetingPage:LATE_DELIVERY_BY_ETA_SECTION_NAME')} / ${t('clientTargetingPage:ORDER_REACH_INTERVAL')}`,
      });
      if (errMessage) break;

      errMessage = getMinMaxNumberValuesError({
        minValue: minOrderCount,
        maxValue: maxOrderCount,
        sectionName: `${t('clientTargetingPage:LATE_DELIVERY_BY_ETA_SECTION_NAME')} / ${t('clientTargetingPage:ORDER_COUNT')}`,
      });
      if (errMessage) break;

      tempParams.params.push({
        startDate: _startDate,
        startDateType,
        startDayBeforeToday,
        endDateType,
        endDayBeforeToday,
        endDate,
        etaType,
        cities,
        warehouses,
        geoJson,
        minReachDurationTime,
        maxReachDurationTime,
        topXOrderType,
        minOrderCount,
        maxOrderCount,
        excludeQueueUsers,
        excludeScheduledOrders,
        minLateDurationTime,
        maxLateDurationTime,
        domainTypes: [domainType],
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.lateDeliveryDurationETA', tempParams);
  }
  else {
    _.set(params, 'getir.lateDeliveryDurationETA', { isEnabled: false });
  }

  if (getir.orderFeedback.isEnabled) {
    const { orderFeedback } = getir;
    tempParams = {
      isEnabled: true,
      mergeType: orderFeedback.mergeType,
      params: [],
    };
    for (let i = 0; i < orderFeedback.params.length; i += 1) {
      const {
        startDateType,
        startDayBeforeToday,
        startDate: _startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        domainTypes,
        cities,
        warehouses,
        geoJson,
        topXOrderType,
        minOrderCount,
        maxOrderCount,
        subReasons,
      } = orderFeedback.params[i];

      if (_.isEmpty(domainTypes)) {
        errMessage = `${t('clientTargetingPage:ORDER_FEEDBACK_DETAIL')} / ${t('global:DOMAIN_TYPE')}`;
        break;
      }

      if (!areDateInputsValid({ startDate: _startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:ORDER_FEEDBACK_DETAIL')} / ${t('clientTargetingPage:CHECKOUT_DATE_RANGE')}`;
        break;
      }

      if (_.isEmpty(subReasons)) {
        errMessage = `${t('clientTargetingPage:ORDER_FEEDBACK_DETAIL')} / ${t('clientTargetingPage:FEEDBACK_SUB_REASON')} ${t('error:REQUIRED')}`;
        break;
      }

      tempParams.params.push({
        startDate: _startDate,
        startDateType,
        startDayBeforeToday,
        endDateType,
        endDayBeforeToday,
        endDate,
        cities,
        warehouses,
        geoJson,
        topXOrderType,
        minOrderCount,
        maxOrderCount,
        domainTypes,
        subReasons,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir.orderFeedback', tempParams);
  }
  else {
    _.set(params, 'getir.orderFeedback', { isEnabled: false });
  }

  if (getir10.visitor.isEnabled) {
    const { visitor } = getir10;
    tempParams = {
      isEnabled: true,
      mergeType: visitor.mergeType,
      params: [],
    };
    for (let i = 0; i < visitor.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        geoJson,
      } = visitor.params[i];

      if ((startDateType === 'dynamic' && (
        _.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (
          _.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' &&
          !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/${t('clientTargetingPage:LAST_VISIT')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        geoJson,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir10.visitor', tempParams);
  }
  else {
    _.set(params, 'getir10.visitor', { isEnabled: false });
  }

  if (getir10.forcedTabOpen.isEnabled) {
    const { forcedTabOpen } = getir10;
    tempParams = {
      isEnabled: true,
      mergeType: forcedTabOpen.mergeType,
      params: [],
    };
    for (let i = 0; i < forcedTabOpen.params.length; i += 1) {
      const { minTabOpenCount, maxTabOpenCount, warehouses, cities, ignoreCountry } = forcedTabOpen.params[i];
      if (_.isNull(minTabOpenCount) || minTabOpenCount < 0) {
        errMessage = `${t('clientTargetingPage:G10_FORCED_TAB_OPEN_DETAIL')}/\
        ${t('clientTargetingPage:TAB_OPEN_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxTabOpenCount) && (maxTabOpenCount < 0 || maxTabOpenCount < minTabOpenCount)) {
        errMessage = `${t('clientTargetingPage:G10_FORCED_TAB_OPEN_DETAIL')}/\
        ${t('clientTargetingPage:TAB_OPEN_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        minTabOpenCount,
        maxTabOpenCount: getNumberOrNull(maxTabOpenCount),
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir10.forcedTabOpen', tempParams);
  }
  else {
    _.set(params, 'getir10.forcedTabOpen', { isEnabled: false });
  }

  if (getir10.lastOrder.isEnabled) {
    const { lastOrder } = getir10;

    tempParams = {
      isEnabled: true,
      mergeType: lastOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < lastOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, calculationType,
      } = lastOrder.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0)) || (endDateType === 'dynamic'
        && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/${t('clientTargetingPage:LAST_ORDER_DATE_RANGE')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        calculationType,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir10.lastOrder', tempParams);
  }
  else {
    _.set(params, 'getir10.lastOrder', { isEnabled: false });
  }

  if (getir10.firstOrder.isEnabled) {
    const { firstOrder } = getir10;
    tempParams = {
      isEnabled: true,
      mergeType: firstOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < firstOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, calculationType,
      } = firstOrder.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday)
          || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/${t('clientTargetingPage:FIRST_ORDER_DATE_RANGE')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        calculationType,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir10.firstOrder', tempParams);
  }
  else {
    _.set(params, 'getir10.firstOrder', { isEnabled: false });
  }

  if (getir10.maxOrder.isEnabled) {
    const { maxOrder } = getir10;
    tempParams = {
      isEnabled: true,
      mergeType: maxOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < maxOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate,
      } = maxOrder.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday)
          || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/${t('clientTargetingPage:MAX_ORDER_DATE_RANGE')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) throw new Error(errMessage);
    _.set(params, 'getir10.maxOrder', tempParams);
  }
  else {
    _.set(params, 'getir10.maxOrder', { isEnabled: false });
  }

  if (getir10.totalOrder.isEnabled) {
    const { totalOrder } = getir10;
    tempParams = {
      isEnabled: true,
      mergeType: totalOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < totalOrder.params.length; i += 1) {
      const { cities, ignoreCountry, warehouses, minOrderCount, maxOrderCount } = totalOrder.params[i];
      if (_.isNull(minOrderCount) || minOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (!_.isNull(minOrderCount) && minOrderCount === 0 && maxOrderCount !== 0) {
        // eslint-disable-next-line max-len
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:ERROR_IF_MIN_0_MAX_SHOULD_BE_0')}`;
        break;
      }
      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        minOrderCount,
        maxOrderCount: getNumberOrNull(maxOrderCount),
      });
    }
    if (errMessage) throw new Error(errMessage);
    _.set(params, 'getir10.totalOrder', tempParams);
  }
  else {
    _.set(params, 'getir10.totalOrder', { isEnabled: false });
  }

  if (getir10.missedOrder.isEnabled) {
    const { missedOrder } = getir10;
    tempParams = {
      isEnabled: true,
      mergeType: missedOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < missedOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, minOrderCount, maxOrderCount,
      } = missedOrder.params[i];
      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday)
          || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:G10_MISSED_ORDER_DETAIL')}/${t('clientTargetingPage:MISSED_ORDER_DATE_RANGE')}`;
        break;
      }
      if (_.isNull(minOrderCount) || minOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:G10_MISSED_ORDER_DETAIL')}/\
        ${t('clientTargetingPage:MISSED_ORDER_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:G10_MISSED_ORDER_DETAIL')}/\
        ${t('clientTargetingPage:MISSED_ORDER_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        minOrderCount,
        maxOrderCount: getNumberOrNull(maxOrderCount),
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir10.missedOrder', tempParams);
  }
  else {
    _.set(params, 'getir10.missedOrder', { isEnabled: false });
  }

  if (getir10.includedRFTMSegment.isEnabled) {
    const { includedRFTMSegment } = getir10;
    tempParams = {
      isEnabled: true,
      mergeType: includedRFTMSegment.mergeType,
      params: [],
    };
    for (let i = 0; i < includedRFTMSegment.params.length; i += 1) {
      const {
        segments, maxFValue, maxHValue, maxMValue, maxRValue, maxTValue, minFValue, minHValue, minMValue, minRValue,
        minTValue,
      } = includedRFTMSegment.params[i];
      if (_.isNull(minRValue) || minRValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_G10_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:R_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxRValue) && (maxRValue < 0 || maxRValue < minRValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_G10_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:R_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (_.isNull(minFValue) || minFValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_G10_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:F_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxFValue) && (maxFValue < 0 || maxFValue < minFValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_G10_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:F_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (_.isNull(minTValue) || minTValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_G10_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:T_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxTValue) && (maxTValue < 0 || maxTValue < minTValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_G10_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:T_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (_.isNull(minMValue) || minMValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_G10_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:M_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxMValue) && (maxMValue < 0 || maxMValue < minMValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_G10_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:M_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (_.isNull(minHValue) || minHValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_G10_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:H_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxHValue) && (maxHValue < 0 || maxHValue < minHValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_G10_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:H_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        minRValue,
        maxRValue: getNumberOrNull(maxRValue),
        minFValue,
        maxFValue: getNumberOrNull(maxFValue),
        minTValue,
        maxTValue: getNumberOrNull(maxTValue),
        minMValue,
        maxMValue: getNumberOrNull(maxMValue),
        minHValue,
        maxHValue: getNumberOrNull(maxHValue),
        segments,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir10.includedRFTMSegment', tempParams);
  }
  else {
    _.set(params, 'getir10.includedRFTMSegment', { isEnabled: false });
  }

  if (getir10.excludedRFTMSegment.isEnabled) {
    const { excludedRFTMSegment } = getir10;
    tempParams = {
      isEnabled: true,
      mergeType: excludedRFTMSegment.mergeType,
      params: [],
    };
    for (let i = 0; i < excludedRFTMSegment.params.length; i += 1) {
      const {
        segments, maxFValue, maxHValue, maxMValue, maxRValue, maxTValue, minFValue, minHValue, minMValue, minRValue,
        minTValue,
      } = excludedRFTMSegment.params[i];
      if (_.isNull(minRValue) || minRValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:EXCLUDED_G10_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:R_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxRValue) && (maxRValue < 0 || maxRValue < minRValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:EXCLUDED_G10_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:R_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (_.isNull(minFValue) || minFValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:EXCLUDED_G10_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:F_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxFValue) && (maxFValue < 0 || maxFValue < minFValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:EXCLUDED_G10_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:F_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (_.isNull(minTValue) || minTValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:EXCLUDED_G10_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:T_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxTValue) && (maxTValue < 0 || maxTValue < minTValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:EXCLUDED_G10_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:T_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (_.isNull(minMValue) || minMValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:EXCLUDED_G10_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:M_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxMValue) && (maxMValue < 0 || maxMValue < minMValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:EXCLUDED_G10_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:M_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (_.isNull(minHValue) || minHValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:EXCLUDED_G10_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:H_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxHValue) && (maxHValue < 0 || maxHValue < minHValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:EXCLUDED_G10_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:H_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        minRValue,
        maxRValue: getNumberOrNull(maxRValue),
        minFValue,
        maxFValue: getNumberOrNull(maxFValue),
        minTValue,
        maxTValue: getNumberOrNull(maxTValue),
        minMValue,
        maxMValue: getNumberOrNull(maxMValue),
        minHValue,
        maxHValue: getNumberOrNull(maxHValue),
        segments,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir10.excludedRFTMSegment', tempParams);
  }
  else {
    _.set(params, 'getir10.excludedRFTMSegment', { isEnabled: false });
  }

  if (getir10.personaDetail.isEnabled) {
    const { personaDetail } = getir10;
    tempParams = {
      isEnabled: true,
      mergeType: personaDetail.mergeType,
      params: [],
    };
    for (let i = 0; i < personaDetail.params.length; i += 1) {
      const {
        personas,
        minHabitRankValue,
        maxHabitRankValue,
        minTimeSpecificRankValue,
        maxTimeSpecificRankValue,
        minWeekendOrderRatioValue,
        maxWeekendOrderRatioValue,
        minOrganicRankValue,
        maxOrganicRankValue,
        minGetirFinancedPromoRatioValue,
        maxGetirFinancedPromoRatioValue,
        minBasketDurationRankValue,
        maxBasketDurationRankValue,
        minCategoryRankValue,
        maxCategoryRankValue,
        minPremiumRankValue,
        maxPremiumRankValue,
        flags,
      } = personaDetail.params[i];

      if (_.isEmpty(personas)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:PERSONA_G10_DETAIL')}/${t('clientTargetingPage:PERSONA')}`;
        break;
      }

      if (!_.isNull(minHabitRankValue) && minHabitRankValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:PERSONA_G10_DETAIL')}/${t('clientTargetingPage:HABIT_RANK')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxHabitRankValue) && (maxHabitRankValue < 0 || maxHabitRankValue < minHabitRankValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:PERSONA_G10_DETAIL')}/${t('clientTargetingPage:HABIT_RANK')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      if (!_.isNull(minTimeSpecificRankValue) && minTimeSpecificRankValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:PERSONA_G10_DETAIL')}/\
        ${t('clientTargetingPage:TIME_SPECIFIC_RANK')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxTimeSpecificRankValue) && (maxTimeSpecificRankValue < 0 || maxTimeSpecificRankValue < minTimeSpecificRankValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:PERSONA_G10_DETAIL')}/\
        ${t('clientTargetingPage:TIME_SPECIFIC_RANK')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      if (!_.isNull(minWeekendOrderRatioValue) && minWeekendOrderRatioValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:PERSONA_G10_DETAIL')}/\
        ${t('clientTargetingPage:WEEKEND_ORDER_RATIO')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxWeekendOrderRatioValue) && (maxWeekendOrderRatioValue < 0 ||
        maxWeekendOrderRatioValue < minWeekendOrderRatioValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:PERSONA_G10_DETAIL')}/\
        ${t('clientTargetingPage:WEEKEND_ORDER_RATIO')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      if (!_.isNull(minOrganicRankValue) && minOrganicRankValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:PERSONA_G10_DETAIL')}/\
        ${t('clientTargetingPage:ORGANIC_RANK')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxOrganicRankValue) && (maxOrganicRankValue < 0 || maxOrganicRankValue < minOrganicRankValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:PERSONA_G10_DETAIL')}/\
        ${t('clientTargetingPage:ORGANIC_RANK')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      if (!_.isNull(minGetirFinancedPromoRatioValue) && minGetirFinancedPromoRatioValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:PERSONA_G10_DETAIL')}/\
        ${t('clientTargetingPage:GETIR_FINANCED_PROMO_RATIO')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxGetirFinancedPromoRatioValue) && (maxGetirFinancedPromoRatioValue < 0 ||
        maxGetirFinancedPromoRatioValue < minGetirFinancedPromoRatioValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:PERSONA_G10_DETAIL')}/\
        ${t('clientTargetingPage:GETIR_FINANCED_PROMO_RATIO')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      if (!_.isNull(minBasketDurationRankValue) && minBasketDurationRankValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:PERSONA_G10_DETAIL')}/\
        ${t('clientTargetingPage:BASKET_DURATION_RANK')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxBasketDurationRankValue) && (maxBasketDurationRankValue < 0 ||
        maxBasketDurationRankValue < minBasketDurationRankValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:PERSONA_G10_DETAIL')}/\
        ${t('clientTargetingPage:BASKET_DURATION_RANK')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      if (!_.isNull(minCategoryRankValue) && minCategoryRankValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:PERSONA_G10_DETAIL')}/\
        ${t('clientTargetingPage:CATEGORY_RANK')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxCategoryRankValue) && (maxCategoryRankValue < 0 || maxCategoryRankValue < minCategoryRankValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:PERSONA_G10_DETAIL')}/\
        ${t('clientTargetingPage:CATEGORY_RANK')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      if (!_.isNull(minPremiumRankValue) && minPremiumRankValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:PERSONA_G10_DETAIL')}/\
        ${t('clientTargetingPage:PREMIUM_RANK')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxPremiumRankValue) && (maxPremiumRankValue < 0 || maxPremiumRankValue < minPremiumRankValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:PERSONA_G10_DETAIL')}/\
        ${t('clientTargetingPage:PREMIUM_RANK')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      tempParams.params.push({
        personas,
        minHabitRankValue,
        maxHabitRankValue: getNumberOrNull(maxHabitRankValue),
        minTimeSpecificRankValue,
        maxTimeSpecificRankValue: getNumberOrNull(maxTimeSpecificRankValue),
        minWeekendOrderRatioValue,
        maxWeekendOrderRatioValue: getNumberOrNull(maxWeekendOrderRatioValue),
        minOrganicRankValue,
        maxOrganicRankValue: getNumberOrNull(maxOrganicRankValue),
        minGetirFinancedPromoRatioValue,
        maxGetirFinancedPromoRatioValue: getNumberOrNull(maxGetirFinancedPromoRatioValue),
        minBasketDurationRankValue,
        maxBasketDurationRankValue: getNumberOrNull(maxBasketDurationRankValue),
        minCategoryRankValue,
        maxCategoryRankValue: getNumberOrNull(maxCategoryRankValue),
        minPremiumRankValue,
        maxPremiumRankValue: getNumberOrNull(maxPremiumRankValue),
        flags,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir10.personaDetail', tempParams);
  }
  else {
    _.set(params, 'getir10.personaDetail', { isEnabled: false });
  }

  if (getir10.customerLTV.isEnabled) {
    const { customerLTV } = getir10;
    tempParams = {
      isEnabled: true,
      mergeType: customerLTV.mergeType,
      params: [],
    };
    for (let i = 0; i < customerLTV.params.length; i += 1) {
      const { minValue, maxValue } = customerLTV.params[i];
      if (_.isNull(minValue) || minValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:CUSTOMER_LTV_G10_DETAIL')}/${t('clientTargetingPage:LTV_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxValue) && (maxValue < 0 || maxValue < minValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:CUSTOMER_LTV_G10_DETAIL')}/${t('clientTargetingPage:LTV_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        minValue,
        maxValue: getNumberOrNull(maxValue),
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir10.customerLTV', tempParams);
  }
  else {
    _.set(params, 'getir10.customerLTV', { isEnabled: false });
  }

  if (getir10.deliveryDuration.isEnabled) {
    const { deliveryDuration } = getir10;
    tempParams = {
      isEnabled: true,
      mergeType: deliveryDuration.mergeType,
      params: [],
    };
    for (let i = 0; i < deliveryDuration.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses,
        startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        minDurationTime, maxDurationTime,
        excludeQueueUsers, isETAExceeded, topXOrderType,
        minOrderCount, maxOrderCount,
        geoJson,
      } = deliveryDuration.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:G10_DELIVERY_DURATION_DETAIL')} / ${t('clientTargetingPage:DELIVERY_DATE_RANGE')}`;
        break;
      }

      errMessage = getMinMaxNumberValuesError({
        minValue: minDurationTime,
        maxValue: maxDurationTime,
        sectionName: `${t('clientTargetingPage:G10_DELIVERY_DURATION_DETAIL')} / ${t('clientTargetingPage:ORDER_REACH_INTERVAL')}`,
      });
      if (errMessage) break;

      errMessage = getMinMaxNumberValuesError({
        minValue: minOrderCount,
        maxValue: maxOrderCount,
        sectionName: `${t('clientTargetingPage:G10_DELIVERY_DURATION_DETAIL')} / ${t('clientTargetingPage:ORDER_COUNT')}`,
      });
      if (errMessage) break;

      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        geoJson,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        isETAExceeded,
        minDurationTime,
        maxDurationTime,
        excludeQueueUsers,
        topXOrderType,
        minOrderCount,
        maxOrderCount,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir10.deliveryDuration', tempParams);
  }
  else {
    _.set(params, 'getir10.deliveryDuration', { isEnabled: false });
  }

  if (getir10.cancelled.isEnabled) {
    const { cancelled } = getir10;
    tempParams = {
      isEnabled: true,
      mergeType: cancelled.mergeType,
      params: [],
    };
    for (let i = 0; i < cancelled.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        geoJson, cancellationType, topXOrderType, minOrderCount, maxOrderCount,
      } = cancelled.params[i];

      if ((startDateType === 'dynamic' && (
        _.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (
          _.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' &&
          !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/${t('clientTargetingPage:CANCELLED_ORDER_DATE_RANGE')}`;
        break;
      }

      if (_.isNull(minOrderCount) || maxOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:G10_CANCELLED_ORDER_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')} (X)/${t('clientTargetingPage:MIN')}`;
        break;
      }

      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GETIR_10_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:G10_CANCELLED_ORDER_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')} (X)/${t('clientTargetingPage:MAX')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        geoJson,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        cancellationType,
        topXOrderType,
        minOrderCount,
        maxOrderCount,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir10.cancelled', tempParams);
  }
  else {
    _.set(params, 'getir10.cancelled', { isEnabled: false });
  }

  if (getir30.visitor.isEnabled) {
    const { visitor } = getir30;
    tempParams = {
      isEnabled: true,
      mergeType: visitor.mergeType,
      params: [],
    };
    for (let i = 0; i < visitor.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        geoJson,
      } = visitor.params[i];

      if ((startDateType === 'dynamic' && (
        _.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (
          _.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' &&
          !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/${t('clientTargetingPage:LAST_VISIT')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        geoJson,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir30.visitor', tempParams);
  }
  else {
    _.set(params, 'getir30.visitor', { isEnabled: false });
  }

  if (getir30.forcedTabOpen.isEnabled) {
    const { forcedTabOpen } = getir30;
    tempParams = {
      isEnabled: true,
      mergeType: forcedTabOpen.mergeType,
      params: [],
    };
    for (let i = 0; i < forcedTabOpen.params.length; i += 1) {
      const { minTabOpenCount, maxTabOpenCount, warehouses, cities, ignoreCountry } = forcedTabOpen.params[i];
      if (_.isNull(minTabOpenCount) || minTabOpenCount < 0) {
        errMessage = `${t('clientTargetingPage:GB_FORCED_TAB_OPEN_DETAIL')}/\
        ${t('clientTargetingPage:TAB_OPEN_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxTabOpenCount) && (maxTabOpenCount < 0 || maxTabOpenCount < minTabOpenCount)) {
        errMessage = `${t('clientTargetingPage:GB_FORCED_TAB_OPEN_DETAIL')}/\
        ${t('clientTargetingPage:TAB_OPEN_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        minTabOpenCount,
        maxTabOpenCount: getNumberOrNull(maxTabOpenCount),
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir30.forcedTabOpen', tempParams);
  }
  else {
    _.set(params, 'getir30.forcedTabOpen', { isEnabled: false });
  }

  if (getir30.lastOrder.isEnabled) {
    const { lastOrder } = getir30;

    tempParams = {
      isEnabled: true,
      mergeType: lastOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < lastOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, calculationType,
      } = lastOrder.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0)) || (endDateType === 'dynamic'
        && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/${t('clientTargetingPage:LAST_ORDER_DATE_RANGE')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        calculationType,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir30.lastOrder', tempParams);
  }
  else {
    _.set(params, 'getir30.lastOrder', { isEnabled: false });
  }

  if (getir30.firstOrder.isEnabled) {
    const { firstOrder } = getir30;
    tempParams = {
      isEnabled: true,
      mergeType: firstOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < firstOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, calculationType,
      } = firstOrder.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday)
          || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/${t('clientTargetingPage:FIRST_ORDER_DATE_RANGE')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        calculationType,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir30.firstOrder', tempParams);
  }
  else {
    _.set(params, 'getir30.firstOrder', { isEnabled: false });
  }

  if (getir30.maxOrder.isEnabled) {
    const { maxOrder } = getir30;
    tempParams = {
      isEnabled: true,
      mergeType: maxOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < maxOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate,
      } = maxOrder.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday)
          || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/${t('clientTargetingPage:MAX_ORDER_DATE_RANGE')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) throw new Error(errMessage);
    _.set(params, 'getir30.maxOrder', tempParams);
  }
  else {
    _.set(params, 'getir30.maxOrder', { isEnabled: false });
  }

  if (getir30.totalOrder.isEnabled) {
    const { totalOrder } = getir30;
    tempParams = {
      isEnabled: true,
      mergeType: totalOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < totalOrder.params.length; i += 1) {
      const { cities, ignoreCountry, warehouses, minOrderCount, maxOrderCount } = totalOrder.params[i];
      if (_.isNull(minOrderCount) || minOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (!_.isNull(minOrderCount) && minOrderCount === 0 && maxOrderCount !== 0) {
        // eslint-disable-next-line max-len
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:ERROR_IF_MIN_0_MAX_SHOULD_BE_0')}`;
        break;
      }
      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        minOrderCount,
        maxOrderCount: getNumberOrNull(maxOrderCount),
      });
    }
    if (errMessage) throw new Error(errMessage);
    _.set(params, 'getir30.totalOrder', tempParams);
  }
  else {
    _.set(params, 'getir30.totalOrder', { isEnabled: false });
  }

  if (getir30.missedOrder.isEnabled) {
    const { missedOrder } = getir30;
    tempParams = {
      isEnabled: true,
      mergeType: missedOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < missedOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, minOrderCount, maxOrderCount,
      } = missedOrder.params[i];
      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday)
          || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GB_MISSED_ORDER_DETAIL')}/${t('clientTargetingPage:MISSED_ORDER_DATE_RANGE')}`;
        break;
      }
      if (_.isNull(minOrderCount) || minOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GB_MISSED_ORDER_DETAIL')}/\
        ${t('clientTargetingPage:MISSED_ORDER_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GB_MISSED_ORDER_DETAIL')}/\
        ${t('clientTargetingPage:MISSED_ORDER_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        minOrderCount,
        maxOrderCount: getNumberOrNull(maxOrderCount),
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir30.missedOrder', tempParams);
  }
  else {
    _.set(params, 'getir30.missedOrder', { isEnabled: false });
  }

  if (getir30.includedRFTMSegment.isEnabled) {
    const { includedRFTMSegment } = getir30;
    tempParams = {
      isEnabled: true,
      mergeType: includedRFTMSegment.mergeType,
      params: [],
    };
    for (let i = 0; i < includedRFTMSegment.params.length; i += 1) {
      const {
        segments, maxFValue, maxHValue, maxMValue, maxRValue, maxTValue, minFValue, minHValue, minMValue, minRValue,
        minTValue,
      } = includedRFTMSegment.params[i];
      if (_.isNull(minRValue) || minRValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_GB_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:R_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxRValue) && (maxRValue < 0 || maxRValue < minRValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_GB_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:R_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (_.isNull(minFValue) || minFValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_GB_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:F_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxFValue) && (maxFValue < 0 || maxFValue < minFValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_GB_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:F_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (_.isNull(minTValue) || minTValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_GB_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:T_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxTValue) && (maxTValue < 0 || maxTValue < minTValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_GB_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:T_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (_.isNull(minMValue) || minMValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_GB_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:M_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxMValue) && (maxMValue < 0 || maxMValue < minMValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_GB_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:M_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (_.isNull(minHValue) || minHValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_GB_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:H_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxHValue) && (maxHValue < 0 || maxHValue < minHValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_GB_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:H_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        minRValue,
        maxRValue: getNumberOrNull(maxRValue),
        minFValue,
        maxFValue: getNumberOrNull(maxFValue),
        minTValue,
        maxTValue: getNumberOrNull(maxTValue),
        minMValue,
        maxMValue: getNumberOrNull(maxMValue),
        minHValue,
        maxHValue: getNumberOrNull(maxHValue),
        segments,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir30.includedRFTMSegment', tempParams);
  }
  else {
    _.set(params, 'getir30.includedRFTMSegment', { isEnabled: false });
  }

  if (getir30.excludedRFTMSegment.isEnabled) {
    const { excludedRFTMSegment } = getir30;
    tempParams = {
      isEnabled: true,
      mergeType: excludedRFTMSegment.mergeType,
      params: [],
    };
    for (let i = 0; i < excludedRFTMSegment.params.length; i += 1) {
      const {
        segments, maxFValue, maxHValue, maxMValue, maxRValue, maxTValue, minFValue, minHValue, minMValue, minRValue,
        minTValue,
      } = excludedRFTMSegment.params[i];
      if (_.isNull(minRValue) || minRValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:EXCLUDED_GB_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:R_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxRValue) && (maxRValue < 0 || maxRValue < minRValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:EXCLUDED_GB_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:R_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (_.isNull(minFValue) || minFValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:EXCLUDED_GB_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:F_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxFValue) && (maxFValue < 0 || maxFValue < minFValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:EXCLUDED_GB_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:F_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (_.isNull(minTValue) || minTValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:EXCLUDED_GB_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:T_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxTValue) && (maxTValue < 0 || maxTValue < minTValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:EXCLUDED_GB_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:T_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (_.isNull(minMValue) || minMValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:EXCLUDED_GB_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:M_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxMValue) && (maxMValue < 0 || maxMValue < minMValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:EXCLUDED_GB_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:M_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (_.isNull(minHValue) || minHValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:EXCLUDED_GB_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:H_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxHValue) && (maxHValue < 0 || maxHValue < minHValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:EXCLUDED_GB_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:H_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        minRValue,
        maxRValue: getNumberOrNull(maxRValue),
        minFValue,
        maxFValue: getNumberOrNull(maxFValue),
        minTValue,
        maxTValue: getNumberOrNull(maxTValue),
        minMValue,
        maxMValue: getNumberOrNull(maxMValue),
        minHValue,
        maxHValue: getNumberOrNull(maxHValue),
        segments,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir30.excludedRFTMSegment', tempParams);
  }
  else {
    _.set(params, 'getir30.excludedRFTMSegment', { isEnabled: false });
  }

  if (getir30.deliveryDuration.isEnabled) {
    const { deliveryDuration } = getir30;
    tempParams = {
      isEnabled: true,
      mergeType: deliveryDuration.mergeType,
      params: [],
    };
    for (let i = 0; i < deliveryDuration.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses,
        startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        minDurationTime, maxDurationTime,
        excludeQueueUsers, isETAExceeded, topXOrderType,
        minOrderCount, maxOrderCount,
        geoJson,
      } = deliveryDuration.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:G30_DELIVERY_DURATION_DETAIL')} / ${t('clientTargetingPage:DELIVERY_DATE_RANGE')}`;
        break;
      }

      errMessage = getMinMaxNumberValuesError({
        minValue: minDurationTime,
        maxValue: maxDurationTime,
        sectionName: `${t('clientTargetingPage:G30_DELIVERY_DURATION_DETAIL')} / ${t('clientTargetingPage:ORDER_REACH_INTERVAL')}`,
      });
      if (errMessage) break;

      errMessage = getMinMaxNumberValuesError({
        minValue: minOrderCount,
        maxValue: maxOrderCount,
        sectionName: `${t('clientTargetingPage:G30_DELIVERY_DURATION_DETAIL')} / ${t('clientTargetingPage:ORDER_COUNT')}`,
      });
      if (errMessage) break;

      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        geoJson,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        isETAExceeded,
        minDurationTime,
        maxDurationTime,
        excludeQueueUsers,
        topXOrderType,
        minOrderCount,
        maxOrderCount,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir30.deliveryDuration', tempParams);
  }
  else {
    _.set(params, 'getir30.deliveryDuration', { isEnabled: false });
  }

  if (getir30.cancelled.isEnabled) {
    const { cancelled } = getir30;
    tempParams = {
      isEnabled: true,
      mergeType: cancelled.mergeType,
      params: [],
    };
    for (let i = 0; i < cancelled.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        geoJson, cancellationType, topXOrderType, minOrderCount, maxOrderCount,
      } = cancelled.params[i];

      if ((startDateType === 'dynamic' && (
        _.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (
          _.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' &&
          !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/${t('clientTargetingPage:CANCELLED_ORDER_DATE_RANGE')}`;
        break;
      }

      if (_.isNull(minOrderCount) || maxOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:G30_CANCELLED_ORDER_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')} (X)/${t('clientTargetingPage:MIN')}`;
        break;
      }

      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GETIR_MORE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:G30_CANCELLED_ORDER_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')} (X)/${t('clientTargetingPage:MAX')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        geoJson,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        cancellationType,
        topXOrderType,
        minOrderCount,
        maxOrderCount,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getir30.cancelled', tempParams);
  }
  else {
    _.set(params, 'getir30.cancelled', { isEnabled: false });
  }

  if (getirFood.visitor.isEnabled) {
    const { visitor } = getirFood;
    tempParams = {
      isEnabled: true,
      mergeType: visitor.mergeType,
      params: [],
    };
    for (let i = 0; i < visitor.params.length; i += 1) {
      const {
        cities, ignoreCountry, restaurants, importedRestaurants,
        startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        geoJson,
      } = visitor.params[i];
      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/${t('clientTargetingPage:LAST_VISIT')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        restaurants: !_.isEmpty(importedRestaurants) ? importedRestaurants : restaurants,
        geoJson,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirFood.visitor', tempParams);
  }
  else {
    _.set(params, 'getirFood.visitor', { isEnabled: false });
  }

  if (getirFood.lastVisitor.isEnabled) {
    const { lastVisitor } = getirFood;
    tempParams = {
      isEnabled: true,
      mergeType: lastVisitor.mergeType,
      params: [],
    };
    for (let i = 0; i < lastVisitor.params.length; i += 1) {
      const {
        cities, ignoreCountry, restaurants, importedRestaurants,
        startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        geoJson,
      } = lastVisitor.params[i];
      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/${t('clientTargetingPage:GF_LAST_APP_OPEN_DETAIL')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        restaurants: !_.isEmpty(importedRestaurants) ? importedRestaurants : restaurants,
        geoJson,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirFood.lastVisitor', tempParams);
  }
  else {
    _.set(params, 'getirFood.lastVisitor', { isEnabled: false });
  }

  if (getirFood.forcedTabOpen.isEnabled) {
    const { forcedTabOpen } = getirFood;

    tempParams = {
      isEnabled: true,
      mergeType: forcedTabOpen.mergeType,
      params: [],
    };
    for (let i = 0; i < forcedTabOpen.params.length; i += 1) {
      const { minTabOpenCount, maxTabOpenCount, cities, ignoreCountry, restaurants, importedRestaurants } = forcedTabOpen.params[i];
      if (_.isNull(minTabOpenCount) || minTabOpenCount < 0) {
        errMessage = `${t('clientTargetingPage:GF_FORCED_TAB_OPEN_DETAIL')}/\
        ${t('clientTargetingPage:TAB_OPEN_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxTabOpenCount) && (maxTabOpenCount < 0 || maxTabOpenCount < minTabOpenCount)) {
        errMessage = `${t('clientTargetingPage:GF_FORCED_TAB_OPEN_DETAIL')}/\
        ${t('clientTargetingPage:TAB_OPEN_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        restaurants: !_.isEmpty(importedRestaurants) ? importedRestaurants : restaurants,
        minTabOpenCount,
        maxTabOpenCount: getNumberOrNull(maxTabOpenCount),
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirFood.forcedTabOpen', tempParams);
  }
  else {
    _.set(params, 'getirFood.forcedTabOpen', { isEnabled: false });
  }

  if (getirFood.lastOrder.isEnabled) {
    const { lastOrder } = getirFood;
    tempParams = {
      isEnabled: true,
      mergeType: lastOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < lastOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, restaurants, importedRestaurants,
        startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate, calculationType,
        restaurantDelivery, getirDelivery,
      } = lastOrder.params[i];
      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday)
          || endDayBeforeToday < 0)) || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/${t('clientTargetingPage:LAST_ORDER_DATE_RANGE')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        restaurants: !_.isEmpty(importedRestaurants) ? importedRestaurants : restaurants,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        calculationType,
        restaurantDelivery,
        getirDelivery,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirFood.lastOrder', tempParams);
  }
  else {
    _.set(params, 'getirFood.lastOrder', { isEnabled: false });
  }

  if (getirFood.firstOrder.isEnabled) {
    const { firstOrder } = getirFood;
    tempParams = {
      isEnabled: true,
      mergeType: firstOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < firstOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, restaurants, importedRestaurants,
        startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate, calculationType,
      } = firstOrder.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0)) ||
        (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0)) ||
        (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/${('clientTargetingPage:FIRST_ORDER_DATE_RANGE')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        restaurants: !_.isEmpty(importedRestaurants) ? importedRestaurants : restaurants,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        calculationType,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirFood.firstOrder', tempParams);
  }
  else {
    _.set(params, 'getirFood.firstOrder', { isEnabled: false });
  }

  if (getirFood.totalOrder.isEnabled) {
    const { totalOrder } = getirFood;
    tempParams = {
      isEnabled: true,
      mergeType: totalOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < totalOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, restaurants, importedRestaurants, minOrderCount, maxOrderCount, cuisines,
        restaurantDelivery, getirDelivery, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
      } = totalOrder.params[i];
      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/${t('clientTargetingPage:ORDER_DATE_RANGE')}`;
        break;
      }
      if (_.isNull(minOrderCount) || minOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GF_ORDER_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (!_.isNull(minOrderCount) && minOrderCount === 0 && maxOrderCount !== 0) {
        // eslint-disable-next-line max-len
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/${t('clientTargetingPage:GF_ORDER_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:ERROR_IF_MIN_0_MAX_SHOULD_BE_0')}`;
        break;
      }
      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GF_ORDER_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        restaurants: !_.isEmpty(importedRestaurants) ? importedRestaurants : restaurants,
        cuisines,
        minOrderCount,
        maxOrderCount: getNumberOrNull(maxOrderCount),
        restaurantDelivery,
        getirDelivery,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirFood.totalOrder', tempParams);
  }
  else {
    _.set(params, 'getirFood.totalOrder', { isEnabled: false });
  }

  if (getirFood.excludedOrder.isEnabled) {
    const { excludedOrder } = getirFood;
    tempParams = {
      isEnabled: true,
      mergeType: excludedOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < excludedOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, importedRestaurants, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        cuisines, restaurants,
      } = excludedOrder.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday)
          || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GF_EXCLUDE_ORDER_DETAIL')}/${t('clientTargetingPage:DATE_RANGE')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        restaurants: !_.isEmpty(importedRestaurants) ? importedRestaurants : restaurants,
        cuisines,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirFood.excludedOrder', tempParams);
  }
  else {
    _.set(params, 'getirFood.excludedOrder', { isEnabled: false });
  }

  if (getirFood.missedOrder.isEnabled) {
    const { missedOrder } = getirFood;
    tempParams = {
      isEnabled: true,
      mergeType: missedOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < missedOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, restaurants, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        minOrderCount, maxOrderCount, importedRestaurants,
      } = missedOrder.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/${t('clientTargetingPage:MISSED_ORDER_DATE_RANGE')}`;
        break;
      }
      if (_.isNull(minOrderCount) || minOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GF_MISSED_ORDER_DETAIL')}/${t('clientTargetingPage:MISSED_ORDER_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GF_MISSED_ORDER_DETAIL')}/${t('clientTargetingPage:MISSED_ORDER_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        restaurants: !_.isEmpty(importedRestaurants) ? importedRestaurants : restaurants,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        minOrderCount,
        maxOrderCount: getNumberOrNull(maxOrderCount),
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirFood.missedOrder', tempParams);
  }
  else {
    _.set(params, 'getirFood.missedOrder', { isEnabled: false });
  }

  if (getirFood.foodProduct.isEnabled) {
    const { foodProduct } = getirFood;
    tempParams = {
      isEnabled: true,
      mergeType: foodProduct.mergeType,
      params: [],
    };
    for (let i = 0; i < foodProduct.params.length; i += 1) {
      const {
        cities, ignoreCountry, products, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        minOrderCount, maxOrderCount, restaurant,
      } = foodProduct.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_FOOD_FILTER')}/${t('clientTargetingPage:DATE_RANGE')}`;
        break;
      }
      if (_.isNull(minOrderCount) || minOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_FOOD_FILTER')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:INCLUDED_FOOD_FILTER')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        products,
        restaurant,
        minOrderCount,
        maxOrderCount: getNumberOrNull(maxOrderCount),
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirFood.foodProduct', tempParams);
  }
  else {
    _.set(params, 'getirFood.foodProduct', { isEnabled: false });
  }

  if (getirFood.excludedFoodProduct.isEnabled) {
    const { excludedFoodProduct } = getirFood;
    tempParams = {
      isEnabled: true,
      mergeType: excludedFoodProduct.mergeType,
      params: [],
    };
    for (let i = 0; i < excludedFoodProduct.params.length; i += 1) {
      const {
        cities, ignoreCountry, products, startDateType, startDayBeforeToday,
        startDate, endDateType, endDayBeforeToday, endDate, restaurant,
      } = excludedFoodProduct.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/${t('clientTargetingPage:EXCLUDED_FOOD_FILTER')}/\
        ${t('clientTargetingPage:DATE_RANGE')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        products,
        restaurant,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirFood.excludedFoodProduct', tempParams);
  }
  else {
    _.set(params, 'getirFood.excludedFoodProduct', { isEnabled: false });
  }

  if (getirFood.cancelled.isEnabled) {
    const { cancelled } = getirFood;
    tempParams = {
      isEnabled: true,
      mergeType: cancelled.mergeType,
      params: [],
    };
    for (let i = 0; i < cancelled.params.length; i += 1) {
      const {
        cities, ignoreCountry, restaurants, importedRestaurants,
        startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        geoJson, maxValue, minValue, topXOrderType, minOrderCount, maxOrderCount,
      } = cancelled.params[i];
      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/${t('clientTargetingPage:CANCELLED_ORDER_DATE_RANGE')}`;
        break;
      }
      if (_.isNull(minValue) || minValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GF_CANCELLED_ORDER_DETAIL')}/${t('clientTargetingPage:NUMBER_OF_CANCEL')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxValue) && (maxValue < 0 || maxValue < minValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GF_CANCELLED_ORDER_DETAIL')}/${t('clientTargetingPage:NUMBER_OF_CANCEL')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      if (_.isNull(minOrderCount) || maxOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GF_CANCELLED_ORDER_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')} (X)/${t('clientTargetingPage:MIN')}`;
        break;
      }

      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GF_CANCELLED_ORDER_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')} (X)/${t('clientTargetingPage:MAX')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        restaurants: !_.isEmpty(importedRestaurants) ? importedRestaurants : restaurants,
        geoJson,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        maxValue,
        minValue,
        topXOrderType,
        minOrderCount,
        maxOrderCount,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirFood.cancelled', tempParams);
  }
  else {
    _.set(params, 'getirFood.cancelled', { isEnabled: false });
  }

  if (getirFood.behaviorRFTMSegment.isEnabled) {
    const { behaviorRFTMSegment } = getirFood;
    tempParams = {
      isEnabled: true,
      mergeType: behaviorRFTMSegment.mergeType,
      params: [],
    };
    for (let i = 0; i < behaviorRFTMSegment.params.length; i += 1) {
      const {
        segments, maxFValue, maxHValue, maxMValue, maxRValue, maxTValue, minFValue, minHValue, minMValue, minRValue,
        minTValue,
      } = behaviorRFTMSegment.params[i];
      if (_.isNull(minRValue) || minRValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:BEHAVIOR_GF_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:R_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxRValue) && (maxRValue < 0 || maxRValue < minRValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:BEHAVIOR_GF_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:R_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (_.isNull(minFValue) || minFValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:BEHAVIOR_GF_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:F_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxFValue) && (maxFValue < 0 || maxFValue < minFValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:BEHAVIOR_GF_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:F_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (_.isNull(minTValue) || minTValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:BEHAVIOR_GF_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:T_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxTValue) && (maxTValue < 0 || maxTValue < minTValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:BEHAVIOR_GF_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:T_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (_.isNull(minMValue) || minMValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:BEHAVIOR_GF_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:M_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxMValue) && (maxMValue < 0 || maxMValue < minMValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:BEHAVIOR_GF_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:M_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (_.isNull(minHValue) || minHValue < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:BEHAVIOR_GF_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:H_VALUE')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxHValue) && (maxHValue < 0 || maxHValue < minHValue)) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:BEHAVIOR_GF_RFM_SEGMENT_DETAIL')}/${t('clientTargetingPage:H_VALUE')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        minRValue,
        maxRValue: getNumberOrNull(maxRValue),
        minFValue,
        maxFValue: getNumberOrNull(maxFValue),
        minTValue,
        maxTValue: getNumberOrNull(maxTValue),
        minMValue,
        maxMValue: getNumberOrNull(maxMValue),
        minHValue,
        maxHValue: getNumberOrNull(maxHValue),
        segments,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirFood.behaviorRFTMSegment', tempParams);
  }
  else {
    _.set(params, 'getirFood.behaviorRFTMSegment', { isEnabled: false });
  }

  if (getirFood.includedClientSegment.isEnabled) {
    const { includedClientSegment } = getirFood;
    tempParams = {
      isEnabled: true,
      mergeType: includedClientSegment.mergeType,
      params: [],
    };
    for (let i = 0; i < includedClientSegment.params.length; i += 1) {
      const { segments } = includedClientSegment.params[i];
      tempParams.params.push({ segments });
    }
    _.set(params, 'getirFood.includedClientSegment', tempParams);
  }
  else {
    _.set(params, 'getirFood.includedClientSegment', { isEnabled: false });
  }

  if (getirFood.loyaltyOrder.isEnabled) {
    const { loyaltyOrder } = getirFood;
    tempParams = {
      isEnabled: true,
      mergeType: loyaltyOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < loyaltyOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, restaurants, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        minOrderCount, maxOrderCount, importedRestaurants,
      } = loyaltyOrder.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/${t('clientTargetingPage:LOYALTY.ORDER_DATE')}`;
        break;
      }
      if (_.isNull(minOrderCount) || minOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GF_LOYALTY_ORDER_DETAIL')}/${t('clientTargetingPage:LOYALTY.ORDER_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GF_LOYALTY_ORDER_DETAIL')}/${t('clientTargetingPage:LOYALTY.ORDER_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        restaurants: !_.isEmpty(importedRestaurants) ? importedRestaurants : restaurants,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        minOrderCount,
        maxOrderCount: getNumberOrNull(maxOrderCount),
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirFood.loyaltyOrder', tempParams);
  }
  else {
    _.set(params, 'getirFood.loyaltyOrder', { isEnabled: false });
  }

  if (getirFood.loyalty.isEnabled) {
    const { loyalty } = getirFood;
    tempParams = {
      isEnabled: true,
      mergeType: loyalty.mergeType,
      params: [],
    };
    for (let i = 0; i < loyalty.params.length; i += 1) {
      const {
        minStampOrderCount, maxStampOrderCount, minFreeOrderCount, maxFreeOrderCount,
        minLastOrderDayDiff, maxLastOrderDayDiff, minCycle, maxCycle,
      } = loyalty.params[i];

      errMessage = getMinMaxNumberValuesError({
        minValue: minStampOrderCount,
        maxValue: maxStampOrderCount,
        sectionName: `${t('clientTargetingPage:GF_LOYALTY_DETAIL')} / ${t('clientTargetingPage:STAMP_COUNT')}`,
      });
      if (errMessage) break;
      errMessage = getMinMaxNumberValuesError({
        minValue: minFreeOrderCount,
        maxValue: maxFreeOrderCount,
        sectionName: `${t('clientTargetingPage:GF_LOYALTY_DETAIL')} / ${t('clientTargetingPage:FREE_ORDER_COUNT')}`,
      });
      if (errMessage) break;
      errMessage = getMinMaxNumberValuesError({
        minValue: minLastOrderDayDiff,
        maxValue: maxLastOrderDayDiff,
        sectionName: `${t('clientTargetingPage:GF_LOYALTY_DETAIL')} / ${t('clientTargetingPage:DAY_DIFFERENCE_SINCE_LAST_ORDER')}`,
      });
      if (errMessage) break;
      errMessage = getMinMaxNumberValuesError({
        minValue: minCycle,
        maxValue: maxCycle,
        sectionName: `${t('clientTargetingPage:GF_LOYALTY_DETAIL')} / ${t('clientTargetingPage:CYCLE')}`,
      });
      if (errMessage) break;

      tempParams.params.push({
        minStampOrderCount,
        maxStampOrderCount: getNumberOrNull(maxStampOrderCount),
        minFreeOrderCount,
        maxFreeOrderCount: getNumberOrNull(maxFreeOrderCount),
        minLastOrderDayDiff,
        maxLastOrderDayDiff: getNumberOrNull(maxLastOrderDayDiff),
        minCycle,
        maxCycle: getNumberOrNull(maxCycle),
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirFood.loyalty', tempParams);
  }
  else {
    _.set(params, 'getirFood.loyalty', { isEnabled: false });
  }

  if (getirFood.promoUsage.isEnabled) {
    const { promoUsage } = getirFood;
    tempParams = {
      isEnabled: true,
      mergeType: promoUsage.mergeType,
      params: [],
    };
    for (let i = 0; i < promoUsage.params.length; i += 1) {
      const {
        usedPromos, excludeClients, startDateType, startDayBeforeToday, startDate,
        endDateType, endDayBeforeToday, endDate, promoObjective,
      } = promoUsage.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GETIR_FOOD_SERVICE_DETAIL')}/${t('clientTargetingPage:PROMO_DETAIL')}/${t('clientTargetingPage:DATE_RANGE')}`;
        break;
      }

      tempParams.params.push({
        usedPromos,
        excludeClients,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        promoObjective,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirFood.promoUsage', tempParams);
  }
  else {
    _.set(params, 'getirFood.promoUsage', { isEnabled: false });
  }

  if (getirVoyager.visitor.isEnabled) {
    const { visitor } = getirVoyager;
    tempParams = {
      isEnabled: true,
      mergeType: visitor.mergeType,
      params: [],
    };
    for (let i = 0; i < visitor.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        geoJson,
      } = visitor.params[i];

      if ((startDateType === 'dynamic' && (
        _.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (
          _.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' &&
          !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_WATER_SERVICE_DETAIL')}/${t('clientTargetingPage:LAST_VISIT')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        geoJson,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirVoyager.visitor', tempParams);
  }
  else {
    _.set(params, 'getirVoyager.visitor', { isEnabled: false });
  }

  if (getirVoyager.forcedTabOpen.isEnabled) {
    const { forcedTabOpen } = getirVoyager;
    tempParams = {
      isEnabled: true,
      mergeType: forcedTabOpen.mergeType,
      params: [],
    };
    for (let i = 0; i < forcedTabOpen.params.length; i += 1) {
      const { minTabOpenCount, maxTabOpenCount, warehouses, cities, ignoreCountry } = forcedTabOpen.params[i];
      if (_.isNull(minTabOpenCount) || minTabOpenCount < 0) {
        errMessage = `${t('clientTargetingPage:GW_FORCED_TAB_OPEN_DETAIL')}/\
        ${t('clientTargetingPage:TAB_OPEN_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxTabOpenCount) && (maxTabOpenCount < 0 || maxTabOpenCount < minTabOpenCount)) {
        errMessage = `${t('clientTargetingPage:GW_FORCED_TAB_OPEN_DETAIL')}/\
        ${t('clientTargetingPage:TAB_OPEN_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        minTabOpenCount,
        maxTabOpenCount: getNumberOrNull(maxTabOpenCount),
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirVoyager.forcedTabOpen', tempParams);
  }
  else {
    _.set(params, 'getirVoyager.forcedTabOpen', { isEnabled: false });
  }

  if (getirVoyager.lastOrder.isEnabled) {
    const { lastOrder } = getirVoyager;

    tempParams = {
      isEnabled: true,
      mergeType: lastOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < lastOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, calculationType,
      } = lastOrder.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0)) || (endDateType === 'dynamic'
        && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_WATER_SERVICE_DETAIL')}/${t('clientTargetingPage:LAST_ORDER_DATE_RANGE')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        calculationType,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirVoyager.lastOrder', tempParams);
  }
  else {
    _.set(params, 'getirVoyager.lastOrder', { isEnabled: false });
  }

  if (getirVoyager.firstOrder.isEnabled) {
    const { firstOrder } = getirVoyager;

    tempParams = {
      isEnabled: true,
      mergeType: firstOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < firstOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, calculationType,
      } = firstOrder.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0)) || (endDateType === 'dynamic'
        && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_WATER_SERVICE_DETAIL')}/${t('clientTargetingPage:FIRST_ORDER_DATE_RANGE')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        calculationType,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirVoyager.firstOrder', tempParams);
  }
  else {
    _.set(params, 'getirVoyager.firstOrder', { isEnabled: false });
  }

  if (getirVoyager.maxOrder.isEnabled) {
    const { maxOrder } = getirVoyager;
    tempParams = {
      isEnabled: true,
      mergeType: maxOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < maxOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate,
      } = maxOrder.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_WATER_SERVICE_DETAIL')}/${t('clientTargetingPage:MAX_ORDER_DATE_RANGE')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) throw new Error(errMessage);
    _.set(params, 'getirVoyager.maxOrder', tempParams);
  }
  else {
    _.set(params, 'getirVoyager.maxOrder', { isEnabled: false });
  }

  if (getirVoyager.totalOrder.isEnabled) {
    const { totalOrder } = getirVoyager;
    tempParams = {
      isEnabled: true,
      mergeType: totalOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < totalOrder.params.length; i += 1) {
      const {
        cities,
        ignoreCountry,
        warehouses,
        minOrderCount,
        maxOrderCount,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      } = totalOrder.params[i];
      if (_.isNull(minOrderCount) || minOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_WATER_SERVICE_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (!_.isNull(minOrderCount) && minOrderCount === 0 && maxOrderCount !== 0) {
        // eslint-disable-next-line max-len
        errMessage = `${t('clientTargetingPage:GETIR_WATER_SERVICE_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:ERROR_IF_MIN_0_MAX_SHOULD_BE_0')}`;
        break;
      }
      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GETIR_WATER_SERVICE_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GETIR_WATER_SERVICE_DETAIL')} /
        ${t('clientTargetingPage:GW_ORDER_DETAIL')} / ${t('clientTargetingPage:DATE_RANGE')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        minOrderCount,
        maxOrderCount: getNumberOrNull(maxOrderCount),
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) throw new Error(errMessage);
    _.set(params, 'getirVoyager.totalOrder', tempParams);
  }
  else {
    _.set(params, 'getirVoyager.totalOrder', { isEnabled: false });
  }

  if (getirVoyager.missedOrder.isEnabled) {
    const { missedOrder } = getirVoyager;
    tempParams = {
      isEnabled: true,
      mergeType: missedOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < missedOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, minOrderCount, maxOrderCount,
      } = missedOrder.params[i];
      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GW_MISSED_ORDER_DETAIL')}/${t('clientTargetingPage:MISSED_ORDER_DATE_RANGE')}`;
        break;
      }
      if (_.isNull(minOrderCount) || minOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GW_MISSED_ORDER_DETAIL')}/\
        ${t('clientTargetingPage:MISSED_ORDER_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GW_MISSED_ORDER_DETAIL')}/\
        ${t('clientTargetingPage:MISSED_ORDER_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        minOrderCount,
        maxOrderCount: getNumberOrNull(maxOrderCount),
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirVoyager.missedOrder', tempParams);
  }
  else {
    _.set(params, 'getirVoyager.missedOrder', { isEnabled: false });
  }

  if (getirVoyager.carboyPurchaseFrequency.isEnabled) {
    const { carboyPurchaseFrequency } = getirVoyager;

    tempParams = {
      isEnabled: true,
      mergeType: carboyPurchaseFrequency.mergeType,
      params: [],
    };
    for (let i = 0; i < carboyPurchaseFrequency.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, selectedCountType, selectedCountMinValue, selectedCountMaxValue,
      } = carboyPurchaseFrequency.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0)) || (endDateType === 'dynamic'
        && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_WATER_SERVICE_DETAIL')}/${t('clientTargetingPage:ORDER_DATE')}`;
        break;
      }

      if (_.isNull(selectedCountMinValue) || selectedCountMinValue < 0) {
        errMessage = `${t('clientTargetingPage:GW_CARBOY_PURCHASE_FREQUENCY')}/\
        ${t(`clientTargetingPage:${selectedCountType}`)}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(selectedCountMaxValue) && (selectedCountMaxValue < 0 || selectedCountMaxValue < selectedCountMinValue)) {
        errMessage = `${t('clientTargetingPage:GW_CARBOY_PURCHASE_FREQUENCY')}/\
        ${t(`clientTargetingPage:${selectedCountType}`)}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        selectedCountType,
        selectedCountMinValue,
        selectedCountMaxValue,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirVoyager.carboyPurchaseFrequency', tempParams);
  }
  else {
    _.set(params, 'getirVoyager.carboyPurchaseFrequency', { isEnabled: false });
  }

  if (getirVoyager.deliveryDuration.isEnabled) {
    const { deliveryDuration } = getirVoyager;
    tempParams = {
      isEnabled: true,
      mergeType: deliveryDuration.mergeType,
      params: [],
    };
    for (let i = 0; i < deliveryDuration.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses,
        startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        minDurationTime, maxDurationTime,
        excludeQueueUsers, isETAExceeded, topXOrderType,
        minOrderCount, maxOrderCount,
        geoJson,
      } = deliveryDuration.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GW_DELIVERY_DURATION_DETAIL')} / ${t('clientTargetingPage:DELIVERY_DATE_RANGE')}`;
        break;
      }

      errMessage = getMinMaxNumberValuesError({
        minValue: minDurationTime,
        maxValue: maxDurationTime,
        sectionName: `${t('clientTargetingPage:GW_DELIVERY_DURATION_DETAIL')} / ${t('clientTargetingPage:ORDER_REACH_INTERVAL')}`,
      });
      if (errMessage) break;

      errMessage = getMinMaxNumberValuesError({
        minValue: minOrderCount,
        maxValue: maxOrderCount,
        sectionName: `${t('clientTargetingPage:GW_DELIVERY_DURATION_DETAIL')} / ${t('clientTargetingPage:ORDER_COUNT')}`,
      });
      if (errMessage) break;

      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        geoJson,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        isETAExceeded,
        minDurationTime,
        maxDurationTime,
        excludeQueueUsers,
        topXOrderType,
        minOrderCount,
        maxOrderCount,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirVoyager.deliveryDuration', tempParams);
  }
  else {
    _.set(params, 'getirVoyager.deliveryDuration', { isEnabled: false });
  }

  if (getirVoyager.cancelled.isEnabled) {
    const { cancelled } = getirVoyager;
    tempParams = {
      isEnabled: true,
      mergeType: cancelled.mergeType,
      params: [],
    };
    for (let i = 0; i < cancelled.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        geoJson, cancellationType, topXOrderType, minOrderCount, maxOrderCount,
      } = cancelled.params[i];

      if ((startDateType === 'dynamic' && (
        _.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (
          _.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' &&
          !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_WATER_SERVICE_DETAIL')}/${t('clientTargetingPage:CANCELLED_ORDER_DATE_RANGE')}`;
        break;
      }

      if (_.isNull(minOrderCount) || maxOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_WATER_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GW_CANCELLED_ORDER_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')} (X)/${t('clientTargetingPage:MIN')}`;
        break;
      }

      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GETIR_WATER_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GW_CANCELLED_ORDER_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')} (X)/${t('clientTargetingPage:MAX')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        geoJson,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        cancellationType,
        topXOrderType,
        minOrderCount,
        maxOrderCount,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirVoyager.cancelled', tempParams);
  }
  else {
    _.set(params, 'getirVoyager.cancelled', { isEnabled: false });
  }

  if (getirBitaksi.visitor.isEnabled) {
    const { visitor } = getirBitaksi;
    tempParams = {
      isEnabled: true,
      mergeType: visitor.mergeType,
      params: [],
    };
    for (let i = 0; i < visitor.params.length; i += 1) {
      const {
        cities, ignoreCountry, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        geoJson,
      } = visitor.params[i];

      if ((startDateType === 'dynamic' && (
        _.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (
          _.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' &&
          !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GBT_TAB_OPEN_DETAIL')}/${t('clientTargetingPage:LAST_VISIT')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        geoJson,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirBitaksi.visitor', tempParams);
  }
  else {
    _.set(params, 'getirBitaksi.visitor', { isEnabled: false });
  }

  if (getirBitaksi.forcedTabOpen.isEnabled) {
    const { forcedTabOpen } = getirBitaksi;
    tempParams = {
      isEnabled: true,
      mergeType: forcedTabOpen.mergeType,
      params: [],
    };
    for (let i = 0; i < forcedTabOpen.params.length; i += 1) {
      const { minTabOpenCount, maxTabOpenCount, cities, ignoreCountry, geoJson } = forcedTabOpen.params[i];
      if (_.isNull(minTabOpenCount) || minTabOpenCount < 0) {
        errMessage = `${t('clientTargetingPage:GBT_FORCED_TAB_OPEN_DETAIL')}/\
        ${t('clientTargetingPage:TAB_OPEN_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxTabOpenCount) && (maxTabOpenCount < 0 || maxTabOpenCount < minTabOpenCount)) {
        errMessage = `${t('clientTargetingPage:GBT_FORCED_TAB_OPEN_DETAIL')}/\
        ${t('clientTargetingPage:TAB_OPEN_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        geoJson,
        minTabOpenCount,
        maxTabOpenCount: getNumberOrNull(maxTabOpenCount),
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirBitaksi.forcedTabOpen', tempParams);
  }
  else {
    _.set(params, 'getirBitaksi.forcedTabOpen', { isEnabled: false });
  }

  if (getirBitaksi.lastOrder.isEnabled) {
    const { lastOrder } = getirBitaksi;

    tempParams = {
      isEnabled: true,
      mergeType: lastOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < lastOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, geoJson, calculationType,
      } = lastOrder.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0)) || (endDateType === 'dynamic'
        && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GBT_LAST_ORDER_DETAIL')}/${t('clientTargetingPage:LAST_TRIP_DATE_RANGE')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        geoJson,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        calculationType,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirBitaksi.lastTrip', tempParams);
  }
  else {
    _.set(params, 'getirBitaksi.lastTrip', { isEnabled: false });
  }

  if (getirBitaksi.callFrequency.isEnabled) {
    const { callFrequency } = getirBitaksi;

    tempParams = {
      isEnabled: true,
      mergeType: callFrequency.mergeType,
      params: [],
    };
    for (let i = 0; i < callFrequency.params.length; i += 1) {
      const {
        cities, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, minCallCount, maxCallCount,
      } = callFrequency.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0)) || (endDateType === 'dynamic'
        && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:CALL_DETAIL')}/${t('clientTargetingPage:CALL_DATE_RANGE')}`;
        break;
      }
      if (_.isNull(minCallCount) || minCallCount < 0) {
        errMessage = `${t('clientTargetingPage:CALL_DETAIL')}/${t('clientTargetingPage:CALL_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxCallCount) && (maxCallCount < 0 || maxCallCount < minCallCount)) {
        errMessage = `${t('clientTargetingPage:CALL_DETAIL')}/${t('clientTargetingPage:CALL_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      tempParams.params.push({
        cities,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        minCallCount,
        maxCallCount,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirBitaksi.callFrequency', tempParams);
  }
  else {
    _.set(params, 'getirBitaksi.callFrequency', { isEnabled: false });
  }

  if (getirBitaksi.firstOrder.isEnabled) {
    const { firstOrder } = getirBitaksi;

    tempParams = {
      isEnabled: true,
      mergeType: firstOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < firstOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, geoJson, calculationType,
      } = firstOrder.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0)) || (endDateType === 'dynamic'
        && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GBT_FIRST_ORDER_DETAIL')}/${t('clientTargetingPage:FIRST_TRIP_DATE_RANGE')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        geoJson,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        calculationType,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirBitaksi.firstTrip', tempParams);
  }
  else {
    _.set(params, 'getirBitaksi.firstTrip', { isEnabled: false });
  }

  if (getirBitaksi.maxOrder.isEnabled) {
    const { maxOrder } = getirBitaksi;
    tempParams = {
      isEnabled: true,
      mergeType: maxOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < maxOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate,
      } = maxOrder.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GBT_MAX_ORDER_DETAIL')}/${t('clientTargetingPage:MAX_TRIP_DATE_RANGE')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) throw new Error(errMessage);
    _.set(params, 'getirBitaksi.maxTrip', tempParams);
  }
  else {
    _.set(params, 'getirBitaksi.maxTrip', { isEnabled: false });
  }

  if (getirBitaksi.totalOrder.isEnabled) {
    const { totalOrder } = getirBitaksi;
    tempParams = {
      isEnabled: true,
      mergeType: totalOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < totalOrder.params.length; i += 1) {
      const { cities, ignoreCountry, minOrderCount, maxOrderCount, geoJson } = totalOrder.params[i];
      if (_.isNull(minOrderCount) || minOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GBT_ORDER_DETAIL')}/${t('clientTargetingPage:TRIP_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GBT_ORDER_DETAIL')}/${t('clientTargetingPage:TRIP_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        geoJson,
        minTripCount: minOrderCount,
        maxTripCount: getNumberOrNull(maxOrderCount),
      });
    }
    if (errMessage) throw new Error(errMessage);
    _.set(params, 'getirBitaksi.totalTrip', tempParams);
  }
  else {
    _.set(params, 'getirBitaksi.totalTrip', { isEnabled: false });
  }

  if (getirBitaksi.tripFrequency.isEnabled) {
    const { tripFrequency } = getirBitaksi;

    tempParams = {
      isEnabled: true,
      mergeType: tripFrequency.mergeType,
      params: [],
    };
    for (let i = 0; i < tripFrequency.params.length; i += 1) {
      const {
        cities, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, minTripCount, maxTripCount,
      } = tripFrequency.params[i];

      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0)) || (endDateType === 'dynamic'
        && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GBT_TRIP_FREQUENCY_DETAIL')}/${t('clientTargetingPage:TRIP_DATE_RANGE')}`;
        break;
      }
      if (_.isNull(minTripCount) || minTripCount < 0) {
        errMessage = `${t('clientTargetingPage:GBT_TRIP_FREQUENCY_DETAIL')}/${t('clientTargetingPage:TRIP_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxTripCount) && (maxTripCount < 0 || maxTripCount < minTripCount)) {
        errMessage = `${t('clientTargetingPage:GBT_TRIP_FREQUENCY_DETAIL')}/${t('clientTargetingPage:TRIP_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      tempParams.params.push({
        cities,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        minTripCount,
        maxTripCount,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirBitaksi.tripFrequency', tempParams);
  }
  else {
    _.set(params, 'getirBitaksi.tripFrequency', { isEnabled: false });
  }

  // if (getirBitaksi.missedOrder.isEnabled) {
  //   const { missedOrder } = getirBitaksi;
  //   tempParams = {
  //     isEnabled: true,
  //     mergeType: missedOrder.mergeType,
  //     params: [],
  //   };
  //   for (let i = 0; i < missedOrder.params.length; i += 1) {
  //     const {
  //       cities, ignoreCountry, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
  //       endDate, minOrderCount, maxOrderCount, geoJson,
  //     } = missedOrder.params[i];
  //     if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
  //       || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
  //       || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
  //       errMessage = `${t('clientTargetingPage:GBT_MISSED_ORDER_DETAIL')}/${t('clientTargetingPage:MISSED_TRIP_DATE_RANGE')}`;
  //       break;
  //     }
  //     if (_.isNull(minOrderCount) || minOrderCount < 0) {
  //       errMessage = `${t('clientTargetingPage:GBT_MISSED_ORDER_DETAIL')}/\
  //       ${t('clientTargetingPage:MISSED_TRIP_COUNT')}/${t('clientTargetingPage:MIN')}`;
  //       break;
  //     }
  //     if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
  //       errMessage = `${t('clientTargetingPage:GBT_MISSED_ORDER_DETAIL')}/\
  //       ${t('clientTargetingPage:MISSED_TRIP_COUNT')}/${t('clientTargetingPage:MAX')}`;
  //       break;
  //     }
  //     tempParams.params.push({
  //       cities,
  //       ignoreCountry,
  //       geoJson,
  //       startDateType,
  //       startDayBeforeToday,
  //       startDate,
  //       endDateType,
  //       endDayBeforeToday,
  //       endDate,
  //       minTripCount: minOrderCount,
  //       maxTripCount: getNumberOrNull(maxOrderCount),
  //     });
  //   }
  //   if (errMessage) {
  //     throw new Error(errMessage);
  //   }
  //   _.set(params, 'getirBitaksi.missedTrip', tempParams);
  // }
  // else {
  //   _.set(params, 'getirBitaksi.missedTrip', { isEnabled: false });
  // }

  if (getirBitaksi.promoUsage.isEnabled) {
    const { promoUsage } = getirBitaksi;
    tempParams = {
      isEnabled: true,
      mergeType: promoUsage.mergeType,
      params: [],
    };
    for (let i = 0; i < promoUsage.params.length; i += 1) {
      const {
        usedPromos, excludeClients, startDateType, startDayBeforeToday, startDate,
        endDateType, endDayBeforeToday, endDate, promoObjective,
      } = promoUsage.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GETIR_BITAKSI_SERVICE_DETAIL')}/${t('clientTargetingPage:PROMO_DETAIL')}/${t('clientTargetingPage:DATE_RANGE')}`;
        break;
      }

      tempParams.params.push({
        usedPromos,
        excludeClients,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        promoObjective,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirBitaksi.promoUsage', tempParams);
  }
  else {
    _.set(params, 'getirBitaksi.promoUsage', { isEnabled: false });
  }

  if (getirLocals.lastOrder.isEnabled) {
    const { lastOrder } = getirLocals;

    tempParams = {
      isEnabled: true,
      mergeType: lastOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < lastOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, shops, artisanType, chainId,
        startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate, calculationType,
      } = lastOrder.params[i];
      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday)
          || endDayBeforeToday < 0)) || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_LOCALS_SERVICE_DETAIL')}/${t('clientTargetingPage:LAST_ORDER_DATE_RANGE')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        shops,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        calculationType,
        artisanType,
        chainId,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirLocals.lastOrder', tempParams);
  }
  else {
    _.set(params, 'getirLocals.lastOrder', { isEnabled: false });
  }

  if (getirLocals.totalOrder.isEnabled) {
    const { totalOrder } = getirLocals;
    tempParams = {
      isEnabled: true,
      mergeType: totalOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < totalOrder.params.length; i += 1) {
      const {
        cities,
        ignoreCountry,
        shops,
        storeCalculationDetail,
        minOrderCount,
        maxOrderCount,
        artisanType,
        chainId,
        ignoreChain,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      } = totalOrder.params[i];

      if (storeCalculationDetail === GETIR_LOCALS_STORE_CALCULATION_TYPES.ORDER_COUNT_PER_STORE && isEmpty(shops)) {
        errMessage = `${t('clientTargetingPage:GETIR_LOCALS_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GETIR_LOCALS_ORDER_DETAIL')}/${t('clientTargetingPage:STORES')}`;
        break;
      }

      if (_.isNull(minOrderCount) || minOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_LOCALS_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GETIR_LOCALS_ORDER_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (!_.isNull(minOrderCount) && minOrderCount === 0 && maxOrderCount !== 0) {
        // eslint-disable-next-line max-len
        errMessage = `${t('clientTargetingPage:GETIR_LOCALS_ORDER_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:ERROR_IF_MIN_0_MAX_SHOULD_BE_0')}`;
        break;
      }
      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GETIR_LOCALS_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GETIR_LOCALS_ORDER_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GETIR_LOCALS_SERVICE_DETAIL')} /
        ${t('clientTargetingPage:GETIR_LOCALS_ORDER_DETAIL')} / ${t('clientTargetingPage:DATE_RANGE')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        shops,
        artisanType,
        chainId,
        storeCalculationDetail,
        minOrderCount,
        maxOrderCount: getNumberOrNull(maxOrderCount),
        ignoreChain,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) throw new Error(errMessage);
    _.set(params, 'getirLocals.totalOrder', tempParams);
  }
  else {
    _.set(params, 'getirLocals.totalOrder', { isEnabled: false });
  }

  if (getirLocals.visitor.isEnabled) {
    const { visitor } = getirLocals;
    tempParams = {
      isEnabled: true,
      mergeType: visitor.mergeType,
      params: [],
    };
    for (let i = 0; i < visitor.params.length; i += 1) {
      const {
        cities, ignoreCountry, shops, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        geoJson, artisanType, chainId,
      } = visitor.params[i];
      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_LOCALS_SERVICE_DETAIL')}/${t('clientTargetingPage:LAST_VISIT')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        shops,
        artisanType,
        chainId,
        geoJson,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirLocals.visitor', tempParams);
  }
  else {
    _.set(params, 'getirLocals.visitor', { isEnabled: false });
  }

  if (getirLocals.missedOrder.isEnabled) {
    const { missedOrder } = getirLocals;
    tempParams = {
      isEnabled: true,
      mergeType: missedOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < missedOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, warehouses, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, minOrderCount, maxOrderCount,
      } = missedOrder.params[i];
      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday)
          || (startDayBeforeToday <= endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_LOCALS_MISSED_ORDER_DETAIL')}/${t('clientTargetingPage:MISSED_ORDER_DATE_RANGE')}`;
        break;
      }
      if (_.isNull(minOrderCount) || minOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GETIR_LOCALS_MISSED_ORDER_DETAIL')}/\
        ${t('clientTargetingPage:MISSED_ORDER_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GETIR_LOCALS_MISSED_ORDER_DETAIL')}/\
        ${t('clientTargetingPage:MISSED_ORDER_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        warehouses,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        minOrderCount,
        maxOrderCount: getNumberOrNull(maxOrderCount),
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirLocals.missedOrder', tempParams);
  }
  else {
    _.set(params, 'getirLocals.missedOrder', { isEnabled: false });
  }

  if (getirLocals.firstOrder.isEnabled) {
    const { firstOrder } = getirLocals;
    tempParams = {
      isEnabled: true,
      mergeType: firstOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < firstOrder.params.length; i += 1) {
      const {
        cities,
        ignoreCountry,
        shops,
        startDateType,
        startDayBeforeToday,
        startDate, endDateType, endDayBeforeToday, endDate,
        calculationType,
        artisanType,
        chainId,
      } = firstOrder.params[i];
      if ((startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0)) ||
        (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GETIR_LOCALS_SERVICE_DETAIL')}/${t('clientTargetingPage:LAST_VISIT')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        shops,
        artisanType,
        chainId,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        calculationType,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirLocals.firstOrder', tempParams);
  }
  else {
    _.set(params, 'getirLocals.firstOrder', { isEnabled: false });
  }

  if (getirLocals.lastVisitor.isEnabled) {
    const { lastVisitor } = getirLocals;
    tempParams = {
      isEnabled: true,
      mergeType: lastVisitor.mergeType,
      params: [],
    };
    for (let i = 0; i < lastVisitor.params.length; i += 1) {
      const {
        cities, ignoreCountry, shops, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        geoJson, artisanType, chainId,
      } = lastVisitor.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GETIR_LOCALS_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_LOCALS_LAST_APP_OPEN_DETAIL')}/
        ${t('clientTargetingPage:LAST_VISIT')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        shops,
        artisanType,
        chainId,
        geoJson,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirLocals.lastVisitor', tempParams);
  }
  else {
    _.set(params, 'getirLocals.lastVisitor', { isEnabled: false });
  }

  if (getirLocals.promoUsage.isEnabled) {
    const { promoUsage } = getirLocals;
    tempParams = {
      isEnabled: true,
      mergeType: promoUsage.mergeType,
      params: [],
    };
    for (let i = 0; i < promoUsage.params.length; i += 1) {
      const {
        usedPromos, excludeClients, startDateType, startDayBeforeToday, startDate,
        endDateType, endDayBeforeToday, endDate, promoObjective,
      } = promoUsage.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GETIR_LOCALS_SERVICE_DETAIL')}/${t('clientTargetingPage:PROMO_DETAIL')}/${t('clientTargetingPage:DATE_RANGE')}`;
        break;
      }

      tempParams.params.push({
        usedPromos,
        excludeClients,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        promoObjective,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirLocals.promoUsage', tempParams);
  }
  else {
    _.set(params, 'getirLocals.promoUsage', { isEnabled: false });
  }

  if (getirLocals.loyalty.isEnabled) {
    const { loyalty } = getirLocals;
    tempParams = {
      isEnabled: true,
      mergeType: loyalty.mergeType,
      params: [],
    };
    for (let i = 0; i < loyalty.params.length; i += 1) {
      const {
        minStampOrderCount, maxStampOrderCount, minFreeOrderCount, maxFreeOrderCount,
        minLastOrderDayDiff, maxLastOrderDayDiff,
      } = loyalty.params[i];

      errMessage = getMinMaxNumberValuesError({
        minValue: minStampOrderCount,
        maxValue: maxStampOrderCount,
        sectionName: `${t('clientTargetingPage:GETIR_LOCALS_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_LOCALS_LOYALTY_DETAIL')} / ${t('clientTargetingPage:STAMP_COUNT')}`,
      });
      if (errMessage) break;
      errMessage = getMinMaxNumberValuesError({
        minValue: minFreeOrderCount,
        maxValue: maxFreeOrderCount,
        sectionName: `${t('clientTargetingPage:GETIR_LOCALS_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_LOCALS_LOYALTY_DETAIL')} / ${t('clientTargetingPage:FREE_ORDER_COUNT')}`,
      });
      if (errMessage) break;
      errMessage = getMinMaxNumberValuesError({
        minValue: minLastOrderDayDiff,
        maxValue: maxLastOrderDayDiff,
        sectionName: `${t('clientTargetingPage:GETIR_LOCALS_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_LOCALS_LOYALTY_DETAIL')} / ${t('clientTargetingPage:DAY_DIFFERENCE_SINCE_LAST_ORDER')}`,
      });
      if (errMessage) break;

      tempParams.params.push({
        minStampOrderCount,
        maxStampOrderCount: getNumberOrNull(maxStampOrderCount),
        minFreeOrderCount,
        maxFreeOrderCount: getNumberOrNull(maxFreeOrderCount),
        minLastOrderDayDiff,
        maxLastOrderDayDiff: getNumberOrNull(maxLastOrderDayDiff),
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirLocals.loyalty', tempParams);
  }
  else {
    _.set(params, 'getirLocals.loyalty', { isEnabled: false });
  }

  if (getirLocals.loyaltyOrder.isEnabled) {
    const { loyaltyOrder } = getirLocals;
    tempParams = {
      isEnabled: true,
      mergeType: loyaltyOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < loyaltyOrder.params.length; i += 1) {
      const {
        shops, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        minOrderCount, maxOrderCount,
      } = loyaltyOrder.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GETIR_LOCALS_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_LOCALS_LOYALTY_ORDER_DETAIL')}/
        ${t('clientTargetingPage:LOYALTY.ORDER_DATE')}`;
        break;
      }
      errMessage = getMinMaxNumberValuesError({
        minValue: minOrderCount,
        maxValue: maxOrderCount,
        sectionName: `${t('clientTargetingPage:GETIR_LOCALS_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_LOCALS_LOYALTY_ORDER_DETAIL')}/
        ${t('clientTargetingPage:LOYALTY.ORDER_COUNT')}`,
      });
      if (errMessage) break;

      tempParams.params.push({
        shops,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        minOrderCount,
        maxOrderCount: getNumberOrNull(maxOrderCount),
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirLocals.loyaltyOrder', tempParams);
  }
  else {
    _.set(params, 'getirLocals.loyaltyOrder', { isEnabled: false });
  }

  if (getirWaterMarketPlace.visitor.isEnabled) {
    const { visitor } = getirWaterMarketPlace;
    tempParams = {
      isEnabled: true,
      mergeType: visitor.mergeType,
      params: [],
    };
    for (let i = 0; i < visitor.params.length; i += 1) {
      const {
        cities, ignoreCountry, geoJson, brands, vendors, startDateType, startDayBeforeToday,
        startDate, endDateType, endDayBeforeToday, endDate,
      } = visitor.params[i];

      if ((startDateType === 'dynamic' && (
        _.isNull(startDayBeforeToday) || startDayBeforeToday < 0))
        || (endDateType === 'dynamic' && (
          _.isNull(endDayBeforeToday) || endDayBeforeToday < 0))
        || (startDateType === 'static' && endDateType === 'static' &&
          !isDateRangeValid(startDate, endDate))) {
        errMessage = `${t('clientTargetingPage:GWMP_SERVICE_DETAIL')}/${t('clientTargetingPage:LAST_VISIT')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        geoJson,
        brands,
        vendors,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirWaterMarketPlace.visitor', tempParams);
  }
  else {
    _.set(params, 'getirWaterMarketPlace.visitor', { isEnabled: false });
  }

  if (getirWaterMarketPlace.lastOrder.isEnabled) {
    const { lastOrder } = getirWaterMarketPlace;

    tempParams = {
      isEnabled: true,
      mergeType: lastOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < lastOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, geoJson, brands, vendors, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, calculationType,
      } = lastOrder.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GWMP_SERVICE_DETAIL')}/${t('clientTargetingPage:LAST_ORDER_DATE_RANGE')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        geoJson,
        brands,
        vendors,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        calculationType,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirWaterMarketPlace.lastOrder', tempParams);
  }
  else {
    _.set(params, 'getirWaterMarketPlace.lastOrder', { isEnabled: false });
  }

  if (getirWaterMarketPlace.firstOrder.isEnabled) {
    const { firstOrder } = getirWaterMarketPlace;

    tempParams = {
      isEnabled: true,
      mergeType: firstOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < firstOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, geoJson, brands, vendors, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, calculationType,
      } = firstOrder.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GWMP_SERVICE_DETAIL')}/${t('clientTargetingPage:FIRST_ORDER_DATE_RANGE')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        geoJson,
        brands,
        vendors,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        calculationType,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirWaterMarketPlace.firstOrder', tempParams);
  }
  else {
    _.set(params, 'getirWaterMarketPlace.firstOrder', { isEnabled: false });
  }

  if (getirWaterMarketPlace.maxOrder.isEnabled) {
    const { maxOrder } = getirWaterMarketPlace;
    tempParams = {
      isEnabled: true,
      mergeType: maxOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < maxOrder.params.length; i += 1) {
      const {
        cities, ignoreCountry, geoJson, brands, vendors, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate,
      } = maxOrder.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GWMP_SERVICE_DETAIL')}/${t('clientTargetingPage:MAX_ORDER_DATE_RANGE')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        geoJson,
        brands,
        vendors,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) throw new Error(errMessage);
    _.set(params, 'getirWaterMarketPlace.maxOrder', tempParams);
  }
  else {
    _.set(params, 'getirWaterMarketPlace.maxOrder', { isEnabled: false });
  }

  if (getirWaterMarketPlace.orderFrequency.isEnabled) {
    const { orderFrequency } = getirWaterMarketPlace;
    tempParams = {
      isEnabled: true,
      mergeType: orderFrequency.mergeType,
      params: [],
    };
    for (let i = 0; i < orderFrequency.params.length; i += 1) {
      const {
        cities, ignoreCountry, geoJson, brands, vendors, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, minOrderCount, maxOrderCount,
      } = orderFrequency.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GWMP_ORDER_FREQUENCY_DETAIL')}/${t('clientTargetingPage:ORDER_DATE_RANGE')}`;
        break;
      }
      if (_.isNull(minOrderCount) || minOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GWMP_ORDER_FREQUENCY_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GWMP_ORDER_FREQUENCY_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        geoJson,
        brands,
        vendors,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        minOrderCount,
        maxOrderCount,
      });
    }
    if (errMessage) throw new Error(errMessage);
    _.set(params, 'getirWaterMarketPlace.orderFrequency', tempParams);
  }
  else {
    _.set(params, 'getirWaterMarketPlace.orderFrequency', { isEnabled: false });
  }

  if (getirWaterMarketPlace.carboyPurchaseFrequency.isEnabled) {
    const { carboyPurchaseFrequency } = getirWaterMarketPlace;
    tempParams = {
      isEnabled: true,
      mergeType: carboyPurchaseFrequency.mergeType,
      params: [],
    };
    for (let i = 0; i < carboyPurchaseFrequency.params.length; i += 1) {
      const {
        cities, ignoreCountry, geoJson, brands, vendors, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday,
        endDate, selectedCountMinValue, selectedCountMaxValue, selectedCountType,
      } = carboyPurchaseFrequency.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GWMP_CARBOY_PURCHASE_FREQUENCY_DETAIL')}/${t('clientTargetingPage:ORDER_DATE_RANGE')}`;
        break;
      }
      if (_.isNull(selectedCountMinValue) || selectedCountMinValue < 0) {
        errMessage = `${t('clientTargetingPage:GWMP_CARBOY_PURCHASE_FREQUENCY_DETAIL')}/
        ${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (_.isNumber(selectedCountMaxValue) && (selectedCountMaxValue < 0 || selectedCountMaxValue < selectedCountMinValue)) {
        errMessage = `${t('clientTargetingPage:GWMP_CARBOY_PURCHASE_FREQUENCY_DETAIL')}/
        ${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        geoJson,
        brands,
        vendors,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        selectedCountMinValue,
        selectedCountMaxValue,
        selectedCountType,
      });
    }
    if (errMessage) throw new Error(errMessage);
    _.set(params, 'getirWaterMarketPlace.carboyPurchaseFrequency', tempParams);
  }
  else {
    _.set(params, 'getirWaterMarketPlace.carboyPurchaseFrequency', { isEnabled: false });
  }

  if (getirWaterMarketPlace.totalOrder.isEnabled) {
    const { totalOrder } = getirWaterMarketPlace;
    tempParams = {
      isEnabled: true,
      mergeType: totalOrder.mergeType,
      params: [],
    };
    for (let i = 0; i < totalOrder.params.length; i += 1) {
      const { cities, ignoreCountry, brands, vendors, geoJson, minOrderCount, maxOrderCount } = totalOrder.params[i];
      if (_.isNull(minOrderCount) || minOrderCount < 0) {
        errMessage = `${t('clientTargetingPage:GWMP_SERVICE_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MIN')}`;
        break;
      }
      if (!_.isNull(minOrderCount) && minOrderCount === 0 && maxOrderCount !== 0) {
        // eslint-disable-next-line max-len
        errMessage = `${t('clientTargetingPage:GWMP_SERVICE_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:ERROR_IF_MIN_0_MAX_SHOULD_BE_0')}`;
        break;
      }
      if (_.isNumber(maxOrderCount) && (maxOrderCount < 0 || maxOrderCount < minOrderCount)) {
        errMessage = `${t('clientTargetingPage:GWMP_SERVICE_DETAIL')}/${t('clientTargetingPage:ORDER_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }
      tempParams.params.push({
        cities,
        ignoreCountry,
        geoJson,
        brands,
        vendors,
        minOrderCount,
        maxOrderCount: getNumberOrNull(maxOrderCount),
      });
    }
    if (errMessage) throw new Error(errMessage);
    _.set(params, 'getirWaterMarketPlace.totalOrder', tempParams);
  }
  else {
    _.set(params, 'getirWaterMarketPlace.totalOrder', { isEnabled: false });
  }

  if (getirWaterMarketPlace.vendorHexagon.isEnabled) {
    const { vendorHexagon } = getirWaterMarketPlace;
    tempParams = {
      isEnabled: true,
      mergeType: vendorHexagon.mergeType,
      params: [],
    };
    for (let i = 0; i < vendorHexagon.params.length; i += 1) {
      const { vendors } = vendorHexagon.params[i];
      tempParams.params.push({ vendors });
    }
    if (errMessage) throw new Error(errMessage);
    _.set(params, 'getirWaterMarketPlace.vendorHexagon', tempParams);
  }
  else {
    _.set(params, 'getirWaterMarketPlace.vendorHexagon', { isEnabled: false });
  }

  if (getirWaterMarketPlace.promoUsage.isEnabled) {
    const { promoUsage } = getirWaterMarketPlace;
    tempParams = {
      isEnabled: true,
      mergeType: promoUsage.mergeType,
      params: [],
    };
    for (let i = 0; i < promoUsage.params.length; i += 1) {
      const {
        usedPromos, excludeClients, startDateType, startDayBeforeToday, startDate,
        endDateType, endDayBeforeToday, endDate, promoObjective,
      } = promoUsage.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GWMP_SERVICE_DETAIL')}/${t('clientTargetingPage:PROMO_DETAIL')}/${t('clientTargetingPage:DATE_RANGE')}`;
        break;
      }

      tempParams.params.push({
        usedPromos,
        excludeClients,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        promoObjective,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirWaterMarketPlace.promoUsage', tempParams);
  }
  else {
    _.set(params, 'getirWaterMarketPlace.promoUsage', { isEnabled: false });
  }

  if (getirJob.user.isEnabled) {
    const { user } = getirJob;
    tempParams = {
      isEnabled: true,
      mergeType: user.mergeType,
      params: [],
    };
    for (let i = 0; i < user.params.length; i += 1) {
      const {
        // cities,
        dateType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        excludeShadowBannedUser,
        profileStatus,
        experienceDetails,
        drivingLicenses,
        minAge,
        maxAge,
        excludeUser,
      } = user.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GETIR_JOBS_SERVICE_DETAIL')}/${t('clientTargetingPage:USER_DETAIL_DATE_RANGE')}`;
        break;
      }

      errMessage = getMinMaxNumberValuesError({
        minValue: minAge,
        maxValue: maxAge,
        sectionName: `${t('clientTargetingPage:GETIR_JOBS_SERVICE_DETAIL')} /
          ${t('clientTargetingPage:GETIR_JOBS_USER_DETAIL')} / ${t('clientTargetingPage:AGE')}`,
      });
      if (errMessage) break;

      if (minAge < 14) {
        errMessage = `${t('clientTargetingPage:GETIR_JOBS_SERVICE_DETAIL')} /
        ${t('clientTargetingPage:GETIR_JOBS_USER_DETAIL')} / ${t('clientTargetingPage:AGE')} /
          ${t('clientTargetingPage:MIN')}`;
        break;
      }

      tempParams.params.push({
        // cities,
        dateType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        excludeShadowBannedUser,
        profileStatus,
        experienceDetails,
        drivingLicenses,
        minAge,
        maxAge,
        excludeUser,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirJob.user', tempParams);
  }
  else {
    _.set(params, 'getirJob.user', { isEnabled: false });
  }

  if (getirJob.totalPost.isEnabled) {
    const { totalPost } = getirJob;
    tempParams = {
      isEnabled: true,
      mergeType: totalPost.mergeType,
      params: [],
    };
    for (let i = 0; i < totalPost.params.length; i += 1) {
      const {
        cities,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        employmentType,
        jobTitleId,
        postType,
        postStatus,
        deletedStatus,
        excludeUser,
        minPostCount,
        maxPostCount,
        dateType,
        sector,
      } = totalPost.params[i];

      if (!areDateInputsValid({
        startDate,
        startDateType,
        startDayBeforeToday,
        endDateType,
        endDate,
        endDayBeforeToday,
      })) {
        errMessage = `${t('clientTargetingPage:GETIR_JOBS_SERVICE_DETAIL')}/${t('clientTargetingPage:POST_DETAIL_DATE_RANGE')}`;
        break;
      }

      if (_.isNumber(maxPostCount) && (maxPostCount < 0 || maxPostCount < minPostCount)) {
        errMessage = `${t('clientTargetingPage:GETIR_JOBS_SERVICE_DETAIL')}/${t('clientTargetingPage:POST_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      tempParams.params.push({
        cities,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        employmentType,
        jobTitleId,
        postType,
        postStatus,
        deletedStatus,
        excludeUser,
        minPostCount,
        maxPostCount,
        dateType,
        sector,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirJob.totalPost', tempParams);
  }
  else {
    _.set(params, 'getirJob.totalPost', { isEnabled: false });
  }

  if (getirJob.receivedPost.isEnabled) {
    const { receivedPost } = getirJob;
    tempParams = {
      isEnabled: true,
      mergeType: receivedPost.mergeType,
      params: [],
    };
    for (let i = 0; i < receivedPost.params.length; i += 1) {
      const {
        cities,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        employmentType,
        jobTitleId,
        postType,
        postStatus,
        deletedStatus,
        applicationStatus,
        excludeUser,
        minReceivedPost,
        maxReceivedPost,
        ownedPost,
        dateType,
        sector,
      } = receivedPost.params[i];

      if (!areDateInputsValid({
        startDate,
        startDateType,
        startDayBeforeToday,
        endDateType,
        endDate,
        endDayBeforeToday,
      })) {
        errMessage = `${t('clientTargetingPage:GETIR_JOBS_SERVICE_DETAIL')}
          /${t('clientTargetingPage:RECEIVED_APPLICATION_DETAIL_DATE_RANGE')}`;
        break;
      }

      if (_.isNumber(maxReceivedPost) && (maxReceivedPost < 0 || maxReceivedPost < minReceivedPost)) {
        errMessage = `${t('clientTargetingPage:GETIR_JOBS_SERVICE_DETAIL')}
          /${t('clientTargetingPage:RECEIVED_APPLICATION_COUNT')}/${t('clientTargetingPage:MAX')}`;
        break;
      }

      tempParams.params.push({
        cities,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        employmentType,
        jobTitleId,
        postType,
        postStatus,
        deletedStatus,
        applicationStatus,
        excludeUser,
        minReceivedPost,
        maxReceivedPost,
        ownedPost,
        dateType,
        sector,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirJob.receivedPost', tempParams);
  }
  else {
    _.set(params, 'getirJob.receivedPost', { isEnabled: false });
  }

  if (getirDrive.userDetail.isEnabled) {
    const { userDetail } = getirDrive;
    tempParams = {
      isEnabled: true,
      mergeType: userDetail.mergeType,
      params: [],
    };
    for (let i = 0; i < userDetail.params.length; i += 1) {
      const { minAge, maxAge, kvkk } = userDetail.params[i];
      errMessage = getMinMaxNumberValuesError({
        minValue: minAge,
        maxValue: maxAge,
        sectionName: `${t('clientTargetingPage:GETIR_DRIVE_SERVICE_DETAIL')}/${t('clientTargetingPage:GETIR_DRIVE_USER_DETAIL')}`,
      });
      if (errMessage) break;
      if (minAge < 18) {
        errMessage = `${t('clientTargetingPage:GETIR_DRIVE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GETIR_DRIVE_USER_DETAIL')}/\
        ${t('clientTargetingPage:MIN')}`;
        break;
      }
      tempParams.params.push({
        kvkk,
        minAge,
        maxAge: getNumberOrNull(maxAge),
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirDrive.userDetail', tempParams);
  }
  else {
    _.set(params, 'getirDrive.userDetail', { isEnabled: false });
  }

  if (getirDrive.rentalDetail.isEnabled) {
    const { rentalDetail } = getirDrive;
    tempParams = {
      isEnabled: true,
      mergeType: rentalDetail.mergeType,
      params: [],
    };
    for (let i = 0; i < rentalDetail.params.length; i += 1) {
      const {
        externalSource,
        state,
        paymentType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        minRentCount,
        maxRentCount,
        vouchers,
      } = rentalDetail.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GETIR_DRIVE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GETIR_DRIVE_RENTAL_DETAIL')}/\
        ${t('clientTargetingPage:RENT_DATE_INTERVAL')}`;
        break;
      }

      errMessage = getMinMaxNumberValuesError({
        minValue: minRentCount,
        maxValue: maxRentCount,
        sectionName: `${t('clientTargetingPage:GETIR_DRIVE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GETIR_DRIVE_RENTAL_DETAIL')}/\
        ${t('clientTargetingPage:RENT_COUNT')}`,
      });
      if (errMessage) break;

      tempParams.params.push({
        externalSource,
        state,
        paymentType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        minRentCount,
        maxRentCount,
        vouchers,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirDrive.rentalDetail', tempParams);
  }
  else {
    _.set(params, 'getirDrive.rentalDetail', { isEnabled: false });
  }

  if (getirDrive.visitor.isEnabled) {
    const { visitor } = getirDrive;
    tempParams = {
      isEnabled: true,
      mergeType: visitor.mergeType,
      params: [],
    };
    for (let i = 0; i < visitor.params.length; i += 1) {
      const {
        cities, ignoreCountry, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        geoJson,
      } = visitor.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GETIR_DRIVE_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_DRIVE_VISITOR_DETAIL')}/
        ${t('clientTargetingPage:LAST_VISIT')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        geoJson,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirDrive.visitor', tempParams);
  }
  else {
    _.set(params, 'getirDrive.visitor', { isEnabled: false });
  }

  if (getirDrive.rfmDetail.isEnabled) {
    const { rfmDetail } = getirDrive;
    tempParams = {
      isEnabled: true,
      mergeType: rfmDetail.mergeType,
      params: [],
    };
    for (let i = 0; i < rfmDetail.params.length; i += 1) {
      const {
        externalSource,
        state,
        paymentType,
        minRecencyCount,
        maxRecencyCount,
        minFrequencyCount,
        maxFrequencyCount,
        minMonetaryCount,
        maxMonetaryCount,
      } = rfmDetail.params[i];

      errMessage = getMinMaxNumberValuesError({
        minValue: minRecencyCount,
        maxValue: maxRecencyCount,
        sectionName: `${t('clientTargetingPage:GETIR_DRIVE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GETIR_DRIVE_RFM_DETAIL')}/\
        ${t('clientTargetingPage:RECENCY')}`,
      });
      if (errMessage) break;

      errMessage = getMinMaxNumberValuesError({
        minValue: minFrequencyCount,
        maxValue: maxFrequencyCount,
        sectionName: `${t('clientTargetingPage:GETIR_DRIVE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GETIR_DRIVE_RFM_DETAIL')}/\
        ${t('clientTargetingPage:FREQUENCY')}`,
      });
      if (errMessage) break;

      errMessage = getMinMaxNumberValuesError({
        minValue: minMonetaryCount,
        maxValue: maxMonetaryCount,
        sectionName: `${t('clientTargetingPage:GETIR_DRIVE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GETIR_DRIVE_RFM_DETAIL')}/\
        ${t('clientTargetingPage:MONETARY')}`,
      });
      if (errMessage) break;

      tempParams.params.push({
        externalSource,
        state,
        paymentType,
        minRecencyCount,
        maxRecencyCount,
        minFrequencyCount,
        maxFrequencyCount,
        minMonetaryCount,
        maxMonetaryCount,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirDrive.rfmDetail', tempParams);
  }
  else {
    _.set(params, 'getirDrive.rfmDetail', { isEnabled: false });
  }

  if (getirDrive.rentDuration.isEnabled) {
    const { rentDuration } = getirDrive;
    tempParams = {
      isEnabled: true,
      mergeType: rentDuration.mergeType,
      params: [],
    };
    for (let i = 0; i < rentDuration.params.length; i += 1) {
      const {
        state,
        paymentType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        hourIntervals,
        minAverageRentDuration,
        maxAverageRentDuration,
        externalSource,
      } = rentDuration.params[i];

      if (!areDateInputsValid({
        startDate,
        startDateType,
        startDayBeforeToday,
        endDate,
        endDateType,
        endDayBeforeToday,
      })) {
        errMessage = `${t('clientTargetingPage:GETIR_DRIVE_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_DRIVE_RENT_DURATION')}
        ${t('clientTargetingPage:RENT_DATE_INTERVAL')}`;
        break;
      }

      errMessage = getMinMaxNumberValuesError({
        minValue: minAverageRentDuration,
        maxValue: maxAverageRentDuration,
        sectionName: `${t('clientTargetingPage:GETIR_DRIVE_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_DRIVE_RENT_DURATION')}
        ${t('clientTargetingPage:')}`,
      });
      if (errMessage) break;

      tempParams.params.push({
        state,
        paymentType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        hourIntervals,
        minAverageRentDuration,
        maxAverageRentDuration,
        externalSource,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirDrive.rentDuration', tempParams);
  }
  else {
    _.set(params, 'getirDrive.rentDuration', { isEnabled: false });
  }

  if (getirDrive.rentRateInHourInterval.isEnabled) {
    const { rentRateInHourInterval } = getirDrive;
    tempParams = {
      isEnabled: true,
      mergeType: rentRateInHourInterval.mergeType,
      params: [],
    };
    for (let i = 0; i < rentRateInHourInterval.params.length; i += 1) {
      const {
        state,
        paymentType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        hourIntervals,
        minRentRate,
        maxRentRate,
        externalSource,
      } = rentRateInHourInterval.params[i];

      if (!areDateInputsValid({
        startDate,
        startDateType,
        startDayBeforeToday,
        endDate,
        endDateType,
        endDayBeforeToday,
      })) {
        errMessage = `${t('clientTargetingPage:GETIR_DRIVE_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_DRIVE_RENT_RATE_IN_HOUR_DETAIL')}
        ${t('clientTargetingPage:RENT_DATE_INTERVAL')}`;
        break;
      }

      errMessage = getMinMaxNumberValuesError({
        minValue: minRentRate,
        maxValue: maxRentRate,
        sectionName: `${t('clientTargetingPage:GETIR_DRIVE_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_DRIVE_RENT_RATE_IN_HOUR_DETAIL')}`,
      });
      if (errMessage) break;

      tempParams.params.push({
        state,
        paymentType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        hourIntervals,
        minRentRate,
        maxRentRate,
        externalSource,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirDrive.rentRateInHourInterval', tempParams);
  }
  else {
    _.set(params, 'getirDrive.rentRateInHourInterval', { isEnabled: false });
  }

  if (getirDrive.rentDistanceTravelled.isEnabled) {
    const { rentDistanceTravelled } = getirDrive;
    tempParams = {
      isEnabled: true,
      mergeType: rentDistanceTravelled.mergeType,
      params: [],
    };
    for (let i = 0; i < rentDistanceTravelled.params.length; i += 1) {
      const {
        state,
        paymentType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        hourIntervals,
        minAverageDistanceTravelled,
        maxAverageDistanceTravelled,
        externalSource,
      } = rentDistanceTravelled.params[i];

      if (!areDateInputsValid({
        startDate,
        startDateType,
        startDayBeforeToday,
        endDate,
        endDateType,
        endDayBeforeToday,
      })) {
        errMessage = `${t('clientTargetingPage:GETIR_DRIVE_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_DRIVE_RENT_DISTANCE_TRAVELLED_DETAIL')}
        ${t('clientTargetingPage:RENT_DATE_INTERVAL')}`;
        break;
      }

      errMessage = getMinMaxNumberValuesError({
        minValue: minAverageDistanceTravelled,
        maxValue: maxAverageDistanceTravelled,
        sectionName: `${t('clientTargetingPage:GETIR_DRIVE_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_DRIVE_RENT_DISTANCE_TRAVELLED_DETAIL')}`,
      });
      if (errMessage) break;

      tempParams.params.push({
        state,
        paymentType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        hourIntervals,
        minAverageDistanceTravelled,
        maxAverageDistanceTravelled,
        externalSource,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirDrive.rentDistanceTravelled', tempParams);
  }
  else {
    _.set(params, 'getirDrive.rentDistanceTravelled', { isEnabled: false });
  }

  if (getirDrive.membershipDetail.isEnabled) {
    const { membershipDetail } = getirDrive;
    tempParams = {
      isEnabled: true,
      mergeType: membershipDetail.mergeType,
      params: [],
    };
    for (let i = 0; i < membershipDetail.params.length; i += 1) {
      const {
        dateType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        excludeClients,
      } = membershipDetail.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GETIR_DRIVE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GETIR_DRIVE_MEMBERSHIP_DETAIL')}/\
        ${t('clientTargetingPage:DATE_INTERVAL')}`;
        break;
      }

      tempParams.params.push({
        dateType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        excludeClients,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirDrive.membershipDetail', tempParams);
  }
  else {
    _.set(params, 'getirDrive.membershipDetail', { isEnabled: false });
  }

  if (getirDrive.favoriteRentStartCity.isEnabled) {
    const { favoriteRentStartCity } = getirDrive;
    tempParams = {
      isEnabled: true,
      mergeType: favoriteRentStartCity.mergeType,
      params: [],
    };
    for (let i = 0; i < favoriteRentStartCity.params.length; i += 1) {
      const {
        cities,
        ignoreCountry,
        state,
        paymentType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        hourIntervals,
        externalSource,
      } = favoriteRentStartCity.params[i];

      if (!areDateInputsValid({
        startDate,
        startDateType,
        startDayBeforeToday,
        endDate,
        endDateType,
        endDayBeforeToday,
      })) {
        errMessage = `${t('clientTargetingPage:GETIR_DRIVE_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_DRIVE_FAVORITE_RENT_START_CITY_DETAIL')}
        ${t('clientTargetingPage:RENT_DATE_INTERVAL')}`;
        break;
      }

      if (errMessage) break;

      tempParams.params.push({
        cities,
        ignoreCountry,
        state,
        paymentType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        hourIntervals,
        externalSource,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirDrive.favoriteRentStartCity', tempParams);
  }
  else {
    _.set(params, 'getirDrive.favoriteRentStartCity', { isEnabled: false });
  }

  if (getirDrive.favoriteRentEndCity.isEnabled) {
    const { favoriteRentEndCity } = getirDrive;
    tempParams = {
      isEnabled: true,
      mergeType: favoriteRentEndCity.mergeType,
      params: [],
    };
    for (let i = 0; i < favoriteRentEndCity.params.length; i += 1) {
      const {
        cities,
        ignoreCountry,
        state,
        paymentType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        hourIntervals,
        externalSource,
      } = favoriteRentEndCity.params[i];

      if (!areDateInputsValid({
        startDate,
        startDateType,
        startDayBeforeToday,
        endDate,
        endDateType,
        endDayBeforeToday,
      })) {
        errMessage = `${t('clientTargetingPage:GETIR_DRIVE_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_DRIVE_FAVORITE_RENT_END_CITY_DETAIL')}
        ${t('clientTargetingPage:RENT_DATE_INTERVAL')}`;
        break;
      }

      if (errMessage) break;

      tempParams.params.push({
        cities,
        ignoreCountry,
        state,
        paymentType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        hourIntervals,
        externalSource,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirDrive.favoriteRentEndCity', tempParams);
  }
  else {
    _.set(params, 'getirDrive.favoriteRentEndCity', { isEnabled: false });
  }

  if (getirDrive.manualTransmissionRate.isEnabled) {
    const { manualTransmissionRate } = getirDrive;
    tempParams = {
      isEnabled: true,
      mergeType: manualTransmissionRate.mergeType,
      params: [],
    };
    for (let i = 0; i < manualTransmissionRate.params.length; i += 1) {
      const {
        state,
        paymentType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        hourIntervals,
        minManualTransmissionRate,
        maxManualTransmissionRate,
        externalSource,
      } = manualTransmissionRate.params[i];

      if (!areDateInputsValid({
        startDate,
        startDateType,
        startDayBeforeToday,
        endDate,
        endDateType,
        endDayBeforeToday,
      })) {
        errMessage = `${t('clientTargetingPage:GETIR_DRIVE_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_DRIVE_MANUAL_TRANSMISSION_RATE_DETAIL')}
        ${t('clientTargetingPage:RENT_DATE_INTERVAL')}`;
        break;
      }

      errMessage = getMinMaxNumberValuesError({
        minValue: minManualTransmissionRate,
        maxValue: maxManualTransmissionRate,
        sectionName: `${t('clientTargetingPage:GETIR_DRIVE_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_DRIVE_MANUAL_TRANSMISSION_RATE_DETAIL')}`,
      });
      if (errMessage) break;

      tempParams.params.push({
        state,
        paymentType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        hourIntervals,
        minManualTransmissionRate,
        maxManualTransmissionRate,
        externalSource,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirDrive.manualTransmissionRate', tempParams);
  }
  else {
    _.set(params, 'getirDrive.manualTransmissionRate', { isEnabled: false });
  }

  if (getirDrive.favoriteDayOfTheWeek.isEnabled) {
    const { favoriteDayOfTheWeek } = getirDrive;
    tempParams = {
      isEnabled: true,
      mergeType: favoriteDayOfTheWeek.mergeType,
      params: [],
    };
    for (let i = 0; i < favoriteDayOfTheWeek.params.length; i += 1) {
      const {
        state,
        paymentType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        hourIntervals,
        favoriteDays,
        externalSource,
      } = favoriteDayOfTheWeek.params[i];

      if (!areDateInputsValid({
        startDate,
        startDateType,
        startDayBeforeToday,
        endDate,
        endDateType,
        endDayBeforeToday,
      })) {
        errMessage = `${t('clientTargetingPage:GETIR_DRIVE_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_DRIVE_FAVORITE_DAY_OF_THE_WEEK_DETAIL')}
        ${t('clientTargetingPage:RENT_DATE_INTERVAL')}`;
        break;
      }

      if (errMessage) break;

      tempParams.params.push({
        state,
        paymentType,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
        hourIntervals,
        favoriteDays,
        externalSource,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirDrive.favoriteDayOfTheWeek', tempParams);
  }
  else {
    _.set(params, 'getirDrive.favoriteDayOfTheWeek', { isEnabled: false });
  }

  if (getirN11.consentApproval.isEnabled) {
    const { consentApproval } = getirN11;
    tempParams = {
      isEnabled: true,
      mergeType: consentApproval.mergeType,
      params: [],
    };
    for (let i = 0; i < consentApproval.params.length; i += 1) {
      const { isApproved } = consentApproval.params[i];
      tempParams.params.push({ isApproved });
    }
    _.set(params, 'getirN11.consentApproval', tempParams);
  }
  else {
    _.set(params, 'getirN11.consentApproval', { isEnabled: false });
  }

  if (getirN11.visitor.isEnabled) {
    const { visitor } = getirN11;
    tempParams = {
      isEnabled: true,
      mergeType: visitor.mergeType,
      params: [],
    };
    for (let i = 0; i < visitor.params.length; i += 1) {
      const {
        cities, ignoreCountry, startDateType, startDayBeforeToday, startDate, endDateType, endDayBeforeToday, endDate,
        geoJson,
      } = visitor.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:N11')}/
        ${t('clientTargetingPage:N11_TAB_OPEN_DETAIL')}/
        ${t('clientTargetingPage:LAST_VISIT')}`;
        break;
      }

      tempParams.params.push({
        cities,
        ignoreCountry,
        geoJson,
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirN11.visitor', tempParams);
  }
  else {
    _.set(params, 'getirN11.visitor', { isEnabled: false });
  }

  if (getirSelect.membershipStatus.isEnabled) {
    const { membershipStatus } = getirSelect;
    tempParams = {
      isEnabled: true,
      mergeType: membershipStatus.mergeType,
      params: [],
    };
    for (let i = 0; i < membershipStatus.params.length; i += 1) {
      const { status, excludeUser } = membershipStatus.params[i];

      tempParams.params.push({ status, excludeUser });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirSelect.membershipStatus', tempParams);
  }
  else {
    _.set(params, 'getirSelect.membershipStatus', { isEnabled: false });
  }

  if (getirSelect.membershipDate.isEnabled) {
    const { membershipDate } = getirSelect;
    tempParams = {
      isEnabled: true,
      mergeType: membershipDate.mergeType,
      params: [],
    };
    for (let i = 0; i < membershipDate.params.length; i += 1) {
      const { startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday, dateType } = membershipDate.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GETIR_SELECT_MEMBERSHIP.DETAIL')}/
        ${t('clientTargetingPage:GETIR_SELECT_MEMBERSHIP.DATE_DETAIL')}/
        ${t('clientTargetingPage:USER_DETAIL_DATE_RANGE')}`;
        break;
      }

      tempParams.params.push({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday, dateType });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirSelect.membershipDate', tempParams);
  }
  else {
    _.set(params, 'getirSelect.membershipDate', { isEnabled: false });
  }

  if (getirSelect.subscriptionPaymentType.isEnabled) {
    const { subscriptionPaymentType } = getirSelect;
    tempParams = {
      isEnabled: true,
      mergeType: subscriptionPaymentType.mergeType,
      params: [],
    };
    for (let i = 0; i < subscriptionPaymentType.params.length; i += 1) {
      const { paymentType } = subscriptionPaymentType.params[i];

      tempParams.params.push({ paymentType });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirSelect.subscriptionPaymentType', tempParams);
  }
  else {
    _.set(params, 'getirSelect.subscriptionPaymentType', { isEnabled: false });
  }

  if (getirSelect.benefitUsage.isEnabled) {
    const { benefitUsage } = getirSelect;
    tempParams = {
      isEnabled: true,
      mergeType: benefitUsage.mergeType,
      params: [],
    };
    for (let i = 0; i < benefitUsage.params.length; i += 1) {
      const {
        startDate,
        startDateType,
        startDayBeforeToday,
        endDate, endDateType, endDayBeforeToday, serviceType, benefitType, minOrderCount, maxOrderCount,
      } = benefitUsage.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GETIR_SELECT_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_SELECT_BENEFIT.USAGE')}/
        ${t('clientTargetingPage:ORDER_DATE_RANGE')}`;
        break;
      }

      errMessage = getMinMaxNumberValuesError({
        minValue: minOrderCount,
        maxValue: maxOrderCount,
        sectionName: `${t('clientTargetingPage:GETIR_SELECT_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_SELECT_BENEFIT.USAGE')}/
        ${t('clientTargetingPage:ORDER_COUNT')}`,
      });
      if (errMessage) break;

      if (isEmpty(serviceType)) {
        errMessage = `${t('clientTargetingPage:GETIR_SELECT_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_SELECT_BENEFIT.USAGE')}/
        ${t('clientTargetingPage:SERVICE_TYPE')} ${t('error:REQUIRED')}`;
        break;
      }

      if (isEmpty(benefitType)) {
        errMessage = `${t('clientTargetingPage:GETIR_SELECT_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_SELECT_BENEFIT.USAGE')}/
        ${t('clientTargetingPage:GETIR_SELECT_BENEFIT.TYPE.TITLE')} ${t('error:REQUIRED')}`;
        break;
      }

      tempParams.params.push(
        { startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday, serviceType, benefitType, maxOrderCount, minOrderCount },
      );
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirSelect.benefitUsage', tempParams);
  }
  else {
    _.set(params, 'getirSelect.benefitUsage', { isEnabled: false });
  }

  if (getirFinance.getirMoneySpendingDetail.isEnabled) {
    const { getirMoneySpendingDetail } = getirFinance;
    tempParams = {
      isEnabled: true,
      mergeType: getirMoneySpendingDetail.mergeType,
      params: [],
    };
    for (let i = 0; i < getirMoneySpendingDetail.params.length; i += 1) {
      const {
        domainTypes, minValue, maxValue, valueType,
        startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday,
      } = getirMoneySpendingDetail.params[i];

      if (!areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDate, endDateType, endDayBeforeToday })) {
        errMessage = `${t('clientTargetingPage:GETIR_FINANCE_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_MONEY_SPENDING_DETAIL')}/
        ${t('clientTargetingPage:DATE_RANGE')}`;
        break;
      }

      errMessage = getMinMaxNumberValuesError({
        minValue,
        maxValue,
        sectionName: `${t('clientTargetingPage:GETIR_FINANCE_SERVICE_DETAIL')}/
        ${t('clientTargetingPage:GETIR_MONEY_SPENDING_DETAIL')}/
        ${t('clientTargetingPage:VALUE')}`,
      });
      if (errMessage) break;

      if (_.isEmpty(valueType)) {
        errMessage = `${t('clientTargetingPage:GETIR_FINANCE_SERVICE_DETAIL')}/\
        ${t('clientTargetingPage:GETIR_MONEY_SPENDING_DETAIL')}/${t('clientTargetingPage:VALUE_TYPE')} ${t('error:REQUIRED')}`;
        break;
      }

      tempParams.params.push({
        domainTypes,
        valueType,
        minValue,
        maxValue: getNumberOrNull(maxValue),
        startDateType,
        startDayBeforeToday,
        startDate,
        endDateType,
        endDayBeforeToday,
        endDate,
      });
    }
    if (errMessage) {
      throw new Error(errMessage);
    }
    _.set(params, 'getirFinance.getirMoneySpendingDetail', tempParams);
  }
  else {
    _.set(params, 'getirFinance.getirMoneySpendingDetail', { isEnabled: false });
  }

  let abuseSegmentIds = [];

  switch (params.general.abuseSegmentIds) {
    case SEGMENT_KEYS.SUSPICIOUS:
      abuseSegmentIds = [SEGMENT_KEYS.SUSPICIOUS, SEGMENT_KEYS.ABUSER, SEGMENT_KEYS.FRAUDSTER];
      break;
    case SEGMENT_KEYS.ABUSER:
      abuseSegmentIds = [SEGMENT_KEYS.ABUSER, SEGMENT_KEYS.FRAUDSTER];
      break;
    case SEGMENT_KEYS.FRAUDSTER:
      abuseSegmentIds = [SEGMENT_KEYS.FRAUDSTER];
      break;
    default:
      break;
  }

  _.set(params, 'general.abuseSegmentIds', abuseSegmentIds);

  // Set data science models for each client targeting section
  setDataScienceField(params, getir, 'getir');

  return params;
};

function areDateInputsValid({ startDate, startDateType, startDayBeforeToday, endDateType, endDate, endDayBeforeToday }) {
  const isStartDayBeforeTodayInvalid = (startDateType === 'dynamic' && (_.isNull(startDayBeforeToday) || startDayBeforeToday < 0));
  const isEndDayBeforeTodayInvalid = (endDateType === 'dynamic' && (_.isNull(endDayBeforeToday) || endDayBeforeToday < 0));
  const isStaticDateRangeInvalid = (startDateType === 'static' && endDateType === 'static' && !isDateRangeValid(startDate, endDate));
  // if both dynamic, we want start day X to be bigger, so (today - X) can be an earlier date
  const isDynamicDateRangeInvalid = (
    startDateType === 'dynamic' &&
    endDateType === 'dynamic' &&
    (startDayBeforeToday < endDayBeforeToday)
  );
  // TODO: discuss if one dynamic and the other is static, can we add validation?

  if (isStartDayBeforeTodayInvalid || isEndDayBeforeTodayInvalid || isStaticDateRangeInvalid || isDynamicDateRangeInvalid) {
    return false;
  }
  return true;
}

function getMinMaxNumberValuesError({ minValue, maxValue, sectionName }) {
  if (_.isNull(minValue) || minValue < 0) {
    return `${sectionName} / ${t('clientTargetingPage:MIN')}`;
  }
  // max can be null to represent infinite / no limit
  if (_.isNumber(maxValue) && (maxValue < 0 || maxValue < minValue)) {
    return `${sectionName} / ${t('clientTargetingPage:MAX')}`;
  }
  return null;
}
