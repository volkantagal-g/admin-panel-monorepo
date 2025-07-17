import moment from 'moment/moment';

import { getLangKey, t } from '@shared/i18n.ts';
import { isNullOrUndefined } from '@shared/utils/common';

import {
  ASSET_TYPE_IDS,
  REGISTRATION_OWNERS,
  MODE_CHANGE_LOG_MODELS,
  VEHICLE_COMPLIANCE_RECORD_TYPES,
  LOCAL_DATE_TIME_FORMAT,
  LOCAL_DATE_FORMAT,
} from './constants';

export const extractColumnsFromAssetType = (assetType: AssetType) => {
  const metaData = assetType?.schema?.metaData || [];

  return metaData.reduce((acc: any, mData: AssetTypeMetaData) => {
    mData.rows?.forEach((mDataRow: any) => {
      mDataRow.columns?.forEach((mDataCol: any) => {
        acc.push(mDataCol);
      });
    });
    return acc;
  }, []);
};

export const rowIndexSorter = (elem1: any, elem2: any) => {
  return elem1.rowIndex - elem2.rowIndex;
};

export const formatFormValues = (formValues: any) => {
  const fieldValues = {
    vehicleIsCommonCar: formValues?.vehicleIsCommonCar,
    vehicleChassisNumber: formValues?.vehicleChassisNumber,
    vehicleEngineNumber: formValues?.vehicleEngineNumber,
    vehicleBrand: formValues?.vehicleBrand,
    vehicleModel: formValues?.vehicleModel,
    vehicleModelYear: formValues?.vehicleModelYear,
    vehicleTransmissionType: formValues?.vehicleTransmissionType,
    vehicleFuelType: formValues?.vehicleFuelType,
    vehicleMileage: formValues?.vehicleMileage,
    vehicleRegion: formValues?.vehicleRegion,
    registrationNumber: formValues?.registrationNumber,
    registrationOwner: formValues?.registrationOwner,
    documentFileKey: formValues?.documentFileKey,
    financialLeasingCompany: formValues?.financialLeasingCompany,
    financialLeasingValidationStartDate: formValues?.financialLeasingValidationDate?.[0]?.startOf('day')?.toDate(),
    financialLeasingValidationEndDate: formValues?.financialLeasingValidationDate?.[1]?.endOf('day')?.toDate(),
    shortLongTermRentingCompany: formValues?.shortLongTermRentingCompany,
    shortLongTermRentingValidationStartDate: formValues?.shortLongTermRentingValidationDate?.[0]?.startOf('day')?.toDate(),
    shortLongTermRentingValidationEndDate: formValues?.shortLongTermRentingValidationDate?.[1]?.endOf('day')?.toDate(),
  };

  return {
    type: ASSET_TYPE_IDS.VEHICLE,
    uniqueIdentifier: formValues?.uniqueIdentifier,
    fieldValues,
  };
};

