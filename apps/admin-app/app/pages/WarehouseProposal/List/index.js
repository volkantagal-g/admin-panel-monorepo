import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { PageHeader, PageFilter, Table } from './components';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { ROUTE } from '@app/routes';

const reduxKey = REDUX_KEY.WAREHOUSE_PROPOSAL.LIST;

const WarehouseProposalFilterPage = () => {
  usePageViewAnalytics({ name: ROUTE.WAREHOUSE_PROPOSAL_LIST.name, squad: ROUTE.WAREHOUSE_PROPOSAL_LIST.squad });
  const dispatch = useDispatch();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  useTranslation('warehouseProposalPage');

  return (
    <>
      <PageHeader />
      <PageFilter />
      <Table />
    </>
  );
};

export default WarehouseProposalFilterPage;
