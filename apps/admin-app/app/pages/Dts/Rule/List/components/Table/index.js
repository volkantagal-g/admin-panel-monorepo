import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getDtsRuleListSelector } from '@app/pages/Dts/Rule/List/redux/selectors';
import { getLangKey } from '@shared/i18n';
import { tableColumns } from './config';
import { Creators } from '@app/pages/Dts/Rule/List/redux/actions';
import { getLimitAndOffset } from '@shared/utils/common';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const DtsRuleListTable = () => {
  const { t } = useTranslation('dtsRulePage');
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const hasAccessToRuleDetailPage = canAccess(permKey.PAGE_DTS_RULE_DETAIL);

  const data = useSelector(getDtsRuleListSelector.getData);
  const isPending = useSelector(getDtsRuleListSelector.getIsPending);
  const total = useSelector(getDtsRuleListSelector.getTotal);

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffect(() => {
    const { limit, offset } = getLimitAndOffset(pagination);
    dispatch(Creators.getDtsRuleListRequest({ limit, offset }));
  }, [pagination, dispatch]);

  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          data={data}
          columns={tableColumns(getLangKey(), hasAccessToRuleDetailPage)}
          loading={isPending}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
          total={total}
          totalBadge={{ total, label: t('DTS_RULES') }}
        />
      </Col>
    </Row>
  );
};

export default DtsRuleListTable;
