import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Row, Col } from 'antd';
import { useTheme } from 'react-jss';
import _ from 'lodash';

import {
  Header,
  MarketProductCategoryDetailForm,
  ImageInfo,
  AddtionalInfoDetailForm,
  SubCategoryTable,
  ParentCategoryTable,
} from './components';
import { PRODUCT_CATEGORY_TYPE, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getMarketProductCategoryByIdSelector } from '@app/pages/MarketProduct/Category/Detail/redux/selectors';
import Spinner from '@shared/components/Spinner';
import CountrySelectionAlert from '@shared/containers/HelperContainer/CountrySelectionAlert';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

const MarketProductCategoryDetailPage = () => {
  usePageViewAnalytics({
    name: ROUTE.MARKET_PRODUCT_CATEGORY_DETAIL.name,
    squad: ROUTE.MARKET_PRODUCT_CATEGORY_DETAIL.squad,
  });
  const dispatch = useDispatch();
  const { id: marketProductCategoryId } = useParams();
  const theme = useTheme();
  const marketProductCategory = useSelector(getMarketProductCategoryByIdSelector.getData);
  const isPending = useSelector(getMarketProductCategoryByIdSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getMarketProductCategoryByIdRequest({ id: marketProductCategoryId }));
    dispatch(CommonCreators.getMarketProductCategoriesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, marketProductCategoryId]);

  const countryId = _.get(getSelectedCountry(), '_id');
  const isCountryCategory = countryId === marketProductCategory.country;
  const {
    isSubCategory,
    parent,
  } = marketProductCategory;

  const isAdditionalFormVisible = !isSubCategory || (parent?.type === PRODUCT_CATEGORY_TYPE.PERSONAL);

  return (
    <>
      <Header />
      {isPending && !marketProductCategory._id ? (
        <Spinner />
      ) : (
        <div>
          {isCountryCategory ? (
            <Row gutter={[theme.spacing(3)]}>
              <Col xs={24} lg={12}>
                <MarketProductCategoryDetailForm />
                {isAdditionalFormVisible && <AddtionalInfoDetailForm />}
                {!isSubCategory && <SubCategoryTable />}
                {isSubCategory && <ParentCategoryTable />}
              </Col>
              <Col xs={24} lg={12}>
                <ImageInfo />
              </Col>
            </Row>
          ) : (
            <CountrySelectionAlert
              itemCountryId={marketProductCategory.country}
              translationKey="marketProductCategoryPage:ALERT_COUNTRY_CATEGORY_TITLE"
            />
          )}
        </div>
      )}
    </>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.CATEGORY.DETAIL;
const withSaga = injectSaga({
  key: reduxKey,
  saga,
});
const withReducer = injectReducer({
  key: reduxKey,
  reducer,
});

export default compose(withReducer, withSaga)(MarketProductCategoryDetailPage);
