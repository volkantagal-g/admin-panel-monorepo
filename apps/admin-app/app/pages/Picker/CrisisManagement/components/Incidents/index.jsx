import { useCallback, useEffect, useMemo, useState } from 'react';
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
  pickerCrisesSelector,
  pickerCrisisDeleteSelector,
} from './redux/selectors';

export default function Incidents({ pickerId }) {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitDestroyContainer(dispatch, Creators);

  const classes = useStyles();
  const user = getUser();

  const currentUser = useMemo(
    () => ({ _id: user._id, name: user.name }),
    [user],
  );

  const { t } = useTranslation('pickerDetailPage');
  const [details, setDetails] = useState();

  const filters = useSelector(pickerCrisesSelector.getFilters);
  const pagination = useSelector(pickerCrisesSelector.getPagination);
  const shouldRefreshListAfterDelete = useSelector(pickerCrisisDeleteSelector.getRefreshList);
  const isPending = useSelector(pickerCrisesSelector.getIsPending);
  const isDeleting = useSelector(pickerCrisisDeleteSelector.getIsPending);
  const isExportPending = useSelector(pickerCrisesSelector.isExportPending);

  const refreshList = useCallback(() => {
    dispatch(
      Creators.getPickerCrisesRequest({
        filters: { ...filters, pickerId },
        pagination,
      }),
    );
  }, [dispatch, pagination, filters, pickerId]);

  const handleExport = useCallback(() => {
    dispatch(
      Creators.exportPickerCrisesRequest({ filters: { ...filters, pickerId } }),
    );
  }, [dispatch, filters, pickerId]);

  const handleDetailSubmission = useCallback(
    ({ refresh, data }) => {
      if (refresh) {
        refreshList();
      }
      setDetails(data);
    },
    [refreshList],
  );

  useEffect(() => {
    refreshList();
  }, [
    dispatch,
    pagination,
    filters,
    pickerId,
    shouldRefreshListAfterDelete,
    refreshList,
  ]);

  const disabled = isPending || isDeleting || isExportPending;

  return (
    <section className={classes.root} data-testid="picker-crisis-incident">
      <b>{t('CRISIS_MGMT.INCIDENTS')}</b>

      <ListHeader
        disabled={disabled}
        handleExport={handleExport}
        onSubmit={handleDetailSubmission}
        onNew={() => setDetails({ pickerId })}
      />

      <List disabled={disabled} user={currentUser} onEdit={setDetails} />

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
