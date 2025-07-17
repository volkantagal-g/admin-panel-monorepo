import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getFranchiseLegalListSelector } from '@app/pages/FranchiseLegal/List/redux/selectors';
import { tableColumns } from './config';
import { Creators } from '@app/pages/FranchiseLegal/List/redux/actions';
import { getLimitAndOffset } from '@shared/utils/common';

const FranchiseLegalTable = () => {
  const { t } = useTranslation('franchiseLegalPage');
  const dispatch = useDispatch();

  const data = useSelector(getFranchiseLegalListSelector.getData);
  const isPending = useSelector(getFranchiseLegalListSelector.getIsPending);
  const isStatusChangePending = useSelector(getFranchiseLegalListSelector.getIsStatusChangePending);
  const total = useSelector(getFranchiseLegalListSelector.getTotal);

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffect(() => {
    const { limit, offset } = getLimitAndOffset(pagination);
    dispatch(Creators.getFranchiseLegalListRequest({ limit, offset }));
  }, [pagination, dispatch]);

  const handleStatusChange = ({ id, status }) => {
    dispatch(Creators.changeFranchiseLegalStatusRequest({ id, status }));
  };

  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          data={data}
          columns={tableColumns(handleStatusChange)}
          loading={isPending || isStatusChangePending}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
          total={total}
          totalBadge={{ total, label: t('LIST.FRANCHISE_LEGAL_AGREEMENTS') }}
        />
      </Col>
    </Row>
  );
};

export default FranchiseLegalTable;
