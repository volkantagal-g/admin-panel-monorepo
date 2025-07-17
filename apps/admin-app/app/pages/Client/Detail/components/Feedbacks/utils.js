import { FEEDBACK_STATUSES } from "@shared/shared/constants";

export const getRowClassName = (classes, record) => {
  const { status } = record;

  if (status === FEEDBACK_STATUSES.ACTIVE) {
    return classes.activeStatusBGRed;
  }

  return '';
};