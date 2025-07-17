import type { CourierStatusCountWithCourierPlanResponse } from '@shared/api/businessMonitoring/types';

export type CourierStatusCounts = CourierStatusCountWithCourierPlanResponse;

export type OperationStats = {
  // if city selected, it is warehouse ids in that city
  [cityIdOrWarehouseId: string]: {
    [domainType: string]: {
      waitingForPicker: number;
      lateOnWaitingForPicker: number;
      verifying: number;
      lateOnVerifying: number;
      preparing: number;
      lateOnPreparing: number;
      prepared: number;
      lateOnPrepared: number;
      handover: number;
      lateOnHandover: number;
      onway: number;
      lateOnOnway: number;
      reached: number;
      lateOnReached: number;
      totalOrderCount: number;
      slottedOrderCount: number;
      lowerETA: number;
      upperETA: number;
      totalOrderCountWithETA: number;
      getirRelatedErrorBasketCount: number;
      paymentErrorBasketCount: number;
      totalErrorBasketCount: number;
      '0-29': number;
      '30-59': number;
      '60-89': number;
      '90-119': number;
      '+90': number;
      '-90': number;
    };
  };
}[];

export type OperationsWarehouse = {
  _id: MongoIDType;
  id: MongoIDType;
  domainTypes: number[];
  aggressionLevel: number;
  name: string;
  // city depends on population filtering, we don't in this page
  city: MongoIDType;
};
