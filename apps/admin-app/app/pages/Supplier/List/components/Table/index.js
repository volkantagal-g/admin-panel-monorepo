import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../redux/actions';
import { suppliersSelector } from '../../redux/selectors';
import { tableColumns } from './config';
import AntTable from '@shared/components/UI/AntTable';

const SupplierListTable = () => {
  const dispatch = useDispatch();
  const data = useSelector(suppliersSelector.getData) || [];
  const isPending = useSelector(suppliersSelector.getIsPending) || false;
  const { t } = useTranslation('supplierPage');

  useEffect(() => {
    dispatch(Creators.getSuppliersRequest());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AntTable
      title={t('SUPPLIERS')}
      data={data}
      columns={tableColumns}
      loading={isPending}
    />
  );
};

export default SupplierListTable;
