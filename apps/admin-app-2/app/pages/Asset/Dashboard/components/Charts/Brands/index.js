import { memo, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { useSelector, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { getChartOptions } from './config';
import { getBrandsStatisticsSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';

function BrandsChart({ filters }) {
  const chartRef = useRef();
  const { t } = useTranslation(['assetPage', 'global']);
  const isPending = useSelector(getBrandsStatisticsSelector.getIsPending);
  const data = useSelector(getBrandsStatisticsSelector.getData);
  const dispatch = useDispatch();

  useEffect(() => {
    chartRef.current.chart.showLoading();
    if (!isPending) {
      chartRef.current.chart.hideLoading();
    }
  }, [isPending]);

  useEffect(() => {
    dispatch(Creators.getBrandsStatisticsRequest({ filters }));
  }, [filters, dispatch]);

  const chartOptions = getChartOptions(data, t);

  return (
    <div>
      <HighchartsReact key="2" highcharts={Highcharts} options={chartOptions} ref={chartRef} />
    </div>
  );
}

export default memo(BrandsChart);
