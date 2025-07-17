import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Button, Card, Space } from 'antd';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import CustomerSatisfactionRequestCreate from './components/CustomerSatisfactionRequestCreate';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

import { createCustomerSatisfactionRequestSelector } from './redux/selectors';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';

const reduxKey = REDUX_KEY.CUSTOMER_SATISFACTION_REQUEST.NEW;

const CustomerSatisfactionRequestPage = () => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  usePageViewAnalytics({
    name: ROUTE.CUSTOMER_SATISFACTION_REQUEST_NEW.name,
    squad: ROUTE.CUSTOMER_SATISFACTION_REQUEST_NEW.squad,
  });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  useEffect(() => {
    dispatch(CommonCreators.getWarehousesRequest());
  }, [dispatch]);
  const successData = useSelector(
    createCustomerSatisfactionRequestSelector.getIsSuccess,
  );
  return (
    <>
      <PageTitleHeader
        title={t(
          'customerSatisfactionPage:CUSTOMER_SATISFACTION_REQUEST',
        )}
      />
      <Card
        title={t('customerSatisfactionPage:CUSTOMER_SATISFACTION_REQUEST')}
        bordered={false}
      >
        {successData ? (
          <Space direction="vertical">
            <div>{t('customerSatisfactionPage:SUCCESS_CODE')}</div>
            <div>
              <CopyToClipboard message={successData._id} />
            </div>
            <Button
              onClick={() => dispatch(Creators.resetCreateRequest())}
              type="primary"
            >
              {t('customerSatisfactionPage:MAKE_NEW_REQUEST')}
            </Button>
          </Space>
        ) : (
          <CustomerSatisfactionRequestCreate />
        )}
      </Card>
    </>
  );
};

export default CustomerSatisfactionRequestPage;
