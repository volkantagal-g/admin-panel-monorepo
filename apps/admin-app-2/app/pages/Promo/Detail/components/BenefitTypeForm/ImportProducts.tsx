import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import CsvImporter from '@shared/components/UI/CsvImporter';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  parseDiscountedPrice,
  validateProductsPayload,
  validateSupportRate,
} from '@app/pages/Promo/Detail/components/BenefitTypeForm/formHelper';
import { BenefitProduct, MarketProduct } from '@app/pages/Promo/types';
import { Creators } from '@app/pages/Promo/Detail/redux/actions';

import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { useValidSuppliers } from '@app/pages/Promo/Detail/components/BenefitTypeForm/config';
import { getMarketProductsByIdsSelector } from '@app/pages/Promo/Detail/redux/selectors';
import { marketProductSelector } from '@shared/containers/Marketing/Select/PromoProductSelect/redux/selectors';

type PropTypes = {
  setImportedProducts: (value: BenefitProduct[]) => void,
  isUpdatePending: boolean,
  isFormEditable: boolean
}

export function ImportProducts({ setImportedProducts, isUpdatePending, isFormEditable }: PropTypes) {
  const { t } = useTranslation('promoPage');
  const dispatch = useDispatch();
  const promo = useSelector(PromoDetailSlice.selectors.promo);
  const isLoading = useSelector(getMarketProductsByIdsSelector.getIsPending);
  const validSuppliers = useValidSuppliers();
  const isDiscountAmountAvailable = useSelector(PromoDetailSlice.selectors.isDiscountAmountAvailable);
  const marketProductsMap: Record<MongoIDType, MarketProduct> = useSelector(marketProductSelector.getMarketProductsMap);

  const handleProductsImport = ({ data: products }: { data: Record<string, string>[] }) => {
    if (!products.length) {
      return dispatch(
        ToastCreators.error({ message: t('ERR_INVALID_CSV_FILE') }),
      );
    }

    const error = validateProductsPayload(promo, products, t);

    if (error) {
      return dispatch(ToastCreators.error({ message: error }));
    }

    if (!products.every(product => !product.supplierSupportReferenceId || validSuppliers.some(
      supplier => supplier.supplierReferenceId === product.supplierSupportReferenceId?.toString(),
    ))) {
      return dispatch(
        ToastCreators.error({ message: t('ERR_INVALID_SUPPLIER') }),
      );
    }

    if (!products.every(product => !product.thirdPartyReferenceId || validSuppliers.some(
      supplier => supplier.supplierReferenceId === product.thirdPartyReferenceId?.toString(),
    ))) {
      return dispatch(
        ToastCreators.error({ message: t('ERR_INVALID_SUPPLIER') }),
      );
    }

    const productIds = new Set();
    const productsData: BenefitProduct[] = [];
    products.forEach(product => {
      const productId = product?.item;
      if (!productIds.has(productId)) {
        const productData = marketProductsMap?.[productId];

        productIds.add(productId);
        productsData.push({
          id: productId,
          fullName: productData?.fullName,
          picURL: productData?.picURL,
          saleLimit: parseInt(product.saleLimit, 10) || null,
          ...(isDiscountAmountAvailable && { discountedPrice: parseDiscountedPrice(product?.discountedPrice) }),
          supplierSupportReferenceId: product.supplierSupportReferenceId?.toString() ?? null,
          thirdPartyReferenceId: product.thirdPartyReferenceId?.toString() ?? null,
          alreadySold: 0,
          supplierSupport: validateSupportRate(product.supplierSupport),
          thirdPartySupport: validateSupportRate(product.thirdPartySupport),
        });
      }
    });
    setImportedProducts(productsData);
    return dispatch(
      Creators.getMarketProductsByIdsRequest({
        productIds: [...productIds],
        fields: 'name type isBundle',
      }),
    );
  };

  return (
    <CsvImporter
      onOkayClick={handleProductsImport}
      hasNestedHeaderKeys
      importButtonText={t('CONDITION_PRODUCTS.UPLOAD_CSV')}
      isButton
      loading={isLoading || isUpdatePending}
      disabled={!isFormEditable}
    />
  );
}
