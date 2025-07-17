import * as Yup from 'yup';

import { validate } from '@shared/yup';
import { REGULAR_WAREHOUSE_TYPE, SC_GROCER_WAREHOUSE_TYPE, STORE_CONVERSION_WAREHOUSE_TYPE } from '@shared/shared/constants';

const isWarehouseTypeNeedValidation = warehouseType => {
  return (
    warehouseType === REGULAR_WAREHOUSE_TYPE ||
    warehouseType === SC_GROCER_WAREHOUSE_TYPE ||
    warehouseType === STORE_CONVERSION_WAREHOUSE_TYPE
  );
};

const AddressInfoValidationSchema = () => {
  return Yup.object()
    .shape({
      warehouseType: Yup.number(),
      address: Yup.string()
        .trim()
        .min(2)
        .when('warehouseType', (warehouseType, schema) => {
          if (!isWarehouseTypeNeedValidation(warehouseType)) {
            return schema;
          }
          return schema.required();
        }),
      country: Yup.string()
        .trim()
        .min(2)
        .required(),
      city: Yup.string()
        .trim()
        .min(2)
        .required(),
      region: Yup.string()
        .trim()
        .min(2)
        .required(),
      postCode: Yup.string()
        .trim()
        .min(2)
        .when('warehouseType', (warehouseType, schema) => {
          if (!isWarehouseTypeNeedValidation(warehouseType)) {
            return schema;
          }
          return schema.required();
        }),
      location: Yup.object().shape({
        type: Yup.string(),
        coordinates: Yup.array().of(
          Yup.number().required(),
        ),
      }),
    });
};

const GeneralInfoValidationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string()
        .trim()
        .required(),
      shortName: Yup.string()
        .trim()
        .required(),
      fieldManagers: Yup.array(),
      warehouseGLN: Yup.number(),
    });
};

const BudgetInfoValidationSchema = () => {
  return Yup.object()
    .shape({
      indexValue: Yup.number(),
      rentAmount: Yup.number(),
      stoppage: Yup.number(),
    });
};

const ManpowerInfoValidationSchema = () => {
  return Yup.object()
    .shape({
      manHourFeeGroup: Yup.number()
        .when('warehouseType', (warehouseType, schema) => {
          if (!isWarehouseTypeNeedValidation(warehouseType)) {
            return schema;
          }
          return schema.required();
        }),
    });
};

const SurfaceAreaInfoValidationSchema = () => {
  return Yup.object()
    .shape({
      basement: Yup.number(),
      entrance: Yup.number(),
      entranceStorage: Yup.number(),
      entresol: Yup.number(),
      frontPark: Yup.number(),
      total: Yup.number()
        .when('warehouseType', (warehouseType, schema) => {
          if (!isWarehouseTypeNeedValidation(warehouseType)) {
            return schema;
          }
          return schema.required();
        }),
    });
};
const FixtureInfoValidationSchema = () => {
  return Yup.object()
    .shape({
      ovenCount: Yup.number()
        .when('warehouseType', (warehouseType, schema) => {
          if (!isWarehouseTypeNeedValidation(warehouseType)) {
            return schema;
          }
          return schema.required();
        }),
    });
};
const FranchiseInfoValidationSchema = () => {
  return Yup.object()
    .shape({
      franchise: Yup.string()
        .min(2)
        .when('warehouseType', (warehouseType, schema) => {
          if (!isWarehouseTypeNeedValidation(warehouseType)) {
            return schema;
          }
          return schema.required();
        }),
    });
};

export const isWarehouseAddressValid = addressInfo => {
  return validate(AddressInfoValidationSchema)({ ...addressInfo });
};

export const isGeneralInfoValid = generalInfo => {
  return validate(GeneralInfoValidationSchema)({ ...generalInfo });
};

export const isBudgetItemInfoValid = budgetInfo => {
  return validate(BudgetInfoValidationSchema)({ ...budgetInfo });
};

export const isManHourFeeGroupInfoValid = manHourFeeGroupInfo => {
  return validate(ManpowerInfoValidationSchema)({ ...manHourFeeGroupInfo });
};

export const isSurfaceAreaInfoValid = surfaceAreaInfo => {
  return validate(SurfaceAreaInfoValidationSchema)({ ...surfaceAreaInfo });
};

export const isOvenInfoValid = fixtureInfo => {
  return validate(FixtureInfoValidationSchema)({ ...fixtureInfo });
};

export const isFranchiseInfoValid = franchiseInfo => {
  return validate(FranchiseInfoValidationSchema)({ ...franchiseInfo });
};
