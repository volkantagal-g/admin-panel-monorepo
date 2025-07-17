import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { get as lget } from 'lodash';

import { Creators } from '../../redux/actions';
import { getBadgesSelector, selectedBadgeSelector } from '../../redux/selectors';
import { getTableColumns } from './config';
import AntTable from '@shared/components/UI/AntTable';
import { getLimitAndOffset } from '@shared/utils/common';
import useStyles from './styles';

const DEFAULT_DATA = [];

const MarketProductBadgeListTable = () => {
  const dispatch = useDispatch();
  const data = useSelector(getBadgesSelector.getData) || DEFAULT_DATA;
  const isPending = useSelector(getBadgesSelector.getIsPending);
  const selectedBadge = useSelector(selectedBadgeSelector.getData);
  const { t } = useTranslation('marketProductBadgePage');
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });
  const classes = useStyles();

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const getRowClass = record => {
    const selectedBadgeId = lget(selectedBadge, '_id');
    const badgeId = lget(record, '_id');
    if (!!selectedBadgeId && !!badgeId && badgeId === selectedBadgeId) {
      return classes.primaryBg;
    }
    return '';
  };

  useEffect(() => {
    dispatch(Creators.getBadgesRequest({ ...getLimitAndOffset(pagination) }));
  }, [dispatch, pagination]);

  const handleBringProductsClick = badge => {
    dispatch(Creators.setSelectedBadge({ badge }));
  };

  return (
    <AntTable
      title={t('BADGES')}
      data={data}
      columns={getTableColumns({ handleBringProductsClick })}
      loading={isPending}
      pagination={pagination}
      rowClassName={getRowClass}
      onPaginationChange={handlePaginationChange}
    />
  );
};

export default MarketProductBadgeListTable;
