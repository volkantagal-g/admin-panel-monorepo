import { Button } from 'antd';

import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';

import { VerticalType } from './constants';
import { currencyFormat } from '@shared/utils/localization';

export const tableColumns = ({
  t,
  onExcelClick,
  isExportTableExcelPending,
  tableActionReportButtonClassName,
}) => {
  return [
    {
      title: <b>{t('TABLE.PARTNER_NAME')}</b>,
      dataIndex: 'partnerName',
      key: 'partnerName',
    },
    {
      title: <b>{t('TABLE.TOTAL_WITHHOLDING_TAX_AMOUNT')}</b>,
      dataIndex: 'totalWithholdingTaxAmount',
      key: 'totalWithholdingTaxAmount',
      render: totalWithholdingTaxAmount => currencyFormat().format(totalWithholdingTaxAmount),
    },
    {
      title: <b>{t('TABLE.ACTIONS')}</b>,
      dataIndex: 'partnerId',
      key: 'partnerId',
      align: 'center',
      width: 200,
      render: partnerId => (
        <Button
          className={tableActionReportButtonClassName}
          onClick={() => onExcelClick(partnerId)}
          loading={isExportTableExcelPending}
        >
          {t('TABLE.CREATE_REPORT')}
        </Button>
      ),
    },
  ];
};

export const VerticalToReduxKeyMap = {
  [VerticalType.Food]: REDUX_KEY.FOOD.WITHHOLDING_TAX_REPORTS,
  [VerticalType.Locals]: REDUX_KEY.LOCALS.WITHHOLDING_TAX_REPORTS,
};

export const VerticalToTranslationKeyMap = {
  [VerticalType.Food]: 'foodWithholdingTaxReports',
  [VerticalType.Locals]: 'localsWithholdingTaxReports',
};

export const VerticalToRouteMap = {
  [VerticalType.Food]: ROUTE.GETIR_FOOD_WITHHOLDING_TAX_REPORTS,
  [VerticalType.Locals]: ROUTE.GETIR_LOCALS_WITHHOLDING_TAX_REPORTS,
};

export const VerticalToNameMap = {
  [VerticalType.Food]: 'food',
  [VerticalType.Locals]: 'locals',
};
