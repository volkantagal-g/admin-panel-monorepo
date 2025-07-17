import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../../redux/actions';
import { Creators as CreatorsLogs } from '../../../Logs/redux/actions';
import { pickerCrisesSelector } from '../../redux/selectors';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';
import { usePermission } from '@shared/hooks';
import useStyles from './styles';

export default function List({ user: deletedBy, disabled, onEdit }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { Can } = usePermission();
  const { t } = useTranslation(['pickerDetailPage']);

  const data = useSelector(pickerCrisesSelector.getData);
  const count = useSelector(pickerCrisesSelector.getCount);
  const pagination = useSelector(pickerCrisesSelector.getPagination);

  const handlePaginationChange = newPagination => {
    dispatch(Creators.changePickerCrisesPagination(newPagination));
  };

  const handleLogs = useCallback(
    ({ cardNumber }) => {
      dispatch(CreatorsLogs.changePickerCrisesLogsFilters({ cardNumbers: [cardNumber] }));
    },
    [dispatch],
  );

  const handleDelete = useCallback(
    ({ _id: id }) => {
      dispatch(Creators.deletePickerCrisisRequest({ id, deletedBy }));
    },
    [dispatch, deletedBy],
  );

  const columns = useMemo(
    () => tableColumns({
      t,
      Can,
      onEdit,
      classes,
      onLogs: handleLogs,
      onDelete: handleDelete,
    }),
    [t, Can, classes, onEdit, handleLogs, handleDelete],
  );

  return (
    <AntTableV2
      data={data}
      total={count}
      columns={columns}
      loading={disabled}
      pagination={pagination}
      isScrollableToTop={false}
      onPaginationChange={handlePaginationChange}
    />
  );
}
