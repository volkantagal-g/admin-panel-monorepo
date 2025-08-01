import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getGeneratedContentForPromoIdRequest: { promoId: undefined },
  getGeneratedContentForPromoIdSuccess: { data: {} },
  getGeneratedContentForPromoIdFailure: { error: null },
  updateNotificationsRequest: { promoId: undefined, content: undefined },
  updateNotificationsSuccess: { data: {} },
  updateNotificationsFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKETING_APPROVAL.LIST}_` });
