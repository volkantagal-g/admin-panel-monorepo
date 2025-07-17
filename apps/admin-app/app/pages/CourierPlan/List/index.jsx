import { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { courierPlansSelector, deleteCourierPlanSelector } from './redux/selectors';

import { tableColumns } from './config';
import { Filter, NewButton } from './components';
import AntTable from '@shared/components/UI/AntTable';
import { useEffectSkipInitialRender, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

import { getCourierPlansRequestBody } from '../utils';
import useStyles from './styles';

const { Title } = Typography;

const List = () => {
  usePageViewAnalytics({ name: ROUTE.E2E_COURIER_PLAN_LIST.key, squad: ROUTE.E2E_COURIER_PLAN_LIST.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation('courierPlanPage');
  const classes = useStyles();

  const [filters, setFilters] = useState({
    planDate: null,
    name: '',
  });

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const courierPlans = useSelector(courierPlansSelector.getData);
  const total = useSelector(courierPlansSelector.getTotal);
  const isPending = useSelector(courierPlansSelector.getIsPending);
  const isPendingForDeletion = useSelector(deleteCourierPlanSelector.getIsPending);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const handleSubmit = updatedFilters => {
    setFilters(updatedFilters);
  };

  const handleDelete = ({ id }) => {
    dispatch(Creators.deleteCourierPlanRequest({ id }));
  };

  const getCourierPlansRequest = () => {
    const { currentPage, rowsPerPage } = pagination;
    const requestParams = getCourierPlansRequestBody({
      ...filters,
      currentPage,
      rowsPerPage,
    });
    dispatch(Creators.getCourierPlansRequest(requestParams));
  };

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffectSkipInitialRender(() => {
    const { currentPage } = pagination;

    if (currentPage !== 1) {
      setPagination({ ...pagination, currentPage: 1 });
    }
    else {
      getCourierPlansRequest();
    }
  }, [filters]);

  useEffect(() => {
    getCourierPlansRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.currentPage, pagination.rowsPerPage]);

  const pageTitle = t('PAGE_TITLE.COURIER_PLAN.LIST');

  return (
    <>
      <Row justify="center" align="middle">
        <Col span={16}>
          <Title level={3}>{pageTitle}</Title>
        </Col>
        <Col span={8}>
          <NewButton />
        </Col>
      </Row>
      <Filter filters={filters} handleSubmit={handleSubmit} isPending={isPending} />
      <Row>
        <Col span={24} className={classes.tableColumn}>
          <AntTable
            data={courierPlans}
            columns={tableColumns({ isPending: isPendingForDeletion, handleDelete, t })}
            loading={isPending}
            total={total}
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
            scroll={{ x: 'max-content' }}
          />
        </Col>
      </Row>
    </>
  );
};

const reduxKey = REDUX_KEY.COURIER_PLAN.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(
  withReducer,
  withSaga,
)(List);
