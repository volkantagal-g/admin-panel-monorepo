import { useDispatch } from 'react-redux';
import { Col, Row } from 'antd';
import { useTheme } from 'react-jss';

import { useInitAndDestroyPage, usePageViewAnalytics, usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { ROUTE } from '@app/routes';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import { Form } from './components';
import { SEGMENT_PERM_KEYS, SEGMENT_TYPES } from '../constants';

const reduxKey = REDUX_KEY.WAREHOUSE_SEGMENT.NEW;

const CreateWarehouseSegment = () => {
  usePageViewAnalytics({ name: ROUTE.WAREHOUSE_SEGMENT_NEW.name, squad: ROUTE.WAREHOUSE_SEGMENT_NEW.squad });
  const theme = useTheme();

  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { Can } = usePermission();

  return (
    <>
      <Row gutter={[theme.spacing(3)]}>
        {SEGMENT_TYPES.map(type => (
          <Can key={type} permKey={permKey[SEGMENT_PERM_KEYS.NEW[type]]}>
            <Col span={24}>
              <Form formType={type} />
            </Col>
          </Can>
        ))}
      </Row>
    </>
  );
};

export default CreateWarehouseSegment;
