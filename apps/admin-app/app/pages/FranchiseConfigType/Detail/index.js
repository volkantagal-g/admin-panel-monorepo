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
import { Form } from '../components';
import { getFranchiseConfigTypeDetailSelector } from './redux/selector';
import { transformResponse } from '../utils';

const { Title } = Typography;
const reduxKey = REDUX_KEY.FRANCHISE_CONFIG_TYPE.DETAIL;

const ConfigTypeDetailPage = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { configId } = useParams();

  const { t } = useTranslation('franchiseConfigType');

  const pageTitle = t('DETAIL.PAGE_TITLE');

  useEffect(() => {
    dispatch(Creators.getFranchiseConfigTypeDetailRequest({ id: configId }));
  }, [dispatch, configId]);

  const data = useSelector(getFranchiseConfigTypeDetailSelector.getData);
  const isPending = useSelector(getFranchiseConfigTypeDetailSelector.getIsPending);
  const isFetching = useSelector(getFranchiseConfigTypeDetailSelector.getIsFetching);
  const fetchingError = useSelector(getFranchiseConfigTypeDetailSelector.getError);

  return (
    <>
      <Row justify="end" align="middle">
        <Col span={24}>
          <Title level={3}>{pageTitle}</Title>
        </Col>
      </Row>
      <Spin spinning={isFetching}>
        { fetchingError ? <Empty description={t('global:NOT_FOUND')} /> : <Form data={transformResponse(data)} isPending={isPending} isEditing /> }
      </Spin>
    </>
  );
};

export default ConfigTypeDetailPage;
