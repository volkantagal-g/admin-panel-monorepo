import { loyaltyMockHandler } from './index.mock.data';

const getLoyaltyData = {
  url: '/courierGamification/getCourierList',
  method: 'post',
  successData: loyaltyMockHandler,
};

export default [
  getLoyaltyData,
];
