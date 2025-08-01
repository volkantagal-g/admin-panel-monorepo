import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  getMarketProductsSelector,
  getMarketProductCategoriesSelector,
  getMarketProductSubCategoriesSelector,
  getSuppliersSelector,
} from '@shared/redux/selectors/common';

import { getClientListData } from '../../../redux/selectors';
import SingleSelect from '../SingleSelect';
import MultipleSelect from '../MultipleSelect';

const ProductSelect = ({ activeKey }) => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const products = useSelector(getMarketProductsSelector.getData);
  const categories = useSelector(getMarketProductCategoriesSelector.getData);
  const subCategories = useSelector(getMarketProductSubCategoriesSelector.getData);
  const productSubCategoriesIsPending = useSelector(getMarketProductSubCategoriesSelector.getIsPending);
  const productCategoriesIsPending = useSelector(getMarketProductCategoriesSelector.getIsPending);
  const productsIsPending = useSelector(getMarketProductsSelector.getIsPending);
  const suppliersIsPending = useSelector(getSuppliersSelector.getIsPending);
  const { manufacturers, suppliers } = useSelector(getSuppliersSelector.getSuppliersByTypeBreakdown);

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  return (
    <>
      <SingleSelect
        activeKey={activeKey}
        label={t('MANUFACTURER')}
        placeholder={t('MANUFACTURER')}
        clientListKey="manufacturer"
        value={data.manufacturer}
        tagKey="_id"
        tagValue="name"
        selectable={manufacturers}
        filterableData={{ products }}
        disabled={suppliersIsPending}
        allowClear
      />
      <SingleSelect
        activeKey={activeKey}
        label={t('SUPPLIER')}
        placeholder={t('SUPPLIER')}
        clientListKey="supplier"
        value={data.supplier}
        tagValue="name"
        tagKey="_id"
        selectable={suppliers}
        filterableData={{ products }}
        disabled={suppliersIsPending}
        allowClear
      />
      <SingleSelect
        activeKey={activeKey}
        label={t('CATEGORY')}
        placeholder={t('CATEGORY')}
        clientListKey="category"
        value={data.category}
        selectable={categories}
        tagValue="name"
        tagKey="_id"
        disabled={data.productCategoriesDisabled}
        filterableData={{ subCategories, products }}
        allowClear
        isLoading={productCategoriesIsPending}
      />
      <MultipleSelect
        activeKey={activeKey}
        label={t('SUB_CATEGORY')}
        placeholder={t('SUB_CATEGORY')}
        clientListKey="subCategories"
        value={data.subCategories}
        selectable={data.selectableSubCategories}
        tagValue="name"
        tagKey="_id"
        disabled={data.productSubCategoriesDisabled}
        filterableData={{ products }}
        allowClear
        isLoading={productSubCategoriesIsPending}
      />
      <MultipleSelect
        activeKey={activeKey}
        value={data.products}
        label={t('PRODUCTS')}
        clientListKey="products"
        selectable={data.selectableProducts}
        placeholder={t('PRODUCTS')}
        description={t('PRODUCTS_DESCRIPTION')}
        tagValue="fullName"
        showSelectAllButton={!(data.productSubCategoriesDisabled && data.productCategoriesDisabled)}
        allowClear
        altSelectable={products}
        showCSVImporter
        isLoading={productsIsPending}
      />
    </>
  );
};

export default ProductSelect;
