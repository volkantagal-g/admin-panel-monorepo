/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BulkOpMessage, ParentPromo, RelationalBulkOpMessage } from '../../../types';

export type AddParentPromosResponse = {
  addParentPromos: RelationalBulkOpMessage[]
}

type RemoveSelectedPromosPayload = 'table' | 'modal'

export type TableChangePayload = {
  current?: number;
  pageSize?: number;
  fetch?: boolean;
  promoCode?: string;
}

type StateType = {
  selectionModal: {
    selected: MongoIDType[];
    isPending: boolean;
    modalVisible: boolean;
    filter: BulkOpMessage[] | null
  },
  resultModal: {
    visible: boolean;
    result: RelationalBulkOpMessage[];
  }
  table: {
    selected: MongoIDType[];
    data: ParentPromo[] | null;
    loading: boolean;
  } & TableChangePayload
}

const initialState: StateType = {
  selectionModal: {
    selected: [],
    isPending: false,
    modalVisible: false,
    filter: null,
  },
  resultModal: {
    visible: false,
    result: [],
  },
  table: {
    selected: [],
    data: null,
    loading: false,
    current: 1,
    pageSize: 10,
  },
};

export const ParentPromosSlice = createSlice({
  name: 'PromoDetail/ParentPromos',
  initialState,
  reducers: {
    setSelectedAddRemoveOptions: (state, action: PayloadAction<MongoIDType[]>) => {
      state.selectionModal.selected = action.payload;
    },
    addSelectedPromos: state => {
      state.selectionModal.isPending = true;
    },
    removeSelectedPromos: (state, action: PayloadAction<RemoveSelectedPromosPayload>) => {
      state.selectionModal.isPending = true;
    },
    resolveAddRemovePromos: state => {
      state.selectionModal = initialState.selectionModal;
    },
    setResultModalVisible: (state, action: PayloadAction<boolean>) => {
      state.selectionModal = {
        ...initialState.selectionModal,
        modalVisible: action.payload,
      };
    },
    displayBulkResultTable: (state, action: PayloadAction<RelationalBulkOpMessage[]>) => {
      state.resultModal = {
        visible: true,
        result: action.payload,
      };
    },
    hideResultTable: state => {
      state.resultModal = {
        visible: false,
        result: [],
      };
    },
    setAddRemoveOptionsFilter: (state, action: PayloadAction<BulkOpMessage[] | null>) => {
      state.selectionModal.filter = action.payload;
    },
    setSelected: (state, action: PayloadAction<MongoIDType[]>) => {
      state.table.selected = action.payload;
    },
    changeTable: (state, action: PayloadAction<TableChangePayload>) => {
      state.table.current = action.payload.current ?? initialState.table.current;
      state.table.pageSize = action.payload.pageSize ?? initialState.table.pageSize;
      state.table.loading = true;
      state.table.promoCode = action.payload.promoCode ?? initialState.table.promoCode;
    },
    getParentsRequest: state => {
      state.table.loading = true;
    },
    getParentsResolve: state => {
      state.table.loading = false;
    },
    setData: (state, action: PayloadAction<ParentPromo[] | null>) => {
      state.table.data = action.payload?.map(item => ({ ...item, key: item._id })) || null;
      state.table.loading = false;
    },
    setTableLoading: (state, action: PayloadAction<boolean>) => {
      state.table.loading = action.payload;
    },
    initPage: () => initialState,
    destroyPage: () => initialState,
  },
  selectors: {
    addRemoveSelected: (state: StateType) => state.selectionModal.selected,
    isPending: (state: StateType) => state.selectionModal.isPending,
    modalVisible: (state: StateType) => state.selectionModal.modalVisible,
    result: (state: StateType) => state.resultModal.result,
    resultModalVisible: (state: StateType) => state.resultModal.visible,
    addRemoveOptionsFilter: (state: StateType) => state.selectionModal.filter,
    isTableLoading: state => state.table.loading,
    selected: state => state.table.selected,
    getTableParams: state => ({
      current: state.table.current,
      pageSize: state.table.pageSize,
      promoCode: state.table.promoCode,
    }),
    parents: state => state.table.data,
  },
});
