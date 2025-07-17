type FilterMetricGroupDTO = {
  limit: number,
  offset: number,
  fields?: string,
};

type GetMetricGroupDTO = { metricGroupId: MongoIDType };

type ACMetricGroup = {
  _id: MongoIDType;
  updatedAt: string;
  createdAt: string;
  name: { [x: string]: string; };
  description: { [x: string]: string };
  status: number;
  owners: string[];
  [x: string]: any;
};
