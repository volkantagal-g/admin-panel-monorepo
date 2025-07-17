import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import { useState } from 'react';

import { Modal } from 'antd';

import AntTable from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';
import { ERPDataTrackingFailedSelector } from '../../../redux/selectors';

const Table = ({ onPaginationChange }) => {
  const { t } = useTranslation('foodERPDataTrackingV2Page');
  const tableData = useSelector(ERPDataTrackingFailedSelector.getData);
  const isPending = useSelector(ERPDataTrackingFailedSelector.getIsPending);
  const failedFilters = useSelector(ERPDataTrackingFailedSelector.getFailedFilters);

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
        columns={tableColumns(t, handleOpenErrorModal)}
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
