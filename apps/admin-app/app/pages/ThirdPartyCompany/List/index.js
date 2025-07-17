import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '@app/pages/ThirdPartyCompany/List/redux/actions';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

import {
  Header,
  Search,
  Table,
} from '@app/pages/ThirdPartyCompany/List/components';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

const ThirdPartyCompanyList = () => {
  usePageViewAnalytics({
    name: ROUTE.THIRD_PARTY_COMPANY_LIST.name,
    squad: ROUTE.THIRD_PARTY_COMPANY_LIST.squad,
  });
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });
  return (
    <>
      <PageTitleHeader title={t('PAGE_TITLE.THIRD_PARTY_COMPANY.LIST')} />
      <Header />
      <Search />
      <Table />
    </>
  );
};

const reduxKey = REDUX_KEY.THIRD_PARTY_COMPANY.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ThirdPartyCompanyList);
