import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInitDestroyContainer } from '../../helpers';
import useStyles from '../../style';
import List from './components/List';
import ListHeader from './components/ListHeader';
import { Creators } from './redux/actions';
import reduxKey from './redux/key';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { courierCrisesLogsSelector } from './redux/selectors';

export default function Logs({ courierId }) {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitDestroyContainer(dispatch, Creators);

  const classes = useStyles();
  const { t } = useTranslation('courierPage');

  const [filters, setFilters] = useState({ cardNumbers: undefined });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });

  const handlePaginationChange = newPagination => {
    setPagination(newPagination);
    dispatch(
      Creators.getCourierCrisesLogsRequest({
        filters: { ...filters, courierId },
        pagination: newPagination,
      }),
    );
  };

  const handleFilterChange = newFilter => {
    setFilters(newFilter);
    dispatch(
      Creators.getCourierCrisesLogsRequest({
        filters: { ...newFilter, courierId },
        pagination,
      }),
    );
  };

  const isPending = useSelector(courierCrisesLogsSelector.getIsPending);
  const isExportPending = useSelector(courierCrisesLogsSelector.isLogPending);

  const handleExport = useCallback(() => {
    dispatch(
      Creators.exportCourierCrisesLogsRequest({ filters: { ...filters, courierId } }),
    );
  }, [dispatch, filters, courierId]);

  const disabled = isPending || isExportPending;

  return (
    <section className={classes.root} data-testid="courier-crisis-log">
      <b>{t('CRISIS_MGMT.LOGS')}</b>

      <ListHeader
        disabled={disabled}
        handleExport={handleExport}
        filters={filters}
        handleFilterChange={handleFilterChange}
      />

      <List disabled={disabled} pagination={pagination} handlePaginationChange={handlePaginationChange} />
    </section>
  );
}
