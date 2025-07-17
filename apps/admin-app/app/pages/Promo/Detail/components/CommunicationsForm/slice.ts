/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AICommunicationsAsset } from '@app/pages/Promo/types';

type StateType = {
  loading: boolean;
  error: string | null;
}

const initialState: StateType = {
  loading: false,
  error: null,
};

interface GenerateAICommunicationsRequest {
  isCommsEnabled: boolean
  assets: AICommunicationsAsset[]
  description: string
}

interface UpdateAICommunicationsStatusRequest {
  id: MongoIDType
  body: {
    isCommsEnabled: boolean
  }
}

interface GenerateAICommunicationsAPIRequest {
  id: MongoIDType
  promoCode: string
  description: string
  assets: AICommunicationsAsset[]
  domains: number[]
  countryId: MongoIDType
}

export const AICommunicationsSlice = createSlice({
  name: 'PromoDetail/AICommunications',
  initialState,
  reducers: {
    getAICommunicationsStatusRequest: state => {
      state.loading = true;
    },
    getAICommunicationsStatusResolve: state => {
      state.loading = false;
    },
    generateAICommunicationsRequest: (state, action: PayloadAction<GenerateAICommunicationsRequest>) => {
      state.loading = true;
    },
    generateAICommunicationsResolve: state => {
      state.loading = false;
    },
    initPage: () => initialState,
    destroyPage: () => initialState,
  },
  selectors: {
    isLoading: (state: StateType) => state.loading,
    error: (state: StateType) => state.error,
  },
});
