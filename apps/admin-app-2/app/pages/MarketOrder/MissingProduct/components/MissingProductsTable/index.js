import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from 'react-redux';
import { useMemo, useState } from 'react';

import {
  filtersSelector,
  getMissingProductOrdersSelector,
} from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { getTableColumns } from './config';
import { usePermission } from '@shared/hooks';
import { getFilteredOrders } from '../../utils';
import FeedbackModal from '../FeedbackModal';
import { getUser } from '@shared/redux/selectors/auth';
import { Table } from '@shared/components/GUI';

function MissingProductsTable() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const user = getUser();
  const { t } = useTranslation('missingProductOrdersPage');
  const { canAccess } = usePermission();
  const dispatch = useDispatch();
  const data = useSelector(getMissingProductOrdersSelector.getData);
  const totalCount = useSelector(getMissingProductOrdersSelector.getCount);
  const isPending = useSelector(getMissingProductOrdersSelector.getIsPending);
  const { searchTerm, pagination, domainType } = useSelector(
    filtersSelector.getData,
  );

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    dispatch(Creators.setPagination({ currentPage, rowsPerPage }));
  };

  const onAddMhProblem = orderId => {
    dispatch(Creators.addMhProblemRequest({
      adminUser: user?._id,
      domainType,
      orderId,
    }));
  };

  const onToggleModal = (id = '') => {
    setIsModalVisible(prev => !prev);
    setSelectedOrderId(id);
  };

  const columns = getTableColumns(
    t,
    canAccess,
    onAddMhProblem,
    onToggleModal,
  );

  const missingProductOrders = useMemo(() => {
    if (searchTerm && data?.length > 0) {
      return getFilteredOrders(data, searchTerm);
    }
    return data;
  }, [searchTerm, data]);

  return (
    <div>
      <FeedbackModal
        marketOrderId={selectedOrderId}
        isModalOpen={isModalVisible}
        onCloseModal={onToggleModal}
      />
      <Table
        data-testid="missing-products-table"
        title={t('TITLE')}
        columns={columns}
        data={missingProductOrders}
        pagination={{
          ...pagination,
          total: 10000,
        }}
        loading={isPending}
        total={totalCount}
        onChange={handlePaginationChange}
        size="middle"
      />
    </div>
  );
}

export default MissingProductsTable;
