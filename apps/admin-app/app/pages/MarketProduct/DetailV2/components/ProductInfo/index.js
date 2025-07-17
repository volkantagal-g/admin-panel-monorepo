import { memo } from 'react';
import { get } from 'lodash';
import { useSelector } from 'react-redux';

import { HFSS_ENABLED_COUNTRY_CODES } from '@app/pages/MarketProduct/constants';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import BarcodesInfo from './components/BarcodesInfo';
import ProductNames from './components/ProductNames';
import HfssInfo from './components/HfssInfo';
import DetailsInfo from './components/DetailsInfo';
import IngredientsInfo from './components/IngredientsInfo';
import UsageInfo from './components/UsageInfo';
import AdditionalInfo from './components/AdditionalInfo';
import ProductTypeInfo from './components/ProductTypeInfo';
import AdditionalPropertyTables from './components/AdditionalPropertyTables';
import SapReferenceCodeInfo from './components/SapReferenceCodeInfo';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

const ProductInfo = memo(() => {
  const countryCode = get(useSelector(getSelectedCountryV2), 'code.alpha2');
  const isHfssEnabled = HFSS_ENABLED_COUNTRY_CODES.includes(countryCode);
  const { Can } = usePermission();

  return (
    <>
      <SapReferenceCodeInfo />
      <Can permKey={permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_BARCODE_EDIT}>
        <BarcodesInfo />
      </Can>
      <ProductTypeInfo />
      <ProductNames />
      {isHfssEnabled && (
        <HfssInfo />
      )}
      <DetailsInfo />
      <IngredientsInfo />
      <UsageInfo />
      <AdditionalInfo />
      <AdditionalPropertyTables />
    </>
  );
});

export default ProductInfo;
