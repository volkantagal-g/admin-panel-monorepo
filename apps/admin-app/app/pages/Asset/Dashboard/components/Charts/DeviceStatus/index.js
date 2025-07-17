import { memo, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { useSelector, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { getChartOptions } from './config';
import { getDeviceStatusStatisticsSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';

function DeviceStatusChart({ filters }) {
  const chartRef = useRef();
  const { t } = useTranslation(['assetPage', 'global']);
  const isPending = useSelector(getDeviceStatusStatisticsSelector.getIsPending);
  const data = useSelector(getDeviceStatusStatisticsSelector.getData);
  const dispatch = useDispatch();

  useEffect(() => {
    chartRef.current.chart.showLoading();
    if (!isPending) {
      chartRef.current.chart.hideLoading();
    }
  }, [isPending]);

  useEffect(() => {
    dispatch(Creators.getDeviceStatusStatisticsRequest({ filters }));
  }, [filters, dispatch]);

  const chartOptions = getChartOptions(data, t);

  return (
    <div>
      <HighchartsReact key="2" highcharts={Highcharts} options={chartOptions} ref={chartRef} />
    </div>
  );
}

export default memo(DeviceStatusChart);
