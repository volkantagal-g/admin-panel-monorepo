import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Row, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import sagas from './redux/sagas';
import reducer from './redux/reducer';
import { locationWriteOffSelector } from './redux/selectors';
import { Creators } from './redux/action';
import Detail from './components/Detail';
import Products from './components/Products';
import ActionButtons from './components/ActionButtons';

const { Title } = Typography;

const New = () => {
  usePageViewAnalytics({ name: ROUTE.LOCATION_WRITE_OFF_DETAIL.name, squad: ROUTE.LOCATION_WRITE_OFF_DETAIL.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation('writeOffPage');
  const { id: locationWriteOffId } = useParams();
  const locationWriteOff = useSelector(locationWriteOffSelector.getData);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getLocationWriteOffRequest({ locationWriteOffId }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, locationWriteOffId]);

  const pageTitle = t('PAGE_TITLE.LOCATION_WRITE_OFF.DETAIL');

  return (
    <>
      <Row gutter={[8, 8]} align="middle">
        <Title level={3}>{pageTitle}</Title>
      </Row>
      <Card
        title={t('DETAIL')}
        bordered={false}
      >
        <Detail locationWriteOff={locationWriteOff} />
        <Products products={locationWriteOff.productsArrayWithProductAndStockInformations} />
        <ActionButtons
          status={locationWriteOff.status}
          onApprove={() => dispatch(Creators.approveLocationWriteOffRequest({ locationWriteOffId }))}
          onCancel={() => dispatch(Creators.cancelLocationWriteOffRequest({ locationWriteOffId }))}
        />
      </Card>

    </>
  );
};

const reduxKey = REDUX_KEY.LOCATION_WRITE_OFF.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(New);
