import { CancelTokenSource } from 'axios';

import { ILocation } from '@app/pages/Employee/types';
import axios from '@shared/axios/common';

export const getEmployeesPure = ({ employeeIds }: { employeeIds: MongoIDType[] }): Promise<{ employees: EmployeeType[] }> => {
  return axios({
    method: 'POST',
    url: '/employee/getEmployeesPure',
    data: { employeeIds },
  }).then(response => {
    return response.data;
  });
};

export const getDepartmentsPure = ({
  cancelSource,
  departmentIds,
  level,
  isActive,
  fields,
  levels,
}: {
  cancelSource?: CancelTokenSource,
  departmentIds?: MongoIDType[],
  level?: number,
  isActive?: boolean,
  fields?: string,
  levels?: string[],
}): Promise<{ departments: DepartmentType[] }> => {
  return axios({
    method: 'POST',
    url: '/employee/getDepartmentsPure',
    data: { departmentIds, level, isActive, fields, levels },
    ...(cancelSource ? { cancelToken: cancelSource.token } : undefined),
  }).then(response => {
    return response.data;
  });
};

/**
 *
 * @param {} body.workEmail - if this is an empty array, it returns all employees
 *
 */
export const getEmployeesFilter = (body: {
  workEmail?: string[],
  employeeIds?: MongoIDType[],
  departmentIds?: MongoIDType[],
  jobFamilyIds?: MongoIDType[],
  employmentStatuses?: number[],
  businessCountryCode?: string
}): Promise<{ employees: EmployeeType[] }> => {
  return axios({
    method: 'POST',
    url: '/employee/getEmployeesPure',
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};

// TODO yeni departmana gore duzenle
export const getQualityDepartmentEmployees = () => {
  return axios({
    method: 'POST',
    url: '/employee/getQualityDepartmentEmployees',
  })
    .then(response => {
      return response.data;
    });
};

export const getEmployeesForSelectComponent = ({ cancelSource, ...data }) => {
  return axios({
    method: 'POST',
    url: '/employee/getEmployeesForSelectComponent',
    data,
    cancelToken: cancelSource.token,
  })
    .then(response => {
      return response.data;
    });
};

export const getBusinessUnitsForSelectComponent = ({ cancelSource, ...rest }: { cancelSource: CancelTokenSource }) => {
  return axios({
    method: 'POST',
    url: '/employee/getBusinessUnitsForSelectComponent',
    data: rest,
    cancelToken: cancelSource.token,
  }).then(response => {
    return response.data;
  });
};

export const getCompaniesForSelectComponent = ({ cancelSource, ...rest }: { cancelSource: CancelTokenSource }) => {
  return axios({
    method: 'POST',
    url: '/employee/getCompaniesForSelectComponent',
    data: rest,
    cancelToken: cancelSource.token,
  }).then(response => {
    return response.data;
  });
};

export const getLocationsForSelectComponent = ({ cancelSource, ...rest }: { cancelSource: CancelTokenSource }) => {
  return axios({
    method: 'POST',
    url: '/employee/getLocationsForSelectComponent',
    data: rest,
    cancelToken: cancelSource.token,
  }).then(response => {
    return response.data as ILocation;
  });
};

export const getJobFamiliesForSelectComponent = ({ cancelSource, ...rest }) => {
  return axios({
    method: 'POST',
    url: '/employee/getJobFamiliesForSelectComponent',
    data: rest,
    cancelToken: cancelSource.token,
  }).then(response => {
    return response.data;
  });
};

export const createNewEmployee = async ({ cancelSource, employee }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/employee/createEmployee',
    data: employee,
    cancelToken: cancelSource.token,
  });
  return data;
};

