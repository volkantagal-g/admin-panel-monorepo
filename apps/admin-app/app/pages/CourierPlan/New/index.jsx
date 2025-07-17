import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import FormWrapper from './components/Form';
import { formDataSelector } from './redux/selectors';

const { Title } = Typography;

const New = () => {
  usePageViewAnalytics({ name: ROUTE.E2E_COURIER_PLAN_NEW.key, squad: ROUTE.E2E_COURIER_PLAN_NEW.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const pageTitle = t('PAGE_TITLE.COURIER_PLAN.NEW');
  const isPending = useSelector(formDataSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Row justify="end" align="middle">
        <Col span={24}>
          <Title level={3}>{pageTitle}</Title>
        </Col>
      </Row>
      <FormWrapper isPending={isPending} />
    </>
  );
};

const reduxKey = REDUX_KEY.COURIER_PLAN.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(
  withReducer,
  withSaga,
)(New);
