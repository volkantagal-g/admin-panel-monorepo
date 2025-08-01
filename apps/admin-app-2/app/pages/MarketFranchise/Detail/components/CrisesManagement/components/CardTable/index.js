import { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { usePermission } from '@shared/hooks';
import { tableColumns } from './config';
import { crisisCardListSelector } from '../../../../redux/selectors';
import { Creators } from '../../../../redux/actions';
import { getCrisisCardListExcelRequestParams, getCrisisCardListRequestParams } from '../../utils';

const CardTable = ({ topicId = null, updateCard }) => {
  const { t } = useTranslation('marketFranchisePage');
  const dispatch = useDispatch();
  const { Can } = usePermission();
  const { id } = useParams();

  const data = useSelector(crisisCardListSelector.getData);
  const isPending = useSelector(crisisCardListSelector.getIsPending);
  const totalCardCount = useSelector(crisisCardListSelector.getCount);
  const pagination = useSelector(crisisCardListSelector.getPagination);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    dispatch(Creators.changeCrisisCardListPagination({ currentPage, rowsPerPage }));
  };

  const handleExport = () => {
    const requestData = getCrisisCardListExcelRequestParams({ franchiseId: id, topicId });
    dispatch(Creators.exportCrisisCardListRequest(requestData));
  };

  const removeCard = useCallback(cardId => {
    dispatch(Creators.removeCrisisCardRequest({ cardId }));
  }, [dispatch]);

  const columns = useMemo(() => tableColumns(t, Can, updateCard, removeCard), [
    t,
    Can,
    updateCard,
    removeCard,
  ]);

  useEffect(() => {
    const requestData = getCrisisCardListRequestParams({
      franchiseId: id,
      topicId,
      pagination,
    });
    dispatch(Creators.getCrisisCardListRequest(requestData));
  }, [dispatch, pagination, id, topicId]);

  return (
    <AntTableV2
      title={t('CRISIS_CARD_LIST')}
      data={data}
      columns={columns}
      loading={isPending}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      total={totalCardCount}
      onExport={handleExport}
      isScrollableToTop={false}
    />
  );
};

CardTable.defaultProps = {
  topicId: null,
  updateCard: () => {},
};
CardTable.propTypes = {
  topicId: PropTypes.string,
  updateCard: PropTypes.func,
};

export default CardTable;
