import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { Creators } from '../../redux/actions';
import { announcementListSelector } from '../../redux/selectors';
import { tableColumns } from './config';

const Table = ({ data, total, isPending, pagination, handlePaginationChange }) => {
  const { t } = useTranslation('fieldAnnouncementPage');
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const navigate = useNavigate();

  const isDeletePending = useSelector(
    announcementListSelector.getIsDeletePending,
  );

  const handleOnClickDeleteButton = useCallback(id => {
    dispatch(Creators.deleteAnnouncementRequest({ id }));
  }, [dispatch]);

  const handleOnClickDetailButton = useCallback(id => {
    navigate(`/field-announcement/detail/${id}`);
  }, [navigate]);

  const renderActionButtons = useCallback((id, record) => (
    <Space>
      {record.active && canAccess(permKey.PAGE_FIELD_ANNOUNCEMENT_LIST_COMPONENT_DELETE_ANNOUNCEMENT) && (
        <Button
          danger
          onClick={() => handleOnClickDeleteButton(id)}
          loading={isDeletePending}
        >
          {t('global:DELETE')}
        </Button>
      )}
      <Button onClick={() => handleOnClickDetailButton(id)}>
        {t('global:DETAIL')}
      </Button>
    </Space>
  ), [isDeletePending, t, canAccess, handleOnClickDeleteButton, handleOnClickDetailButton]);

  const columns = useMemo(() => tableColumns(t, renderActionButtons), [
    t,
    renderActionButtons,
  ]);

  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          rowKey="_id"
          data={data}
          columns={columns}
          total={total}
          loading={isPending}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
          isScrollableToTop={false}
        />
      </Col>
    </Row>
  );
};

export default Table;
