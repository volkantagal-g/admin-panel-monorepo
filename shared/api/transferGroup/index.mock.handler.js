import { mockedTransferGroups } from './index.mock.data.handler';

const url = '/transferGroup/getTransferGroupsByFilter';

const getTransferGroupsMockOptions = {
  url,
  successData: mockedTransferGroups,
};

export default [getTransferGroupsMockOptions];