export const getManagerOfEmployee = async ({ cancelSource, employeeId, fields }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/getManagerOfEmployee',
    data: {
      employeeId,
      fields,
    },
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const getEmployeeOfCurrentUser = async ({ cancelSource }) => {
  const { data: responseData } = await axios({
    method: 'GET',
    url: '/employee/getEmployeeOfCurrentUser',
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const createAsset = ({ body: data }) => {
  return axios({
    method: 'POST',
    url: '/employee/createAsset',
    data,
  }).then(response => {
    return response.data;
  });
};

export const updateEmployeeAsset = ({ body: data, assetId }) => {
  return axios({
    method: 'POST',
    url: `/employee/updateEmployeeAssetDetails/${assetId}`,
    data,
  }).then(response => {
    return response.data;
  });
};

export const assetDetails = ({ assetId }) => {
  return axios({
    method: 'GET',
    url: `/employee/getEmployeeAssetDetail/${assetId}`,
  }).then(response => {
    return response.data;
  });
};

export const getDeviceTypeStatistics = ({ filters: data }) => {
  return axios({
    method: 'POST',
    url: '/employee/getAssetDeviceTypeStatistics',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getDeviceStatusStatistics = ({ filters: data }) => {
  return axios({
    method: 'POST',
    url: '/employee/getAssetDeviceStatusStatistics',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getAssignmentStatusStatistics = ({ filters: data }) => {
  return axios({
    method: 'POST',
    url: '/employee/getAssetAssignmentStatusStatistics',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getRentalStatistics = ({ filters: data }) => {
  return axios({
    method: 'POST',
    url: '/employee/getAssetRentalStatistics',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getMDMStatistics = ({ filters: data }) => {
  return axios({
    method: 'POST',
    url: '/employee/getAssetMDMStatistics',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getBrandsStatistics = ({ filters: data }) => {
  return axios({
    method: 'POST',
    url: '/employee/getAssetBrandsStatistics',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getAssetOwnersStatistics = async ({ filters: data }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/getAssetOwnersStatistics',
    data,
  });
  return responseData;
};

export const assetHistory = ({ filters: { assetId, nextPageCursor, limit, previousPageCursor } }) => {
  return axios({
    method: 'POST',
    url: `/employee/getEmployeeAssetHistory/${assetId}`,
    data: { nextPageCursor, limit, previousPageCursor },
  }).then(response => {
    return response.data;
  });
};

export const returnEmployeeAsset = ({ employeeId, assetId, assignmentId, returnDate, returnNote, returnDeviceStatus, cancelSource }) => {
  return axios({
    method: 'POST',
    url: `/employee/returnAsset/${assetId}`,
    data: { employeeId, assignmentId, returnDate, returnNote, returnDeviceStatus },
    cancelToken: cancelSource.token,
  }).then(response => {
    return response.data;
  });
};

export const getAssetRepairHistory = ({ assetId }) => {
  return axios({
    method: 'GET',
    url: `/employee/getEmployeeAssetRepairHistory/${assetId}`,
  }).then(response => {
    return response.data;
  });
};

export const getAssetChangeEventInfo = ({ assetId, langKey }) => {
  return axios({
    method: 'GET',
    url: `/employee/getAssetChangeEventsInfo/${assetId}?langKey=${langKey}`,
  }).then(response => {
    return response.data;
  });
};

export const createAssetRepairHistory = ({
  body: {
    assetId,
    repairDate,
    repairCost,
    currencyType,
    repairInvoiceNumber,
    repairNotes,
  },
}) => {
  return axios({
    method: 'POST',
    url: `/employee/createEmployeeAssetRepairHistory/${assetId}`,
    data: {
      repairDate,
      repairCost,
      currencyType,
      repairInvoiceNumber,
      repairNotes,
    },
  }).then(response => {
    return response.data;
  });
};

export const updateAssetRepairHistory = ({
  body: {
    id,
    repairDate,
    repairCost,
    currencyType,
    repairInvoiceNumber,
    repairNotes,
  },
}) => {
  return axios({
    method: 'POST',
    url: '/employee/updateEmployeeAssetRepairHistory',
    data: {
      id,
      repairDate,
      repairCost,
      currencyType,
      repairInvoiceNumber,
      repairNotes,
    },
  }).then(response => {
    return response.data;
  });
};

export const assignEmployeeAsset = ({ cancelSource, ...data }) => {
  return axios({
    method: 'POST',
    url: '/employee/assignAsset',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getFilteredActiveEmployees = ({ cancelSource, ...data }) => axios({
  method: 'POST',
  url: '/employee/getFilteredActiveEmployees',
  data,
  cancelToken: cancelSource.token,
}).then(response => {
  return response.data;
});

export const getFilteredNoNActiveEmployees = ({ cancelSource, ...data }) => axios({
  method: 'POST',
  url: '/employee/getFilteredNoNActiveEmployees',
  data,
  cancelToken: cancelSource.token,
}).then(response => {
  return response.data;
});

interface ICheckWorkEmailUsedBefore {
  cancelSource: CancelTokenSource;
  email: string;
}
export const checkWorkEmailUsedBefore = async ({
  cancelSource,
  email,
}: ICheckWorkEmailUsedBefore): Promise<{ isUsed: boolean } | Error> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/checkWorkEmailUsedBefore',
    data: { email },
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const updatePersonalInfoOfEmployee = async ({ ...params }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/updateEmployeePersonalInfo',
    data: { ...params },
  });
  return responseData;
};

export const updateContactInfoOfEmployee = async ({ ...params }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/updateEmployeeContactInfo',
    data: { ...params },
  });
  return responseData;
};

export const updateEmployeeInfoOfEmployee = async ({ ...params }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/updateEmployeeEmployeeInfo',
    data: { ...params },
  });
  return responseData;
};

export const updateOrganizationInfoOfEmployee = async ({ ...params }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/updateEmployeeOrganizationInfo',
    data: { ...params },
  });
  return responseData;
};

export const updateCompanyInfoOfEmployee = async ({ ...params }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/updateEmployeeCompanyInfo',
    data: { ...params },
  });
  return responseData;
};

export const addEducationInfoToEmployee = async ({ ...params }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/addEducationInfoToEmployee',
    data: { ...params },
  });
  return responseData;
};

export const removeEducationInfoToEmployee = async ({ ...params }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/removeEducationInfo',
    data: { ...params },
  });
  return responseData;
};

export const updateEducationInfo = async ({ ...params }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/updateEducationInfo',
    data: { ...params },
  });
  return responseData;
};

export const filterEmployeeEducations = async ({ ...params }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/filterEmployeeEducations',
    data: { ...params },
  });
  return responseData;
};

export const getEmployeeSurveyHistory = async ({ ...params }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/getEmployeeSurveyHistory',
    data: { ...params },
  });
  return responseData;
};

export const addSurveyInfoToEmployee = async ({ ...params }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/addSurveyInfoToEmployee',
    data: { ...params },
  });
  return responseData;
};

export const updateSurveyInfo = async ({ ...params }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/updateSurveyInfo',
    data: { ...params },
  });
  return responseData;
};

