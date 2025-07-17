import { Typography } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';

import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import StepView from './components/StepView';
import { Creators } from './redux/actions';
import reduxKey from './redux/key';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { courierPlanSelector } from './redux/selectors';

const { Title } = Typography;

const Proceed = () => {
  usePageViewAnalytics({
    name: ROUTE.E2E_COURIER_PLAN_PROCEED.key,
    squad: ROUTE.E2E_COURIER_PLAN_PROCEED.squad,
  });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { getData, getIsPending } = courierPlanSelector(t);
  const { id } = useParams();
  const pageTitle = t('PAGE_TITLE.COURIER_PLAN.PROCEED');

  const plan = useSelector(getData);
  const isPending = useSelector(getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(Creators.getCourierPlanRequest({ id }));
    }
  }, [dispatch, id]);

  return (
    <>
      <Title level={3}>{pageTitle}</Title>
      <StepView plan={plan} isPending={isPending} />
    </>
  );
};

const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(Proceed);
