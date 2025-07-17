import { createActions } from 'reduxsauce';

import { reduxKey } from '../constants';

export const { Types, Creators } = createActions({
  openModal: null,
  closeModal: null,
  setIsNewTodo: { isNew: null },
  setActiveTodo: { todo: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${reduxKey}_` });
