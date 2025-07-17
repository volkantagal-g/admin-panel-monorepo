import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../redux/actions';
import { UNKNOWN_VALUE } from '../../redux/reducer';
import { executiveStatsSelector } from '../../redux/selectors';

import PieChart from '../PieChart';
import { getChartOptionsFromExecutiveStatsData } from './config';
import useStyles from './styles';

export default function PieCharts() {
  const { t } = useTranslation(['activeOrdersForExecutiveDashboardPage', 'global']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const data = useSelector(executiveStatsSelector.getData);

  const [promoDistOptions, paymentTypeOptions, addressTypeOptions, promoTypeOption, promoFinancedOption, queueStatusOptions, orderStatusOptions] = useMemo(
    () => getChartOptionsFromExecutiveStatsData(data, t),
    [data, t],
  );

  const updateChartFilter = useCallback(
    (fieldName, fieldValue) => {
      // we can't update filters when the filter value is unknown
      if (fieldValue === UNKNOWN_VALUE) return;
      dispatch(Creators.setChartFilter({ chartFilterName: fieldName, value: fieldValue }));
      dispatch(Creators.getActiveOrdersExecutiveStatsRequest());
    },
    [dispatch],
  );

  return (
    <div className={classes.pieCharts}>
      <PieChart customChartOptions={promoDistOptions} onPointClick={updateChartFilter} />
      <PieChart customChartOptions={paymentTypeOptions} onPointClick={updateChartFilter} />
      <PieChart customChartOptions={addressTypeOptions} onPointClick={updateChartFilter} />
      <PieChart customChartOptions={promoTypeOption} />
      <PieChart customChartOptions={promoFinancedOption} />
      <PieChart customChartOptions={queueStatusOptions} onPointClick={updateChartFilter} />
      <PieChart customChartOptions={orderStatusOptions} onPointClick={updateChartFilter} />
    </div>
  );
}
