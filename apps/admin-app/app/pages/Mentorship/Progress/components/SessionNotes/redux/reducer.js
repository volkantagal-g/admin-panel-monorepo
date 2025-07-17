import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  isModalOpen: false,
  isNewSessionNote: false,
  activeSessionNote: null,
};

export const openModal = state => ({
  ...state,
  isModalOpen: true,
});

export const closeModal = state => ({
  ...state,
  isModalOpen: false,
});

const setIsNewSessionNote = (state, { isNew }) => ({
  ...state,
  isNewSessionNote: isNew,
  activeSessionNote: null,
});

const setActiveSessionNote = (state, { sessionNote }) => ({
  ...state,
  isNewSessionNote: false,
  activeSessionNote: sessionNote,
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.OPEN_MODAL]: openModal,
  [Types.CLOSE_MODAL]: closeModal,
  [Types.SET_IS_NEW_SESSION_NOTE]: setIsNewSessionNote,
  [Types.SET_ACTIVE_SESSION_NOTE]: setActiveSessionNote,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
