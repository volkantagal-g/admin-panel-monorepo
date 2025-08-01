import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import sagas from './redux/sagas';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import FormWrapper from './components/Form';
import { marketFranchisesSelector } from './redux/selectors';

const { Title } = Typography;

const Detail = () => {
  usePageViewAnalytics({ name: ROUTE.MARKET_FRANCHISE_DETAIL.name, squad: ROUTE.MARKET_FRANCHISE_DETAIL.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const marketFranchiseName = useSelector(marketFranchisesSelector.getName);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getSuppliersRequest());
    dispatch(CommonCreators.getCompaniesRequest());
    dispatch(Creators.getMarketFranchiseRequest({ id }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, []);

  const pageTitle = () => {
    const header = t('PAGE_TITLE.MARKET_FRANCHISE.DETAIL');
    const separator = marketFranchiseName && '-';
    return `${marketFranchiseName}${separator}${header}`;
  };

  return (
    <>
      <Row justify="end" align="middle">
        <Col span={24}>
          <Title level={3}>{pageTitle()}</Title>
        </Col>
      </Row>
      <FormWrapper />
    </>
  );
};

const reduxKey = REDUX_KEY.MARKET_FRANCHISE.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(
  withReducer,
  withSaga,
)(Detail);
