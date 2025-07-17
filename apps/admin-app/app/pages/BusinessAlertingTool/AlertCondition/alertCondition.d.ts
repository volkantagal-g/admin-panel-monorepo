type AlertCondition = {
  _id: MongoIDType;
  createdAt: string;
  updatedAt: string;
  createdBy: { [key:string]: any };
  name: { [x: string]: string; };
  description: { [x: string]: string };
  status: number;
  notificationPreferences: { [x: string | number]: any };
  conditions: { [x: string | number]: any };
  metricGroup: MongoIDType;
  permittedRoles: any;
  [x: string | number]: any;
}
