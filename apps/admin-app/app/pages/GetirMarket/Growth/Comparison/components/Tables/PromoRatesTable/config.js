import { get, isNumber } from 'lodash';
import { Button, Typography, Tooltip } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

import AntInputNumber from '@shared/components/UI/AntInputNumber';
import { percentFormatWithOneDecimal } from '@shared/utils/localization';
import { formatDateRange, numberFormatter, calculatePercentDiff, getDiffClassName, calculateOrderCountDiff } from '../../../utils';

const { Title } = Typography;

const ShownCaret = ({ name, record, selectedRows, classes }) => {
  if (!isNumber(record.index)) {
    return (
      <Tooltip title={name}>
        {name}
      </Tooltip>
    );
  }
  if (selectedRows.has(record.index)) {
    return (
      <Tooltip title={name}>
        <CaretUpOutlined className={classes.smallRightMargin} />{name}
      </Tooltip>
    );
  }
  return (
    <Tooltip title={name}>
      <CaretDownOutlined className={classes.smallRightMargin} />{name}
    </Tooltip>
  );
};

const getMinMaxFilter = ({ dataIndex, classes, t }) => {
  let values = [];
  return ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div className={classes.filterDropdownContainer}>
        <div className={classes.inputSectionContainer}>
          <div>
            <AntInputNumber
              value={selectedKeys[0]}
              placeholder={t('global:MIN')}
              onChange={min => {
                setSelectedKeys([min, selectedKeys[1]]);
              }}
              min={0}
              max={selectedKeys[1]}
            />
          </div>
          <div>
            <AntInputNumber
              value={selectedKeys[1]}
              placeholder={t('global:MAX')}
              onChange={max => {
                setSelectedKeys([selectedKeys[0], max]);
              }}
              min={selectedKeys[0]}
            />
          </div>
        </div>
        <div className={classes.actionSectionContainer}>
          <Button
            key="applyButton"
            onClick={() => {
              values = selectedKeys;
              confirm();
            }}
            size="small"
            type="primary"
          >
            {t('global:APPLY')}
          </Button>
          <Button
            key="resetButton"
            onClick={() => {
              clearFilters();
              values = [];
              confirm();
            }}
            size="small"
          >
            {t('global:RESET')}
          </Button>
        </div>
      </div>
    ),
    onFilter: (value, record) => {
      const [min, max] = values;
      if (min && max) {
        return get(record, dataIndex) >= min && get(record, dataIndex) <= max;
      }
      if (min) {
        return get(record, dataIndex) >= min;
      }
      if (max) {
        return get(record, dataIndex) <= max;
      }
      return true;
    },
  });
};

export const getTableColumns = (t, startDateRange, endDateRange, classes, selectedRows, isShowNestedTable) => {
  const formattedStartDateRange = formatDateRange(startDateRange);
  const formattedEndRange = formatDateRange(endDateRange);

  return [
    {
      title: <Title level={5}>{t('PROMO')}</Title>,
      dataIndex: 'promoCode',
      width: '39%',
      render: (value, record) => {
        if (value === 'TOTAL_ORDER') return <span>{t('getirMarketGrowthComparisonPage:TOTAL_ORDER')}</span>;
        if (value === 'ORGANIC_ORDER') return <span>{t('getirMarketGrowthComparisonPage:ORGANIC_ORDER')}</span>;
        if (value === 'PROMO_ORDER') return <span>{t('getirMarketGrowthComparisonPage:PROMO_ORDER')}</span>;
        if (value === 'PROMO_USED_COUNT') return <span>{t('getirMarketGrowthComparisonPage:PROMO_USED_COUNT')}</span>;
        if (isShowNestedTable) {
          return (<ShownCaret name={value} record={record} selectedRows={selectedRows} classes={classes} />);
        }
        return value;
      },
    },
    {
      title: <Title level={5}>{startDateRange ? formattedStartDateRange : '-'}</Title>,
      children: [
        {
          title: <Tooltip title={t('getirMarketGrowthComparisonPage:ORDER_COUNT')}>#</Tooltip>,
          dataIndex: `${formattedStartDateRange}_orderCount`,
          align: 'right',
          width: '10%',
          render: count => <span>{numberFormatter(count)}</span>,
          sorter: (a, b) => (a?.[`${formattedStartDateRange}_orderCount`] || 0) - (b?.[`${formattedStartDateRange}_orderCount`] || 0),
          ...getMinMaxFilter({ dataIndex: `${formattedStartDateRange}_orderCount`, classes, t }),
          showSorterTooltip: false,
        },
        {
          title: <Tooltip title={t('getirMarketGrowthComparisonPage:TOTAL_ORDER_RATE')}>%</Tooltip>,
          dataIndex: `${formattedStartDateRange}_ratio`,
          align: 'right',
          width: '10%',
          render: ratio => <span>{ratio ? percentFormatWithOneDecimal.format(ratio || 0) : '- %'}</span>,
          sorter: (a, b) => (a?.[`${formattedStartDateRange}_ratio`] || 0) - (b?.[`${formattedStartDateRange}_ratio`] || 0),
          showSorterTooltip: false,
        },
      ],
    },
    {
      title: <Title level={5}>{endDateRange ? formattedEndRange : '-'}</Title>,
      children: [
        {
          title: <Tooltip title={t('getirMarketGrowthComparisonPage:ORDER_COUNT')}>#</Tooltip>,
          dataIndex: `${formattedEndRange}_orderCount`,
          align: 'right',
          width: '10%',
          render: count => <span>{numberFormatter(count)}</span>,
          sorter: (a, b) => calculateOrderCountDiff(a?.[`${formattedEndRange}_orderCount`], b?.[`${formattedEndRange}_orderCount`]),
          ...getMinMaxFilter({ dataIndex: `${formattedEndRange}_orderCount`, classes, t }),
          showSorterTooltip: false,
        },
        {
          title: <Tooltip title={t('getirMarketGrowthComparisonPage:TOTAL_ORDER_RATE')}>%</Tooltip>,
          dataIndex: `${formattedEndRange}_ratio`,
          align: 'right',
          width: '10%',
          render: ratio => <span>{ratio ? percentFormatWithOneDecimal.format(ratio || 0) : '- %'}</span>,
          sorter: (a, b) => (a?.[`${formattedEndRange}_ratio`] || 0) - (b?.[`${formattedEndRange}_ratio`] || 0),
          showSorterTooltip: false,
        },
      ],
    },
    {
      title: <Title level={5}>{t('global:DIFFERENCE')}</Title>,
      children: [
        {
          title: <Tooltip title={t('getirMarketGrowthComparisonPage:ORDER_COUNT')}>#</Tooltip>,
          align: 'right',
          width: '10%',
          render: row => {
            const minuend = row[`${formattedEndRange}_orderCount`] || 0;
            const subtrahend = row[`${formattedStartDateRange}_orderCount`] || 0;

            const diff = minuend - subtrahend;

            return <span className={getDiffClassName(diff)}>{numberFormatter(diff)}</span>;
          },
          sorter: (a, b) => {
            const diffA = calculateOrderCountDiff(a?.[`${formattedEndRange}_orderCount`], a?.[`${formattedStartDateRange}_orderCount`]);
            const diffB = calculateOrderCountDiff(b?.[`${formattedEndRange}_orderCount`], b?.[`${formattedStartDateRange}_orderCount`]);

            return diffA - diffB;
          },
        },
        {
          title: <Tooltip title={t('getirMarketGrowthComparisonPage:GROWTH_RATE')}>%</Tooltip>,
          align: 'right',
          width: '11%',
          render: row => {
            const diff = calculatePercentDiff(row[`${formattedStartDateRange}_ratio`], row[`${formattedEndRange}_ratio`]);

            return <span className={getDiffClassName(diff)}>{isNumber(diff) ? percentFormatWithOneDecimal.format(diff) : '- %'}</span>;
          },
          sorter: (a, b) => {
            const diffA = calculatePercentDiff(a[`${formattedStartDateRange}_ratio`], a[`${formattedEndRange}_ratio`]);
            const diffB = calculatePercentDiff(b[`${formattedStartDateRange}_ratio`], b[`${formattedEndRange}_ratio`]);

            return diffA - diffB;
          },
        },
      ],
    },
  ];
};

