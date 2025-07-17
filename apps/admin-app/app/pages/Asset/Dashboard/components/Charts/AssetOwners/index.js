import { memo, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { useSelector, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { getChartOptions } from './config';
import { getAssetOwnersStatisticsSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';

function AssetOwnersChart({ filters }) {
  const chartRef = useRef();
  const { t } = useTranslation(['assetPage', 'global']);
  const isPending = useSelector(getAssetOwnersStatisticsSelector.getIsPending);
  const data = useSelector(getAssetOwnersStatisticsSelector.getData);
  const dispatch = useDispatch();

  useEffect(() => {
    chartRef.current.chart.showLoading();
    if (!isPending) {
      chartRef.current.chart.hideLoading();
    }
  }, [isPending]);

  useEffect(() => {
    dispatch(Creators.getAssetOwnersStatisticsRequest({ filters }));
  }, [filters, dispatch]);

  const chartOptions = getChartOptions(data, t);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
    </div>
  );
}

export default memo(AssetOwnersChart);
