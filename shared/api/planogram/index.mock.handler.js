import { planogramListMockHandler } from './index.mock.data';

const getPlanogramListData = {
  url: '/planogram/listPlanogram',
  method: 'get',
  successData: planogramListMockHandler,
};

export default [
  getPlanogramListData,
];
