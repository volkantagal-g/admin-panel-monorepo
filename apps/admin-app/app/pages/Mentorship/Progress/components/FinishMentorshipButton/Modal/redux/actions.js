import { createActions } from 'reduxsauce';

import { reduxKey } from '../constants';

export const { Types, Creators } = createActions({
  openModal: null,
  closeModal: null,
  finishMentorshipRequest: { body: null },
  finishMentorshipSuccess: { data: null },
  finishMentorshipFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${reduxKey}_` });
