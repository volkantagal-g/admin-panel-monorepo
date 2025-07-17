import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { vehicleBasedStatsSelector } from '../../../redux/selectors';
import { getColumns } from './config';
import useStyles from '../generalStyles';
import useParentStyles from '../styles';

const VehicleBasedStats = () => {
  const { t } = useTranslation('getirDriveDashboardPage');
  const classes = useStyles();
  const parentClasses = useParentStyles();
  const [dataType, setDataType] = useState('total');

  const handleDataTypeChange = newDataType => setDataType(newDataType);
  const columns = useMemo(() => getColumns({ t, classes, handleDataTypeChange, dataType }), [classes, t, dataType]);

  const vehicleBasedStats = useSelector(vehicleBasedStatsSelector.getData);
  const vehicleBasedStatsIsPending = useSelector(vehicleBasedStatsSelector.getIsPending);

  const tableData = dataType === 'active' ?
    [
      { key: t('getirDriveDashboardPage:RENTAL_COUNT'), value: vehicleBasedStats?.active_vehicle_rental_count },
      { key: t('getirDriveDashboardPage:NET_REVENUE'), value: vehicleBasedStats?.active_vehicle_net_revenue_tax_excluded },
    ] :
    [
      { key: t('getirDriveDashboardPage:RENTAL_COUNT'), value: vehicleBasedStats?.rental_count },
      { key: t('getirDriveDashboardPage:NET_REVENUE'), value: vehicleBasedStats?.net_revenue_tax_excluded },
    ];

  return (
    <AntTableV2
      data={tableData}
      columns={columns}
      className={classes.table}
      containerClassName={parentClasses.antTableContainer}
      loading={vehicleBasedStatsIsPending}
      headerClassName={classes.smallerPadding}
      showFooter={false}
    />
  );
};

export default memo(VehicleBasedStats);
