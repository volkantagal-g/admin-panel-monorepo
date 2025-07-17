import { useCallback, useEffect } from 'react';
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
import { pickerCrisesLogsSelector } from './redux/selectors';

export default function Logs({ pickerId }) {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitDestroyContainer(dispatch, Creators);

  const classes = useStyles();
  const { t } = useTranslation('pickerDetailPage');

  const filters = useSelector(pickerCrisesLogsSelector.getFilters);
  const pagination = useSelector(pickerCrisesLogsSelector.getPagination);
  const isPending = useSelector(pickerCrisesLogsSelector.getIsPending);
  const isExportPending = useSelector(pickerCrisesLogsSelector.isLogPending);

  const refreshList = useCallback(() => {
    dispatch(
      Creators.getPickerCrisesLogsRequest({
        filters: { ...filters, pickerId },
        pagination,
      }),
    );
  }, [dispatch, pagination, filters, pickerId]);

  const handleExport = useCallback(() => {
    dispatch(
      Creators.exportPickerCrisesLogsRequest({ filters: { ...filters, pickerId } }),
    );
  }, [dispatch, filters, pickerId]);

  useEffect(() => {
    refreshList();
  }, [dispatch, pagination, filters, pickerId, refreshList]);

  const disabled = isPending || isExportPending;

  return (
    <section className={classes.root} data-testid="picker-crisis-log">
      <b>{t('CRISIS_MGMT.LOGS')}</b>

      <ListHeader disabled={disabled} handleExport={handleExport} />

      <List disabled={disabled} />
    </section>
  );
}
