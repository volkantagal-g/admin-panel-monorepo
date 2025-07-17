import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';

import { Row, Skeleton } from 'antd';

import { Content, Tabs } from '@shared/components/GUI';
import Header from './components/Header';
import SummaryInfo from './components/SummaryInfo';

import { PRODUCT_DETAIL_TAB_ID } from '@app/pages/MarketProduct/constants';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators } from '@app/pages/MarketingApproval/Detail/redux/actions';
import reducer from '@app/pages/MarketingApproval/Detail/redux/reducer';
import saga from '@app/pages/MarketingApproval/Detail/redux/saga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { getProductActivationValidationErrorsSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { getInitialValues, validate } from './formHelper';

import { getTabItems } from './components/TabItems';
import { generatedContentSelector } from '@app/pages/MarketingApproval/Detail/redux/selectors';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

const reduxKey = REDUX_KEY.MARKETING_APPROVAL.LIST;

const MarketingApprovalDetail = () => {
  const { t } = useTranslation('marketingApproval');
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { promoId } = useParams();
  const { Can } = usePermission();

  const activeTab = searchParams.get('tab') || PRODUCT_DETAIL_TAB_ID.GENERAL_INFO;

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const [activeKey, setActiveKey] = useState(activeTab);

  const generatedContent = useSelector(generatedContentSelector.getData);
  const isGeneratedContentPending = useSelector(generatedContentSelector.getIsPending);
  const validationErrors = useSelector(getProductActivationValidationErrorsSelector.getValidationErrors);

  const formik = useFormik({
    enableReinitialize: true,
    // validate: validate(validationSchema),
    initialValues: getInitialValues(generatedContent),
    onSubmit: values => {
      if (validate(values)) {
        dispatch(Creators.updateNotificationsRequest({ promoId, content: values.notifications }));
      }
      else {
        dispatch(ToastCreators.error({ message: t('VALIDATION') }));
      }
    },
  });

  const { handleSubmit, values, setFieldValue } = formik;

  const memoizedTabsItems = useMemo(() => {
    return getTabItems({ t, validationErrors, values, setFieldValue });
  }, [t, validationErrors, values, setFieldValue]);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(
      Creators.getGeneratedContentForPromoIdRequest({ promoId }),
    );
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, promoId]);

  const handleTabChange = key => {
    setActiveKey(key);
    setSearchParams({ tab: key });
  };

  return (
    <Can permKey={permKey.PAGE_MARKETING_APPROVAL_DETAIL}>
      <Content>
        <Header status={generatedContent?.status} isGeneratedContentPending={isGeneratedContentPending} />
        <SummaryInfo
          isGeneratedContentPending={isGeneratedContentPending}
          handleSubmit={handleSubmit}
          promoCode={generatedContent?.promoCode}
          countryCode={generatedContent?.countryCode}
          status={generatedContent?.status}
          description={generatedContent?.description}
          domains={generatedContent?.domains}
        />
        {isGeneratedContentPending ? (
          <Row className="bg-white p-4">
            <Skeleton active paragraph={{ rows: 4 }} />
          </Row>
        ) : (
          <Tabs items={memoizedTabsItems} onChange={handleTabChange} activeKey={activeKey} destroyInactiveTabPane />
        ) }

      </Content>
    </Can>
  );
};

export default MarketingApprovalDetail;
