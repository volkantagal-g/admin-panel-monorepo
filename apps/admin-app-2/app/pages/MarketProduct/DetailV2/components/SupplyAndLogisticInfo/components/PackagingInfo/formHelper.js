import { isFinite } from 'lodash';

import * as Yup from 'yup';

import { normalizeNumber } from '@shared/utils/common';
import { PRODUCT_PACKAGING_TYPE, PRODUCT_STOCK_UNIT_TYPE, unitMultipliers } from '@shared/shared/constants';
import { areStringValuesUnique } from '@app/pages/MarketProduct/utils';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export const getUnitType = t => ([
  {
    value: 1,
    label: t('PACKAGING_INFO.IMPERIAL_UNITS.IMPERIAL_UNIT'),
  },
  {
    value: 2,
    label: t('PACKAGING_INFO.METRIC_UNITS.METRIC_UNIT'),
  },
]);
const convertToImperial = (value, multiplier) => {
  const imperialValue = (isFinite(value) && (value / multiplier)) || null;
  return normalizeNumber(imperialValue);
};
export const calculateImperialUnits = packagingInfo => (
  {
    [PRODUCT_PACKAGING_TYPE.UNIT]: {
      dimension: {
        height: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.UNIT]?.dimension?.height, unitMultipliers.inchToCm.multiplier),
        width: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.UNIT]?.dimension?.width, unitMultipliers.inchToCm.multiplier),
        depth: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.UNIT]?.dimension?.depth, unitMultipliers.inchToCm.multiplier),
      },
      volume: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.UNIT]?.volume, unitMultipliers.cubicInchToCubicCm.multiplier),
      grossWeight: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.UNIT]?.grossWeight, unitMultipliers.ozToGr.multiplier),
      netWeight: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.UNIT]?.netWeight, unitMultipliers.ozToGr.multiplier),
    },
    [PRODUCT_PACKAGING_TYPE.SUB_PACK]: {
      dimension: {
        height: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.SUB_PACK]?.dimension?.height, unitMultipliers.inchToCm.multiplier),
        width: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.SUB_PACK]?.dimension?.width, unitMultipliers.inchToCm.multiplier),
        depth: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.SUB_PACK]?.dimension?.depth, unitMultipliers.inchToCm.multiplier),
      },
      volume: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.SUB_PACK]?.volume, unitMultipliers.cubicInchToCubicCm.multiplier),
      grossWeight: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.SUB_PACK]?.grossWeight, unitMultipliers.ozToGr.multiplier),
      netWeight: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.SUB_PACK]?.netWeight, unitMultipliers.ozToGr.multiplier),
    },
    [PRODUCT_PACKAGING_TYPE.BOX]: {
      dimension: {
        height: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.BOX]?.dimension?.height, unitMultipliers.inchToCm.multiplier),
        width: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.BOX]?.dimension?.width, unitMultipliers.inchToCm.multiplier),
        depth: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.BOX]?.dimension?.depth, unitMultipliers.inchToCm.multiplier),
      },
      volume: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.BOX]?.volume, unitMultipliers.cubicInchToCubicCm.multiplier),
      grossWeight: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.BOX]?.grossWeight, unitMultipliers.ozToGr.multiplier),
      netWeight: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.BOX]?.netWeight, unitMultipliers.ozToGr.multiplier),
    },
    [PRODUCT_PACKAGING_TYPE.PALLET]: {
      dimension: {
        height: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.PALLET]?.dimension?.height, unitMultipliers.inchToCm.multiplier),
        width: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.PALLET]?.dimension?.width, unitMultipliers.inchToCm.multiplier),
        depth: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.PALLET]?.dimension?.depth, unitMultipliers.inchToCm.multiplier),
      },
      volume: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.PALLET]?.volume, unitMultipliers.cubicInchToCubicCm.multiplier),
      grossWeight: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.PALLET]?.grossWeight, unitMultipliers.ozToGr.multiplier),
      netWeight: convertToImperial(packagingInfo?.[PRODUCT_PACKAGING_TYPE.PALLET]?.netWeight, unitMultipliers.ozToGr.multiplier),
    },
  }
);
export const getModifiedInitialValues = values => {
  const packagingTypes = Object.values(PRODUCT_PACKAGING_TYPE);
  const pickingType = {};
  packagingTypes.forEach(packagingType => {
    if (!values?.pickingType && packagingType === PRODUCT_PACKAGING_TYPE.UNIT) {
      pickingType[PRODUCT_PACKAGING_TYPE.UNIT] = true;
    }
    else {
      pickingType[packagingType] = values?.pickingType === packagingType;
    }
  });

  const newValues = {
    ...values,
    pickingType,
  };
  return newValues;
};
const packagingTypeFields = (packagingInfo, barcodes, type) => ({
  dimension: {
    height: packagingInfo?.[type]?.dimension?.height,
    width: packagingInfo?.[type]?.dimension?.width,
    depth: packagingInfo?.[type]?.dimension?.depth,
  },
  volume: packagingInfo?.[type]?.volume,
  barcodes: type === PRODUCT_PACKAGING_TYPE.UNIT ? barcodes : packagingInfo?.[type]?.barcodes,
  inboxQuantity: packagingInfo?.[type]?.inboxQuantity,
  grossWeight: packagingInfo?.[type]?.grossWeight,
  netWeight: packagingInfo?.[type]?.netWeight,
});

