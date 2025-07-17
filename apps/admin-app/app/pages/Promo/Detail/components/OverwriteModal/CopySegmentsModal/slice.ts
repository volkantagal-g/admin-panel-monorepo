/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type StateType = {
  isPending: boolean,
  isModalOpen: boolean,
}

const initialState: StateType = {
  isPending: false,
  isModalOpen: false,
};

export const CopySegmentsSlice = createSlice({
  name: 'PromoDetail/CopySegmentsModal',
  initialState,
  reducers: {
    toggleModal: state => {
      state.isModalOpen = !state.isModalOpen;
    },
    overwriteRequest: (state, action: PayloadAction<MongoIDType>) => {
      state.isPending = true;
    },
    overwriteSuccess: state => {
      state.isPending = false;
      state.isModalOpen = false;
    },
    overwriteFailure: state => {
      state.isPending = false;
    },
    initPage: () => initialState,
    destroyPage: () => initialState,
  },
  selectors: {
    isModalOpen: state => state.isModalOpen,
    isPending: state => state.isPending,
  },
});
