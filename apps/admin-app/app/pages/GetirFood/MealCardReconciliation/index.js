import { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics, useEffectSkipInitialRender, useInitAndDestroyPage } from '@shared/hooks';
import { ROUTE } from '@app/routes';

import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import Header from './components/Header';
import Filter from './components/Filter';
import Summary from './components/Summary';
import Table from './components/Table';
import ExportExcelButton from './components/ExportExcelButton';
import { initialValues } from './components/Filter/formHelper';
import useStyles from './styles';

const MealCardReconciliation = () => {
  usePageViewAnalytics({ name: ROUTE.GETIR_FOOD_MEAL_CARD_RECONCILIATION.name, squad: ROUTE.GETIR_FOOD_MEAL_CARD_RECONCILIATION.squad });
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });
  const classes = useStyles();

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });
  const [filters, setFilters] = useState(initialValues);

  const formatFilters = () => ({
    startDateEpoch: moment(filters.dateRange[0]).startOf('day').unix(),
    endDateEpoch: moment(filters.dateRange[1]).endOf('day').unix(),
    currentPage: pagination.currentPage,
    pageSize: pagination.rowsPerPage,
    reconciliationMode: filters.isMatched,
    orderId: filters.orderId,
  });

  const getMealCardReconciliation = () => {
    const formattedFilters = formatFilters();
    dispatch(Creators.getMealCardReconciliationRequest(formattedFilters));
  };

  useEffect(() => {
    getMealCardReconciliation();
  }, [pagination.currentPage, pagination.rowsPerPage]);

  useEffectSkipInitialRender(() => {
    if (pagination.currentPage !== 1) {
      setPagination(prevPagination => ({ ...prevPagination, currentPage: 1 }));
    }
    else {
      getMealCardReconciliation();
    }
  }, [filters]);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const handleFilter = values => {
    setFilters(values);
  };

  const handleExportExcel = () => {
    const formattedFilters = formatFilters();
    dispatch(Creators.exportExcelRequest(formattedFilters));
  };

  return (
    <>
      <Header />
      <Row gutter={[16, 10]}>
        <Col className={classes.filter} xl={14} lg={12} span={24}>
          <Filter onFilter={handleFilter} />
        </Col>
        <Col xl={10} lg={12} span={24}>
          <Summary />
        </Col>
        <Col span={24}>
          <Table pagination={pagination} onPaginationChange={handlePaginationChange} />
        </Col>
      </Row>
      <Row>
        <ExportExcelButton onExportExcel={handleExportExcel} />
      </Row>
    </>
  );
};

const reduxKey = REDUX_KEY.FOOD.MEAL_CARD_RECONCILIATION;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MealCardReconciliation);
