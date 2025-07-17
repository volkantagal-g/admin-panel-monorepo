/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GeneralInformationFormType } from '@app/pages/Promo/types';

type StateType = {
  isLoading: boolean;
  isEditing: boolean;
}

const initialState: StateType = {
  isLoading: false,
  isEditing: false,
};

export const GeneralInfoSlice = createSlice({
  name: 'PromoDetail/GeneralInfo',
  initialState,
  reducers: {
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    update: (state, action: PayloadAction<GeneralInformationFormType>) => {
      state.isLoading = true;
    },
    updateSuccess: state => {
      state.isLoading = false;
      state.isEditing = false;
    },
    updateError: state => {
      state.isLoading = false;
    },
    initPage: () => initialState,
    destroyPage: () => initialState,
  },
  selectors: {
    isLoading: (state: StateType) => state.isLoading,
    isEditing: (state: StateType) => state.isEditing,
  },
});