export const formatFormValuesForDetail = (formValues: any) => {
  const fieldValues = {
    vehicleIsCommonCar: formValues?.vehicleIsCommonCar,
    vehicleChassisNumber: formValues?.vehicleChassisNumber,
    vehicleEngineNumber: formValues?.vehicleEngineNumber,
    vehicleBrand: formValues?.vehicleBrand,
    vehicleModel: formValues?.vehicleModel,
    vehicleModelYear: formValues?.vehicleModelYear,
    vehicleTransmissionType: formValues?.vehicleTransmissionType,
    vehicleFuelType: formValues?.vehicleFuelType,
    vehicleMileage: formValues?.vehicleMileage ? parseInt(formValues?.vehicleMileage, 10) : undefined,
    vehicleRegion: formValues?.vehicleRegion,
    registrationNumber: formValues?.registrationNumber,
    registrationOwner: formValues?.registrationOwner,
    documentFileKey: formValues?.documentFileKey,
    financialLeasingCompany:
      (formValues?.registrationOwner === REGISTRATION_OWNERS.GETIR || formValues?.registrationOwner === REGISTRATION_OWNERS.SHORT_LONG_TERM_RENTING)
        ? null : formValues?.financialLeasingCompany,
    financialLeasingValidationStartDate:
      (formValues?.registrationOwner === REGISTRATION_OWNERS.GETIR || formValues?.registrationOwner === REGISTRATION_OWNERS.SHORT_LONG_TERM_RENTING)
        ? null : formValues?.financialLeasingValidationDate?.[0]?.startOf('day')?.toDate(),
    financialLeasingValidationEndDate:
      (formValues?.registrationOwner === REGISTRATION_OWNERS.GETIR || formValues?.registrationOwner === REGISTRATION_OWNERS.SHORT_LONG_TERM_RENTING)
        ? null : formValues?.financialLeasingValidationDate?.[1]?.endOf('day')?.toDate(),
    shortLongTermRentingCompany:
      (formValues?.registrationOwner === REGISTRATION_OWNERS.GETIR || formValues?.registrationOwner === REGISTRATION_OWNERS.FINANCIAL_RENTING)
        ? null : formValues?.shortLongTermRentingCompany,
    shortLongTermRentingValidationStartDate:
      (formValues?.registrationOwner === REGISTRATION_OWNERS.GETIR || formValues?.registrationOwner === REGISTRATION_OWNERS.FINANCIAL_RENTING)
        ? null : formValues?.shortLongTermRentingValidationDate?.[0]?.startOf('day')?.toDate(),
    shortLongTermRentingValidationEndDate:
      (formValues?.registrationOwner === REGISTRATION_OWNERS.GETIR || formValues?.registrationOwner === REGISTRATION_OWNERS.FINANCIAL_RENTING)
        ? null : formValues?.shortLongTermRentingValidationDate?.[1]?.endOf('day')?.toDate(),
  };

  return {
    fieldValues,
    assignableStatus: formValues?.assignableStatus,
    assignableStatusReason: formValues?.assignableStatusReason ? formValues?.assignableStatusReason : null,
  };
};

