import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  isModalOpen: false,
  isNewTodo: false,
  activeTodo: null,
};

const openModal = state => ({
  ...state,
  isModalOpen: true,
});

const closeModal = state => ({
  ...state,
  isModalOpen: false,
});

const setIsNewTodo = (state, { isNew }) => ({
  ...state,
  isNewTodo: isNew,
  activeTodo: null,
});

const setActiveTodo = (state, { todo }) => ({
  ...state,
  isNewTodo: false,
  activeTodo: todo,
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.OPEN_MODAL]: openModal,
  [Types.CLOSE_MODAL]: closeModal,
  [Types.SET_IS_NEW_TODO]: setIsNewTodo,
  [Types.SET_ACTIVE_TODO]: setActiveTodo,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
