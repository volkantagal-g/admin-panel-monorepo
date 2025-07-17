import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getGiveawayEventsRequest: { limit: 10, offset: 0, queryText: null, eventId: null, gsm: null },
    getGiveawayEventsSuccess: { data: [] },
    getGiveawayEventsFailure: { error: null },
    deliverGiveawayEventRequest: { eventId: null, countryCode: null, gsm: null, id: null },
    deliverGiveawayEventSuccess: { id: null, isDelivered: false },
    deliverGiveawayEventFailure: { error: null },
    getDrawDiscountCodeRequest: { discountCodeId: null, id: null },
    getDrawDiscountCodeSuccess: { id: null, code: null },
    getDrawDiscountCodeFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.GIVEAWAY_EVENT.LIST}_` },
);
