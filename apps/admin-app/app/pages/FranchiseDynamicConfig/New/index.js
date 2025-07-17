import { useDispatch, useSelector } from 'react-redux';
import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { useEffect } from 'react';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { ROUTE } from '@app/routes';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import { Form } from './components';
import { createFranchiseDynamicConfigSelector, getFranchiseDynamicConfigTypeListSelector } from './redux/selectors';

const { Title } = Typography;
const reduxKey = REDUX_KEY.FRANCHISE_DYNAMIC_CONFIG.NEW;

const New = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({ name: ROUTE.FRANCHISE_CONFIG_NEW.name, squad: ROUTE.FRANCHISE_CONFIG_NEW.squad });

  const { t } = useTranslation('franchiseDynamicConfig');

  const pageTitle = t('NEW.PAGE_TITLE');

  const isPending = useSelector(createFranchiseDynamicConfigSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.getFranchiseDynamicConfigTypeListRequest());
  }, [dispatch]);

  const configTypes = useSelector(getFranchiseDynamicConfigTypeListSelector.getData);

  return (
    <>
      <Row justify="end" align="middle">
        <Col span={24}>
          <Title level={3}>{pageTitle}</Title>
        </Col>
      </Row>
      <Form configTypes={configTypes} isPending={isPending} />
    </>

  );
};

export default New;
