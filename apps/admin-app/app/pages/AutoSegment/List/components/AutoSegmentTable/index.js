import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getLimitAndOffset } from '@shared/utils/common';

import { Creators } from '../../redux/actions';
import { autoSegmentsSelector } from '../../redux/selectors';

import { tableColumns } from './config';

function AutoSegmentTable(props) {
  const { handleEditAutoSegmentOnClick, areInactivesIncluded } = props;
  const { t } = useTranslation('autoSegmentListPage');
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 25 });

  const autoSegments = useSelector(autoSegmentsSelector.getData);
  const isAutoSegmentsPending = useSelector(autoSegmentsSelector.getIsPending);

  const columns = tableColumns({ t, handleActivationOnClick, handleEditAutoSegmentOnClick, handleOnGetCountClick });

  useEffect(() => {
    dispatch(Creators.getAutoSegmentsRequest({ ...getLimitAndOffset(pagination), areInactivesIncluded }));
  }, [dispatch, pagination, pagination.currentPage, pagination.rowsPerPage, areInactivesIncluded]);

  return (
    <AntTableV2
      columns={columns}
      data={autoSegments}
      loading={isAutoSegmentsPending}
      total={10000}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
    />
  );

  function onPaginationChange({ currentPage, rowsPerPage }) {
    setPagination({ currentPage, rowsPerPage });
  }

  function handleActivationOnClick({ isActive, id }) {
    if (isActive) {
      dispatch(Creators.deactivateAutoSegmentTemplateRequest({ id }));
    }
    else {
      dispatch(Creators.activateAutoSegmentTemplateRequest({ id }));
    }
  }

  function handleOnGetCountClick({ autoSegmentId, segment }) {
    dispatch(Creators.getSegmentClientCountsRequest({ autoSegmentId, segments: [segment] }));
  }
}

export default AutoSegmentTable;