export function getFormattedTableValue(value: any, {
  fieldPath,
  model,
  modelType,
}: { fieldPath: string, model: string, modelType: string }) {
  const langKey = getLangKey();

  if (isNullOrUndefined(value)) return '-';

  if (model === MODE_CHANGE_LOG_MODELS.ASSET) {
    switch (fieldPath) {
      case 'fieldValues.vehicleIsCommonCar':
        return value ? t('global:YES') : t('global:NO');
      case 'assignableStatus':
        return t(`assetManagement:VEHICLE_ASSIGNABLE_STATUS.${value}`);
      case 'assignableStatusReason':
        return t(`assetManagement:VEHICLE_ASSIGNABLE_REASON_STATUSES.${value}`);
      case 'status':
        return t(`assetManagement:ASSET_STATUSES.${value}`);
      case 'type':
        return t(`assetManagement:ASSET_TYPE.${value}`);
      case 'fieldValues.vehicleModel':
        return t(`assetManagement:VEHICLE_MODELS.${value}`);
      case 'fieldValues.vehicleBrand':
        return t(`assetManagement:VEHICLE_BRANDS.${value}`);
      case 'fieldValues.registrationOwner':
        return t(`assetManagement:REGISTRATION_OWNERS.${value}`);
      case 'fieldValues.vehicleFuelType':
        return t(`assetManagement:VEHICLE_FUEL_TYPES.${value}`);
      case 'fieldValues.vehicleTransmissionType':
        return t(`assetManagement:VEHICLE_TRANSMISSION_TYPES.${value}`);
      case 'fieldValues.financialLeasingValidationEndDate':
        return moment(value).format(LOCAL_DATE_FORMAT[langKey.toUpperCase()]) || '-';
      case 'fieldValues.financialLeasingValidationStartDate':
        return moment(value).format(LOCAL_DATE_FORMAT[langKey.toUpperCase()]) || '-';
      case 'fieldValues.shortLongTermRentingValidationEndDate':
        return moment(value).format(LOCAL_DATE_FORMAT[langKey.toUpperCase()]) || '-';
      case 'fieldValues.shortLongTermRentingValidationStartDate':
        return moment(value).format(LOCAL_DATE_FORMAT[langKey.toUpperCase()]) || '-';
      case 'fieldValues.financialLeasingCompany':
        return t(`assetManagement:FINANCIAL_LEASING_COMPANIES.${value}`);
      default: return value;
    }
  }
  if (model === MODE_CHANGE_LOG_MODELS.ASSET_HISTORY) {
    switch (fieldPath) {
      case 'isReturned':
        return t(`assetManagement:IS_RETURNED.${value}`);
      case 'assignDate':
        return moment(value).format(LOCAL_DATE_TIME_FORMAT[langKey.toUpperCase()]) || '-';
      case 'returnDate':
        return moment(value).format(LOCAL_DATE_TIME_FORMAT[langKey.toUpperCase()]) || '-';
      case 'assignmentPeriodType':
        return t(`assetManagement:ASSIGNMENT_PERIOD_TYPE.${value}`);
      case 'estimatedReturnDate':
        return moment(value).format(LOCAL_DATE_TIME_FORMAT[langKey.toUpperCase()]) || '-';
      default:
        return value;
    }
  }
  if (model === MODE_CHANGE_LOG_MODELS.DAMAGE_RECORD) {
    switch (fieldPath) {
      case 'detectionDate':
        return moment(value).format(LOCAL_DATE_FORMAT[langKey.toUpperCase()]) || '-';
      case 'isDeleted':
        return t(`assetManagement:IS_DELETED.${value}`);
      default:
        return value;
    }
  }
  if (model === MODE_CHANGE_LOG_MODELS.TRAFFIC_PENALTY) {
    switch (fieldPath) {
      case 'penaltyDate':
        return moment(value).format(LOCAL_DATE_FORMAT[langKey.toUpperCase()]) || '-';
      case 'isDeleted':
        return t(`assetManagement:IS_DELETED.${value}`);
      default:
        return value;
    }
  }
  if (model === MODE_CHANGE_LOG_MODELS.COMPLIANCE_RECORD) {
    if (Number(modelType) === Number(VEHICLE_COMPLIANCE_RECORD_TYPES.INSURANCE)) {
      switch (fieldPath) {
        case 'endDate':
          return moment(value).format(LOCAL_DATE_FORMAT[langKey.toUpperCase()]) || '-';
        case 'startDate':
          return moment(value).format(LOCAL_DATE_FORMAT[langKey.toUpperCase()]) || '-';
        case 'isDeleted':
          return t(`assetManagement:IS_DELETED.${value}`);
        default:
          return value;
      }
    }
    if (Number(modelType) === Number(VEHICLE_COMPLIANCE_RECORD_TYPES.INSPECTION)) {
      switch (fieldPath) {
        case 'endDate':
          return moment(value).format(LOCAL_DATE_FORMAT[langKey.toUpperCase()]) || '-';
        case 'startDate':
          return moment(value).format(LOCAL_DATE_FORMAT[langKey.toUpperCase()]) || '-';
        case 'isDeleted':
          return t(`assetManagement:IS_DELETED.${value}`);
        default:
          return value;
      }
    }
    if (Number(modelType) === Number(VEHICLE_COMPLIANCE_RECORD_TYPES.COVERAGE)) {
      switch (fieldPath) {
        case 'endDate':
          return moment(value).format(LOCAL_DATE_FORMAT[langKey.toUpperCase()]) || '-';
        case 'startDate':
          return moment(value).format(LOCAL_DATE_FORMAT[langKey.toUpperCase()]) || '-';
        case 'isDeleted':
          return t(`assetManagement:IS_DELETED.${value}`);
        default:
          return value;
      }
    }
  }
  if (model === MODE_CHANGE_LOG_MODELS.VEHICLE_EQUIPMENT) {
    switch (fieldPath) {
      case 'equipments':
        return value.map(((equipment: any) => t(`assetManagement:VEHICLE_EQUIPMENTS.${equipment}`))).join(', ');
      case 'trackingDeviceStatus':
        return t(`assetManagement:TRACKING_DEVICE_STATUS_TEXTS.${value}`);
      case 'tireType':
        return t(`assetManagement:VEHICLE_TIRE_TYPES.${value}`);
      default:
        return value;
    }
  }
  return value;
}

