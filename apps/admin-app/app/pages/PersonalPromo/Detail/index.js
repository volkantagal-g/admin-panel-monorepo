/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col } from 'antd';

import moment from 'moment';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { PROMO_STATUS, REDUX_KEY } from '@shared/shared/constants';
import reducer from '@app/pages/PersonalPromo/Detail/redux/reducers';
import saga from '@app/pages/PersonalPromo/Detail/redux/sagas';
import { personalPromoSelector } from '@app/pages/PersonalPromo/Detail/redux/selector';
import { Creators } from '@app/pages/PersonalPromo/Detail/redux/actions';
import { Creators as FoodOrderCreators } from '@app/pages/GetirFood/OrderDetail/redux/actions';
import Spinner from '@shared/components/Spinner';
import { toFakeLocalTime } from '@shared/utils/dateHelper';

import { Header, CardInformation } from './components';
import useQuery from '@shared/shared/hooks/useQuery';
import foodOrderDetailReducer from '@app/pages/GetirFood/OrderDetail/redux/reducer';
import foodOrderDetailSaga from '@app/pages/GetirFood/OrderDetail/redux/saga';

const reduxKey = REDUX_KEY.PROMO.PERSONAL_DETAIL;
const foodOrderReduxKey = REDUX_KEY.FOOD_ORDER.DETAIL;

const Loading = () => (
  <Col span={24}>
    <Spinner />
  </Col>
);

const DiscountDetail = () => {
  const { promoId } = useParams();
  const query = useQuery();

  const dispatch = useDispatch();
  const personalPromo = useSelector(personalPromoSelector.getData);
  const isPending = useSelector(personalPromoSelector.getIsPending);

  const [validUntilEdition, setValidUntilEdition] = useState(null);

  useInjectReducer({ key: reduxKey, reducer });
  useInjectReducer({ key: foodOrderReduxKey, reducer: foodOrderDetailReducer });
  useInjectSaga({ key: reduxKey, saga });
  useInjectSaga({ key: foodOrderReduxKey, saga: foodOrderDetailSaga });
  useInitAndDestroyPage({ dispatch, Creators });
  useInitAndDestroyPage({ dispatch, Creators: FoodOrderCreators });

  usePageViewAnalytics({
    name: ROUTE.GETIR_PERSONAL_PROMO_DETAIL.name,
    squad: ROUTE.GETIR_PERSONAL_PROMO_DETAIL.squad,
  });

  useEffect(() => {
    dispatch(Creators.getPersonalPromoRequest({ promoId }));
  }, [promoId, dispatch]);

  useEffect(() => {
    // Checks if foodOrderId query param is valid
    const orderDetailId = query.get('foodOrderId');
    if (orderDetailId) {
      dispatch(FoodOrderCreators.getOrderDetailRequest({ orderDetailId }));
    }

    return () => {
      dispatch(FoodOrderCreators.destroyPage());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const editValidUntilDate = () => {
    dispatch(
      Creators.updatePersonalPromoDatesRequest({
        promoId,
        validFrom: moment(personalPromo.validFrom).valueOf(),
        validUntil: toFakeLocalTime(
          validUntilEdition || moment(personalPromo.validUntil).valueOf(),
        ),
        promoCode: personalPromo.code,
      }),
    );
  };

  const onStatusChange = () => {
    dispatch(
      Creators.updatePersonalPromoStatusRequest({
        promoId,
        status: PROMO_STATUS.INACTIVE,
      }),
    );
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <CardInformation
        promo={personalPromo}
        validUntilEdited={validUntilEdition}
        handleValidUntil={setValidUntilEdition}
        onEdit={editValidUntilDate}
        onStatusChange={onStatusChange}
      />
    </>
  );
};

export default DiscountDetail;
