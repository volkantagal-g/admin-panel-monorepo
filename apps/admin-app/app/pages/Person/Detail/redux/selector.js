import { get } from 'lodash';
import moment from 'moment';
import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';
import { CLIENT_SEGMENT_EMPLOYEE_DISCOUNT } from '../constants';
import { convertSelectOptions } from '@shared/utils/common';

const reducerKey = REDUX_KEY.PERSON.DETAIL;

export const personDetailSelector = {
  getData: state => state[reducerKey]?.personDetail.data,
  getGeneralInfoData: createSelector(
    state => state[reducerKey]?.personDetail.data,
    data => ({
      name: get(data, 'name', ''),
      username: get(data, 'username', ''),
      gsm: get(data, 'gsm', ''),
      email: get(data, 'email', ''),
      createdAt: get(data, 'createdAt') ? moment(get(data, 'createdAt')) : null,
      safeRidingTrainingDate: get(data, 'safeRidingTrainingDate') ? moment(get(data, 'safeRidingTrainingDate')) : null,
      financeDeliveryTrainingDate: get(data, 'financeDeliveryTrainingDate') ? moment(get(data, 'financeDeliveryTrainingDate')) : null,
      bloodType: get(data, 'bloodType', ''),
      paymentCountryCode: {
        value: get(data, ['paymentCountryCode', 'name', getLangKey()]),
        code: get(data, ['paymentCountryCode', 'code']),
        name: get(data, ['paymentCountryCode', 'name']),
      },
      iban: get(data, 'iban', ''),
      sortCode: get(data, 'sortCode', ''),
      routingNumber: get(data, 'routingNumber', ''),
      accountNumber: get(data, 'accountNumber', ''),
      isOutsourced: get(data, 'isOutsourced', false),
      isGorillasEmployee: get(data, 'isGorillasEmployee', false),
      dateOfBirth: get(data, 'dateOfBirth') ? moment(get(data, 'dateOfBirth')) : null,
      drivingLicenseDate: get(data, 'drivingLicenseDate') ? moment(get(data, 'drivingLicenseDate')) : null,
      drivingLicenseTypes: get(data, 'drivingLicenseTypes', []),
      employmentStartDate: get(data, 'employmentStartDate') ? moment(get(data, 'employmentStartDate')) : null,
    }),
  ),
  getIntegrationData: createSelector(
    state => state[reducerKey]?.personDetail.data,
    data => ({ payrollId: get(data, 'payrollId') }),
  ),
  getEmploymentInfoData: createSelector(
    state => state[reducerKey]?.personDetail.data,
    data => ({ employmentType: get(data, 'employmentType') }),
  ),
  getPersonalInfoData: createSelector(
    state => state[reducerKey]?.personDetail.data,
    data => ({
      uniqueIdentifier: get(data, 'uniqueIdentifier', ''),
      country: get(data, 'country', ''),
      countryGsmCode: get(data, 'countryGsmCode', ''),
      personalGsm: get(data, 'personalGsm', ''),
      shouldAddEmployeeDiscount: get(data, 'shouldAddEmployeeDiscount', false),
    }),
  ),
  getHomeAddressInfoData: createSelector(
    state => state[reducerKey]?.personDetail.data,
    data => ({
      location: get(data, 'homeAddress.location', {}),
      description: get(data, 'homeAddress.description', ''),
    }),
  ),
  getImageBoxData: createSelector(
    state => state[reducerKey]?.personDetail.data,
    data => ({ picURL: get(data, 'picURL', '') }),
  ),
  getRelativeInfoData: createSelector(
    state => state[reducerKey]?.personDetail.data,
    data => ({
      name: get(data, 'relative.name', ''),
      fullGsm: `${get(data, 'relative.countryGsmCode', '')}-${get(data, 'relative.gsm', '')}`,
      relation: get(data, 'relative.relation'),
    }),
  ),
  getTrainingsInfoData: createSelector(
    state => state[reducerKey]?.personDetail.data,
    data => ({ trainings: get(data, 'trainings', []) }),
  ),
  getIsCouriersLoginDisabled: createSelector(
    state => state[reducerKey]?.personDetail.data,
    data => ({ isCouriersLoginDisabled: get(data, 'isCouriersLoginDisabled', false) }),
  ),
  getDisableCourierLoginHistoryInfo: createSelector(
    state => state[reducerKey]?.personDetail.data,
    data => ({ disableCourierLoginHistory: get(data, 'disableCourierLoginHistory', []).reverse() }),
  ),
  getCouriersAndPickersInfo: createSelector(
    state => state[reducerKey]?.personDetail.data,
    data => ({
      couriers: get(data, 'couriers', []),
      pickers: get(data, 'pickers', []),
    }),
  ),
  getMarketEmployersInfo: createSelector(
    state => state[reducerKey]?.personDetail.data,
    data => ({ marketEmployers: get(data, 'marketEmployers', []) }),
  ),
  getIsActivatedInfo: createSelector(
    state => state[reducerKey]?.personDetail.data,
    data => get(data, 'isActivated', false),
  ),
  getHasEmployeeDiscount: createSelector(
    state => state[reducerKey]?.personDetail.data,
    data => get(data, 'person.client.segments', []).includes(CLIENT_SEGMENT_EMPLOYEE_DISCOUNT),
  ),
  getIsPending: state => state[reducerKey]?.personDetail.isPending,
};

export const updatePersonSelector = {
  getIsPending: state => state[reducerKey]?.updatePerson.isPending,
  getIsSuccess: state => state[reducerKey]?.updatePerson.isSuccess,
};

export const personNotesSelector = {
  getIsPending: state => state[reducerKey]?.personNotes.isPending,
  getData: state => state[reducerKey]?.personNotes.data,
};

export const couriersSelector = {
  getIsPending: state => state[reducerKey]?.couriers.isPending,
  getData: state => state[reducerKey]?.couriers.data,
  getError: state => state[reducerKey]?.couriers.error,
};

export const pickersSelector = {
  getIsPending: state => state[reducerKey]?.pickers.isPending,
  getData: state => state[reducerKey]?.pickers.data,
  getError: state => state[reducerKey]?.pickers.error,
};

export const personContract = {
  getIsPending: state => state[reducerKey]?.personContract.isPending,
  getData: state => {
    const data = state[reducerKey]?.personContract.data || [];
    const options = convertSelectOptions(data, {
      valueKey: '_id',
      labelKey: 'name',
    });
    return { options, data };
  },
  getError: state => state[reducerKey]?.personContract.error,
};

export const getirUpTrainingsSelector = {
  getIsPending: state => state[reducerKey]?.getirUpTrainings.isPending,
  getData: state => state[reducerKey]?.getirUpTrainings.data,
  getError: state => state[reducerKey]?.getirUpTrainings.error,
};

export const franchisesAreasSelector = {
  getData: state => state[reducerKey]?.franchisesAreas.data,
  getIsPending: state => state[reducerKey]?.franchisesAreas.isPending,
};
