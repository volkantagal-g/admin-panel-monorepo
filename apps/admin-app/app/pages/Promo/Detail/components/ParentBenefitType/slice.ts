/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChildrenBenefitProduct } from '@app/pages/Promo/Detail/components/ParentBenefitType/types';

type StateType = {
  isPending: boolean;
  isEditing: boolean;
}

const initialState: StateType = { isPending: false, isEditing: false };

export const ParentBenefitTypeSlice = createSlice({
  name: 'PromoDetail/ParentBenefitType',
  initialState,
  reducers: {
    getParentPromoProducts: state => {
      state.isPending = true;
    },
    upsertChildrenProducts: (state, action: PayloadAction<ChildrenBenefitProduct[]>) => {
      state.isPending = true;
    },
    setIsPending: (state, action: PayloadAction<boolean>) => {
      state.isPending = action.payload;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
  },
  selectors: {
    isPending: state => state.isPending,
    isEditing: state => state.isEditing,
  },
});
