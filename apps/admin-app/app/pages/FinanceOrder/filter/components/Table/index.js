import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import AntTable from '@shared/components/UI/AntTableV2';

import { Creators } from '../../redux/actions';
import { financeOrderFilterSelector } from '../../redux/selectors';

import { getColumns } from './config';
import useStyles from './styles';

const Table = () => {
  const { t } = useTranslation([
    'financeOrderFilter',
    'financeOrderDetailPage',
  ]);
  const dispatch = useDispatch();
  const classes = useStyles();
  const columns = getColumns(t);

  const isPending = useSelector(financeOrderFilterSelector.getIsPending);
  const data = useSelector(financeOrderFilterSelector.getData);
  const pagination = useSelector(financeOrderFilterSelector.getPagination);
  const totalCount = useSelector(financeOrderFilterSelector.getTotalCount);

  useEffect(() => {
    dispatch(Creators.getFinanceOrderFilterRequest());
  }, [dispatch]);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => dispatch(Creators.updateFinanceOrderFilterPagination({ currentPage, rowsPerPage }));

  return (
    <AntTable
      title={t('FILTERED_ORDERS')}
      className={classes.orderTable}
      data={data}
      columns={columns}
      loading={isPending}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      total={totalCount}

    />
  );
};

export { Table };