const stockUnitTypeField = values => {
  if (values?.stockUnitOfMeasurement) {
    return {
      [PRODUCT_STOCK_UNIT_TYPE.PIECE]: (PRODUCT_STOCK_UNIT_TYPE.PIECE === values?.stockUnitOfMeasurement),
      [PRODUCT_STOCK_UNIT_TYPE.KILOGRAM]: (PRODUCT_STOCK_UNIT_TYPE.KILOGRAM === values?.stockUnitOfMeasurement),
    };
  }
  return {
    [PRODUCT_STOCK_UNIT_TYPE.PIECE]: true,
    [PRODUCT_STOCK_UNIT_TYPE.KILOGRAM]: false,
  };
};
export const getInitialValues = ({ packagingInfo, ...values }, barcodes) => {
  const initialValues = {
    [PRODUCT_PACKAGING_TYPE.UNIT]: packagingTypeFields(packagingInfo, barcodes, PRODUCT_PACKAGING_TYPE.UNIT),
    [PRODUCT_PACKAGING_TYPE.SUB_PACK]: packagingTypeFields(packagingInfo, barcodes, PRODUCT_PACKAGING_TYPE.SUB_PACK),
    [PRODUCT_PACKAGING_TYPE.BOX]: packagingTypeFields(packagingInfo, barcodes, PRODUCT_PACKAGING_TYPE.BOX),
    [PRODUCT_PACKAGING_TYPE.PALLET]: packagingTypeFields(packagingInfo, barcodes, PRODUCT_PACKAGING_TYPE.PALLET),
    pickingType: packagingInfo?.pickingType,
    stockUnitOfMeasurement: stockUnitTypeField(values),
    imperialUnits: calculateImperialUnits(packagingInfo),
    isCreated: !!values?.productId,
  };

  return getModifiedInitialValues(initialValues);
};
export const validationSchema = () => {
  const yupSchemaMetric = Yup.object().shape({
    dimension: Yup.object().shape({
      width: Yup.number().min(1).nullable(),
      height: Yup.number().min(1).nullable(),
      depth: Yup.number().min(1).nullable(),
    }),
    volume: Yup.number().nullable(),
    barcodes: Yup.array().of(Yup.string()),
    inboxQuantity: Yup.number().min(0).nullable(),
    netWeight: Yup.number().min(1).nullable(),
    grossWeight: Yup.number().min(1).nullable(),
  });

  const yupSchemaImperial = Yup.object().shape({
    dimension: Yup.object().shape({
      width: Yup.number().nullable(),
      height: Yup.number().nullable(),
      depth: Yup.number().nullable(),
    }),
    volume: Yup.number().nullable(),
    netWeight: Yup.number().nullable(),
    grossWeight: Yup.number().nullable(),
  });

  return (Yup.object()
    .shape({
      [PRODUCT_PACKAGING_TYPE.UNIT]: Yup.object().shape({
        dimension: Yup.object().shape({
          width: Yup.number().min(1).nullable(),
          height: Yup.number().min(1).nullable(),
          depth: Yup.number().min(1).nullable(),
        }).required(),
        volume: Yup.number().nullable(),
        barcodes: Yup.array().of(Yup.string()),
        inboxQuantity: Yup.number().min(0).nullable(),
        netWeight: Yup.number().min(1).nullable(),
        grossWeight: Yup.number().min(1).nullable(),
      }).required(),
      [PRODUCT_PACKAGING_TYPE.SUB_PACK]: yupSchemaMetric,
      [PRODUCT_PACKAGING_TYPE.BOX]: yupSchemaMetric,
      [PRODUCT_PACKAGING_TYPE.PALLET]: yupSchemaMetric,
      imperialUnits: Yup.object().shape({
        [PRODUCT_PACKAGING_TYPE.UNIT]: yupSchemaImperial,
        [PRODUCT_PACKAGING_TYPE.SUB_PACK]: yupSchemaImperial,
        [PRODUCT_PACKAGING_TYPE.BOX]: yupSchemaImperial,
        [PRODUCT_PACKAGING_TYPE.PALLET]: yupSchemaImperial,
      }),
    })
  );
};

export const getModifiedValues = ({
  values,
  initialValues,
}) => {
  const [pickingType] = Object.entries(values?.pickingType).find(([, value]) => {
    return value === true;
  });
  const newValues = {
    packagingInfo: {
      ...values,
      pickingType: Number(pickingType),
    },
    isCreated: initialValues?.isCreated,
  };
  delete newValues.packagingInfo.imperialUnits;
  delete newValues.packagingInfo.isCreated;
  delete newValues.packagingInfo.stockUnitOfMeasurement;
  return newValues;
};

export const hasUniqBarcodes = (body, t) => {
  const barcodes = Object.entries(body?.packagingInfo)
    ?.map(([, value]) => value?.barcodes)?.filter(barcode => typeof barcode === 'string');
  if (areStringValuesUnique(barcodes)) {
    return true;
  }
  return ToastCreators.error({ message: t('BARCODE.ERROR.ALL_BARCODE_VALUES_MUST_BE_DIFFERENT') });
};
