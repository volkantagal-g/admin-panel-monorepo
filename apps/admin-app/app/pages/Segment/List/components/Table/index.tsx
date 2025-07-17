import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState, useEffect, useCallback } from 'react';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { resetClientsOfSegmentSelector, segmentsSelector } from '../../redux/selectors';
import { columns } from './config';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';
import { createMap, getLimitAndOffset } from '@shared/utils/common';
import { usePermission, usePrevious } from '@shared/hooks';
import { Creators } from '../../redux/actions';
import { INITIAL_PAGINATION } from '../../constants';

const SegmentList = ({ search }: { search: string }) => {
  const { t } = useTranslation('segment');
  const { Can } = usePermission();
  const dispatch = useDispatch();

  const segmentsData = useSelector(segmentsSelector.getData);
  const segmentsIsPending = useSelector(segmentsSelector.getIsPending);
  const segmentsResultTotalCount = useSelector(segmentsSelector.getTotalCount);
  const isResetClientsOfSegmentPending = useSelector(resetClientsOfSegmentSelector.getIsPending);
  const countries = useSelector(countriesSelector.getData);
  const prevSearch = usePrevious(search);

  const countriesMap = useMemo(() => createMap(countries, { field: 'code.alpha2' }) as Record<string, ICountry>, [countries]);

  const [pagination, setPagination] = useState(INITIAL_PAGINATION);

  const makeSegmentsRequest = useCallback(({ limit, offset, search: _search }) => {
    dispatch(Creators.getSegmentsRequest({ limit, offset, search: _search }));
  }, [dispatch]);

  useEffect(() => {
    if (search !== prevSearch) {
      setPagination({ ...pagination, currentPage: 1 });
      const { limit, offset } = getLimitAndOffset({ ...pagination, currentPage: INITIAL_PAGINATION.currentPage });
      makeSegmentsRequest({ limit, offset, search });
    }
  }, [search, prevSearch, makeSegmentsRequest, pagination]);

  const onPaginationChange = ({ currentPage, rowsPerPage }: Pagination) => {
    setPagination({ currentPage, rowsPerPage });
    const { limit, offset } = getLimitAndOffset({ currentPage, rowsPerPage });
    makeSegmentsRequest({ limit, offset, search });
  };

  return (
    <AntTableV2
      bordered
      data={segmentsData}
      columns={columns({ t, dispatch, countriesMap, Can, isResetClientsOfSegmentDisabled: isResetClientsOfSegmentPending })}
      rowKey="segment"
      loading={segmentsIsPending}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
      total={segmentsResultTotalCount}
    />
  );
};

export default SegmentList;
