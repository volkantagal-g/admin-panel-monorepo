export type ActionWithType<T> = {
  type: string;
} & T;

export type VehicleComplianceRecord = {
  asset: MongoIDType;
  type: number;
  startDate: Date;
  endDate: Date;
  documentFileKey: string;
}

export interface IVehicleDamageRecord {
  _id: MongoIDType;
  assetId: MongoIDType;
  detectionDate: Date;
  description: string;
  isDeleted: boolean;
  documentFileKey?: string;
}

export interface IVehicleTrafficPenaltyRecord {
  _id: MongoIDType;
  asset: MongoIDType;
  penaltyDate: Date;
  isDeleted: boolean;
  documentFileKey?: string;
}
