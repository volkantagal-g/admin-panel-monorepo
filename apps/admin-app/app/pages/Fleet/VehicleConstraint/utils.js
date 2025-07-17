import { getLangKey } from '@shared/i18n';
import { TAG_COLORS, VEHICLE_CONSTRAINT_STATUSES } from '@shared/shared/constants';
import { vehicleConstraintStatuses, marketVehicleTypes } from '@shared/shared/constantValues';
import { convertConstantValuesToSelectOptions, getLimitAndOffset } from '@shared/utils/common';
import { VEHICLE_CONSTRAINT_TAG_VALUES } from './constants';

export const vehicleConstraintsFormatter = ({ data }) => {
  return data?.map(({ _id, name, constraints, type }) => ({
    type,
    constraints: {
      weight: constraints.weight,
      volume: constraints.volume,
      longestEdge: constraints.longestEdge,
      duration: constraints.duration,
      tags: constraints.tags,
    },
    value: _id,
    label: name,
  }));
};

export const createVehicleConstraintRequestParams = ({ name, reference, ...constraints }) => {
  const params = {
    name,
    constraints,
  };

  params.vehicleType = reference.type;
  return params;
};

export const vehicleConstraintFormatter = ({ constraints, name, type }) => ({
  name,
  type,
  tags: constraints?.tags,
  weight: constraints?.weight,
  longestEdge: constraints?.longestEdge,
  volume: constraints?.volume,
  duration: constraints?.duration,
});

export const updateVehicleConstraintRequestParams = ({ name, type, ...constraints }) => {
  const params = {
    name,
    constraints,
  };

  params.vehicleType = type;
  return params;
};

export const vehicleConstraintStatusOptions = convertConstantValuesToSelectOptions(vehicleConstraintStatuses);

export const vehicleConstraintTypeOptions = convertConstantValuesToSelectOptions(marketVehicleTypes);

export const vehicleStatusObjectForTag = ({ status }) => ({
  label: vehicleConstraintStatuses?.[status]?.[getLangKey()],
  color: status === VEHICLE_CONSTRAINT_STATUSES.ACTIVE ? TAG_COLORS.success : TAG_COLORS.danger,
});

export const vehicleConstraintListRequestParams = ({ statuses, types, pagination }) => {
  const { limit, offset } = getLimitAndOffset(pagination);

  const params = {};

  params.limit = limit;
  params.offset = offset;

  if (types?.length) {
    params.types = types;
  }
  if (statuses?.length) {
    params.statuses = statuses;
  }

  return params;
};

export const getVehicleConstraintTagSelectOptions = t => {
  return [
    { value: VEHICLE_CONSTRAINT_TAG_VALUES.FRAGILE, label: t('FORM.TAG_LABELS.FRAGILE') },
    { value: VEHICLE_CONSTRAINT_TAG_VALUES.SENSITIVE, label: t('FORM.TAG_LABELS.SENSITIVE') },
  ];
};