export const getOrganizationalInfoLatestChangeLogsByEmployee = async ({ ...params }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/getOrganizationalInfoLatestChangeLogsByEmployee',
    data: { ...params },
  });
  return responseData;
};

export const getSignedURLForPicURLUpdate = async ({ ...params }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/getSignedURLForPicURLUpdate',
    data: { ...params },
  });
  return responseData;
};

export const terminateEmployee = async ({ ...params }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/terminateJobAnEmployee',
    data: { ...params },
  });
  return responseData;
};

export const rehireEmployee = async ({ ...params }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/rehireEmployee',
    data: { ...params },
  });
  return responseData;
};

export const getEmployeesExcelDownload = async ({ cancelSource }: { cancelSource: CancelTokenSource }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/getEmployeesExcelDownloadLink',
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const getFormerEmployeesExcelDownload = async ({ cancelSource }: { cancelSource: CancelTokenSource }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/getFormerEmployeesExcelDownloadLink',
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const getEmployeesLimitedExcelDownload = async ({ cancelSource }: { cancelSource: CancelTokenSource }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/getEmployeesLimitedExcelDownloadLink',
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const getFormerEmployeesLimitedExcelDownload = async ({ cancelSource }: { cancelSource: CancelTokenSource }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/getFormerEmployeesLimitedExcelDownloadLink',
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const getEmployeesEducationsExcelDownload = async ({ cancelSource }: { cancelSource: CancelTokenSource }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/getEmployeesEducationsExcelDownloadLink',
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const getFormerEmployeesEducationsExcelDownload = async ({ cancelSource }: { cancelSource: CancelTokenSource }): Promise<void> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/getFormerEmployeesEducationsExcelDownloadLink',
    cancelToken: cancelSource.token,
  });
  return responseData;
};

interface ICheckUniqueIdentifierUsedBefore {
  cancelSource: CancelTokenSource;
  uniqueIdentifier: string;
}
export const checkUniqueIdentifierUsedBefore = async ({
  cancelSource,
  uniqueIdentifier,
}: ICheckUniqueIdentifierUsedBefore): Promise<{ isUsed: boolean } | Error> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/checkUniqueIdentifierUsedBefore',
    data: { uniqueIdentifier },
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const getEmployeeAssetList = ({ cancelSource, ...data }) => {
  return axios({
    method: 'POST',
    url: '/employee/getEmployeeAssetList',
    data,
    cancelToken: cancelSource.token,
  }).then(response => {
    return response.data;
  });
};
export const getEmployeeAssetListExcelDownloadLink = ({ cancelSource, ...data }) => {
  return axios({
    method: 'POST',
    url: '/employee/getEmployeeAssetListExcelDownloadLink',
    data,
    cancelToken: cancelSource.token,
  }).then(response => {
    return response.data;
  });
};
export const getCurrentEmployeeAssetReportDownloadLink = async ({ cancelSource, ...data }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/getCurrentEmployeeAssetReportDownloadLink',
    data,
    cancelToken: cancelSource.token,
  });
  return responseData;
};
export const getFormerEmployeeAssetReportDownloadLink = async ({ cancelSource, ...data }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/getFormerEmployeeAssetReportDownloadLink',
    data,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const bulkInsertAssets = ({ cancelSource, assets }) => {
  return axios({
    method: 'POST',
    url: '/employee/bulkInsertAssets',
    data: { assets },
    cancelToken: cancelSource.token,
  }).then(response => {
    return response.data;
  });
};

export const bulkUpdateAssets = ({ cancelSource, assets }) => {
  return axios({
    method: 'POST',
    url: '/employee/bulkUpdateAssets',
    data: { assets },
    cancelToken: cancelSource.token,
  }).then(response => {
    return response.data;
  });
};

export const getEmployeeAssets = data => {
  return axios({
    method: 'POST',
    url: '/employee/getEmployeeAssets',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getEmployeeInformationForAssetPrintForm = ({ cancelSource, employeeId }) => {
  return axios({
    method: 'POST',
    url: '/employee/getEmployeeInformationForAssetPrintForm',
    cancelToken: cancelSource.token,
    data: { employeeId },
  }).then(response => {
    return response.data;
  });
};

export const getEmployeeNonPrivateInformation = ({ cancelSource, employeeId }) => {
  return axios({
    method: 'POST',
    url: '/employee/getEmployeeNonPrivateInformation',
    cancelToken: cancelSource.token,
    data: { employeeId },
  }).then(response => {
    return response.data;
  });
};

export const partialAssetsReturn = ({ cancelSource, assets, employeeId }) => {
  return axios({
    method: 'POST',
    url: '/employee/sendEmailForPartialAssetsReturn',
    cancelToken: cancelSource.token,
    data: { assets, employeeId },
  }).then(response => {
    return response.data;
  });
};

export const assignmentConfirmedByEmployee = ({ assignmentId, isConfirmed, cancelSource }) => {
  return axios({
    method: 'POST',
    url: '/employee/assignmentConfirmedByEmployee',
    cancelToken: cancelSource.token,
    data: { assignmentId, isConfirmed },
  }).then(response => {
    return response.data;
  });
};

export const returnConfirmedByEmployee = ({ assignmentId, isConfirmed, cancelSource }) => {
  return axios({
    method: 'POST',
    url: '/employee/returnConfirmedByEmployee',
    cancelToken: cancelSource.token,
    data: { assignmentId, isConfirmed },
  }).then(response => {
    return response.data;
  });
};

// WARNING: this api is only for employee detail because it allows lots of select fields
// which should only be visible in employee detail HR for personal data protection
// DO NOT USE this api if you only need a few basic information somewhere else
export const getEmployeeForEmployeeDetail = async ({ cancelSource, employeeId }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/getEmployeeForEmployeeDetail',
    data: { employeeId },
    cancelToken: cancelSource.token,
  });
  return responseData;
};

interface IUpdateEmployeeNonWorkdayFields {
  cancelSource: CancelTokenSource;
  employeeId: MongoIDType;
  updateData: {
    nonWorkdayFields: {
      annualLeaveCalculationStartDate: Date | string | null
    };
  };
}
export const updateEmployeeNonWorkdayFields = async ({ cancelSource, employeeId, updateData }: IUpdateEmployeeNonWorkdayFields): Promise<any> => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/updateEmployeeNonWorkdayFields',
    data: { employeeId, updateData },
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const triggerNotifyEmployeeTermination = async ({ cancelSource, employeeId }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: `/employee/notifyEmployeeTermination/${employeeId}`,
    cancelToken: cancelSource.token,
  });
  return responseData;
};
export const triggerEmployeeTerminateJob = async ({ cancelSource, employeeId, ...data }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: `/employee/terminateJob/${employeeId}`,
    data,
    cancelToken: cancelSource.token,
  });
  return responseData;
};
export const triggerEmployeeCancelTermination = async ({ cancelSource, employeeId }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: `/employee/terminateJob/${employeeId}/cancel`,
    cancelToken: cancelSource.token,
  });
  return responseData;
};
export const triggerEmployeeRestartJob = async ({ cancelSource, employeeId, ...data }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: `/employee/restartJob/${employeeId}`,
    data,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

/** OFFICE ATTENDANCE TRACKING START */
export const getOfficeAttendanceTrackingSingleDayStats = async ({ cancelSource, ...reqData }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/employee/officeAttendanceTracking/getSingleDayStats',
    data: reqData,
    ...(cancelSource ? { cancelToken: cancelSource.token } : undefined),
  });

  return data;
};

