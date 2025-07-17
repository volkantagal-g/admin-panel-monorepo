import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import { useState } from 'react';

import { Modal } from 'antd';

import AntTable from '@shared/components/UI/AntTableV2';
import { getTableColumns } from './config';
import { LocalsERPDataTrackingFailedSelector } from '../../../redux/selectors';

const Table = ({ onPaginationChange }) => {
  const { t } = useTranslation('localsERPDataTrackingPage');
  const tableData = useSelector(LocalsERPDataTrackingFailedSelector.getData);
  const isPending = useSelector(LocalsERPDataTrackingFailedSelector.getIsPending);
  const failedFilters = useSelector(LocalsERPDataTrackingFailedSelector.getFailedFilters);

  const [isVisibleErrorModal, setIsVisibleErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCloseErrorModal = () => {
    setIsVisibleErrorModal(false);
  };

  const handleOpenErrorModal = message => {
    setErrorMessage(message);
    setIsVisibleErrorModal(true);
  };

  return (
    <>
      <AntTable
        columns={getTableColumns(t, handleOpenErrorModal)}
        data={tableData.sapDashboardFailedItems}
        loading={isPending}
        total={tableData.total}
        pagination={{ currentPage: failedFilters.currentPage, rowsPerPage: failedFilters.rowsPerPage }}
        onPaginationChange={onPaginationChange}
      />
      <Modal
        title={t('FAILED.TABLE.ERROR_DETAIL')}
        visible={isVisibleErrorModal}
        footer={null}
        onCancel={handleCloseErrorModal}
      >
        {errorMessage}
      </Modal>
    </>
  );
};

export default Table;
