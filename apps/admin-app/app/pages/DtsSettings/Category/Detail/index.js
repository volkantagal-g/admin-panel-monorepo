import { useDispatch } from 'react-redux';
import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useEffect } from 'react';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import { Form } from './components';
import { ROUTE } from '@app/routes';

const { Title } = Typography;
const reduxKey = REDUX_KEY.DTS_SETTING.CATEGORY.DETAIL;

const DtsCategorySettingDetail = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({ name: ROUTE.DTS_CATEGORY_SETTING_DETAIL.name, squad: ROUTE.DTS_CATEGORY_SETTING_DETAIL.squad });

  const { t } = useTranslation();

  const pageTitle = t('PAGE_TITLE.DTS.SETTING.CATEGORY.DETAIL');

  useEffect(() => {
    dispatch(Creators.getDtsCategorySettingDetailRequest({ id }));
  }, [id, dispatch]);

  return (
    <>
      <Row justify="end" align="middle">
        <Col span={24}>
          <Title level={3}>{pageTitle}</Title>
        </Col>
      </Row>
      <Form id={id} />
    </>

  );
};

export default DtsCategorySettingDetail;
