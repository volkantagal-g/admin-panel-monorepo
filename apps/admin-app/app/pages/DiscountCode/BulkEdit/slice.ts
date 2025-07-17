/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  GetDiscountCodesActionTypesResponse,
  UpdateDiscountCodesFormType,
} from '@app/pages/DiscountCode/BulkEdit/types';

type StateType = {
  codes: string[] | null;
  isLoading: boolean;
  actionTypes: GetDiscountCodesActionTypesResponse[] | null;
  isModalOpen: boolean;
}

const initialState: StateType = {
  codes: null,
  isLoading: false,
  actionTypes: null,
  isModalOpen: false,
};

function actionTypesOverlap(state: StateType): boolean | null {
  if (!state.actionTypes) return null;
  const distinctActionTypes = [...new Set(state.actionTypes.map(item => item.actionType))];
  return distinctActionTypes.length === 1 && distinctActionTypes[0] !== 0;
}

type UpsertCodesRequest = {
  codes: string[];
  shouldFetchActionTypes?: boolean;
}

export type UpdateDiscountCodesRequest =
  UpdateDiscountCodesFormType & { resetUsage: boolean }

export const DiscountCodeBulkEditUpdateSlice = createSlice({
  name: 'DiscountCode/BulkEdit/Update',
  initialState,
  reducers: {
    toggleModal: state => {
      state.isModalOpen = !state.isModalOpen;
      state.codes = null;
      state.isLoading = false;
      state.actionTypes = null;
    },
    upsertCodes: (state, action: PayloadAction<UpsertCodesRequest>) => {
      state.codes = action.payload.codes;
      if (action.payload.shouldFetchActionTypes) {
        state.isLoading = true;
      }
      state.actionTypes = null;
    },
    clearCodes: state => {
      state.codes = null;
      state.isLoading = false;
      state.actionTypes = null;
    },
    getActionTypesSuccess: (state, action: PayloadAction<GetDiscountCodesActionTypesResponse[]>) => {
      state.isLoading = false;
      state.actionTypes = action.payload;
    },
    getActionTypesFailure: state => {
      state.isLoading = false;
      state.actionTypes = null;
    },
    updateRequest: (state, action: PayloadAction<UpdateDiscountCodesRequest>) => {
      state.isLoading = true;
    },
    updateRequestFailure: state => {
      state.isLoading = false;
    },
    updateRequestSuccess: state => {
      state.codes = null;
      state.isLoading = false;
      state.actionTypes = null;
    },
    initPage: () => initialState,
    destroyPage: () => initialState,
  },
  selectors: {
    codes: state => state.codes,
    isLoading: state => state.isLoading,
    actionTypesOverlap,
    actionType: state => {
      const isOverlap = actionTypesOverlap(state);
      if (isOverlap) {
        return state.actionTypes ? state.actionTypes[0].actionType : null;
      }
      return null;
    },
    isModalOpen: state => state.isModalOpen,
  },
});
