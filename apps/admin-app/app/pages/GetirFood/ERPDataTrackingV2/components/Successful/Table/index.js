import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import { useState } from 'react';

import { Modal } from 'antd';

import AntTable from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';
import { ERPDataTrackingSuccessfulSelector } from '../../../redux/selectors';
import { SUCCESSFUL_JSON_MODAL_TITLE_KEYS } from '../../../constants';

const Table = ({ onPaginationChange }) => {
  const { t } = useTranslation('foodERPDataTrackingV2Page');
  const tableData = useSelector(ERPDataTrackingSuccessfulSelector.getData);
  const isPending = useSelector(ERPDataTrackingSuccessfulSelector.getIsPending);
  const successfulFilters = useSelector(ERPDataTrackingSuccessfulSelector.getSuccessfulFilters);

  const [isVisibleJSONModal, setIsVisibleJSONModal] = useState(false);
  const [JSONModalType, setJSONModalType] = useState(null);
  const [JSONData, setJSONData] = useState('');

  const handleCloseJSONModal = () => {
    setIsVisibleJSONModal(false);
  };

  const handleOpenJSONModal = (modalType, json) => {
    setJSONModalType(modalType);
    setJSONData(json);
    setIsVisibleJSONModal(true);
  };

  const getJSONContent = data => {
    if (!data) return null;
    return JSON.stringify(JSON.parse(JSON.parse(data)), null, 4);
  };

  return (
    <>
      <AntTable
        columns={tableColumns(t, handleOpenJSONModal)}
        data={tableData.sapDashboardSuccessItems}
        loading={isPending}
        total={tableData.total}
        pagination={{ currentPage: successfulFilters.currentPage, rowsPerPage: successfulFilters.rowsPerPage }}
        onPaginationChange={onPaginationChange}
      />
      <Modal
        title={t(SUCCESSFUL_JSON_MODAL_TITLE_KEYS[JSONModalType])}
        visible={isVisibleJSONModal}
        footer={null}
        onCancel={handleCloseJSONModal}
      >
        <pre>{getJSONContent(JSONData)}</pre>
      </Modal>
    </>
  );
};

export default Table;
