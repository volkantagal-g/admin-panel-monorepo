import { t } from '@shared/i18n';
import { currency } from '@shared/utils/common';
import { numberFormatWithoutDecimal, numberFormatWithTwoDecimal } from '@shared/utils/localization';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';

const appendCurrency = str => `${str} (${currency()})`;

export const tableColumns = () => [
  {
    title: <b>#</b>,
    key: 'index',
    width: 40,
    render: (val, row, index) => {
      return index + 1;
    },
  },
  {
    title: <b>{t('activeOrdersForExecutiveDashboardPage:PROMO_CODE')}</b>,
    dataIndex: 'promo',
    key: 'promo',
    sorter: (a, b) => {
      const nameA = a.promo.code;
      const nameB = b.promo.code;
      return nameA.localeCompare(nameB);
    },
    width: 220,
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    render: promo => (
      <label className="pl-1 pr-1 rounded" style={{ color: promo.textColor, backgroundColor: promo.bgColor, marginBottom: 0 }}>{promo.code}</label>
    ),
  },
  {
    title: <b>{t('global:PROMO_TYPE')}</b>,
    dataIndex: 'type',
    key: 'type',
    sorter: (a, b) => {
      const nameA = a.type;
      const nameB = b.type;
      return nameA.localeCompare(nameB);
    },
    width: 100,
    render: type => type,
  },
  {
    title: <b>{t('activeOrdersForExecutiveDashboardPage:WAREHOUSE_COUNT')}</b>,
    dataIndex: 'warehouseCount',
    key: 'warehouseCount',
    align: 'right',
    sorter: (a, b) => a.warehouseCount - b.warehouseCount,
    width: 80,
    render: count => numberFormatWithoutDecimal.format(count),
  },
  {
    title: <b>{appendCurrency(t('activeOrdersForExecutiveDashboardPage:TOTAL_DISCOUNT'))}</b>,
    dataIndex: 'totalDiscount',
    key: 'totalDiscount',
    align: 'right',
    sorter: (a, b) => a.totalDiscount - b.totalDiscount,
    width: 80,
    render: total => numberFormatWithTwoDecimal.format(total),
  },
  {
    title: <b>{appendCurrency(t('activeOrdersForExecutiveDashboardPage:AVG_DISCOUNT'))}</b>,
    dataIndex: 'avgDiscount',
    key: 'avgDiscount',
    align: 'right',
    sorter: (a, b) => a.avgDiscount - b.avgDiscount,
    width: 80,
    render: total => numberFormatWithTwoDecimal.format(total),
  },
  {
    title: <b>{appendCurrency(t('activeOrdersForExecutiveDashboardPage:AVG_BASKET'))}</b>,
    dataIndex: 'avgBasket',
    key: 'avgBasket',
    align: 'right',
    sorter: (a, b) => a.avgBasket - b.avgBasket,
    width: 80,
    render: total => numberFormatWithTwoDecimal.format(total),
  },
  {
    title: <b>{t('activeOrdersForExecutiveDashboardPage:ORDER_COUNT')}</b>,
    dataIndex: 'orderCount',
    key: 'orderCount',
    align: 'right',
    sorter: (a, b) => a.orderCount - b.orderCount,
    defaultSortOrder: 'descend',
    width: 65,
    render: count => numberFormatWithoutDecimal.format(count),
  },
  {
    title: <b>{t('global:ACTION')}</b>,
    dataIndex: '_id',
    key: '_id',
    width: 60,
    render: id => {
      if (id === 'ORGANIC') {
        return null;
      }
      return (
        <RedirectButtonV2
          text={t('global:DETAIL')}
          to={ROUTE.PROMO_DETAIL.path.replace(':id', id)}
          target="_blank"
          size="small"
          permKey={permKey.PAGE_PROMO_DETAIL}
        />
      );
    },
  },
];
