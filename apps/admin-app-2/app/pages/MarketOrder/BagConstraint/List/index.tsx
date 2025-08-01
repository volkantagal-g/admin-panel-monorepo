import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Col, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import injectReducer from '@shared/utils/injectReducer';
import saga from '../redux/saga';
import { Creators } from '../redux/actions';
import reducer from '../redux/reducer';
import injectSaga from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { Header, BagConstraintsTable } from './components';
import { ROUTE } from '@app/routes';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import permKey from '@shared/shared/permKey.json';

function BagConstraints() {
  const dispatch = useDispatch();
  const { t } = useTranslation('bagConstraintsPage');

  useEffect(() => {
    dispatch(Creators.getMasterCategoriesRequest({}));
    dispatch(Creators.getBagConstraintsRequest({}));
  }, [dispatch]);

  return (
    <Row data-testid="bag-constraint" justify="space-between" align="middle">
      <Header />
      <Col>
        <RedirectButtonV2
          iconComponent={<PlusOutlined />}
          to={ROUTE.GETIR_MARKET_BAG_CONSTRAINT_NEW.path}
          text={t('ADD_NEW_CONSTRAINT')}
          target="_self"
          permKey={permKey.PAGE_GETIR_MARKET_BAG_CONSTRAINT_NEW}
        />
      </Col>
      <Col span={24} style={{ overflow: 'auto' }}>
        <Row>
          <Col span={24}>
            <BagConstraintsTable />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
const reduxKey = REDUX_KEY.BAG_CONSTRAINTS;

const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });
export default compose(withReducer, withSaga)(BagConstraints);
