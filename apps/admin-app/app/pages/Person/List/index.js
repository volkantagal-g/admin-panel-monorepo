import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { isEqual } from 'lodash';

import { ROUTE } from '@app/routes';
import { DEFAULT_PAGINATION_VALUES, REDUX_KEY } from '@shared/shared/constants';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInitAndDestroyPage, usePageViewAnalytics, usePermission } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import Header from './components/Header';
import Filter from './components/Filter';
import { DEFAULT_FILTER } from './constants';
import { personListExcelSelector, personListSelector } from './redux/selector';
import { personListRequestParams } from './utils';
import { getTableColumns } from './config';
import { getLimitAndOffset } from '@shared/utils/common';

const reduxKey = REDUX_KEY.PERSON.LIST;

const PersonListPage = () => {
  usePageViewAnalytics({ name: ROUTE.PERSON_LIST.name, squad: ROUTE.PERSON_LIST.squad });
  const { t } = useTranslation('personPage');
  const { Can } = usePermission();

  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [pagination, setPagination] = useState(DEFAULT_PAGINATION_VALUES);
  const [filters, setFilters] = useState(DEFAULT_FILTER);

  const data = useSelector(personListSelector.getData);
  const total = useSelector(personListSelector.getTotal);
  const isPending = useSelector(personListSelector.getIsPending);
  const isExcelPending = useSelector(personListExcelSelector.getIsPending);

  const handlePaginationChange = newPagination => {
    // this function runs initially and this causes the same values to be set again. and this causes the filter request to be triggered twice
    // below logic is added to avoid this problem
    const isSamePagination = isEqual(pagination, newPagination);
    if (!isSamePagination) {
      setPagination(newPagination);
    }
  };

  const handleSubmit = values => {
    setFilters(values);
    setPagination(DEFAULT_PAGINATION_VALUES);
  };

  useEffect(() => {
    const { currentPage, rowsPerPage } = pagination;
    const { limit, offset } = getLimitAndOffset({ currentPage, rowsPerPage });
    const requestParams = personListRequestParams({ ...filters });

    dispatch(Creators.getPersonListRequest({
      limit,
      offset,
      ...requestParams,
    }));
  }, [dispatch, pagination, filters]);

  const handleExport = () => {
    dispatch(Creators.getPersonListExcelRequest({ ...(personListRequestParams({ ...filters })) }));
  };

  return (
    <>
      <Header />
      <Filter
        filters={filters}
        handleSubmit={handleSubmit}
        isPending={isPending || isExcelPending}
      />
      <Row>
        <Col span={24}>
          <AntTableV2
            data={data}
            columns={getTableColumns({ t, Can })}
            loading={isPending || isExcelPending}
            total={total}
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
            rowKey="_id"
            scroll={{ x: 600 }}
            onExport={handleExport}
            data-testid="person-list-table"
          />
        </Col>
      </Row>
    </>
  );
};

export default PersonListPage;
