import { createActions } from 'reduxsauce';

import { reduxKey } from '../constants';

export const { Types, Creators } = createActions({
  openModal: null,
  closeModal: null,
  setIsNewSessionNote: { isNew: null },
  setActiveSessionNote: { sessionNote: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${reduxKey}_` });