export const getNestedTableColumns = (t, startDateRange, endDateRange, classes) => {
  const formattedStartDateRange = formatDateRange(startDateRange);
  const formattedEndRange = formatDateRange(endDateRange);

  return [
    {
      dataIndex: 'promoCode',
      width: '39%',
      render: value => {
        return (
          <Tooltip title={value}>
            {value}
          </Tooltip>
        );
      },
    },
    {
      children: [
        {
          dataIndex: `${formattedStartDateRange}_orderCount`,
          align: 'right',
          width: '10%',
          render: count => <span>{numberFormatter(count)}</span>,
          sorter: (a, b) => calculateOrderCountDiff(a?.[`${formattedStartDateRange}_orderCount`], b?.[`${formattedStartDateRange}_orderCount`]),
          ...getMinMaxFilter({ dataIndex: `${formattedStartDateRange}_orderCount`, classes, t }),
          showSorterTooltip: false,
        },
        {
          dataIndex: `${formattedStartDateRange}_ratio`,
          align: 'right',
          width: '10%',
          render: ratio => <span>{ratio ? percentFormatWithOneDecimal.format(ratio || 0) : '- %'}</span>,
          sorter: (a, b) => (a?.[`${formattedStartDateRange}_ratio`] || 0) - (b?.[`${formattedStartDateRange}_ratio`] || 0),
          showSorterTooltip: false,
        },
      ],
    },
    {
      children: [
        {
          dataIndex: `${formattedEndRange}_orderCount`,
          align: 'right',
          width: '10%',
          render: count => <span>{numberFormatter(count)}</span>,
          sorter: (a, b) => calculateOrderCountDiff(a?.[`${formattedEndRange}_orderCount`], b?.[`${formattedEndRange}_orderCount`]),
          ...getMinMaxFilter({ dataIndex: `${formattedEndRange}_orderCount`, classes, t }),
          showSorterTooltip: false,
        },
        {
          dataIndex: `${formattedEndRange}_ratio`,
          align: 'right',
          width: '10%',
          render: ratio => <span>{ratio ? percentFormatWithOneDecimal.format(ratio || 0) : '- %'}</span>,
          sorter: (a, b) => (a?.[`${formattedEndRange}_ratio`] || 0) - (b?.[`${formattedEndRange}_ratio`] || 0),
          showSorterTooltip: false,
        },
      ],
    },
    {
      children: [
        {
          align: 'right',
          width: '10%',
          render: row => {
            const diff = calculateOrderCountDiff(row[`${formattedEndRange}_orderCount`], row[`${formattedStartDateRange}_orderCount`]);

            return <span className={getDiffClassName(diff)}>{numberFormatter(diff)}</span>;
          },
        },
        {
          align: 'right',
          width: '11%',
          render: row => {
            const diff = calculatePercentDiff(row[`${formattedStartDateRange}_ratio`], row[`${formattedEndRange}_ratio`]);

            return <span className={getDiffClassName(diff)}>{isNumber(diff) ? percentFormatWithOneDecimal.format(diff) : '- %'}</span>;
          },
        },
      ],
    },
  ];
};
