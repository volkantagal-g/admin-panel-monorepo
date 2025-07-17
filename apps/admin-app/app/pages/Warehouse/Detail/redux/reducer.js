import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  warehouse: {
    data: {},
    isPending: false,
    error: null,
  },
  employees: {
    data: [],
    isPending: false,
  },
  warehouseShipmentFrequencies: {
    data: [],
    isPending: false,
    error: null,
  },
  warehouseShipmentPreparations: {
    data: [],
    isPending: false,
    error: null,
  },
  shipmentFrequencies: {
    data: [],
    isPending: false,
    error: null,
  },
  shipmentPreparations: {
    data: [],
    isPending: false,
    error: null,
  },
  warehouseTransferGroup: {
    data: {},
    isPending: false,
    error: null,
  },
  warehouseWorkingHours: {
    data: [],
    isPending: false,
    error: null,
  },
  warehousePeakHours: {
    data: [],
    isPending: false,
    error: null,
  },
  warehouseLocationTemplates: {
    data: [],
    isPending: false,
    error: null,
  },
  warehouseSections: {
    data: [],
    isPending: false,
    error: null,
  },
  warehouseSegments: {
    data: [],
    isPending: false,
    error: null,
  },
  assignFranchiseArea: {
    isPending: false,
    isSuccess: false,
  },
  filteredWarehouses: {
    data: [],
    isPending: false,
    totalCount: 0,
  },
};

export const getShipmentFrequenciesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    shipmentFrequencies: {
      ...state.shipmentFrequencies,
      isPending: true,
    },
  };
};

export const getShipmentFrequenciesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    shipmentFrequencies: {
      ...state.shipmentFrequencies,
      data,
      isPending: false,
    },
  };
};

export const getShipmentFrequenciesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    shipmentFrequencies: {
      ...state.shipmentFrequencies,
      isPending: false,
      error,
    },
  };
};

export const getShipmentPreparationsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    shipmentPreparations: {
      ...state.shipmentPreparations,
      isPending: true,
    },
  };
};

export const getShipmentPreparationsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    shipmentPreparations: {
      ...state.shipmentPreparations,
      data,
      isPending: false,
    },
  };
};

export const getShipmentPreparationsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    shipmentPreparations: {
      ...state.shipmentPreparations,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseShipmentPreparationRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseShipmentPreparations: {
      ...state.warehouseShipmentPreparations,
      isPending: true,
    },
  };
};

export const updateWarehouseShipmentPreparationSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouseShipmentPreparations: {
      ...state.warehouseShipmentPreparations,
      data,
      isPending: false,
    },
  };
};

export const updateWarehouseShipmentPreparationFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseShipmentPreparations: {
      ...state.warehouseShipmentPreparations,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseShipmentFrequencyRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseShipmentFrequencies: {
      ...state.warehouseShipmentFrequencies,
      isPending: true,
    },
  };
};

export const updateWarehouseShipmentFrequencySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouseShipmentFrequencies: {
      ...state.warehouseShipmentFrequencies,
      data,
      isPending: false,
    },
  };
};

export const updateWarehouseShipmentFrequencyFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseShipmentFrequencies: {
      ...state.warehouseShipmentFrequencies,
      isPending: false,
      error,
    },
  };
};

export const addWarehouseShipmentFrequencyRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseShipmentFrequencies: {
      ...state.warehouseShipmentFrequencies,
      isPending: true,
    },
  };
};

export const addWarehouseShipmentFrequencySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouseShipmentFrequencies: {
      ...state.warehouseShipmentFrequencies,
      data,
      isPending: false,
    },
  };
};

export const addWarehouseShipmentFrequencyFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseShipmentFrequencies: {
      ...state.warehouseShipmentFrequencies,
      isPending: false,
      error,
    },
  };
};

export const addWarehouseShipmentPreparationRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseShipmentPreparations: {
      ...state.warehouseShipmentPreparations,
      isPending: true,
    },
  };
};

export const addWarehouseShipmentPreparationSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouseShipmentPreparations: {
      ...state.warehouseShipmentPreparations,
      data,
      isPending: false,
    },
  };
};

export const addWarehouseShipmentPreparationFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseShipmentPreparations: {
      ...state.warehouseShipmentPreparations,
      isPending: false,
      error,
    },
  };
};

export const getWarehouseShipmentFrequenciesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseShipmentFrequencies: {
      ...state.warehouseShipmentFrequencies,
      isPending: true,
    },
  };
};

export const getWarehouseShipmentFrequenciesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouseShipmentFrequencies: {
      ...state.warehouseShipmentFrequencies,
      data,
      isPending: false,
    },
  };
};

export const getWarehouseShipmentFrequenciesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseShipmentFrequencies: {
      ...state.warehouseShipmentFrequencies,
      isPending: false,
      error,
    },
  };
};

export const getWarehouseShipmentPreparationsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseShipmentPreparations: {
      ...state.warehouseShipmentPreparations,
      isPending: true,
    },
  };
};

export const getWarehouseShipmentPreparationsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouseShipmentPreparations: {
      ...state.warehouseShipmentPreparations,
      data,
      isPending: false,
    },
  };
};

export const getWarehouseShipmentPreparationsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseShipmentPreparations: {
      ...state.warehouseShipmentPreparations,
      isPending: false,
      error,
    },
  };
};

export const getWarehouseWorkingHoursRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseWorkingHours: {
      ...state.warehouseWorkingHours,
      isPending: true,
    },
  };
};

export const getWarehouseWorkingHoursSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouseWorkingHours: {
      ...state.warehouseWorkingHours,
      data,
      isPending: false,
    },
  };
};

export const getWarehouseWorkingHoursFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseWorkingHours: {
      ...state.warehouseWorkingHours,
      isPending: false,
      error,
    },
  };
};

export const getWarehousePeakHoursRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehousePeakHours: {
      ...state.warehousePeakHours,
      isPending: true,
    },
  };
};

export const getWarehousePeakHoursSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehousePeakHours: {
      ...state.warehousePeakHours,
      data,
      isPending: false,
    },
  };
};

export const getWarehousePeakHoursFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehousePeakHours: {
      ...state.warehousePeakHours,
      isPending: false,
      error,
    },
  };
};

export const getEmployeesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    employees: {
      ...state.employees,
      isPending: true,
    },
  };
};

export const getEmployeesSuccess = (state = INITIAL_STATE, { data = [] }) => {
  return {
    ...state,
    employees: {
      ...state.employees,
      data,
      isPending: false,
    },
  };
};

export const getEmployeesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    employees: {
      ...state.employees,
      isPending: false,
      error,
    },
  };
};

export const getWarehouseRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const getWarehouseSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data,
      isPending: false,
    },
  };
};

export const getWarehouseFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const getWarehouseTransferGroupRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseTransferGroup: {
      ...state.warehouseTransferGroup,
      isPending: true,
    },
  };
};

export const getWarehouseTransferGroupSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouseTransferGroup: {
      ...state.warehouseTransferGroup,
      data,
      isPending: false,
    },
  };
};

export const getWarehouseTransferGroupFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseTransferGroup: {
      ...state.warehouseTransferGroup,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseInfoRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const updateWarehouseInfoSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data,
      isPending: false,
    },
  };
};

export const updateWarehouseInfoFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseBudgetInfoRequest = state => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const updateWarehouseBudgetInfoSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data: {
        ...state.warehouse.data,
        budgetItem: { ...state.warehouse.data.budgetItem, ...data },
      },
      isPending: false,
    },
  };
};

export const updateWarehouseBudgetInfoFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const updateTransferReceivingRequest = state => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const updateTransferReceivingSuccess = (state, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data: {
        ...state.warehouse.data,
        transferReceivingWindows: { ...state.warehouse.data.transferReceivingWindows, ...data },
      },
      isPending: false,
    },
  };
};

export const updateTransferReceivingFailure = (state, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseTestStatusRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const updateWarehouseTestStatusSuccess = (state = INITIAL_STATE, { isTestWarehouse }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data: { ...state.warehouse.data, isTestWarehouse },
      isPending: false,
    },
  };
};

export const updateWarehouseTestStatusFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseAcceptReturnsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const updateWarehouseAcceptReturnsSuccess = (state = INITIAL_STATE, { acceptReturns }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data: { ...state.warehouse.data, acceptReturns },
      isPending: false,
    },
  };
};

export const updateWarehouseAcceptReturnsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseAddressRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const updateWarehouseAddressSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data,
      isPending: false,
    },
  };
};

export const updateWarehouseAddressFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseTypeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const updateWarehouseTypeSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data,
      isPending: false,
    },
  };
};

export const updateWarehouseTypeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseDomainTypesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const updateWarehouseDomainTypesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data,
      isPending: false,
    },
  };
};

export const updateWarehouseDomainTypesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseMainStoreRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const updateWarehouseMainStoreSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data,
      isPending: false,
    },
  };
};

export const updateWarehouseMainStoreFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseManpowerRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const updateWarehouseManpowerSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data,
      isPending: false,
    },
  };
};

export const updateWarehouseManpowerFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const unassignFranchiseRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const unassignFranchiseSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data,
      isPending: false,
    },
  };
};

export const unassignFranchiseFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const assignFranchiseRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const assignFranchiseSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data,
      isPending: false,
    },
  };
};

export const assignFranchiseFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseBusinessDecisionsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const updateWarehouseBusinessDecisionsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data,
      isPending: false,
    },
  };
};

export const updateWarehouseBusinessDecisionsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseConfigRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const updateWarehouseConfigSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data,
      isPending: false,
    },
  };
};

export const updateWarehouseConfigFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const archiveWarehouseRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const archiveWarehouseSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data,
      isPending: false,
    },
  };
};

