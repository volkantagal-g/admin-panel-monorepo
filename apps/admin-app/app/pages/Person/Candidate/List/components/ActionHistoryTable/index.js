import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTable from '@shared/components/UI/AntTable';
import { personCandidateActionHistorySelector } from '../../redux/selector';
import { Creators } from '../../redux/actions';
import { _getTableColumns } from './config';

const ActionHistoryTable = ({ candidate }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation('personCandidatePage');

  const data = useSelector(personCandidateActionHistorySelector.getData);
  const total = useSelector(personCandidateActionHistorySelector.getTotal);
  const isPending = useSelector(personCandidateActionHistorySelector.getIsPending);

  useEffect(() => {
    if (candidate) {
      dispatch(Creators.getPersonCandidateActionHistoryRequest({ candidate }));
    }
  }, [candidate, dispatch]);

  return <AntTable data={data} total={total} columns={_getTableColumns(t)} loading={isPending} />;
};

export default ActionHistoryTable;
