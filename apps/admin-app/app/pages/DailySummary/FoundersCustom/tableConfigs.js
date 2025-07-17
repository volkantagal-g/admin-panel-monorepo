import { getFoundersCustomOrderCountNetRevenueGMVData } from '@shared/api/dailySummary/global';

const getirMarketOrderNetRevenueGMVTableDataKeys = {
  total: 'totalStats',
  countryGroups: 'countryGroups',
  domainTypes: 'domainTypes',
  countries: 'countries',
};

export const getGetirMarketOrderNetRevenueGMVTableRowConfigs = ({ t }) => {
  const rowNames = { getirMarketTotal: t('ROW_NAMES.GETIR_MARKET') };

  return [
    {
      // name is shown in the first column
      name: rowNames.getirMarketTotal,
      endpoint: getFoundersCustomOrderCountNetRevenueGMVData,
      errorMsg: t('API_ERRORS.REQUEST_FAIL', { rowName: rowNames.getirMarketTotal }),
      dataKey: getirMarketOrderNetRevenueGMVTableDataKeys.total,
      // childRowsConfig: {
      //   // where is the children data
      //   dataKey: getirMarketOrderNetRevenueGMVTableDataKeys.countryGroups,
      //   // if rows are dynamic, produce configs from data in the dataKey above
      //   // if not dynamic, you can do:  () => [{name, dataKey, ...}]
      //   // getRowConfigs is called in genericFormatter, we pass auxiliary datas as well
      //   // like countryGroups, countries, whatever auxiallry
      //   getRowConfigs: ({ dataFromDataKey }) => (
      //   ),
      // },
    },
  ];
};
