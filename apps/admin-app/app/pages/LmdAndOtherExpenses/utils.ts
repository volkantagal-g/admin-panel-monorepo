import { SelectProps } from 'antd';

import { TFunction } from 'react-i18next';

import { groupBy as _groupBy, isEqual, isFinite, isInteger, map as _map, uniq as _uniq } from 'lodash';

import {
  ExampleCSVData,
  EXPENSE_TYPE,
  GetirDomainTypes,
  LmdCostCSVHeaders,
  LogisticCostCSVHeaders,
  OtherCostCSVHeaders,
} from '@app/pages/LmdAndOtherExpenses/constants';

export function getExpenseTypeSelectOptions(t: TFunction<string[], undefined>): SelectProps['options'] {
  return Object.entries(EXPENSE_TYPE).map(([key, value]) => ({
    label: t(`lmdAndOtherExpensesUploadPage:EXPENSE_TYPE.${key}`),
    value,
  }));
}

export function areCSVHeadersValid(
  {
    headers,
    expenseType,
    duplicateColumnsExistAndOverwritten,
  }: {
    headers: string [],
    expenseType: EXPENSE_TYPE,
    duplicateColumnsExistAndOverwritten: boolean
  },
) {
  if (duplicateColumnsExistAndOverwritten) {
    return false;
  }

  const givenHeadersAsSorted = headers.sort();
  const csvHeaders = [];

  if (expenseType === EXPENSE_TYPE.LMD_COST) {
    csvHeaders.push(...LmdCostCSVHeaders.sort());
  }
  else if (expenseType === EXPENSE_TYPE.LOGISTIC_COST) {
    csvHeaders.push(...LogisticCostCSVHeaders.sort());
  }
  else if (expenseType === EXPENSE_TYPE.OTHER_COST) {
    csvHeaders.push(...OtherCostCSVHeaders.sort());
  }

  return isEqual(csvHeaders, givenHeadersAsSorted);
}

export function getIsMonthValid(month: number) {
  return isInteger(month) &&
    month > 0 &&
    month < 13;
}

export function getIsYearValid(year: number) {
  return isInteger(year) &&
    year > 2015 &&
    year < 2051;
}

export function getIsDomainValid({ domain, excludedDomains }: { domain: string, excludedDomains?: number[] }) {
  const domainValue = GetirDomainTypes[domain];
  return Object.keys(GetirDomainTypes).includes(domain) && !excludedDomains?.includes(domainValue);
}

export function getIsMongoIdValid(mongoId: string) {
  const mongoIdRegExp = /^[0-9a-fA-F]{24}$/;
  return mongoIdRegExp.test(mongoId);
}

export function getValidatedAndReformattedLmdCostCSVData({ data, warehouseIds }: {data: any, warehouseIds: string[]}) {
  return data.map((rowData: any, index: number) => {
    const isMonthValid = getIsMonthValid(rowData.month);
    const isYearValid = getIsYearValid(rowData.year);
    const isDomainValid = getIsDomainValid({ domain: rowData.domain, excludedDomains: [GetirDomainTypes.GetirWaterMarketPlace] });
    const isWarehouseIdValid = getIsMongoIdValid(rowData.warehouse_id) && warehouseIds?.includes(rowData.warehouse_id);
    const isLmdCostValid = isFinite(rowData.lmd_cost) && rowData.lmd_cost >= 0;

    return {
      index,
      isValid: isMonthValid && isYearValid && isDomainValid && isWarehouseIdValid && isLmdCostValid,
      data: {
        month: rowData.month,
        year: rowData.year,
        domain: GetirDomainTypes[rowData.domain],
        warehouse_id: rowData.warehouse_id,
        lmd_cost: rowData.lmd_cost,
      },
    };
  });
}

export function getValidatedAndReformattedLogisticCostCSVData({ data, warehouseIds }: {data: any, warehouseIds: string[]}) {
  return data.map((rowData: any, index: number) => {
    const isMonthValid = getIsMonthValid(rowData.month);
    const isYearValid = getIsYearValid(rowData.year);
    const isDomainValid = getIsDomainValid({ domain: rowData.domain, excludedDomains: [GetirDomainTypes.GetirWaterMarketPlace] });
    const isWarehouseIdValid = getIsMongoIdValid(rowData.warehouse_id) && warehouseIds?.includes(rowData.warehouse_id);
    const isLogisticCostValid = isFinite(rowData.logistic_cost) && rowData.logistic_cost >= 0;

    return {
      index,
      isValid: isMonthValid && isYearValid && isDomainValid && isWarehouseIdValid && isLogisticCostValid,
      data: {
        month: rowData.month,
        year: rowData.year,
        domain: GetirDomainTypes[rowData.domain],
        warehouse_id: rowData.warehouse_id,
        logistic_cost: rowData.logistic_cost,
      },
    };
  });
}

