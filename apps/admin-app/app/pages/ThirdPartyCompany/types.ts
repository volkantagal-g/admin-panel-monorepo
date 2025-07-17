export type ChangeLogType = {
  _id: string;
  actionType: string;
  createdAt: string;
  createdBy: string;
  currentValue: DynamicObjectType;
  oldValue: DynamicObjectType;
};
