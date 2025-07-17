import { Col } from 'antd';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

import { useEffect, useRef } from 'react';

import { chartOptions } from './config';

const BarChart = ({ data, isPending }) => {
  const chartRef = useRef();
  useEffect(() => {
    chartRef.current.chart.showLoading();
    if (!isPending) {
      chartRef.current.chart.hideLoading();
    }
  }, [isPending]);
  return (
    <Col lg={12} xs={24}>
      <HighchartsReact highcharts={Highcharts} options={chartOptions(data)} ref={chartRef} />
    </Col>
  );
};

export default BarChart;
