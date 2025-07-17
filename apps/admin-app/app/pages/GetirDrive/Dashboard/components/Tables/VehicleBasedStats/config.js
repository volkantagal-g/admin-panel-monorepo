import { Button, Tooltip } from 'antd';

import { numberFormat } from '@shared/utils/localization';

export const getColumns = ({ t, classes, handleDataTypeChange, dataType }) => [
  {
    title: t('getirDriveDashboardPage:VEHICLE_BASED'),
    dataIndex: 'key',
    key: 'key',
    align: 'left',
    width: 115,
    className: classes.smallerPadding,
  },
  {
    title: (
      <div className={classes.buttonContainer}>
        <Tooltip title={t('getirDriveDashboardPage:TOTAL')}>
          <Button
            className={classes.button}
            onClick={() => handleDataTypeChange('total')}
            type={dataType === 'total' ? 'primary' : 'default'}
          >
            T
          </Button>
        </Tooltip>
        <Tooltip title={t('getirDriveDashboardPage:ACTIVE')}>
          <Button
            className={classes.button}
            onClick={() => handleDataTypeChange('active')}
            type={dataType === 'active' ? 'primary' : 'default'}
          >
            A
          </Button>
        </Tooltip>
      </div>
    ),
    dataIndex: 'value',
    key: 'value',
    align: 'right',
    className: classes.smallerPadding,
    render: data => numberFormat({ maxDecimal: 0 }).format(data || 0),
  },
];
