import { Row, Col, DatePicker, Space, Spin, Tooltip, Button } from 'antd';
import { QuestionCircleOutlined, DownloadOutlined } from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { getLocalDateFormat, numberFormat, currencyFormat } from '@shared/utils/localization';
import AntCard from '@shared/components/UI/AntCard';

import {
  getFinancialDashboardPayoutDetail as getFinancialDashboardPayoutDetailSelector,
  exportFailedPaybacksToExcel as exportFailedPaybacksToExcelSelector,
} from '../../redux/selectors';
import useStyles from './styles';
import { Creators } from '../../redux/actions';

const PaymentData = ({ payoutDate, onChangePayoutDate }) => {
  const { t } = useTranslation('foodFinancialDashboardV2Page');
  const classes = useStyles();
  const dailyFinancialDashboard = useSelector(getFinancialDashboardPayoutDetailSelector.getData);
  const isPendinggetFinancialDashboardPayoutDetail = useSelector(getFinancialDashboardPayoutDetailSelector.getIsPending);
  const isPendingExportFailedPaybacks = useSelector(exportFailedPaybacksToExcelSelector.getIsPending);
  const dispatch = useDispatch();

  const disabledDate = current => {
    return current && current > moment().endOf('day');
  };

  const handlExportFailedPaybacksToExcel = () => {
    const reportDate = payoutDate ? payoutDate.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');

    dispatch(Creators.exportFailedPaybacksToExcelRequest({ reportDate }));
  };

  return (
    <AntCard
      title={(
        <>
          {t('PAYBACK_DATA.TITLE')}
          <Tooltip title={t('PAYBACK_DATA.TOOLTIP')} className={classes.tooltip}>
            <QuestionCircleOutlined className={classes.tooltip} />
          </Tooltip>
        </>
      )}
      className={classes.card}
    >
      <Spin spinning={isPendinggetFinancialDashboardPayoutDetail}>
        <Row className={classes.datePicker} gutter={[64]}>
          <Col span={8}>
            <Row justify="space-between">
              <Col>
                <b>{t('PAYBACK_DATA.PAYBACK_DATE_LABEL')}</b>
              </Col>
              <Col>
                <DatePicker
                  onChange={onChangePayoutDate}
                  value={payoutDate}
                  defaultValue={moment()}
                  disabledDate={disabledDate}
                  format={getLocalDateFormat()}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Space direction="vertical" size="middle" className="w-100">
            <Row gutter={[64]}>
              <Col span={8}>
                <Row justify="space-between">
                  <b>{t('PAYBACK_DATA.NIGHT.PAYBACK_STATUS')}</b>
                  <span>{dailyFinancialDashboard.night.payoutStatus}</span>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="space-between">
                  <b>{t('PAYBACK_DATA.AFTERNOON.PAYBACK_STATUS')}</b>
                  <span>{dailyFinancialDashboard.afternoon.payoutStatus}</span>
                </Row>
              </Col>
            </Row>
            <Row gutter={[64]}>
              <Col span={8}>
                <Row justify="space-between">
                  <b>{t('PAYBACK_DATA.NIGHT.PAYBACK_BANK')}</b>
                  <span>{dailyFinancialDashboard.night.payoutBank}</span>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="space-between">
                  <b>{t('PAYBACK_DATA.AFTERNOON.PAYBACK_BANK')}</b>
                  <span>{dailyFinancialDashboard.afternoon.payoutBank}</span>
                </Row>
              </Col>
            </Row>
            <Row gutter={[64]}>
              <Col span={8}>
                <Row justify="space-between">
                  <b>{t('PAYBACK_DATA.NIGHT.RESTAURANT_COUNT')}</b>
                  <span>{numberFormat().format(dailyFinancialDashboard.night.paidRestaurantCount)}</span>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="space-between">
                  <b>{t('PAYBACK_DATA.AFTERNOON.RESTAURANT_COUNT')}</b>
                  <span>{numberFormat().format(dailyFinancialDashboard.afternoon.paidRestaurantCount)}</span>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="space-between">
                  <b>{t('PAYBACK_DATA.TOTAL_RESTAURANT_COUNT')}</b>
                  <span>{numberFormat().format(dailyFinancialDashboard.totalRestaurantCount)}</span>
                </Row>
              </Col>
            </Row>
            <Row gutter={[64]}>
              <Col span={8}>
                <Row justify="space-between">
                  <b>{t('PAYBACK_DATA.NIGHT.PAYBACK_AMOUNT')}</b>
                  <span>{currencyFormat().format(dailyFinancialDashboard.night.payoutAmount)}</span>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="space-between">
                  <b>{t('PAYBACK_DATA.AFTERNOON.PAYBACK_AMOUNT')}</b>
                  <span>{currencyFormat().format(dailyFinancialDashboard.afternoon.payoutAmount)}</span>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="space-between">
                  <b>{t('PAYBACK_DATA.TOTAL_PAYBACK_AMOUNT')}</b>
                  <span>{currencyFormat().format(dailyFinancialDashboard.totalPayoutAmount)}</span>
                </Row>
              </Col>
            </Row>
            <Row gutter={[64]}>
              <Col span={8}>
                <Row justify="space-between">
                  <b>{t('PAYBACK_DATA.PAID_AMOUNT')}</b>
                  <span>{currencyFormat().format(dailyFinancialDashboard.night.paidAmount)}</span>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="space-between">
                  <b>{t('PAYBACK_DATA.PAID_AMOUNT')}</b>
                  <span>{currencyFormat().format(dailyFinancialDashboard.afternoon.paidAmount)}</span>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="space-between">
                  <b>{t('PAYBACK_DATA.TOTAL_PAID_PAYBACK_AMOUNT')}</b>
                  <span>{currencyFormat().format(dailyFinancialDashboard.totalPaidAmount)}</span>
                </Row>
              </Col>
            </Row>
            <Row gutter={[64]}>
              <Col span={8}>
                <Row justify="space-between">
                  <b>{t('PAYBACK_DATA.UNPAID_AMOUNT')}</b>
                  <span>{currencyFormat().format(dailyFinancialDashboard.night.remainingAmount)}</span>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="space-between">
                  <b>{t('PAYBACK_DATA.UNPAID_AMOUNT')}</b>
                  <span>{currencyFormat().format(dailyFinancialDashboard.afternoon.remainingAmount)}</span>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="space-between">
                  <b>{t('PAYBACK_DATA.TOTAL_UNPAID_PAYBACK_AMOUNT')}</b>
                  <span>{currencyFormat().format(dailyFinancialDashboard.totalRemainingAmount)}</span>
                </Row>
              </Col>
            </Row>
          </Space>
        </Row>
        <Row>
          <Col className={classes.excelButtonColumn}>
            <Button
              type="primary"
              loading={isPendinggetFinancialDashboardPayoutDetail || isPendingExportFailedPaybacks}
              icon={<DownloadOutlined />}
              onClick={handlExportFailedPaybacksToExcel}
              disabled={isPendingExportFailedPaybacks}
            >
              {t('ERROR_REPORT')}
            </Button>
          </Col>
        </Row>
      </Spin>
    </AntCard>
  );
};

export default PaymentData;
