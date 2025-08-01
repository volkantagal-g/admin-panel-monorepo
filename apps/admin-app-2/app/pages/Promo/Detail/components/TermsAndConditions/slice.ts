/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TermsAndConditions } from '../../../types';

type StateType = {
  isPending: boolean,
  isEditing: boolean
}

const initialState: StateType = {
  isPending: false,
  isEditing: false,
};

export const TermsAndConditionsSlice = createSlice({
  name: 'PromoDetail/TermsAndConditions',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<TermsAndConditions>) => {
      state.isPending = true;
    },
    resolveUpdate: state => {
      state.isPending = false;
      state.isEditing = false;
    },
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    initPage: () => initialState,
    destroyPage: () => initialState,
  },
  selectors: { isPending: state => state.isPending, isEditing: state => state.isEditing },
});
