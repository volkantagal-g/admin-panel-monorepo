import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table } from 'antd';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { numberFormat } from '@shared/utils/localization';

import { instantVehicleStatusSelector } from '../../../redux/selectors';
import { getColumns } from './config';
import useStyles from '../generalStyles';
import useParentStyles from '../styles';

const FleetStatus = () => {
  const { t } = useTranslation('getirDriveDashboardPage');
  const classes = useStyles();
  const parentClasses = useParentStyles();
  const columns = useMemo(() => getColumns({ t, classes }), [classes, t]);

  const fleetStatus = useSelector(instantVehicleStatusSelector.getData);
  const fleetStatusIsPending = useSelector(instantVehicleStatusSelector.getIsPending);

  const total = (fleetStatus?.active || 0) +
    (fleetStatus?.passive || 0) +
    (fleetStatus?.ikinciyenidevir || 0);
  const tableData = [
    {
      key: t('getirDriveDashboardPage:ACTIVE'),
      value: fleetStatus?.active,
      pct: ((fleetStatus?.active || 0) / total) * 100,
    },
    {
      key: t('getirDriveDashboardPage:PASSIVE'),
      value: fleetStatus?.passive,
      pct: ((fleetStatus?.passive || 0) / total) * 100,
    },
    {
      key: t('getirDriveDashboardPage:SECOND_HAND_SALE'),
      value: fleetStatus?.ikinciyenidevir,
      pct: ((fleetStatus?.ikinciyenidevir || 0) / total) * 100,
    },
  ];

  const summaryRow = () => (
    <Table.Summary fixed>
      <Table.Summary.Row>
        <Table.Summary.Cell
          index={0}
          className={classes.smallerPadding}
        >
          {t('TOTAL')}
        </Table.Summary.Cell>
        <Table.Summary.Cell
          index={1}
          align="right"
          className={classes.smallerPadding}
        >
          {numberFormat({ maxDecimal: 0 }).format(total)}
        </Table.Summary.Cell>
      </Table.Summary.Row>
    </Table.Summary>
  );

  return (
    <AntTableV2
      data={tableData}
      columns={columns}
      className={classes.table}
      containerClassName={parentClasses.antTableContainer}
      loading={fleetStatusIsPending}
      headerClassName={classes.smallerPadding}
      summary={summaryRow}
      showFooter={false}
    />
  );
};

export default memo(FleetStatus);