export function getValidatedAndReformattedOtherCostCSVData({ data, warehouseIds }: {data: any, warehouseIds: string[]}) {
  return data.map((rowData: any, index: number) => {
    const isMonthValid = getIsMonthValid(rowData.month);
    const isYearValid = getIsYearValid(rowData.year);
    const isDomainValid = getIsDomainValid({ domain: rowData.domain });

    const isOtherRevenueValid = isFinite(rowData.other_revenue) && rowData.other_revenue >= 0;
    const isTotalMarketingExpenseValid = isFinite(rowData.total_marketing_expense) && rowData.total_marketing_expense >= 0;
    const isMarketingCostAtlValid = isFinite(rowData.marketing_cost_atl) && rowData.marketing_cost_atl >= 0;
    const isMarketingCostDigitalValid = isFinite(rowData.marketing_cost_digital) && rowData.marketing_cost_digital >= 0;

    return {
      index,
      isValid: isMonthValid &&
        isYearValid &&
        isDomainValid &&
        isOtherRevenueValid &&
        isTotalMarketingExpenseValid &&
        isMarketingCostAtlValid &&
        isMarketingCostDigitalValid,
      data: {
        month: rowData.month,
        year: rowData.year,
        domain: GetirDomainTypes[rowData.domain],
        other_revenue: rowData.other_revenue,
        total_marketing_expense: rowData.total_marketing_expense,
        marketing_cost_atl: rowData.marketing_cost_atl,
        marketing_cost_digital: rowData.marketing_cost_digital,
      },
    };
  });
}

export function getIsDataBelongsToOnlyOneMonthAndYear({ data }: {data: any}) {
  const monthYearCombinationStrings = _map(data, item => `${item.month}-${item.year}`);
  const uniqueMonthAndYears = _uniq(monthYearCombinationStrings);

  return uniqueMonthAndYears.length === 1;
}

export function getIsRecurringDataExist({ data, warehouseCheck }: {data: any, warehouseCheck: boolean}) {
  const groupedData = _groupBy(data, item => {
    if (warehouseCheck) {
      return `${item.month}-${item.year}-${item.domain}-${item.warehouse_id}`;
    }
    return `${item.month}-${item.year}-${item.domain}`;
  });

  return Object.values(groupedData).some(groupVal => groupVal.length > 1);
}

export function getCSVUploadWarningMessages(t: TFunction<string[], undefined>) {
  return [
    t('lmdAndOtherExpensesUploadPage:WARNING_MESSAGES.LOADABLE_FILES'),
    t('lmdAndOtherExpensesUploadPage:WARNING_MESSAGES.LOADABLE_FILE_FORMAT'),
    t('lmdAndOtherExpensesUploadPage:WARNING_MESSAGES.LOAD_MONTH_RESTRICTION'),
    t('lmdAndOtherExpensesUploadPage:WARNING_MESSAGES.LOADABLE_FILE_HEADERS'),
    t('lmdAndOtherExpensesUploadPage:WARNING_MESSAGES.VALID_DOMAINS'),
    t('lmdAndOtherExpensesUploadPage:WARNING_MESSAGES.LOAD_LOGIC'),
    t('lmdAndOtherExpensesUploadPage:WARNING_MESSAGES.VALID_YEAR_AND_MONTH'),
    t('lmdAndOtherExpensesUploadPage:WARNING_MESSAGES.VALID_FINANCIAL_VALUES'),
  ];
}

export function getCSVHeadersFromUploadedData({ sampleData }: {sampleData: any}) {
  if (!sampleData) {
    return [];
  }

  return Object.keys(sampleData);
}

export function getExpenseCSVTemplate(expenseType: EXPENSE_TYPE) {
  switch (expenseType) {
    case EXPENSE_TYPE.LMD_COST:
      return {
        columns: LmdCostCSVHeaders.map((header: string) => ({ title: header, key: header })),
        data: ExampleCSVData.lmdCostExampleCSVData,
      };
    case EXPENSE_TYPE.LOGISTIC_COST:
      return {
        columns: LogisticCostCSVHeaders.map((header: string) => ({ title: header, key: header })),
        data: ExampleCSVData.logisticCostExampleCSVData,
      };
    case EXPENSE_TYPE.OTHER_COST:
      return {
        columns: OtherCostCSVHeaders.map((header: string) => ({ title: header, key: header })),
        data: ExampleCSVData.otherCostExampleCSVData,
      };
    default:
      return { columns: [], data: [] };
  }
}
