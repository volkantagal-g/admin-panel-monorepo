/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PromoTagType } from '@app/pages/Promo/types';
import { GetPromosByIdResponse } from '@app/pages/Promo/Detail/components/LinkedPromotions/slice';

type SlicePayload = {
  slice: string;
}

type StateType = {
  isPending: Record<string, boolean>;
  data: Record<string, PromoTagType[] | null>;
}

interface GetPromosByPromoCodeRequestPayload {
  searchString: string;
  excludedOptions?: MongoIDType[];
  isParentPromo?: boolean;
  isMasterPromo?: boolean
}

const initialState: StateType = {
  isPending: {},
  data: {},
};

export const SelectPromoSlice = createSlice({
  name: 'Select/Promo',
  initialState,
  reducers: {
    getPromosByPromoCodeRequest: (state, action: PayloadAction<GetPromosByPromoCodeRequestPayload & SlicePayload>) => {
      state.isPending[action.payload.slice] = true;
    },
    getPromosByPromoCodeSuccess: (state, action: PayloadAction<[PromoTagType[], SlicePayload]>) => {
      const [promos, { slice }] = action.payload;
      state.data[slice] = promos;
      state.isPending[slice] = false;
    },
    getPromosByPromoCodeFailure: (state, action: PayloadAction<SlicePayload>) => {
      state.isPending[action.payload.slice] = false;
    },
    initPage: (state, action: PayloadAction<SlicePayload>) => {
      state.data[action.payload.slice] = null;
      state.isPending[action.payload.slice] = false;
    },
    destroyPage: (state, action: PayloadAction<SlicePayload>) => {
      delete state.data[action.payload.slice];
      delete state.isPending[action.payload.slice];
    },
    getPromosByIdsRequest: (state, action: PayloadAction<{ promoIds: MongoIDType[] } & SlicePayload>) => {
      state.isPending[action.payload.slice] = true;
    },
    getPromosByIdsSuccess: (state, action: PayloadAction<[GetPromosByIdResponse[], SlicePayload]>) => {
      const [promos, { slice }] = action.payload;
      state.data[slice] = promos;
      state.isPending[slice] = false;
    },
    getPromosByIdsFailure: (state, action: PayloadAction<SlicePayload>) => {
      state.isPending[action.payload.slice] = false;
    },
  },
  selectors: {
    isPending: state => state.isPending,
    data: state => state.data,
  },
});
