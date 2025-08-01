import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Row, Col } from 'antd';
import { useTheme } from 'react-jss';
import _ from 'lodash';

import {
  Header,
  BadgeDetailForm,
  ImageInfo,
} from './components';
import Spinner from '@shared/components/Spinner';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import CountrySelectionAlert from '@shared/containers/HelperContainer/CountrySelectionAlert';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { getBadgeSelector } from './redux/selectors';

const BadgeDetailPage = () => {
  usePageViewAnalytics({ name: ROUTE.MARKET_PRODUCT_BADGE_DETAIL.name, squad: ROUTE.MARKET_PRODUCT_BADGE_DETAIL.squad });
  const dispatch = useDispatch();
  const { id: badgeId } = useParams();
  const theme = useTheme();
  const badge = useSelector(getBadgeSelector.getData) || {};
  const isPending = useSelector(getBadgeSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getBadgeRequest({ id: badgeId }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, []);

  const countryId = _.get(getSelectedCountry(), '_id');
  const isCountryProduct = badge.country ? countryId === badge.country : true;
  return (
    <>
      <Header />
      {isPending && !badge._id ? (
        <Spinner />
      ) : (
        <>
          {isCountryProduct ? <Row gutter={[theme.spacing(3)]}>
            <Col xs={24} lg={20}>
              <BadgeDetailForm />
            </Col>
            <Col xs={24} lg={4}>
              <ImageInfo />
            </Col>
          </Row>
            :
            <CountrySelectionAlert
              itemCountryId={badge.country}
              translationKey="marketProductPage:ALERT_COUNTRY_BADGE_TITLE"
            />}
        </>)}
    </>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.BADGE.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(BadgeDetailPage);
