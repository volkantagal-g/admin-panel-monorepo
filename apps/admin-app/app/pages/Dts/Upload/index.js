import { useTheme } from 'react-jss';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'antd';

import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import { Form } from './components';

const reduxKey = REDUX_KEY.DTS.UPLOAD;

const UploadDTSLogs = () => {
  const theme = useTheme();
  usePageViewAnalytics({ name: ROUTE.DTS_LOGS_UPDATE.name, squad: ROUTE.DTS_LOGS_UPDATE.squad });

  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <Row gutter={[theme.spacing(3)]}>
      <Col span={24}>
        <Form />
      </Col>
    </Row>
  );
};

export default UploadDTSLogs;
