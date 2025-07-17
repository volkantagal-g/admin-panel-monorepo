import { Tooltip } from 'antd';

import { numberFormatWithoutDecimal, numberFormatWithOneDecimal } from '@shared/utils/localization';

export const getColumns = ({ totalPrice, title, classes }, t) => {
  return [
    {
      title: '#',
      dataIndex: '',
      key: 'rowIndex',
      width: 28,
      align: 'right',
      render: (a, b, index) => {
        return (
          <div className={classes.ellipsesCell}>
            {index + 1}
          </div>
        );
      },
    },
    {
      title: <span className={classes.textBold}>{title}</span>,
      dataIndex: 'name',
      key: 'name',
      render: data => (
        <div className={classes.ellipsesCell}>
          <Tooltip title={data}>
            {data}
          </Tooltip>
        </div>
      ),
    },
    {
      title: <span className={classes.textBold}>{t('getirMarketDashboardPage:AVAILABILITY_SHORT')}</span>,
      dataIndex: 'availableSlots',
      key: 'availableSlots',
      width: 38,
      align: 'right',
      sorter: (a, b) => (a.availability ?? 0) - (b.availability ?? 0),
      render: (_, data) => (data.availableSlots > 0 ? numberFormatWithoutDecimal.format(data.availability) : '-'),
    },
    {
      title: <span className={classes.textBold}>{t('getirMarketDashboardPage:SUM_SHORT')}</span>,
      dataIndex: 'itemCount',
      key: 'itemCount',
      width: 58,
      align: 'right',
      sorter: (a, b) => (a.itemCount ?? 0) - (b.itemCount ?? 0),
      render: data => numberFormatWithoutDecimal.format(data),
    },
    {
      title: <span className={classes.textBold}>{t('getirMarketDashboardPage:BASKET_SHORT')}</span>,
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: 58,
      align: 'right',
      defaultSortOrder: 'descend',
      sorter: (a, b) => (a.totalPrice ?? 0) - (b.totalPrice ?? 0),
      render: data => numberFormatWithoutDecimal.format(data),
    },
    {
      title: <span className={classes.textBold}>%</span>,
      width: 35,
      key: 'percentage',
      align: 'right',
      sorter: (a, b) => (a.totalPrice ?? 0) - (b.totalPrice ?? 0),
      render: (_, data) => numberFormatWithOneDecimal.format((data.totalPrice / totalPrice) * 100 || 0),
    },
  ];
};
