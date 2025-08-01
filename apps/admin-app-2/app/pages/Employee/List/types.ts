import { IEmployee } from '@app/pages/Employee/types';

import { ACTIVE_GETIRIANS_TAB, NON_ACTIVE_GETIRIANS_TAB } from '@app/pages/Employee/List/constants';

export interface IFilteredEmployeesCommon {
  isPending: boolean;
}

export interface IFilteredActiveEmployees {
  data: IEmployee[];
  totalCount: number,
}

export interface IFilteredNoNActiveEmployees {
  data: IEmployee[];
  totalCount: number,
}

export interface IFilters {
  searchTerm?: string;
  department?: MongoIDType;
  subDepartments: {
    firstLevelSub?: MongoIDType
  };
  lineManager?: MongoIDType;
  businessCountry?: MongoIDType;
  mainWorkLocation?: MongoIDType;
  businessUnit?: MongoIDType;
  positionLevel?: number;
  pagination: {
    currentPage: number;
    rowsPerPage: number;
  };
  activeTabKey: typeof ACTIVE_GETIRIANS_TAB | typeof NON_ACTIVE_GETIRIANS_TAB,
}