export const archiveWarehouseFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const deactivateWarehouseRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const deactivateWarehouseSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data,
      isPending: false,
    },
  };
};

export const deactivateWarehouseFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const activateWarehouseRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const activateWarehouseSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data,
      isPending: false,
    },
  };
};

export const activateWarehouseFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseStatusRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const updateWarehouseStatusSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data,
      isPending: false,
    },
  };
};

export const updateWarehouseStatusFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const deleteTransferGroupOfWarehouseRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseTransferGroup: {
      ...state.warehouseTransferGroup,
      isPending: true,
    },
  };
};

export const deleteTransferGroupOfWarehouseSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseTransferGroup: {
      ...state.warehouseTransferGroup,
      data: {},
      isPending: false,
    },
  };
};

export const deleteTransferGroupOfWarehouseFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseTransferGroup: {
      ...state.warehouseTransferGroup,
      isPending: false,
      error,
    },
  };
};

export const updateTransferGroupOfWarehouseRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseTransferGroup: {
      ...state.warehouseTransferGroup,
      isPending: true,
    },
  };
};

export const updateTransferGroupOfWarehouseSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouseTransferGroup: {
      ...state.warehouseTransferGroup,
      data,
      isPending: false,
    },
  };
};

export const updateTransferGroupOfWarehouseFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseTransferGroup: {
      ...state.warehouseTransferGroup,
      isPending: false,
      error,
    },
  };
};

export const updateBaseWorkingHoursTypeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseWorkingHours: {
      ...state.warehouseWorkingHours,
      isPending: true,
    },
  };
};

export const updateBaseWorkingHoursTypeSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouseWorkingHours: {
      ...state.warehouseWorkingHours,
      data,
      isPending: false,
    },
  };
};

export const updateBaseWorkingHoursTypeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseWorkingHours: {
      ...state.warehouseWorkingHours,
      isPending: false,
      error,
    },
  };
};

export const updateWorkingHoursMessageRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseWorkingHours: {
      ...state.warehouseWorkingHours,
      isPending: true,
    },
  };
};

export const updateWorkingHoursMessageSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseWorkingHours: {
      ...state.warehouseWorkingHours,
      isPending: false,
    },
  };
};

export const updateWorkingHoursMessageFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseWorkingHours: {
      ...state.warehouseWorkingHours,
      isPending: false,
      error,
    },
  };
};

export const updateBasePeakHoursTypeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehousePeakHours: {
      ...state.warehousePeakHours,
      isPending: true,
    },
  };
};

export const updateBasePeakHoursTypeSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehousePeakHours: {
      ...state.warehousePeakHours,
      data,
      isPending: false,
    },
  };
};

export const updateBasePeakHoursTypeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehousePeakHours: {
      ...state.warehousePeakHours,
      isPending: false,
      error,
    },
  };
};

export const updatePeakHoursMessageRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehousePeakHours: {
      ...state.warehousePeakHours,
      isPending: true,
    },
  };
};

export const updatePeakHoursMessageSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehousePeakHours: {
      ...state.warehousePeakHours,
      isPending: false,
    },
  };
};

export const updatePeakHoursMessageFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehousePeakHours: {
      ...state.warehousePeakHours,
      isPending: false,
      error,
    },
  };
};

export const getWarehouseLocationTemplatesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseLocationTemplates: {
      ...state.warehouseLocationTemplates,
      isPending: true,
    },
  };
};

export const getWarehouseLocationTemplatesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouseLocationTemplates: {
      ...state.warehouseLocationTemplates,
      data,
      isPending: false,
    },
  };
};

export const getWarehouseLocationTemplatesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseLocationTemplates: {
      ...state.warehouseLocationTemplates,
      isPending: false,
      error,
    },
  };
};

export const getWarehouseSectionsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: true,
    },
  };
};

export const getWarehouseSectionsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      data,
      isPending: false,
    },
  };
};

export const getWarehouseSectionsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: false,
      error,
    },
  };
};

export const createNewSectionRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: true,
    },
  };
};

export const createNewSectionSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: false,
    },
  };
};

export const createNewSectionFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: false,
      error,
    },
  };
};

export const createNewBlockRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: true,
    },
  };
};

export const createNewBlockSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: false,
    },
  };
};

export const createNewBlockFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseLocationActivateRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: true,
    },
  };
};

export const updateWarehouseLocationActivateSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: false,
    },
  };
};

export const updateWarehouseLocationActivateFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseLocationDeactivateRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: true,
    },
  };
};

export const updateWarehouseLocationDeactivateSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: false,
    },
  };
};

export const updateWarehouseLocationDeactivateFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseLocationAllowedForTransferRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: true,
    },
  };
};

export const updateWarehouseLocationAllowedForTransferSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: false,
    },
  };
};

export const updateWarehouseLocationAllowedForTransferFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseLocationArchiveRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: true,
    },
  };
};

export const updateWarehouseLocationArchiveSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: false,
    },
  };
};

export const updateWarehouseLocationArchiveFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: false,
      error,
    },
  };
};

export const saveWarehouseLocationSelfCodeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: true,
    },
  };
};

export const saveWarehouseLocationSelfCodeSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: false,
    },
  };
};

export const saveWarehouseLocationSelfCodeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: false,
      error,
    },
  };
};

export const updateLocationWriteOffEnabledSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: false,
    },
  };
};

export const updateLocationWriteOffEnabledRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: true,
    },
  };
};

export const updateLocationWriteOffEnabledFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseSections: {
      ...state.warehouseSections,
      isPending: false,
      error,
    },
  };
};

export const updateAlgorithmConfigRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const updateAlgorithmConfigFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const getWarehouseSegmentsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseSegments: {
      ...state.warehouseSegments,
      isPending: true,
    },
  };
};

export const getWarehouseSegmentsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouseSegments: {
      ...state.warehouseSegments,
      data,
      isPending: false,
    },
  };
};

export const getWarehouseSegmentsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseSegments: {
      ...state.warehouseSegments,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseDeliveryFeeSegmentRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const updateWarehouseDeliveryFeeSegmentSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data,
      isPending: false,
    },
  };
};

export const updateWarehouseDeliveryFeeSegmentFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseProductPricingSegmentRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};
export const updateWarehousePromoAggressionLevelRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};
export const updateWarehousePromoAggressionLevelSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data: {
        ...state.warehouse.data,
        ...data,
      },
      isPending: false,
    },
  };
};
export const updateWarehousePromoAggressionLevelFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};
export const updateWarehouseProductPricingSegmentSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data,
      isPending: false,
    },
  };
};

export const updateWarehouseProductPricingSegmentFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const assignFranchiseAreaRequest = (state, { error }) => {
  return {
    ...state,
    assignFranchiseArea: {
      ...state.assignFranchiseArea,
      isPending: true,
      isSuccess: false,
      error,
    },
  };
};
export const assignFranchiseAreaSuccess = (state, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data: {
        ...state.warehouse.data,
        franchiseAreaId: data.franchiseAreaId,
      },
    },
    assignFranchiseArea: {
      ...state.assignFranchiseArea,
      isPending: false,
      isSuccess: true,
    },
  };
};

export const assignFranchiseAreaFailure = (state, { error }) => {
  return {
    ...state,
    assignFranchiseArea: {
      ...state.assignFranchiseArea,
      isPending: false,
      isSuccess: false,
      error,
    },
  };
};

export const getWarehousesFilterRequest = state => {
  return {
    ...state,
    filteredWarehouses: {
      ...state.filteredWarehouses,
      isPending: true,
    },
  };
};

export const getWarehousesFilterSuccess = (state, { warehouses = [], totalCount }) => {
  return {
    ...state,
    filteredWarehouses: {
      ...state.filteredWarehouses,
      data: warehouses,
      isPending: false,
      totalCount,
    },
  };
};

