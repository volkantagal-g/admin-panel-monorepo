import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { useCallback, useEffect, useState } from 'react';

import { DatePicker, Button, Row, Col, Alert } from 'antd';

import { getLocalDateFormat } from '@shared/utils/localization';

import AntTable from '@shared/components/UI/AntTableV2';

import { Creators } from '../../redux/actions';
import permKey from '@shared/shared/permKey.json';

import AntCard from '@shared/components/UI/AntCard';
import useStyles from './styles';
import { tableColumns } from './config';
import { paymentDetailsSummarySelector } from '../../redux/selectors';
import { getInitialPaymentSummaryFilters, getMinDate } from '../../utils';
import { usePermission } from '@shared/hooks';
import { INITIAL_PAGINATION } from '../../constants';

const Payments = () => {
  const { t } = useTranslation('foodFinancialDashboardV2Page');
  const dispatch = useDispatch();
  const classes = useStyles();
  const { canAccess } = usePermission();

  const hasAccessDetailPage = canAccess(permKey.PAGE_GETIR_FOOD_FINANCIAL_DASHBOARD_V2_DETAIL);

  const [startDate, setStartDate] = useState(() => getInitialPaymentSummaryFilters()?.startDate);

  const tableData = useSelector(paymentDetailsSummarySelector.getData);
  const isPending = useSelector(paymentDetailsSummarySelector.getIsPending);
  const paymentDetailsSummaryFilters = useSelector(paymentDetailsSummarySelector.getPaymentDetailsSummaryFilters);

  const columns = tableColumns(t, hasAccessDetailPage, classes.infoIconClass);

  const fetchDetailsSummary = useCallback(payload => {
    dispatch(Creators.setPaymentDetailsSummaryFilters({ ...paymentDetailsSummaryFilters, ...payload }));
    dispatch(Creators.getPaymentDetailsSummaryRequest());
  }, [dispatch, paymentDetailsSummaryFilters]);

  const handlePaginationChange = useCallback(
    values => {
      fetchDetailsSummary({ ...values });
    },
    [fetchDetailsSummary],
  );

  const handleFilter = () => {
    fetchDetailsSummary({ startDate });
  };

  const handleChangeDate = date => {
    setStartDate(date);
    dispatch(Creators.setPaymentDetailsSummaryFilters({ ...paymentDetailsSummaryFilters, totalCount: undefined, ...INITIAL_PAGINATION }));
  };

  const disabledDate = current => {
    const minDate = getMinDate();

    return current && current < minDate;
  };

  useEffect(() => {
    dispatch(Creators.getPaymentDetailsSummaryRequest());
  }, [dispatch]);

  return (
    <AntCard title={t('PAYMENT_TABLE.TITLE')} className={classes.card}>
      <Alert className={classes.alert} message={t('ALERT_MESSAGE')} type="warning" showIcon />
      <Row gutter={8} className="mb-3">
        <Col>
          <DatePicker
            onChange={handleChangeDate}
            value={startDate}
            disabledDate={disabledDate}
            format={getLocalDateFormat()}
          />
        </Col>
        <Col>
          <Button
            size="medium"
            variant="contained"
            type="primary"
            disabled={isPending || !startDate}
            onClick={handleFilter}
          >
            {t('global:FILTER')}
          </Button>
        </Col>
      </Row>

      <AntTable
        columns={columns}
        data={tableData.paymentDetails}
        loading={isPending}
        total={tableData.totalCount}
        pagination={
          {
            currentPage: paymentDetailsSummaryFilters.currentPage,
            rowsPerPage: paymentDetailsSummaryFilters.rowsPerPage,
          }
        }
        onPaginationChange={handlePaginationChange}
      />
    </AntCard>
  );
};

export default Payments;
