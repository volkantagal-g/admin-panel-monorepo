import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PageHeader, Col, Row, Button } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import { useInitAndDestroyPage, usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { getLimitAndOffset } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { kdsAuditFormTypeListSelector } from './redux/selectors';
import { Creators } from './redux/actions';
import { Table } from './components';

const reduxKey = REDUX_KEY.KDS.AUDIT_FORM_TYPE.LIST;

const List = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { Can } = usePermission();
  const { t } = useTranslation('kdsAuditFormTypePage');

  const data = useSelector(kdsAuditFormTypeListSelector.getData);
  const isPending = useSelector(kdsAuditFormTypeListSelector.getIsPending);
  const total = useSelector(kdsAuditFormTypeListSelector.getTotal);

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    if (currentPage !== pagination.currentPage || rowsPerPage !== pagination.rowsPerPage) {
      setPagination({ currentPage, rowsPerPage });
    }
  };

  const kdsAuditFormTypeListRequest = useCallback(() => {
    const { limit, offset } = getLimitAndOffset(pagination);
    dispatch(Creators.getKdsAuditFormTypeListRequest({ limit, offset }));
  }, [dispatch, pagination]);

  useEffect(() => {
    kdsAuditFormTypeListRequest();
  }, [kdsAuditFormTypeListRequest]);

  return (
    <>
      <Row>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('PAGE_TITLE.KDS.AUDIT_FORM_TYPE.LIST')}
          />
        </Col>
        <Can permKey={permKey.PAGE_KDS_AUDIT_FORM_TYPE_NEW}>
          <Col>
            <Link to="/kds/auditFormType/new">
              <Button type="primary" icon={<PlusOutlined />}>
                {t('NEW_AUDIT_FORM_TYPE')}
              </Button>
            </Link>
          </Col>
        </Can>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            isPending={isPending}
            data={data}
            total={total}
            pagination={pagination}
            handlePaginationChange={handlePaginationChange}
          />
        </Col>
      </Row>
    </>
  );
};

export default List;
