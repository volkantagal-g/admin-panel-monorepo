import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import {
  ThirdPartyCompanyNewHeader,
  ThirdPartyCompanyNewForm,
} from '@app/pages/ThirdPartyCompany/New/components';

const ThirdPartyCompanyNew = () => {
  usePageViewAnalytics({
    name: ROUTE.THIRD_PARTY_COMPANY_NEW.name,
    squad: ROUTE.THIRD_PARTY_COMPANY_NEW.squad,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <ThirdPartyCompanyNewHeader />
      <ThirdPartyCompanyNewForm />
    </>
  );
};

const reduxKey = REDUX_KEY.THIRD_PARTY_COMPANY.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ThirdPartyCompanyNew);
