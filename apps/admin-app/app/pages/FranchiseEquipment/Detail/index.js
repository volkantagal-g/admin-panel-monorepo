import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import { Form, Logs } from './components';
import { getLimitAndOffset } from '@shared/utils/common';
import { franchiseEquipmentLogsSelector } from './redux/selectors';

const { Title } = Typography;
const reduxKey = REDUX_KEY.FRANCHISE_EQUIPMENT.DETAIL;

const Detail = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const { id } = useParams();
  const { t } = useTranslation();
  const pageTitle = t('PAGE_TITLE.FRANCHISE_EQUIPMENT.DETAIL');

  const franchiseEquipmentLogs = {
    data: useSelector(franchiseEquipmentLogsSelector.getData),
    isPending: useSelector(franchiseEquipmentLogsSelector.getIsPending),
    total: useSelector(franchiseEquipmentLogsSelector.getTotal),
  };

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffect(() => {
    dispatch(Creators.getFranchiseEquipmentDetailRequest({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    const { limit, offset } = getLimitAndOffset(pagination);
    dispatch(Creators.getFranchiseEquipmentLogsRequest({ id, limit, offset }));
  }, [pagination, dispatch, id]);

  return (
    <>
      <Row justify="end" align="middle">
        <Col span={24}>
          <Title level={3}>{pageTitle}</Title>
        </Col>
      </Row>
      <Form id={id} />
      <Logs
        id={id}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        franchiseEquipmentLogs={franchiseEquipmentLogs}
      />
    </>
  );
};

export default Detail;
