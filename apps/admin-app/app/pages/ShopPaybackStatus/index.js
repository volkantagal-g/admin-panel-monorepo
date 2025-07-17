import { useDispatch } from 'react-redux';

import { PageHeader, Col, Row } from 'antd';

import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import { usePageViewAnalytics, useInitAndDestroyPage } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import Form from './components/Form';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';

const reduxKey = REDUX_KEY.GL_SHOP_PAYBACK_STATUS;

const ShopPaybackStatus = () => {
  const { t } = useTranslation('shopPaybackStatus');

  const dispatch = useDispatch();

  usePageViewAnalytics({
    name: ROUTE.GL_SHOP_PAYBACK_STATUS.key,
    squad: ROUTE.GL_SHOP_PAYBACK_STATUS.squad,
  });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <Row>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('PAGE_TITLE')}
          />
        </Col>
      </Row>
      <Form />
    </>
  );
};

export default ShopPaybackStatus;
