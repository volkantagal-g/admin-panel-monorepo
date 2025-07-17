import { memo } from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';

import SaleRestriction from './components/SaleRestriction';
import AgeRestriction from './components/AgeRestriction';
import ProductSettings from './components/ProductSettings';
import MarketInfo from './components/MarketInfo';
import PositionInfo from './components/PositionInfo';
import DomainBasedStockInfo from './components/DomainBasedStockInfo';
import WeightInfo from '@app/pages/MarketProduct/DetailV2/components/GeneralInfo/components/WeightInfo';
import BundleInfo from './components/BundleInfo';
import { getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { MARKET_PRODUCT_TYPE } from '@shared/shared/constants';

const GeneralInfo = memo(() => {
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const isProductWeight = marketProduct?.type === MARKET_PRODUCT_TYPE.WEIGHT;

  return (
    <Row gutter={[20, 20]}>
      <Col sm={24} lg={16}>
        <MarketInfo />
        <PositionInfo />
        <DomainBasedStockInfo />
        {isProductWeight && (
          <WeightInfo />
        )}
        {marketProduct.isBundle && (
          <BundleInfo />
        )}
      </Col>
      <Col sm={24} lg={8}>
        <ProductSettings />
        <SaleRestriction />
        <AgeRestriction />
      </Col>
    </Row>
  );
});

export default GeneralInfo;
