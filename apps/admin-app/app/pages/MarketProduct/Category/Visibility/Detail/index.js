import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import { Alert } from 'antd';
import { useTranslation } from 'react-i18next';

import {
  Header,
  WeekMinPickerInfo,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getMarketProductCategoryAvailableTimeSelector } from '@app/pages/MarketProduct/Category/Visibility/Detail/redux/selectors';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

const MarketProductCategoryVisibilityDetailPage = () => {
  usePageViewAnalytics({
    name: ROUTE.MARKET_PRODUCT_CATEGORY_VISIBILITY_DETAIL.name,
    squad: ROUTE.MARKET_PRODUCT_CATEGORY_VISIBILITY_DETAIL.squad,
  });
  const dispatch = useDispatch();
  const { id: categoryAvailableTimeId } = useParams();
  const { t } = useTranslation('marketProductCategoryVisibilityPage');

  const currentCategoryAvailableTime = useSelector(getMarketProductCategoryAvailableTimeSelector.getData);
  const isPending = useSelector(getMarketProductCategoryAvailableTimeSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(CommonCreators.getMarketProductCategoriesRequest());
    dispatch(CommonCreators.getWarehousesRequest());
    dispatch(Creators.getMarketProductCategoryAvailableTimeRequest({ id: categoryAvailableTimeId }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, []);

  return (
    <>
      <Header />
      {isPending || currentCategoryAvailableTime._id ? (
        <WeekMinPickerInfo />
      ) : (
        <Alert message={t('CATEGORY_VISIBILITY_NOT_FOUND')} type="warning" />
      )}
    </>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.CATEGORY.VISIBILITY.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketProductCategoryVisibilityDetailPage);
