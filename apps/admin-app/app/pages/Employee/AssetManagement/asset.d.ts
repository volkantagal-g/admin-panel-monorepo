type AssetType = {
  _id: MongoIDType,
  name: {
    tr: string,
    en: string,
  },
  uniqueIdentifierLabel: {
    tr: string,
    en: string,
  },
  subModules: string[],
  isActive: boolean,
  isMultipleAssignable: boolean,
  schema: {
    name: string,
    metaData: AssetTypeMetaData, // TODO: Implement type here
    filterMetaData: any // TODO: Implement type here
  }
}

type Asset = {
  _id: MongoIDType,
  assetType: MongoIDType,
  uniqueIdentifier: string,
  assignee: [MongoIDType],
  fieldValues: Object,
  assignableStatus: Number,
  assignableStatusReason: Number,
  status: Number,
}

type AssetTypeMetaData = any;

type AssetFilterMetaData = {
  groupTitle: {
    tr: string,
    en: string,
  },
  rows: {
    rowIndex: number,
    columns: {
      type: string,
      label: {
        tr: string,
        en: string,
      }
    }[]
  }[]
}[]

type Pagination = {
  currentPage: number;
  rowsPerPage: number;
}

type FilterData = {
  assignmentStatus: number | null;
  uniqueIdentifier: string | null;
  vehicleBrand: number[] | null;
  vehicleModel: number[] | null;
  vehicleModelYear: number[] | null;
  vehicleIsCommonCar: boolean | null;
  activeTabKey: string;
  pagination: Pagination;
};

type LogFilterData = {
  startDate: Date | null;
  endDate: Date | null;
  uniqueIdentifier: string | null;
  userId: number | null;
  pagination: Pagination;
};

type Label = {
  en: string;
  tr: string;
}

type Component ={
  type: string;
  dependencies?: string[];
  params?: {
    mode?: string;
    allowClear?: boolean;
  };
}

type Column ={
  type: string;
  label: Label;
  component: Component;
  fieldName: string;
  isUIEnabled: boolean;
  spanCoefficient: {
    xs: number;
    sm: number;
    md: number;
  };
}

type Row ={
  rowIndex?: number;
  columns: Column[];
}

type AssetFilterTypeMetaData ={
  groupTitle: Label;
  rows: Row[];
}

type VehicleEquipmentInformation = {
  _id: MongoIDType;
  assetId?: MongoIDType;
  trackingDeviceStatus: number;
  tireType: number;
  equipments: number[];
  createdAt: Date;
  updatedAt: Date;
  assetIds?: MongoIDType[];
}
