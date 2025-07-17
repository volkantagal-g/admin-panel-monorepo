import { getLimitAndOffset } from '@shared/utils/common';

function notificationListParams({ notificationID, notificationName, status, priority, sendingDateTime, creationDateTime, currentPage, rowsPerPage }) {
  const params = {};
  const { limit, offset } = getLimitAndOffset({ rowsPerPage, currentPage });

  if (status?.length > 0) {
    params.status = status;
  }

  if (notificationID) {
    params.notificationId = notificationID;
  }

  if (notificationName) {
    params.notificationName = notificationName;
  }

  if (priority) {
    params.priority = priority;
  }

  if (sendingDateTime?.length > 0) {
    params.scheduledAt = { from: sendingDateTime[0]?.format('YYYY-MM-DD'), to: sendingDateTime[1]?.format('YYYY-MM-DD') };
  }

  if (creationDateTime?.length > 0) {
    params.createdAt = { from: creationDateTime[0]?.format('YYYY-MM-DD'), to: sendingDateTime[1]?.format('YYYY-MM-DD') };
  }

  params.limit = limit;
  params.offset = offset;

  return params;
}

export default notificationListParams;