// eslint-disable-next-line @typescript-eslint/no-shadow
export const getEffectedField = (t: any, data: any) => {
  const fieldPath = data?.fieldPath;
  const complianceType = data?.modelType;
  const model = data?.model;
  if (model === MODE_CHANGE_LOG_MODELS.ASSET) {
    switch (fieldPath) {
      case 'fieldValues.vehicleIsCommonCar':
        return t('assetManagement:VEHICLE_IS_COMMON_CAR');
      case 'fieldValues.vehicleModelYear':
        return t('assetManagement:VEHICLE_MODEL_YEAR');
      case 'fieldValues.vehicleEngineNumber':
        return t('assetManagement:VEHICLE_ENGINE_NUMBER');
      case 'fieldValues.vehicleChassisNumber':
        return t('assetManagement:VEHICLE_CHASSIS_NUMBER');
      case 'assignableStatus':
        return t('assetManagement:ASSIGNABLE_STATUS_TITLE');
      case 'type':
        return t('assetManagement:ASSET_TYPE.TITLE');
      case 'assignableStatusReason':
        return t('assetManagement:VEHICLE_ASSIGNABLE_REASON_STATUS_TITLE');
      case 'fieldValues.documentFileKey':
        return t('assetManagement:REGISTRATION_DOCUMENT_UPLOAD');
      case 'status':
        return t('assetManagement:VEHICLE_STATUS_TITLE');
      case 'isReturned':
        return t('assetManagement:IS_RETURNED.TITLE');
      case 'fieldValues.vehicleModel':
        return t('assetManagement:VEHICLE_MODEL');
      case 'fieldValues.vehicleBrand':
        return t('assetManagement:VEHICLE_BRAND');
      case 'fieldValues.registrationOwner':
        return t('assetManagement:REGISTRATION_OWNER_TITLE');
      case 'fieldValues.vehicleRegion':
        return t('assetManagement:VEHICLE_REGION_TITLE');
      case 'fieldValues.registrationNumber':
        return t('assetManagement:REGISTRATION_NUMBER_TITLE');
      case 'fieldValues.vehicleMileage':
        return t('assetManagement:VEHICLE_MILEAGE');
      case 'fieldValues.vehicleFuelType':
        return t('assetManagement:VEHICLE_FUEL_TYPE_TITLE');
      case 'fieldValues.vehicleTransmissionType':
        return t('assetManagement:VEHICLE_TRANSMISSION_TYPE_TITLE');
      case 'fieldValues.financialLeasingValidationEndDate':
        return t('assetManagement:FINANCIAL_LEASING_VALIDATION_END_DATE');
      case 'fieldValues.financialLeasingValidationStartDate':
        return t('assetManagement:FINANCIAL_LEASING_VALIDATION_START_DATE');
      case 'fieldValues.shortLongTermRentingValidationEndDate':
        return t('assetManagement:SHORT_LONG_TERM_RENTING_VALIDATION_END_DATE');
      case 'fieldValues.shortLongTermRentingValidationStartDate':
        return t('assetManagement:SHORT_LONG_TERM_RENTING_VALIDATION_START_DATE');
      case 'fieldValues.financialLeasingCompany':
        return t('assetManagement:FINANCIAL_LEASING_COMPANY_TITLE');
      case 'fieldValues.shortLongTermRentingCompany':
        return t('assetManagement:SHORT_LONG_TERM_RENTING_COMPANY_TITLE');
      default:
        return fieldPath;
    }
  }
  if (model === MODE_CHANGE_LOG_MODELS.ASSET_HISTORY) {
    switch (fieldPath) {
      case 'isReturned':
        return t('assetManagement:IS_RETURNED.TITLE');
      case 'employee':
        return t('assetManagement:ASSIGNED_EMPLOYEE');
      case 'assignDate':
        return t('assetManagement:ASSIGNMENT_START_DATE');
      case 'returnDate':
        return t('assetManagement:RETURN_DATE');
      case 'returnNote':
        return t('assetManagement:UNASSIGN_NOTE');
      case 'assignNote':
        return t('assetManagement:ASSIGN_NOTE');
      case 'assignmentPeriodType':
        return t('assetManagement:ASSIGNMENT_PERIOD_TYPE_TEXT');
      case 'estimatedReturnDate':
        return t('assetManagement:ASSIGNMENT_END_DATE');
      default:
        return fieldPath;
    }
  }
  if (model === MODE_CHANGE_LOG_MODELS.DAMAGE_RECORD) {
    switch (fieldPath) {
      case 'description':
        return t('assetManagement:DAMAGE_DETAIL');
      case 'documentFileKey':
        return t('assetManagement:DAMAGE_RECORD_DOCUMENT_UPLOAD');
      case 'detectionDate':
        return t('assetManagement:DAMAGE_DETECTION_DATE');
      case 'isDeleted':
        return t('assetManagement:IS_DELETED.DAMAGE_RECORD');
      default:
        return fieldPath;
    }
  }
  if (model === MODE_CHANGE_LOG_MODELS.TRAFFIC_PENALTY) {
    switch (fieldPath) {
      case 'penaltyDate':
        return t('assetManagement:TRAFFIC_PENALTY_DATE');
      case 'documentFileKey':
        return t('assetManagement:TRAFFIC_PENALTY_UPLOAD');
      case 'isDeleted':
        return t('assetManagement:IS_DELETED.TRAFFIC_PENALTY');
      default:
        return fieldPath;
    }
  }
  if (model === MODE_CHANGE_LOG_MODELS.COMPLIANCE_RECORD) {
    if (Number(complianceType) === Number(VEHICLE_COMPLIANCE_RECORD_TYPES.INSURANCE)) {
      switch (fieldPath) {
        case 'endDate':
          return t('assetManagement:TRAFFIC_INSURANCE_VALIDATION_END');
        case 'startDate':
          return t('assetManagement:TRAFFIC_INSURANCE_VALIDATION_START');
        case 'documentFileKey':
          return t('assetManagement:INSURANCE_DOCUMENT_UPLOAD_AREA');
        case 'isDeleted':
          return t('assetManagement:IS_DELETED.INSURANCE');
        default:
          return fieldPath;
      }
    }
    if (Number(complianceType) === Number(VEHICLE_COMPLIANCE_RECORD_TYPES.INSPECTION)) {
      switch (fieldPath) {
        case 'endDate':
          return t('assetManagement:VEHICLE_INSPECTION_VALIDATION_END');
        case 'startDate':
          return t('assetManagement:VEHICLE_INSPECTION_VALIDATION_START');
        case 'documentFileKey':
          return t('assetManagement:INSPECTION_DOCUMENT_UPLOAD_AREA');
        case 'isDeleted':
          return t('assetManagement:IS_DELETED.INSPECTION');
        default:
          return fieldPath;
      }
    }
    if (Number(complianceType) === Number(VEHICLE_COMPLIANCE_RECORD_TYPES.COVERAGE)) {
      switch (fieldPath) {
        case 'endDate':
          return t('assetManagement:VEHICLE_COVERAGE_VALIDATION_END');
        case 'startDate':
          return t('assetManagement:VEHICLE_COVERAGE_VALIDATION_START');
        case 'documentFileKey':
          return t('assetManagement:VEHICLE_COVERAGE_DOCUMENT_UPLOAD_AREA');
        case 'isDeleted':
          return t('assetManagement:IS_DELETED.COVERAGE');
        default:
          return fieldPath;
      }
    }
  }
  if (model === MODE_CHANGE_LOG_MODELS.VEHICLE_EQUIPMENT) {
    switch (fieldPath) {
      case 'equipments':
        return t('assetManagement:EQUIPMENTS_INSIDE_THE_VEHICLE');
      case 'trackingDeviceStatus':
        return t('assetManagement:HAS_TRACKING_DEVICE_TITLE');
      case 'tireType':
        return t('assetManagement:TIRE_TYPE_ON_THE_VEHICLE');
      default:
        return fieldPath;
    }
  }
  return fieldPath;
};
