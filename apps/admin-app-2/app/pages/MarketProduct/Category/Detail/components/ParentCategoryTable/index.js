import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';
import { getMarketProductCategoryByIdSelector } from '@app/pages/MarketProduct/Category/Detail/redux/selectors';

const ParentCategoryTable = () => {
  const { t } = useTranslation(['marketProductCategoryPage', 'global']);
  const columns = useMemo(() => tableColumns({ t }), [t]);
  const marketProductCategory = useSelector(getMarketProductCategoryByIdSelector.getData);
  const isGetCategoryPending = useSelector(getMarketProductCategoryByIdSelector.getIsPending);
  const isPending = isGetCategoryPending;

  return (
    <AntTableV2
      title={t('PARENT_CATEGORY')}
      data={[marketProductCategory?.parent]}
      columns={columns}
      loading={isPending}
      bordered
    />
  );
};

export default ParentCategoryTable;
