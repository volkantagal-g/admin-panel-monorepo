import { createActions } from 'reduxsauce';

import { reduxKey } from 'pages/MarketProduct/containers/NewProductButton/constants';

export const { Types, Creators } = createActions({
  openModal: null,
  closeModal: null,
  createMarketProductRequest: { body: null },
  createMarketProductSuccess: { data: [] },
  createMarketProductFailure: { error: null },
}, { prefix: `${reduxKey}_` });
