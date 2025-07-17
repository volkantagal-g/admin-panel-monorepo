import axios from '@shared/axios/common';
import { VerticalToNameMap } from '@app/pages/GetirFood/WithholdingTaxReports/shared/config';

export const getWithholdingTaxReports = async ({ companyType, period, page, size, partnerId, vertical }) => {
  const { data } = await axios({
    method: 'GET',
    url: `/marketplaceFinance/v1/${VerticalToNameMap[vertical]}/withholding-tax-reports`,
    params: { companyType, period, page, size, partnerId },
  });
  return data;
};

export const getWithholdingTaxReportsSummary = async ({ period, vertical }) => {
  const { data } = await axios({
    method: 'GET',
    url: `/marketplaceFinance/v1/${VerticalToNameMap[vertical]}/withholding-tax-reports/summary`,
    params: { period },
  });
  return data;
};

export const getWithholdingTaxReportsSummaryExcel = async ({ period, vertical }) => {
  const { data } = await axios({
    method: 'POST',
    url: `/marketplaceFinance/v1/${VerticalToNameMap[vertical]}/withholding-tax-reports/get-report-excel/all`,
    data: { period },
  });
  return data;
};

export const getWithholdingTaxReportsExcel = async ({ partnerId, period, vertical }) => {
  const { data } = await axios({
    method: 'POST',
    url: `/marketplaceFinance/v1/${VerticalToNameMap[vertical]}/withholding-tax-reports/${partnerId}/get-report-excel`,
    data: { period },
  });

  return data;
};

export const getWithholdingTaxReportsByFilterType = async ({ fileType, filterType, period, vertical }) => {
  const { data } = await axios({
    method: 'POST',
    url: `/marketplaceFinance/v1/${VerticalToNameMap[vertical]}/withholding-tax-reports/get-report-by-filter-type`,
    data: { fileType, filterType, period },
  });
  return data;
};
