import { isEqual } from 'lodash';

export const checkRowUpdated = (cardInitialInstallmentCounts = [], row) => {
  const rowItemIndexInInitial = cardInitialInstallmentCounts.findIndex(installment => installment.id === row.id);
  // in case of row resetting to initial value
  const { operation, ...rest } = row;
  return !isEqual(cardInitialInstallmentCounts[rowItemIndexInInitial], rest);
};
