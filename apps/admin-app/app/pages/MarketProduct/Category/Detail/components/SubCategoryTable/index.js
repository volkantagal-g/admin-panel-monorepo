import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';
import { getMarketProductCategoryByIdSelector } from '@app/pages/MarketProduct/Category/Detail/redux/selectors';
import { getMarketProductCategoriesSelector } from '@shared/redux/selectors/common';

const SubCategoryTable = () => {
  const { t } = useTranslation(['marketProductCategoryPage', 'global']);
  const columns = useMemo(() => tableColumns({ t }), [t]);
  const marketProductCategory = useSelector(getMarketProductCategoryByIdSelector.getData);
  const isGetCategoryPending = useSelector(getMarketProductCategoryByIdSelector.getIsPending);
  const categories = useSelector(getMarketProductCategoriesSelector.getData);
  const isGetCategoriesPending = useSelector(getMarketProductCategoriesSelector.getIsPending);
  const isPending = isGetCategoryPending || isGetCategoriesPending;
  const subCategoriesOfCategory = useMemo(
    () => categories
      .filter(category => !marketProductCategory.isSubCategory && !!category?.parent && category.parent === marketProductCategory?._id),
    [marketProductCategory, categories],
  );

  return (
    <AntTableV2
      title={t('SUB_CATEGORIES')}
      data={subCategoriesOfCategory}
      columns={columns}
      loading={isPending}
      bordered
    />
  );
};

export default SubCategoryTable;
