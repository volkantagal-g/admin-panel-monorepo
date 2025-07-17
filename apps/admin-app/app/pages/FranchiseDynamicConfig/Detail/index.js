import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography, Row, Col, Spin, Empty } from 'antd';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import { Form } from './components';
import { getFranchiseConfigDetailSelector } from './redux/selector';

const { Title } = Typography;
const reduxKey = REDUX_KEY.FRANCHISE_CONFIG.DETAIL;

const Detail = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { id } = useParams();

  const { t } = useTranslation('franchiseDynamicConfig');

  const pageTitle = t('DETAIL.PAGE_TITLE');

  useEffect(() => {
    dispatch(Creators.getFranchiseDynamicConfigDetailRequest({ id }));
  }, [dispatch, id]);

  const data = useSelector(getFranchiseConfigDetailSelector.getData);
  const isPending = useSelector(getFranchiseConfigDetailSelector.getIsPending);
  const fetchingError = useSelector(getFranchiseConfigDetailSelector.getError);
  const fields = useSelector(getFranchiseConfigDetailSelector.getFields);
  const fieldName = useSelector(getFranchiseConfigDetailSelector.getFieldName);

  return (
    <>
      <Row justify="end" align="middle">
        <Col span={24}>
          <Title level={3}>{pageTitle}</Title>
        </Col>
      </Row>
      <Spin spinning={isPending}>
        { fetchingError ? <Empty description={t('global:NOT_FOUND')} /> : <Form data={data} fieldName={fieldName} fields={fields} isPending={isPending} /> }
      </Spin>
    </>
  );
};

export default Detail;
