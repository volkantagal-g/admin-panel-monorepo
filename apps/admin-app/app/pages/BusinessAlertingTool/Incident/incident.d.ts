type ResultValueByBreakdown = {
  key: any,
  value: any,
  _id: MongoIDType,
  details: {
      name: string
  }
}

type Incident = {
  _id: MongoIDType;
  alertCondition: MongoIDType;
  metricGroup: MongoIDType;
  status: number,
  priority: number,
  conditions: {
    warning: {
      occursAt: string,
      threshold: number,
      operator: number,
      resultValue: number,
      resultValueByBreakdown: ResultValueByBreakdown,
    },
    critical: {
      resultValueByBreakdown: ResultValueByBreakdown,
    }
  },
  alerytSignals: {
    firstSignalAt: string,
    breakdownField: string
  }
  createdAt: string;
  updatedAt: string;
  [x: string]: any;
}

type PaginationProps = {
  currentPage: number,
  rowsPerPage: number
}
