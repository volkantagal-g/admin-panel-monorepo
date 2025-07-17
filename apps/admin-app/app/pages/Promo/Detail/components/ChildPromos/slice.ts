/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Key } from 'antd/lib/table/interface';

import { BulkOpMessage, ChildPromo, RelationalBulkOperation, RelationalBulkOpMessage } from '../../../types';

export type AddChildrenResponse = {
  addChildrenPromos: RelationalBulkOpMessage[]
}

export type ActivateChildPromosResponse = { activateChildPromos: RelationalBulkOpMessage[] }
export type DeactivateChildPromosResponse = { deactivateChildPromos: RelationalBulkOpMessage[] }
export type GetChildPromosResponse = { promos: ChildPromo[] }

export type TableChangePayload = {
  current?: number;
  pageSize?: number;
  filters?: Record<string, (Key | boolean)[] | null> | null;
  fetch?: boolean;
  promoCode?: string;
}

type RemoveSelectedPromosPayload = 'table' | 'modal'

type StateType = {
  selectChildrenModal: {
    selected: MongoIDType[];
    isPending: boolean;
    modalVisible: boolean;
    filter: BulkOpMessage[] | null
  },
  resultModal: {
    visible: boolean;
    result: RelationalBulkOpMessage[];
    operation: RelationalBulkOperation
  }
  table: {
    selected: MongoIDType[];
    data: ChildPromo[] | null;
    loading: boolean;
  } & TableChangePayload
}

const initialState: StateType = {
  selectChildrenModal: {
    selected: [],
    isPending: false,
    modalVisible: false,
    filter: null,
  },
  resultModal: {
    visible: false,
    result: [],
    operation: RelationalBulkOperation.StatusChange,
  },
  table: {
    selected: [],
    data: null,
    loading: false,
    current: 1,
    pageSize: 10,
    filters: null,
  },
};

export const ChildrenPromosSlice = createSlice({
  name: 'PromoDetail/ChildrenPromos',
  initialState,
  reducers: {
    setSelectedAddRemoveOptions: (state, action: PayloadAction<MongoIDType[]>) => {
      state.selectChildrenModal.selected = action.payload;
    },
    addSelectedPromos: state => {
      state.selectChildrenModal.isPending = true;
      state.resultModal.operation = RelationalBulkOperation.AddRemove;
    },
    removeSelectedPromos: (state, action: PayloadAction<RemoveSelectedPromosPayload>) => {
      state.selectChildrenModal.isPending = true;
      state.resultModal.operation = RelationalBulkOperation.AddRemove;
    },
    resolveAddRemovePromos: state => {
      state.selectChildrenModal = initialState.selectChildrenModal;
    },
    setResultModalVisible: (state, action: PayloadAction<boolean>) => {
      state.selectChildrenModal = {
        ...initialState.selectChildrenModal,
        modalVisible: action.payload,
      };
    },
    displayBulkResultTable: (state, action: PayloadAction<RelationalBulkOpMessage[]>) => {
      state.resultModal = {
        visible: true,
        result: action.payload,
        operation: state.resultModal.operation,
      };
    },
    hideAddChildrenResultTable: state => {
      state.resultModal = {
        visible: false,
        result: [],
        operation: state.resultModal.operation,
      };
    },
    changeTable: (state, action: PayloadAction<TableChangePayload>) => {
      state.table.current = action.payload.current ?? initialState.table.current;
      state.table.pageSize = action.payload.pageSize ?? initialState.table.pageSize;
      state.table.filters = action.payload.filters ?? null;
      state.table.loading = true;
      state.table.promoCode = action.payload.promoCode ?? initialState.table.promoCode;
    },
    setData: (state, action: PayloadAction<ChildPromo[] | null>) => {
      state.table.data = action.payload?.map(item => ({ ...item, key: item._id })) || null;
      state.table.loading = false;
    },
    setSelected: (state, action: PayloadAction<MongoIDType[]>) => {
      state.table.selected = action.payload;
    },
    activateChildPromosRequest: state => {
      state.table.loading = true;
      state.resultModal.operation = RelationalBulkOperation.StatusChange;
    },
    activateChildPromosResolve: state => {
      state.table.loading = false;
      state.table.selected = [];
    },
    deactivateChildPromosRequest: state => {
      state.table.loading = true;
      state.resultModal.operation = RelationalBulkOperation.StatusChange;
    },
    deactivateChildPromosResolve: state => {
      state.table.loading = false;
      state.table.selected = [];
    },
    setAddRemoveOptionsFilter: (state, action: PayloadAction<BulkOpMessage[] | null>) => {
      state.selectChildrenModal.filter = action.payload;
    },
    setTableLoading: (state, action: PayloadAction<boolean>) => {
      state.table.loading = action.payload;
    },
    initPage: () => initialState,
    destroyPage: () => initialState,
  },
  selectors: {
    addRemoveSelected: state => state.selectChildrenModal.selected,
    isPending: state => state.selectChildrenModal.isPending,
    modalVisible: state => state.selectChildrenModal.modalVisible,
    result: state => state.resultModal.result,
    resultModalVisible: state => state.resultModal.visible,
    children: state => state.table.data,
    isTableLoading: state => state.table.loading,
    getTableParams: state => ({
      current: state.table.current,
      pageSize: state.table.pageSize,
      filters: state.table.filters,
      promoCode: state.table.promoCode,
    }),
    selected: state => state.table.selected,
    operation: state => state.resultModal.operation,
    addRemoveOptionsFilter: state => state.selectChildrenModal.filter,
  },
});