export const getOfficeAttendanceTrackingMultipleDayStats = async ({ cancelSource, ...reqData }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/employee/officeAttendanceTracking/getMultipleDayStats',
    data: reqData,
    ...(cancelSource ? { cancelToken: cancelSource.token } : undefined),
  });

  return data;
};

export const getFilteredOfficeAttendanceTrackingDailyStats = async ({ cancelSource, ...reqData }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/employee/officeAttendanceTracking/filterDailyStats',
    data: reqData,
    ...(cancelSource ? { cancelToken: cancelSource.token } : undefined),
  });

  return data;
};

export const getOfficeAttendanceTrackingSingleDayRecords = async ({ cancelSource, ...reqData }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/employee/officeAttendanceTracking/getSingleDayRecords',
    data: reqData,
    ...(cancelSource ? { cancelToken: cancelSource.token } : undefined),
  });

  return data;
};

export const getOfficeAttendanceTrackingMultipleDayRecords = async ({ cancelSource, ...reqData }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/employee/officeAttendanceTracking/getMultipleDayRecords',
    data: reqData,
    ...(cancelSource ? { cancelToken: cancelSource.token } : undefined),
  });

  return data;
};

export const getOfficeAttendanceTrackingEmployeeTransactionsByDateRange = async ({ cancelSource, ...reqData }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: 'employee/officeAttendanceTracking/getOfficeAttendanceTrackingEmployeeTransactionsByDateRange',
    data: reqData,
    ...(cancelSource ? { cancelToken: cancelSource.token } : undefined),
  });

  return data;
};

