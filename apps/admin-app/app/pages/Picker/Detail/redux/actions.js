import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.PICKER.DETAIL}_`;

export const { Types, Creators } = createActions(
  {
    getPickerDetailRequest: { id: null, fields: '' },
    getPickerDetailSuccess: { data: {} },
    getPickerDetailFailure: { error: null },
    updatePickerRequest: { id: null, updateData: {} },
    updatePickerSuccess: { data: {} },
    updatePickerFailure: { error: null },
    releasePickerFromWarehouseRequest: { id: null, updateData: {} },
    releasePickerFromWarehouseSuccess: { data: {} },
    releasePickerFromWarehouseFailure: { error: null },
    updateWarehouseRequest: { id: null, updateData: {} },
    updateWarehouseSuccess: { data: {} },
    updateWarehouseFailure: { error: null },
    releasePickerJobRequest: { id: null },
    releasePickerJobSuccess: { data: {} },
    releasePickerJobFailure: { error: null },
    activatePickerRequest: { id: null, updateData: {} },
    activatePickerSuccess: { data: {} },
    activatePickerFailure: { error: null },
    deactivatePickerRequest: { id: null, updateData: {} },
    deactivatePickerSuccess: { data: {} },
    deactivatePickerFailure: { error: null },
    getPickerJobRequest: { id: null },
    getPickerJobSuccess: { data: {} },
    getPickerJobFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
