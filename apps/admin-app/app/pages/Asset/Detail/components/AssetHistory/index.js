import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import { usePermission, useCursorPagination } from '@shared/hooks';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { tableColumns, LIMIT } from './config';
import { AssetHistorySelector } from '../../redux/selectors';

import { Creators } from '../../redux/actions';

const Table = () => {
  const { t } = useTranslation(['assetPage', 'global']);
  const dispatch = useDispatch();
  const { assetId } = useParams();
  const [limit, setLimit] = useState(LIMIT);
  const { canAccess } = usePermission();

  useEffect(() => {
    dispatch(Creators.assetHistoryRequest({ filters: { assetId, limit } }));
  }, [assetId, dispatch, limit]);

  const isPending = useSelector(AssetHistorySelector.getIsPending);
  const data = useSelector(AssetHistorySelector.getData);
  const previousPageCursor = useSelector(AssetHistorySelector.getPreviousPageCursor);
  const nextPageCursor = useSelector(AssetHistorySelector.getNextPageCursor);

  const handleNextButtonClick = () => dispatch(Creators.assetHistoryRequest({ filters: { assetId, nextPageCursor, limit } }));
  const handlePreviousButtonClick = () => dispatch(Creators.assetHistoryRequest({ filters: { assetId, previousPageCursor, limit } }));
  const handleLimit = value => setLimit(value);

  const pagination = useCursorPagination({
    hasPrev: previousPageCursor,
    hasNext: nextPageCursor,
    handleNext: handleNextButtonClick,
    handlePrevious: handlePreviousButtonClick,
    handleLimit,
  });

  return (
    <>
      <AntTableV2
        title={t('ASSET_HISTORY')}
        data={data}
        columns={tableColumns({ t, canAccess })}
        loading={isPending}
        pagination={false}
      />
      {pagination}
    </>
  );
};

export default Table;
