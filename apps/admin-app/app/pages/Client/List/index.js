import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';

import { ROUTE } from '@app/routes';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import saga from '@app/pages/Client/List/redux/saga';
import reducer from '@app/pages/Client/List/redux/reducer';
import { Creators } from '@app/pages/Client/List/redux/actions';
import {
  Filter,
  Table,
} from '@app/pages/Client/List/components';

const CustomerAgreement = () => {
  usePageViewAnalytics({ name: ROUTE.CLIENT_LIST.name, squad: ROUTE.CLIENT_LIST.squad });
  const dispatch = useDispatch();
  const [t] = useTranslation(['global']);

  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.CLIENT_LIST')} />
      <Filter />
      <Table />
    </>
  );
};

const reduxKey = REDUX_KEY.CLIENT.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(CustomerAgreement);
