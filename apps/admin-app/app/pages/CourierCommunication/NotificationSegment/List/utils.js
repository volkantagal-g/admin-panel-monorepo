import { getLimitAndOffset } from '@shared/utils/common';

function segmentListParams({ client, segmentName, creationDateTime, currentPage, rowsPerPage }) {
  const params = {};
  const { limit, offset } = getLimitAndOffset({ rowsPerPage, currentPage });

  if (client) {
    params.client = client;
  }

  if (segmentName) {
    params.name = segmentName;
  }

  if (creationDateTime?.length > 0) {
    params.startDate = creationDateTime[0]?.format('YYYY-MM-DD');
    params.endDate = creationDateTime[1]?.format('YYYY-MM-DD');
  }

  params.limit = limit;
  params.offset = offset;

  return params;
}

export default segmentListParams;
