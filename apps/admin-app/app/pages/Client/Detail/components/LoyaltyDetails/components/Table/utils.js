import { omit } from 'lodash';

import { LOYALTY_DETAILS } from '@app/pages/Client/Detail/constants';

const initializeNewData = (stampCount = 0, defaultMessage) => {
  return Array.from({ length: stampCount }).fill({ stamp: defaultMessage });
};

const updateNewDataWithStamps = (newData, stamps, t) => {
  const updatedData = [...newData];
  stamps.forEach((stamp, index) => {
    switch (stamp.type) {
      case LOYALTY_DETAILS.LOYALTY_STAMP_TYPES.VIRTUAL:
        updatedData[index] = { stamp: t('LOYALTY.VIRTUAL_STAMP_MESSAGE') };
        break;
      case LOYALTY_DETAILS.LOYALTY_STAMP_TYPES.ORDER:
        updatedData[index] = { stamp: stamp.restaurant.name };
        break;
      default:
        break;
    }
  });
  return updatedData;
};

const calculateTotalDataSize = (cycles, stampCount) => {
  return cycles.length * stampCount;
};

export const tableDataMapper = ({ loyaltyStamps, filters, pagination, t }) => {
  const { loyaltyType } = filters;
  let newData = initializeNewData(loyaltyType && loyaltyType.totalStampCount, t('LOYALTY.NO_ORDER_MESSAGE'));

  let totalDataSize = 0;

  let cycleStatus;

  const loyaltyProgram = loyaltyStamps.find(l => l.loyalty.id === loyaltyType.value);

  if (loyaltyProgram) {
    const { cycles } = loyaltyProgram;
    totalDataSize = calculateTotalDataSize(cycles, loyaltyType.totalStampCount);
    cycleStatus = omit(cycles[pagination.currentPage - 1], 'stamps');
    const currentPageStamps = cycles[pagination.currentPage - 1]?.stamps || [];
    newData = updateNewDataWithStamps(newData, currentPageStamps, t);
  }

  return { filteredTableData: newData, totalDataSize, cycleStatus };
};
