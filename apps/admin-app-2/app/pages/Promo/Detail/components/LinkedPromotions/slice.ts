/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GetPromosByIdResponse = {
  _id: MongoIDType
  promoCode: string
  bgColor?: string
  clientSegments: number[]
}

type StateType = {
  data: GetPromosByIdResponse[] | null;
  loading: boolean;
  isEditing: boolean;
}

const initialState: StateType = {
  data: null,
  loading: false,
  isEditing: false,
};

export const LinkedPromotionsSlice = createSlice({
  name: 'PromoDetail/LinkedPromotions',
  initialState,
  reducers: {
    updateLinkedPromotionsRequest: (state, action: PayloadAction<MongoIDType | undefined>) => {
      state.loading = true;
    },
    updateLinkedPromotionsSuccess: state => {
      state.loading = false;
      state.isEditing = false;
    },
    updateLinkedPromotionsFail: state => {
      state.loading = false;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      if (!action.payload) {
        return initialState;
      }

      state.isEditing = action.payload;
      return state;
    },
    initPage: () => initialState,
    destroyPage: () => initialState,
  },
  selectors: {
    selectData: (state: StateType) => state.data,
    selectLoading: (state: StateType) => state.loading,
    isEditing: (state: StateType) => state.isEditing,
  },
});
