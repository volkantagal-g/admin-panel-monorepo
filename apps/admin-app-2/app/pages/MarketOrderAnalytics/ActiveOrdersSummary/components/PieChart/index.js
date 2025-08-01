import { memo, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';

import { availableDomainTypesForCountrySelector, availableIntegrationTypesForCountrySelector } from '@shared/redux/selectors/common';
import { getOptions } from './config';
import useStyles from './styles';
import { executiveStatsSelector } from '../../redux/selectors';

function PieChart({ customChartOptions, onPointClick }) {
  const chartRef = useRef();
  const isPending = useSelector(executiveStatsSelector.getIsPending);
  const isAvailableDomainsPending = useSelector(availableDomainTypesForCountrySelector.getIsPending);
  const isAvailableIntegrationsPending = useSelector(availableIntegrationTypesForCountrySelector.getIsPending);
  const classes = useStyles();
  useEffect(() => {
    if (isPending || isAvailableDomainsPending || isAvailableIntegrationsPending) {
      chartRef.current.chart.showLoading();
    }
    else {
      chartRef.current.chart.hideLoading();
    }
  }, [isPending, isAvailableDomainsPending, isAvailableIntegrationsPending]);
  const chartOptions = getOptions({ customChartOptions, onPointClick });

  return (
    <div className={classes.pieChart}>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
    </div>
  );
}

export default memo(PieChart);
