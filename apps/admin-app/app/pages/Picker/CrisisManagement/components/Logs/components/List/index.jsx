import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../../redux/actions';
import { pickerCrisesLogsSelector } from '../../redux/selectors';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';

export default function List({ disabled }) {
  const { t } = useTranslation(['pickerDetailPage']);
  const dispatch = useDispatch();

  const data = useSelector(pickerCrisesLogsSelector.getData);
  const count = useSelector(pickerCrisesLogsSelector.getCount);
  const pagination = useSelector(pickerCrisesLogsSelector.getPagination);

  const handlePaginationChange = newPagination => {
    dispatch(
      Creators.changePickerCrisesLogsPagination(newPagination),
    );
  };

  const columns = useMemo(() => tableColumns(t), [t]);

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
