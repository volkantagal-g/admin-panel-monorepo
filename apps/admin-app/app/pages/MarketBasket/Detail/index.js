import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Col, Row } from 'antd';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { AddressInfo, BasketLogs, ClientInfo, ProductList, StoreInfo, BasketInfo } from './components';
import { marketBasketSelector } from './redux/selectors';
import Spinner from '@shared/components/Spinner';
import StatusInfo from './components/StatusInfo';

const reduxKey = REDUX_KEY.MARKET_BASKET.DETAIL;

const MarketBasketDetail = () => {
  const { t } = useTranslation('marketBasketListPage');
  const basketDetail = useSelector(marketBasketSelector.getData);
  const { client, warehouse, products, actions, address, device, createdAt, status, totalPriceText, totalPrice, orderId } = basketDetail ?? {};
  const basketInfo = {
    device,
    createdAt,
    status,
    products,
    totalPriceText,
    totalPrice,
    orderId,
  };
  const isPending = useSelector(marketBasketSelector.getIsPending);
  const dispatch = useDispatch();
  usePageViewAnalytics({
    name: ROUTE.MARKET_BASKET_DETAIL.name,
    squad: ROUTE.MARKET_BASKET_DETAIL.squad,
  });

  const { basketId } = useParams();

  useEffect(() => {
    dispatch(Creators.getMarketBasketRequest({ basketId }));
  }, [dispatch, basketId]);

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <div className="mx-2">
      {isPending ? <Spinner /> : (
        <>
          <PageTitleHeader title={t('PAGE_TITLE')} />
          <Row gutter={[24, 2]}>
            <Col span={24}>
              <StatusInfo basketInfo={basketDetail} />
            </Col>
            <Col span={16}>
              <Row>
                <Col span={24}>
                  <AddressInfo address={address} />
                </Col>
                <Col span={24}>
                  <BasketLogs actions={actions} />
                </Col>
                <Col span={24}>
                  <ProductList products={products} />
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row gutter={8}>
                <Col span={24}>
                  <BasketInfo basketInfo={basketInfo} />
                </Col>
                <Col span={24}>
                  <ClientInfo client={client} />
                </Col>
                <Col span={24}>
                  <StoreInfo warehouse={warehouse} />
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default MarketBasketDetail;
