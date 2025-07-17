import { createReducer } from 'reduxsauce';

import { Types, Creators } from './actions';
import { ChainDetailState, INITIAL_STATE } from './types';

export default function chainDetailReducer(state = INITIAL_STATE, action: any): ChainDetailState {
  switch (action.type) {
    case Types.GET_CHAIN_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case Types.GET_CHAIN_DETAIL_SUCCESS:
      return {
        ...state,
        chain: action.data.chain,
        product: action.data.product,
        supplier: action.data.supplier,
        location: action.data.location,
        domain: action.data.domain,
        isLoading: false,
        error: null,
      };

    case Types.GET_CHAIN_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case Types.UPDATE_CHAIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case Types.UPDATE_CHAIN_SUCCESS:
      return {
        ...state,
        chain: action.data.chain,
        product: action.data.product,
        supplier: action.data.supplier,
        location: action.data.location,
        domain: action.data.domain,
        isLoading: false,
        error: null,
      };

    case Types.UPDATE_CHAIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case Types.SET_EDIT_MODE:
      return {
        ...state,
        isEditMode: action.isEditMode,
      };

    case Types.DESTROY_PAGE:
      return INITIAL_STATE;

    default:
      return state;
  }
}
