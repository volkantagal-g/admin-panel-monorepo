/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CreatePromoFormType } from '@app/pages/Promo/New/components/AddModalForm/formHelper';

type StateType = {
  loading: boolean;
}

const initialState: StateType = { loading: false };

export type CreatePromoResponse = {
  createPromoV2: {
    _id: MongoIDType
  }
}

export const NewPromotionSlice = createSlice({
  name: 'PromoList/NewPromo',
  initialState,
  reducers: {
    createPromoRequest: (state, action: PayloadAction<CreatePromoFormType>) => {
      state.loading = true;
    },
    createPromoResolve: state => {
      state.loading = false;
    },
    initPage: () => initialState,
    destroyPage: () => initialState,
  },
  selectors: { selectLoading: (state: StateType) => state.loading },
});
