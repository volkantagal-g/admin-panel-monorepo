import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useFormik } from 'formik';
import { Spin, Form } from 'antd';
import { isEqual } from 'lodash';

import { courierGamificationTaskSummarySelector } from './redux/selectors';
import { Creators } from './redux/actions';
import Header from '../components/Header';
import SummaryCoverage from './components/SummaryCoverage';
import { useInitAndDestroyPage } from '@shared/hooks';
import { getLimitAndOffset } from '@shared/utils/common';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import saga from './redux/saga';
import reducer from './redux/reducer';
import SummaryFilter from './components/SummaryFilter';
import SummaryTable from './components/SummaryTable';

import { INITIAL_VALUES_FOR_PAGINATION } from '../constant';
import { TaskHistory } from '@app/pages/CourierGamification/components';

const reduxKey = REDUX_KEY.COURIER_GAMIFICATION_TASK.SUMMARY;

const CourierGamificationTaskSummaryPage = () => {
  const { id } = useParams();
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  const data = useSelector(courierGamificationTaskSummarySelector.getData);
  const [form] = Form.useForm();
  const isPendingSummaryTable = useSelector(courierGamificationTaskSummarySelector.getIsPendingSummaryTable);
  const isPending = useSelector(courierGamificationTaskSummarySelector.getIsPending);
  const [pagination, setPagination] = useState(INITIAL_VALUES_FOR_PAGINATION);

  const [sortParams, setSortParams] = useState({
    sortKey: 'currentProgress',
    sortDirection: 'ascend',
  });

  usePageViewAnalytics({ name: ROUTE.COURIER_GAMIFICATION_TASK_SUMMARY.name, squad: ROUTE.COURIER_GAMIFICATION_TASK_SUMMARY.squad });
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const handlePaginationChange = payload => {
    if (!isEqual(payload, pagination)) {
      setPagination(payload);
    }
  };

  useInitAndDestroyPage({ dispatch, Creators });
  const formik = useFormik({
    initialValues: {
      progressStatus: [],
      personIds: [],
    },
    onSubmit: values => {
      handlePaginationChange(INITIAL_VALUES_FOR_PAGINATION);

      dispatch(Creators.getSummaryCourierGamificationByIdRequest({
        requestBody: values,
        currId: id,
        offset: 0,
        limit: 10,
        sortKey: sortParams.sortKey,
        sortDirection: sortParams.sortDirection,
      }));
    },
    validateOnMount: false,
  });

  const {
    handleSubmit,
    values,
    setFieldValue,
  } = formik;

  const handleSaveButtonClick = clickEvent => {
    handleSubmit(clickEvent);
  };

  const getSummaryCourierGamificationById = useCallback(() => {
    const { limit, offset } = getLimitAndOffset(pagination);
    dispatch(
      Creators.getSummaryCourierGamificationByIdRequest(
        {
          offset,
          limit,
          currId: id,
          sortKey: sortParams.sortKey,
          sortDirection: sortParams.sortDirection,
        },
      ),
    );
  }, [pagination, dispatch, id, sortParams]);

  useEffect(() => {
    if (id !== '') {
      dispatch(Creators.detailCourierGamificationTaskByIdRequest({ currId: id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    getSummaryCourierGamificationById();
  }, [getSummaryCourierGamificationById]);

  return (
    <Spin spinning={isPendingSummaryTable || isPending}>
      <PageTitleHeader
        title={t('global:PAGE_TITLE.COURIER_GAMIFICATION_TASK.SUMMARY')}
      />
      <Header
        title={t('global:PAGE_TITLE.COURIER_GAMIFICATION_TASK.SUMMARY')}
      />
      <SummaryCoverage data={
        {
          title: data?.taskData?.title,
          description: data?.taskData?.description,
          domainTypes: data?.taskData?.taskCoverage?.domainTypes,
          startDate: data?.taskData?.startDate,
          courierCount: data?.courierCount,
          endDate: data?.taskData?.endDate,
        }
      }
      />
      <SummaryFilter
        handleSaveButtonClick={handleSaveButtonClick}
        values={values}
        setFieldValue={setFieldValue}
        form={form}
      />
      <SummaryTable
        setSortParams={setSortParams}
        isPending={isPendingSummaryTable}
        tableName={t('courierGamificationPage:SUMMARY')}
        data={data?.summaryData}
        handlePaginationChange={handlePaginationChange}
        pagination={pagination}
      />
      <TaskHistory />
    </Spin>
  );
};

export default CourierGamificationTaskSummaryPage;
