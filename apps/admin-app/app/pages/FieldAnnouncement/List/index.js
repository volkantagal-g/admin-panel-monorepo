import { useState, useEffect, useCallback } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import sagas from './redux/sagas';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { announcementListSelector } from './redux/selectors';
import { reducerKey as reduxKey } from './redux/key';
import Filter from './components/Filter';
import Table from './components/Table';
import Header from './components/PageHeader';
import { getRequestParams } from './utils';

const FieldAnnouncementList = () => {
  usePageViewAnalytics({
    name: ROUTE.FIELD_ANNOUNCEMENT_LIST.name,
    squad: ROUTE.FIELD_ANNOUNCEMENT_LIST.squad,
  });

  const dispatch = useDispatch();
  const { t } = useTranslation('fieldAnnouncementPage');
  const pageTitle = t('PAGE_TITLE.LIST');

  const [filters, setFilters] = useState({
    description: undefined,
    announcementType: undefined,
    title: undefined,
    active: undefined,
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });

  const announcements = useSelector(
    announcementListSelector.getData,
  );
  const isPending = useSelector(
    announcementListSelector.getIsPending,
  );
  const total = useSelector(
    announcementListSelector.getTotal,
  );
  const isDeleteSuccess = useSelector(
    announcementListSelector.getIsDeleteSuccess,
  );

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  const announcementsListRequest = useCallback(() => {
    const { currentPage, rowsPerPage } = pagination;
    const requestParams = getRequestParams({
      ...filters,
      currentPage,
      rowsPerPage,
    });

    dispatch(Creators.getAnnouncementListRequest(requestParams));
  }, [dispatch, filters, pagination]);

  useEffect(() => {
    announcementsListRequest();
  }, [filters, pagination, announcementsListRequest]);

  useEffect(() => {
    if (isDeleteSuccess) {
      announcementsListRequest();
    }
  }, [isDeleteSuccess, announcementsListRequest]);

  const handleSubmit = newFilters => {
    setFilters(newFilters);
    const newPagination = {
      currentPage: 1,
      rowsPerPage: pagination.rowsPerPage,
    };
    setPagination(newPagination);
  };

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  return (
    <>
      <Header pageTitle={pageTitle} />
      <Filter
        filters={filters}
        handleSubmit={handleSubmit}
        isPending={isPending}
      />
      <Table
        data={announcements}
        total={total}
        isPending={isPending}
        pagination={pagination}
        handlePaginationChange={handlePaginationChange}
      />
    </>
  );
};

const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(FieldAnnouncementList);
