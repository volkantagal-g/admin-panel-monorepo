import { useDispatch } from 'react-redux';
import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { ROUTE } from '@app/routes';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import { Form } from './components';

const reduxKey = REDUX_KEY.MARKET_FRANCHISE.USER.ROLE_GROUP.NEW;

const NewMarketFranchiseUserRoleGroup = () => {
  usePageViewAnalytics({ name: ROUTE.MARKET_FRANCHISE_USER_ROLE_GROUP_NEW.name, squad: ROUTE.MARKET_FRANCHISE_USER_ROLE_GROUP_NEW.squad });
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <PageHeader
        className="p-0 page-title"
        title={t('PAGE_TITLE.MARKET_FRANCHISE_USER_ROLE_GROUP.NEW')}
      />
      <Form />
    </>
  );
};

export default NewMarketFranchiseUserRoleGroup;
