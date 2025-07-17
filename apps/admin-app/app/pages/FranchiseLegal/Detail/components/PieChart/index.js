import { memo, useEffect, useRef } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

import { Col, Row } from 'antd';

import useStyles from './styles';
import { chartOptions } from './config';

const ApprovmentRatioPieChart = ({ data, isPending }) => {
  const chartRef = useRef();
  const classes = useStyles();
  useEffect(() => {
    chartRef?.current?.chart.showLoading();
    if (!isPending) {
      chartRef?.current?.chart.hideLoading();
    }
  }, [isPending]);

  if (data?.length) {
    return (
      <Row gutter={[0, 8]} justify="center">
        <Col>
          <div className={classes.chartContainer}>
            <HighchartsReact key="acceptanceRatioChart" highcharts={Highcharts} options={chartOptions(data)} ref={chartRef} />
          </div>
        </Col>
      </Row>
    );
  }

  return null;
};

export default memo(ApprovmentRatioPieChart);
