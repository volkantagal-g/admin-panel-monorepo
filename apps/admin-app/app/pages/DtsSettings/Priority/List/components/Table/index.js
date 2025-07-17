import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getDtsPrioritySettingListSelector } from '../../redux/selectors';
import { getLangKey } from '@shared/i18n';
import { tableColumns } from './config';
import { Creators } from '../../redux/actions';
import { getLimitAndOffset } from '@shared/utils/common';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const DtsPrioritySettingListTable = () => {
  const { t } = useTranslation('dtsPrioritySettingPage');
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const hasAccessToDetailPage = canAccess(permKey.PAGE_DTS_PRIORITY_SETTING_DETAIL);

  const data = useSelector(getDtsPrioritySettingListSelector.getData);
  const isPending = useSelector(getDtsPrioritySettingListSelector.getIsPending);
  const total = useSelector(getDtsPrioritySettingListSelector.getTotal);

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffect(() => {
    const { limit, offset } = getLimitAndOffset(pagination);
    dispatch(Creators.getDtsPrioritySettingListRequest({ limit, offset }));
  }, [pagination, dispatch]);

  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          data={data}
          columns={tableColumns(getLangKey(), hasAccessToDetailPage)}
          loading={isPending}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
          total={total}
          totalBadge={{ total, label: t('DTS_PRIORITY_SETTING') }}
        />
      </Col>
    </Row>
  );
};

export default DtsPrioritySettingListTable;
