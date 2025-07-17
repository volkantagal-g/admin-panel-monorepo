import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Tabs } from 'antd';

import { CheckOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { useCallback, useEffect, useState } from 'react';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import { getLimitAndOffset } from '@shared/utils/common';

import Header from './components/Header';
import Filter from './components/Filter';
import Table from './components/Table';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { courierGamificationTasksSelector } from './redux/selectors';
import {
  TASK_STATUS,
  INITIAL_COURIER_GAMIFICATION_TASK_LIST_FILTER_STATES,
} from '../constant';

const reduxKey = REDUX_KEY.COURIER_GAMIFICATION_TASK.LIST;

const CourierGamificationTaskListPage = () => {
  const { t } = useTranslation('courierGamificationPage');
  const dispatch = useDispatch();
  const data = useSelector(courierGamificationTasksSelector.getData);
  const isPending = useSelector(courierGamificationTasksSelector.getIsPending);
  usePageViewAnalytics({
    name: ROUTE.COURIER_GAMIFICATION_TASK_LIST.name,
    squad: ROUTE.COURIER_GAMIFICATION_TASK_LIST.squad,
  });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [filters, setFilters] = useState(INITIAL_COURIER_GAMIFICATION_TASK_LIST_FILTER_STATES);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    if (
      currentPage !== pagination.currentPage ||
      rowsPerPage !== pagination.rowsPerPage
    ) {
      setPagination({ currentPage, rowsPerPage });
    }
  };

  const handleSubmission = values => {
    setFilters({ ...filters, ...values });
    dispatch(
      Creators.getCourierGamificationTasksRequest({
        offset: 0,
        limit: 10,
        filters: { status: filters.status, ...values },
      }),
    );
  };

  const getCourierGamificationTasks = useCallback(() => {
    const { limit, offset } = getLimitAndOffset(pagination);
    dispatch(
      Creators.getCourierGamificationTasksRequest({ offset, limit, filters }),
    );
  }, [pagination, dispatch, filters]);

  useEffect(() => {
    getCourierGamificationTasks();
  }, [getCourierGamificationTasks]);

  const getActivePane = () => {
    return (
      <span>
        <ClockCircleOutlined /> {t('LIST.ACTIVE_TASK_FILTER')}
      </span>
    );
  };

  const getCompletedPane = () => {
    return (
      <span>
        <CheckOutlined /> {t('LIST.COMPLETED_TASK_FILTER')}
      </span>
    );
  };

  return (
    <>
      <PageTitleHeader
        title={t('global:PAGE_TITLE.COURIER_GAMIFICATION_TASK.LIST')}
      />
      <Header />
      <Tabs
        defaultActiveKey={TASK_STATUS.ACTIVE}
        onChange={e => {
          setFilters({
            ...INITIAL_COURIER_GAMIFICATION_TASK_LIST_FILTER_STATES,
            status: +e,
          });
          setPagination({
            currentPage: 1,
            rowsPerPage: 10,
          });
        }}
      >
        <Tabs.TabPane tab={getActivePane()} key={TASK_STATUS.ACTIVE}>
          <Filter
            handleSubmission={handleSubmission}
          />
          <Table
            isPending={isPending}
            handlePaginationChange={handlePaginationChange}
            pagination={pagination}
            tableName={TASK_STATUS.ACTIVE}
            data={data}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab={getCompletedPane()} key={TASK_STATUS.COMPLETED}>
          <Filter
            handleSubmission={handleSubmission}
          />
          <Table
            isPending={isPending}
            handlePaginationChange={handlePaginationChange}
            pagination={pagination}
            tableName={TASK_STATUS.COMPLETED}
            data={data}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default CourierGamificationTaskListPage;
