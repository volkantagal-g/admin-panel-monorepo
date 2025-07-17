import { useCallback, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '@shared/redux/selectors/auth';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInitDestroyContainer } from '../../helpers';
import useStyles from '../../style';
import Details from './components/Details';
import List from './components/List';
import ListHeader from './components/ListHeader';
import { Creators } from './redux/actions';
import reduxKey from './redux/key';
import reducer from './redux/reducer';
import saga from './redux/saga';
import {
  courierCrisesSelector,
  courierCrisisDeleteSelector,
} from './redux/selectors';

export default function Incidents({ courierId }) {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitDestroyContainer(dispatch, Creators);

  const classes = useStyles();
  const user = getUser();

  const shouldRefreshListAfterDelete = useSelector(courierCrisisDeleteSelector.getRefreshList);
  const isPending = useSelector(courierCrisesSelector.getIsPending);
  const isDeleting = useSelector(courierCrisisDeleteSelector.getIsPending);
  const isExportPending = useSelector(courierCrisesSelector.isExportPending);

  const currentUser = useMemo(
    () => ({ _id: user._id, name: user.name }),
    [user],
  );

  const { t } = useTranslation('courierPage');
  const [details, setDetails] = useState();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });
  const [filters, setFilters] = useState(undefined);

  const handlePaginationChange = newPagination => {
    setPagination(newPagination);
    dispatch(
      Creators.getCourierCrisesRequest({
        filters: { ...filters, courierId },
        pagination,
      }),
    );
  };

  const handleFiltersChange = newFilters => {
    setFilters(newFilters);
    dispatch(
      Creators.getCourierCrisesRequest({
        filters: { ...newFilters, courierId },
        pagination,
      }),
    );
  };

  useEffect(() => {
    if (shouldRefreshListAfterDelete) {
      dispatch(
        Creators.getCourierCrisesRequest({
          filters: { ...filters, courierId },
          pagination,
        }),
      );
    }
  }, [shouldRefreshListAfterDelete]); // eslint-disable-line

  const handleExport = useCallback(() => {
    dispatch(
      Creators.exportCourierCrisesRequest({ filters: { ...filters, courierId } }),
    );
  }, [dispatch, filters, courierId]);

  const handleDetailSubmission = ({ refresh, data }) => {
    if (refresh) {
      dispatch(
        Creators.getCourierCrisesRequest({
          filters: { ...filters, courierId },
          pagination,
        }),
      );
    }
    setDetails(data);
  };

  const disabled = isPending || isDeleting || isExportPending;

  return (
    <section className={classes.root} data-testid="courier-crisis-incident">
      <b>{t('CRISIS_MGMT.INCIDENTS')}</b>

      <ListHeader
        disabled={disabled}
        handleExport={handleExport}
        onSubmit={handleDetailSubmission}
        onNew={() => setDetails({ courierId })}
        handleFilterChange={handleFiltersChange}
      />

      <List
        disabled={disabled}
        user={currentUser}
        onEdit={setDetails}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        filters={filters}
      />

      {details && (
        <Details
          data={details}
          user={currentUser}
          onSubmit={handleDetailSubmission}
        />
      )}
    </section>
  );
}
