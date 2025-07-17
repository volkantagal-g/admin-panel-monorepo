import { Button, Card, Col, Row } from 'antd';

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useTranslation } from 'react-i18next';

import { useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import useStyles from './styles';
import { Creators } from '../../redux/actions';
import { summarySelector } from '@app/pages/technology/ComplianceReport/Home/redux/selectors';
import { ROUTE } from '@app/routes';

const Charts = () => {
  const { t } = useTranslation('technologyComplianceReport');
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.getSummaryRequest());
  }, [dispatch]);

  const summary = useSelector(summarySelector.getData);
  const summaryPending = useSelector(summarySelector.isPending);

  const vulnerabilityChartRef = useRef(null);
  const nodeVersionChartRef = useRef(null);

  useEffect(() => {
    if (!vulnerabilityChartRef.current) return;
    if (summaryPending) {
      vulnerabilityChartRef.current.chart.showLoading();
      nodeVersionChartRef.current.chart.showLoading();
    }
    else {
      vulnerabilityChartRef.current.chart.hideLoading();
      nodeVersionChartRef.current.chart.hideLoading();
    }
  }, [vulnerabilityChartRef, nodeVersionChartRef, summaryPending]);

  const basicChartOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      width: 205,
      height: 260,
      marginTop: 30,
    },
    plotOptions: { pie: { dataLabels: { enabled: false } } },
    tooltip: { pointFormat: '<b>{point.percentage:.1f}%</b>' },
    accessibility: { point: { valueSuffix: '%' } },
    colors: ['#433c65', '#004a77', '#613b28', '#2f4d47', '#2a4165', '#46474c'],
    credits: { enabled: false },
    series: [{
      colorByPoint: true,
      data: [{ y: 70.67 }, { y: 14.77 }, { y: 4.86 }, { y: 2.63 }, { y: 1.53 }, { y: 1.40 }, { y: 0.84 }, { y: 0.51 }, { y: 2.6 }],
    }],
  };

  const vulnerabilitySeries = {
    colorByPoint: true,
    data: [],
  };
  const nodeVersionSeries = {
    colorByPoint: true,
    data: [],
  };
  if (!summaryPending && summary?.node) {
    const vulnerablePercentage = (100.0 / summary.node.vulnerability.total) * summary.node.vulnerability.vulnerable;
    vulnerabilitySeries.data.push({ y: 100.0 - vulnerablePercentage, name: t('NON_VULNERABLE') });
    vulnerabilitySeries.data.push({ y: vulnerablePercentage, name: t('VULNERABLE') });

    Object.entries(summary.node.versions.distribution).forEach(([version, repoCount]) => {
      nodeVersionSeries.data.push({ y: (100.0 / summary.node.versions.total) * repoCount, name: version });
    });
  }

  const cardBodyStyles = { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0 };
  return (
    <Row className={classes.pieCharts}>
      <Col span={4}>
        <Card bodyStyle={cardBodyStyles} className={classes.card}>
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              ...basicChartOptions,
              title: { text: t('VULNERABILITY_REPORT.NODE_JS'), style: { fontSize: '16px' } },
              colors: ['#02eb3c', '#ed1515'],
              series: vulnerabilitySeries,
            }}
            ref={vulnerabilityChartRef}
          />
          <Link to={ROUTE.TECHNOLOGY_COMPLIANCE_REPORT_NODE_VULNERABILITIES.path}>
            <Button size="small">{t('DETAILED_REPORT')}</Button>
          </Link>
        </Card>
      </Col>
      <Col span={4} className="ml-2">
        <Card bodyStyle={cardBodyStyles} className={classes.card}>
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              ...basicChartOptions,
              title: { text: t('VERSION_REPORT.NODE_JS'), style: { fontSize: '16px' } },
              series: nodeVersionSeries,
            }}
            ref={nodeVersionChartRef}
          />
          <Link to={ROUTE.TECHNOLOGY_COMPLIANCE_REPORT_NODE_VERSIONS.path}>
            <Button size="small">{t('DETAILED_REPORT')}</Button>
          </Link>
        </Card>
      </Col>
    </Row>
  );
};

export default Charts;