export const deleteScheduleAndUpdateInviteStatus = async ({ cancelSource, ...reqData }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: 'employee/officeAttendanceTracking/deleteScheduleAndUpdateInviteStatus',
    data: reqData,
    ...(cancelSource ? { cancelToken: cancelSource.token } : undefined),
  });

  return data;
};

export const getOfficeAttendanceTrackingRawEmployeeStats = async ({ localStartDay, localEndDay }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: 'employee/officeAttendanceTracking/getOfficeAttendanceTrackingRawEmployeeStats',
    data: { localStartDay, localEndDay },
  });

  return data;
};

export const getOfficeAttendanceTrackingGetStatisticDailyStatsSummary = async ({ ...reqData }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: 'employee/officeAttendanceTracking/statistic/getDailyStatsSummary',
    data: { ...reqData },
  });

  return data;
};

export const getCapacityTemplateData = async ({ reqData }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: 'employee/officeAttendanceTracking/getCapacityTemplateData',
    data: { ...reqData },
  });
  return data;
};

export const uploadCapacity = async ({ reqData }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: 'employee/officeAttendanceTracking/uploadCapacity',
    data: { ...reqData },
  });
  return data;
};

export const getTrackingEnabledOffices = async () => {
  const { data = {} } = await axios({
    method: 'GET',
    url: 'employee/officeAttendanceTracking/getTrackingEnabledOffices',
  });

  return data;
};

