import axios from '@shared/axios/common';

export const filterWorkforceGenericLogs = ({ warehouseId, personId, startDate, endDate, entity, limit, offset }) => axios({
  url: '/workforceGenericLog/filter',
  method: 'POST',
  data: {
    warehouseId,
    personId,
    startDate,
    endDate,
    entity,
    limit,
    offset,
  },
});
