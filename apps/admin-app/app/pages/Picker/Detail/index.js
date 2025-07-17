import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Row, Space, Typography } from 'antd';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import PickerDetail from './components/PickerDetail';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import ActiveButton from './components/ActiveButton';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { pickerDetailSelector } from './redux/selectors';
import JsonButton from './components/JsonButton';

const reduxKey = REDUX_KEY.PICKER.DETAIL;
const { Title } = Typography;
const PickerDetailPage = () => {
  const { t } = useTranslation('pickerDetailPage');

  const dispatch = useDispatch();
  const { id } = useParams();

  const pickerDetailData = useSelector(pickerDetailSelector.getData);
  usePageViewAnalytics({
    name: ROUTE.PICKER_DETAIL.name,
    squad: ROUTE.PICKER_DETAIL.squad,
  });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  useEffect(() => {
    dispatch(
      Creators.getPickerDetailRequest({
        id,
        fields:
          'createdAt warehouse tc homeAddress name gsm picURL' +
          ' person pickerType country username isActivated countryGsmCode personalGsm personEmploymentType' +
          ' isAdmin isInventoryChecker isOperationApprover employmentType isGorillasEmployee',
      }),
    );

    dispatch(CommonCreators.getWarehousesRequest());
    dispatch(Creators.getPickerJobRequest({ id }));
  }, [dispatch, id]);

  return (
    <>
      <PageTitleHeader title={t('PAGE_TITLE_PICKER_DETAIL')} />
      <Row justify="space-between" align="middle">
        <Space>
          <Title level={3}>{pickerDetailData?.name}</Title>
          <JsonButton data={pickerDetailData} />
        </Space>
        <ActiveButton id={id} />
      </Row>
      <PickerDetail />
    </>
  );
};

export default PickerDetailPage;