export const getPublicHolidays = async (): Promise<{publicHolidays: {name: string, date: Date, repeatsExactlySameDayInEveryYear: boolean}[]}> => {
  const { data = {} } = await axios({
    method: 'POST',
    url: 'employee/officeAttendanceTracking/getPublicHolidays',
  });

  return data;
};
/** OFFICE ATTENDANCE TRACKING END */

// Employee Permit Start

export const getPermitsForCalender = async ({ cancelSource, ...reqData }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/employee/permits/getPermitsForCalendar',
    data: reqData,
    ...(cancelSource ? { cancelToken: cancelSource.token } : undefined),
  });

  return data;
};

export const getFilteredPermits = async ({ cancelSource, ...reqData }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/employee/permits/getFilteredPermits',
    data: reqData,
    ...(cancelSource ? { cancelToken: cancelSource.token } : undefined),
  });

  return data;
};

export const getPermitDetailForDetailModal = async ({ cancelSource, permitId }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/employee/permits/getPermitForDetailModal',
    data: { permitId },
    ...(cancelSource ? { cancelToken: cancelSource.token } : undefined),
  });

  return data;
};

export const approvePermit = async ({ permitId }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/employee/permits/approvePermit',
    data: { permitId },
  });

  return data;
};

export const rejectPermit = async ({ permitId }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/employee/permits/rejectPermit',
    data: { permitId },
  });

  return data;
};

export const cancelPermit = async ({ permitId }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/employee/permits/cancelPermit',
    data: { permitId },
  });

  return data;
};

export const cancelRequestedPermit = async ({ permitId }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/employee/permits/cancelRequestedPermit',
    data: { permitId },
  });

  return data;
};

export const getExportedPermitsExcelDownloadURL = async ({ cancelSource, ...reqData }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/employee/permits/getExportedPermitsExcelDownloadURL',
    data: reqData,
    ...(cancelSource ? { cancelToken: cancelSource.token } : undefined),
  });

  return data;
};

export const getPermitRequestsForSupervisor = async ({ cancelSource, ...reqData }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/employee/permits/getPermitRequestsForSupervisor',
    data: reqData,
    ...(cancelSource ? { cancelToken: cancelSource.token } : undefined),
  });

  return data;
};

export const createPermit = async ({ permit, cancelSource }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/employee/permits/createPermit',
    data: { permit },
    ...(cancelSource ? { cancelToken: cancelSource.token } : undefined),
  });

  return data;
};

export const getPermitHistoryOfCurrentUsersEmployee = async ({ cancelSource, ...reqData }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/employee/permits/getPermitHistoryOfCurrentUsersEmployee',
    data: reqData,
    ...(cancelSource ? { cancelToken: cancelSource.token } : undefined),
  });

  return data;
};

export const getExportedPermitHistoryExcelDownloadURL = ({ cancelSource, employeeId, ...data }) => axios({
  method: 'POST',
  url: `/employee/permits/getExportedPermitHistoryExcelDownloadURL/${employeeId}`,
  cancelToken: cancelSource.token,
  data,
}).then(response => {
  return response.data;
});

export const getS3SignedUploadDocumentPrivateUrl = async ({ cancelSource, ...data }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/getS3SignedUploadPrivateUrl',
    data,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const getEmployeesOfManager = async ({ cancelSource, employeeId }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: `/employee/getEmployeesOfManager/${employeeId}`,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const getUsedAndVestedLeaveCountsOfCurrentUsersEmployee = async () => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/employee/permits/getUsedAndVestedLeaveCountsOfCurrentUsersEmployee',
    data: {},
  });

  return data;
};

export const getPermitInfoOfManagersTeam = async () => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/employee/permits/getManagersTeamInfo',
    data: {},
  });

  return data;
};

// Employee Permit End
