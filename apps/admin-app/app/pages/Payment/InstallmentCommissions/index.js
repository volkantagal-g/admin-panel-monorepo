import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Tabs } from 'antd';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Header, Table, Filter } from './components';
import { cardInstallmentCountsSelector, cardUserTypeSelector } from './redux/selectors';
import { modifiedDataExistModal } from './utils';

const reduxKey = REDUX_KEY.INSTALLMENT_COMMISSIONS;

const InstallmentCommissionsPage = () => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  const cardInstallmentCountsModifiedData = useSelector(cardInstallmentCountsSelector.getModifiedInstallments);
  const cardUserType = useSelector(cardUserTypeSelector.getCardUserType);

  const isModifiedDataExist = cardInstallmentCountsModifiedData?.length > 0;

  usePageViewAnalytics({ name: ROUTE.INSTALLMENT_COMMISSIONS.name, squad: ROUTE.INSTALLMENT_COMMISSIONS.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const handleTabChange = key => {
    dispatch(
      Creators.updateCardUserTypeTabRequest({ cardUserType: key }),
    );
  };

  const validateTabChanges = (key, event) => {
    if (isModifiedDataExist) {
      event.stopPropagation();
      modifiedDataExistModal({ t, onOk: () => handleTabChange(key) });
    }
    else {
      handleTabChange(key);
    }
  };

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.INSTALLMENTS')} />
      <Header />
      <Tabs
        activeKey={cardUserType}
        onTabClick={(key, event) => validateTabChanges(key, event)}
        tabBarStyle={{ background: 'white', padding: '4px 12px' }}
      >
        <Tabs.TabPane tab={t('installmentCommissionPage:PERSONAL')} key="PERSONAL" />
        <Tabs.TabPane tab={t('installmentCommissionPage:BUSINESS')} key="BUSINESS" />
      </Tabs>
      <Filter />
      <Table />

    </>
  );
};

export default InstallmentCommissionsPage;
