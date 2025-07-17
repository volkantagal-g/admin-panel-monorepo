import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getLangKey } from '@shared/i18n';
import { tableColumns } from './config';
import { Creators } from '@app/pages/DtsSettings/Category/List/redux/actions';
import { getLimitAndOffset } from '@shared/utils/common';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { getDtsCategorySettingSelector } from '../../redux/selectors';

const DtsCategorySettingTable = () => {
  const { t } = useTranslation('dtsCategorySetting');
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const hasAccessToCategorySettingDetailPage = canAccess(permKey.PAGE_DTS_CATEGORY_SETTING_DETAIL);

  const data = useSelector(getDtsCategorySettingSelector.getData);
  const isPending = useSelector(getDtsCategorySettingSelector.getIsPending);
  const total = useSelector(getDtsCategorySettingSelector.getTotal);

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffect(() => {
    const { limit, offset } = getLimitAndOffset(pagination);
    dispatch(Creators.getDtsCategorySettingListRequest({ limit, offset }));
  }, [pagination, dispatch]);

  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          data={data}
          columns={tableColumns(getLangKey(), hasAccessToCategorySettingDetailPage)}
          loading={isPending}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
          total={total}
          totalBadge={{ total, label: t('DTS_CATEGORY_SETTING') }}
        />
      </Col>
    </Row>
  );
};

export default DtsCategorySettingTable;
