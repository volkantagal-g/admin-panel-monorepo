import { useDispatch, useSelector } from 'react-redux';
import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { ROUTE } from '@app/routes';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import { Form } from '../components';
import { createFranchiseConfigTypeSelector } from './redux/selector';

const { Title } = Typography;
const reduxKey = REDUX_KEY.FRANCHISE_CONFIG_TYPE.NEW;

const New = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({ name: ROUTE.FRANCHISE_CONFIG_TYPE_NEW.name, squad: ROUTE.FRANCHISE_CONFIG_TYPE_NEW.squad });

  const { t } = useTranslation('franchiseConfigType');

  const pageTitle = t('NEW.PAGE_TITLE');

  const isPending = useSelector(createFranchiseConfigTypeSelector.getIsPending);

  return (
    <>
      <Row justify="end" align="middle">
        <Col span={24}>
          <Title level={3}>{pageTitle}</Title>
        </Col>
      </Row>
      <Form isPending={isPending} />
    </>

  );
};

export default New;
