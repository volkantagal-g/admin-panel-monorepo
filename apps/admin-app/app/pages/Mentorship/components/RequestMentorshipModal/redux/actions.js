import { createActions } from 'reduxsauce';

import { reduxKey } from '../constants';

export const { Types, Creators } = createActions({
  openModal: null,
  closeModal: null,
  requestMentorshipRequest: { body: null },
  requestMentorshipSuccess: { data: null },
  requestMentorshipFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${reduxKey}_` });