export const getWarehousesFilterFailure = (state, { error }) => {
  return {
    ...state,
    filteredWarehouses: {
      ...state.filteredWarehouses,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_WAREHOUSE_REQUEST]: getWarehouseRequest,
  [Types.GET_WAREHOUSE_SUCCESS]: getWarehouseSuccess,
  [Types.GET_WAREHOUSE_FAILURE]: getWarehouseFailure,
  [Types.GET_EMPLOYEES_REQUEST]: getEmployeesRequest,
  [Types.GET_EMPLOYEES_SUCCESS]: getEmployeesSuccess,
  [Types.GET_EMPLOYEES_FAILURE]: getEmployeesFailure,
  [Types.GET_SHIPMENT_FREQUENCIES_REQUEST]: getShipmentFrequenciesRequest,
  [Types.GET_SHIPMENT_FREQUENCIES_SUCCESS]: getShipmentFrequenciesSuccess,
  [Types.GET_SHIPMENT_FREQUENCIES_FAILURE]: getShipmentFrequenciesFailure,
  [Types.GET_SHIPMENT_PREPARATIONS_REQUEST]: getShipmentPreparationsRequest,
  [Types.GET_SHIPMENT_PREPARATIONS_SUCCESS]: getShipmentPreparationsSuccess,
  [Types.GET_SHIPMENT_PREPARATIONS_FAILURE]: getShipmentPreparationsFailure,
  [Types.GET_WAREHOUSE_SHIPMENT_FREQUENCIES_REQUEST]: getWarehouseShipmentFrequenciesRequest,
  [Types.GET_WAREHOUSE_SHIPMENT_FREQUENCIES_SUCCESS]: getWarehouseShipmentFrequenciesSuccess,
  [Types.GET_WAREHOUSE_SHIPMENT_FREQUENCIES_FAILURE]: getWarehouseShipmentFrequenciesFailure,
  [Types.GET_WAREHOUSE_SHIPMENT_PREPARATIONS_REQUEST]: getWarehouseShipmentPreparationsRequest,
  [Types.GET_WAREHOUSE_SHIPMENT_PREPARATIONS_SUCCESS]: getWarehouseShipmentPreparationsSuccess,
  [Types.GET_WAREHOUSE_SHIPMENT_PREPARATIONS_FAILURE]: getWarehouseShipmentPreparationsFailure,
  [Types.ADD_WAREHOUSE_SHIPMENT_FREQUENCY_REQUEST]: addWarehouseShipmentFrequencyRequest,
  [Types.ADD_WAREHOUSE_SHIPMENT_FREQUENCY_SUCCESS]: addWarehouseShipmentFrequencySuccess,
  [Types.ADD_WAREHOUSE_SHIPMENT_FREQUENCY_FAILURE]: addWarehouseShipmentFrequencyFailure,
  [Types.ADD_WAREHOUSE_SHIPMENT_PREPARATION_REQUEST]: addWarehouseShipmentPreparationRequest,
  [Types.ADD_WAREHOUSE_SHIPMENT_PREPARATION_SUCCESS]: addWarehouseShipmentPreparationSuccess,
  [Types.ADD_WAREHOUSE_SHIPMENT_PREPARATION_FAILURE]: addWarehouseShipmentPreparationFailure,
  [Types.UPDATE_WAREHOUSE_SHIPMENT_FREQUENCY_REQUEST]: updateWarehouseShipmentFrequencyRequest,
  [Types.UPDATE_WAREHOUSE_SHIPMENT_FREQUENCY_SUCCESS]: updateWarehouseShipmentFrequencySuccess,
  [Types.UPDATE_WAREHOUSE_SHIPMENT_FREQUENCY_FAILURE]: updateWarehouseShipmentFrequencyFailure,
  [Types.UPDATE_WAREHOUSE_SHIPMENT_PREPARATION_REQUEST]: updateWarehouseShipmentPreparationRequest,
  [Types.UPDATE_WAREHOUSE_SHIPMENT_PREPARATION_SUCCESS]: updateWarehouseShipmentPreparationSuccess,
  [Types.UPDATE_WAREHOUSE_SHIPMENT_PREPARATION_FAILURE]: updateWarehouseShipmentPreparationFailure,
  [Types.GET_WAREHOUSE_TRANSFER_GROUP_REQUEST]: getWarehouseTransferGroupRequest,
  [Types.GET_WAREHOUSE_TRANSFER_GROUP_SUCCESS]: getWarehouseTransferGroupSuccess,
  [Types.GET_WAREHOUSE_TRANSFER_GROUP_FAILURE]: getWarehouseTransferGroupFailure,
  [Types.UPDATE_WAREHOUSE_INFO_REQUEST]: updateWarehouseInfoRequest,
  [Types.UPDATE_WAREHOUSE_INFO_SUCCESS]: updateWarehouseInfoSuccess,
  [Types.UPDATE_WAREHOUSE_INFO_FAILURE]: updateWarehouseInfoFailure,
  [Types.UPDATE_WAREHOUSE_BUDGET_INFO_REQUEST]: updateWarehouseBudgetInfoRequest,
  [Types.UPDATE_WAREHOUSE_BUDGET_INFO_SUCCESS]: updateWarehouseBudgetInfoSuccess,
  [Types.UPDATE_WAREHOUSE_BUDGET_INFO_FAILURE]: updateWarehouseBudgetInfoFailure,
  [Types.UPDATE_TRANSFER_RECEIVING_REQUEST]: updateTransferReceivingRequest,
  [Types.UPDATE_TRANSFER_RECEIVING_SUCCESS]: updateTransferReceivingSuccess,
  [Types.UPDATE_TRANSFER_RECEIVING_FAILURE]: updateTransferReceivingFailure,
  [Types.UPDATE_WAREHOUSE_TEST_STATUS_REQUEST]: updateWarehouseTestStatusRequest,
  [Types.UPDATE_WAREHOUSE_TEST_STATUS_SUCCESS]: updateWarehouseTestStatusSuccess,
  [Types.UPDATE_WAREHOUSE_TEST_STATUS_FAILURE]: updateWarehouseTestStatusFailure,
  [Types.UPDATE_WAREHOUSE_ACCEPT_RETURNS_REQUEST]: updateWarehouseAcceptReturnsRequest,
  [Types.UPDATE_WAREHOUSE_ACCEPT_RETURNS_SUCCESS]: updateWarehouseAcceptReturnsSuccess,
  [Types.UPDATE_WAREHOUSE_ACCEPT_RETURNS_FAILURE]: updateWarehouseAcceptReturnsFailure,
  [Types.UPDATE_WAREHOUSE_ADDRESS_REQUEST]: updateWarehouseAddressRequest,
  [Types.UPDATE_WAREHOUSE_ADDRESS_SUCCESS]: updateWarehouseAddressSuccess,
  [Types.UPDATE_WAREHOUSE_ADDRESS_FAILURE]: updateWarehouseAddressFailure,
  [Types.UPDATE_WAREHOUSE_TYPE_REQUEST]: updateWarehouseTypeRequest,
  [Types.UPDATE_WAREHOUSE_TYPE_SUCCESS]: updateWarehouseTypeSuccess,
  [Types.UPDATE_WAREHOUSE_TYPE_FAILURE]: updateWarehouseTypeFailure,
  [Types.UPDATE_WAREHOUSE_DOMAIN_TYPES_REQUEST]: updateWarehouseDomainTypesRequest,
  [Types.UPDATE_WAREHOUSE_DOMAIN_TYPES_SUCCESS]: updateWarehouseDomainTypesSuccess,
  [Types.UPDATE_WAREHOUSE_DOMAIN_TYPES_FAILURE]: updateWarehouseDomainTypesFailure,
  [Types.UPDATE_WAREHOUSE_MAIN_STORE_REQUEST]: updateWarehouseMainStoreRequest,
  [Types.UPDATE_WAREHOUSE_MAIN_STORE_SUCCESS]: updateWarehouseMainStoreSuccess,
  [Types.UPDATE_WAREHOUSE_MAIN_STORE_FAILURE]: updateWarehouseMainStoreFailure,
  [Types.UPDATE_WAREHOUSE_MANPOWER_REQUEST]: updateWarehouseManpowerRequest,
  [Types.UPDATE_WAREHOUSE_MANPOWER_SUCCESS]: updateWarehouseManpowerSuccess,
  [Types.UPDATE_WAREHOUSE_MANPOWER_FAILURE]: updateWarehouseManpowerFailure,
  [Types.UNASSIGN_FRANCHISE_REQUEST]: unassignFranchiseRequest,
  [Types.UNASSIGN_FRANCHISE_SUCCESS]: unassignFranchiseSuccess,
  [Types.UNASSIGN_FRANCHISE_FAILURE]: unassignFranchiseFailure,
  [Types.ASSIGN_FRANCHISE_REQUEST]: assignFranchiseRequest,
  [Types.ASSIGN_FRANCHISE_SUCCESS]: assignFranchiseSuccess,
  [Types.ASSIGN_FRANCHISE_FAILURE]: assignFranchiseFailure,
  [Types.UPDATE_WAREHOUSE_BUSINESS_DECISIONS_REQUEST]: updateWarehouseBusinessDecisionsRequest,
  [Types.UPDATE_WAREHOUSE_BUSINESS_DECISIONS_SUCCESS]: updateWarehouseBusinessDecisionsSuccess,
  [Types.UPDATE_WAREHOUSE_BUSINESS_DECISIONS_FAILURE]: updateWarehouseBusinessDecisionsFailure,
  [Types.UPDATE_WAREHOUSE_CONFIG_REQUEST]: updateWarehouseConfigRequest,
  [Types.UPDATE_WAREHOUSE_CONFIG_SUCCESS]: updateWarehouseConfigSuccess,
  [Types.UPDATE_WAREHOUSE_CONFIG_FAILURE]: updateWarehouseConfigFailure,
  [Types.ARCHIVE_WAREHOUSE_REQUEST]: archiveWarehouseRequest,
  [Types.ARCHIVE_WAREHOUSE_SUCCESS]: archiveWarehouseSuccess,
  [Types.ARCHIVE_WAREHOUSE_FAILURE]: archiveWarehouseFailure,
  [Types.DEACTIVATE_WAREHOUSE_REQUEST]: deactivateWarehouseRequest,
  [Types.DEACTIVATE_WAREHOUSE_SUCCESS]: deactivateWarehouseSuccess,
  [Types.DEACTIVATE_WAREHOUSE_FAILURE]: deactivateWarehouseFailure,
  [Types.ACTIVATE_WAREHOUSE_REQUEST]: activateWarehouseRequest,
  [Types.ACTIVATE_WAREHOUSE_SUCCESS]: activateWarehouseSuccess,
  [Types.ACTIVATE_WAREHOUSE_FAILURE]: activateWarehouseFailure,
  [Types.UPDATE_WAREHOUSE_STATUS_REQUEST]: updateWarehouseStatusRequest,
  [Types.UPDATE_WAREHOUSE_STATUS_SUCCESS]: updateWarehouseStatusSuccess,
  [Types.UPDATE_WAREHOUSE_STATUS_FAILURE]: updateWarehouseStatusFailure,
  [Types.DELETE_TRANSFER_GROUP_OF_WAREHOUSE_REQUEST]: deleteTransferGroupOfWarehouseRequest,
  [Types.DELETE_TRANSFER_GROUP_OF_WAREHOUSE_SUCCESS]: deleteTransferGroupOfWarehouseSuccess,
  [Types.DELETE_TRANSFER_GROUP_OF_WAREHOUSE_FAILURE]: deleteTransferGroupOfWarehouseFailure,
  [Types.UPDATE_TRANSFER_GROUP_OF_WAREHOUSE_REQUEST]: updateTransferGroupOfWarehouseRequest,
  [Types.UPDATE_TRANSFER_GROUP_OF_WAREHOUSE_SUCCESS]: updateTransferGroupOfWarehouseSuccess,
  [Types.UPDATE_TRANSFER_GROUP_OF_WAREHOUSE_FAILURE]: updateTransferGroupOfWarehouseFailure,
  [Types.GET_WAREHOUSE_WORKING_HOURS_REQUEST]: getWarehouseWorkingHoursRequest,
  [Types.GET_WAREHOUSE_WORKING_HOURS_SUCCESS]: getWarehouseWorkingHoursSuccess,
  [Types.GET_WAREHOUSE_WORKING_HOURS_FAILURE]: getWarehouseWorkingHoursFailure,
  [Types.GET_WAREHOUSE_PEAK_HOURS_REQUEST]: getWarehousePeakHoursRequest,
  [Types.GET_WAREHOUSE_PEAK_HOURS_SUCCESS]: getWarehousePeakHoursSuccess,
  [Types.GET_WAREHOUSE_PEAK_HOURS_FAILURE]: getWarehousePeakHoursFailure,
  [Types.UPDATE_BASE_WORKING_HOURS_TYPE_REQUEST]: updateBaseWorkingHoursTypeRequest,
  [Types.UPDATE_BASE_WORKING_HOURS_TYPE_SUCCESS]: updateBaseWorkingHoursTypeSuccess,
  [Types.UPDATE_BASE_WORKING_HOURS_TYPE_FAILURE]: updateBaseWorkingHoursTypeFailure,
  [Types.UPDATE_BASE_PEAK_HOURS_TYPE_REQUEST]: updateBasePeakHoursTypeRequest,
  [Types.UPDATE_BASE_PEAK_HOURS_TYPE_SUCCESS]: updateBasePeakHoursTypeSuccess,
  [Types.UPDATE_BASE_PEAK_HOURS_TYPE_FAILURE]: updateBasePeakHoursTypeFailure,
  [Types.UPDATE_PEAK_HOURS_MESSAGE_REQUEST]: updatePeakHoursMessageRequest,
  [Types.UPDATE_PEAK_HOURS_MESSAGE_SUCCESS]: updatePeakHoursMessageSuccess,
  [Types.UPDATE_PEAK_HOURS_MESSAGE_FAILURE]: updatePeakHoursMessageFailure,
  [Types.UPDATE_WORKING_HOURS_MESSAGE_REQUEST]: updateWorkingHoursMessageRequest,
  [Types.UPDATE_WORKING_HOURS_MESSAGE_SUCCESS]: updateWorkingHoursMessageSuccess,
  [Types.UPDATE_WORKING_HOURS_MESSAGE_FAILURE]: updateWorkingHoursMessageFailure,
  [Types.GET_WAREHOUSE_LOCATION_TEMPLATES_REQUEST]: getWarehouseLocationTemplatesRequest,
  [Types.GET_WAREHOUSE_LOCATION_TEMPLATES_SUCCESS]: getWarehouseLocationTemplatesSuccess,
  [Types.GET_WAREHOUSE_LOCATION_TEMPLATES_FAILURE]: getWarehouseLocationTemplatesFailure,
  [Types.GET_WAREHOUSE_SECTIONS_REQUEST]: getWarehouseSectionsRequest,
  [Types.GET_WAREHOUSE_SECTIONS_SUCCESS]: getWarehouseSectionsSuccess,
  [Types.GET_WAREHOUSE_SECTIONS_FAILURE]: getWarehouseSectionsFailure,
  [Types.CREATE_NEW_SECTION_REQUEST]: createNewSectionRequest,
  [Types.CREATE_NEW_SECTION_SUCCESS]: createNewSectionSuccess,
  [Types.CREATE_NEW_SECTION_FAILURE]: createNewSectionFailure,
  [Types.CREATE_NEW_BLOCK_REQUEST]: createNewBlockRequest,
  [Types.CREATE_NEW_BLOCK_SUCCESS]: createNewBlockSuccess,
  [Types.CREATE_NEW_BLOCK_FAILURE]: createNewBlockFailure,
  [Types.UPDATE_WAREHOUSE_LOCATION_ACTIVATE_REQUEST]: updateWarehouseLocationActivateRequest,
  [Types.UPDATE_WAREHOUSE_LOCATION_ACTIVATE_SUCCESS]: updateWarehouseLocationActivateSuccess,
  [Types.UPDATE_WAREHOUSE_LOCATION_ACTIVATE_FAILURE]: updateWarehouseLocationActivateFailure,
  [Types.UPDATE_WAREHOUSE_LOCATION_DEACTIVATE_REQUEST]: updateWarehouseLocationDeactivateRequest,
  [Types.UPDATE_WAREHOUSE_LOCATION_DEACTIVATE_SUCCESS]: updateWarehouseLocationDeactivateSuccess,
  [Types.UPDATE_WAREHOUSE_LOCATION_DEACTIVATE_FAILURE]: updateWarehouseLocationDeactivateFailure,
  [Types.UPDATE_WAREHOUSE_LOCATION_ALLOWED_FOR_TRANSFER_REQUEST]: updateWarehouseLocationAllowedForTransferRequest,
  [Types.UPDATE_WAREHOUSE_LOCATION_ALLOWED_FOR_TRANSFER_SUCCESS]: updateWarehouseLocationAllowedForTransferSuccess,
  [Types.UPDATE_WAREHOUSE_LOCATION_ALLOWED_FOR_TRANSFER_FAILURE]: updateWarehouseLocationAllowedForTransferFailure,
  [Types.UPDATE_WAREHOUSE_LOCATION_ARCHIVE_REQUEST]: updateWarehouseLocationArchiveRequest,
  [Types.UPDATE_WAREHOUSE_LOCATION_ARCHIVE_SUCCESS]: updateWarehouseLocationArchiveSuccess,
  [Types.UPDATE_WAREHOUSE_LOCATION_ARCHIVE_FAILURE]: updateWarehouseLocationArchiveFailure,
  [Types.SAVE_WAREHOUSE_LOCATION_SELF_CODE_REQUEST]: saveWarehouseLocationSelfCodeRequest,
  [Types.SAVE_WAREHOUSE_LOCATION_SELF_CODE_SUCCESS]: saveWarehouseLocationSelfCodeSuccess,
  [Types.SAVE_WAREHOUSE_LOCATION_SELF_CODE_FAILURE]: saveWarehouseLocationSelfCodeFailure,
  [Types.SAVE_WAREHOUSE_LOCATION_SELF_CODE_REQUEST]: updateLocationWriteOffEnabledRequest,
  [Types.SAVE_WAREHOUSE_LOCATION_SELF_CODE_SUCCESS]: updateLocationWriteOffEnabledSuccess,
  [Types.SAVE_WAREHOUSE_LOCATION_SELF_CODE_FAILURE]: updateLocationWriteOffEnabledFailure,
  [Types.UPDATE_ALGORITHM_CONFIG_REQUEST]: updateAlgorithmConfigRequest,
  [Types.UPDATE_ALGORITHM_CONFIG_FAILURE]: updateAlgorithmConfigFailure,
  [Types.GET_WAREHOUSE_SEGMENTS_REQUEST]: getWarehouseSegmentsRequest,
  [Types.GET_WAREHOUSE_SEGMENTS_SUCCESS]: getWarehouseSegmentsSuccess,
  [Types.GET_WAREHOUSE_SEGMENTS_FAILURE]: getWarehouseSegmentsFailure,
  [Types.UPDATE_WAREHOUSE_DELIVERY_FEE_SEGMENT_REQUEST]: updateWarehouseDeliveryFeeSegmentRequest,
  [Types.UPDATE_WAREHOUSE_DELIVERY_FEE_SEGMENT_SUCCESS]: updateWarehouseDeliveryFeeSegmentSuccess,
  [Types.UPDATE_WAREHOUSE_DELIVERY_FEE_SEGMENT_FAILURE]: updateWarehouseDeliveryFeeSegmentFailure,
  [Types.UPDATE_WAREHOUSE_PRODUCT_PRICING_SEGMENT_REQUEST]: updateWarehouseProductPricingSegmentRequest,
  [Types.UPDATE_WAREHOUSE_PRODUCT_PRICING_SEGMENT_SUCCESS]: updateWarehouseProductPricingSegmentSuccess,
  [Types.UPDATE_WAREHOUSE_PRODUCT_PRICING_SEGMENT_FAILURE]: updateWarehouseProductPricingSegmentFailure,
  [Types.UPDATE_WAREHOUSE_PROMO_AGGRESSION_LEVEL_REQUEST]: updateWarehousePromoAggressionLevelRequest,
  [Types.UPDATE_WAREHOUSE_PROMO_AGGRESSION_LEVEL_SUCCESS]: updateWarehousePromoAggressionLevelSuccess,
  [Types.UPDATE_WAREHOUSE_PROMO_AGGRESSION_LEVEL_FAILURE]: updateWarehousePromoAggressionLevelFailure,
  [Types.ASSIGN_FRANCHISE_AREA_REQUEST]: assignFranchiseAreaRequest,
  [Types.ASSIGN_FRANCHISE_AREA_SUCCESS]: assignFranchiseAreaSuccess,
  [Types.ASSIGN_FRANCHISE_AREA_FAILURE]: assignFranchiseAreaFailure,
  [Types.GET_WAREHOUSES_FILTER_REQUEST]: getWarehousesFilterRequest,
  [Types.GET_WAREHOUSES_FILTER_SUCCESS]: getWarehousesFilterSuccess,
  [Types.GET_WAREHOUSES_FILTER_FAILURE]: getWarehousesFilterFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
