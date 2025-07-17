import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import { useState } from 'react';

import { Modal } from 'antd';

import AntTable from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';
import { LocalsERPDataTrackingSuccessSelector } from '../../../redux/selectors';
import { SUCCESS_JSON_MODAL_TITLE_KEYS } from '../../../constants';

const Table = ({ onPaginationChange }) => {
  const { t } = useTranslation('localsERPDataTrackingPage');
  const tableData = useSelector(LocalsERPDataTrackingSuccessSelector.getData);
  const isPending = useSelector(LocalsERPDataTrackingSuccessSelector.getIsPending);
  const successFilters = useSelector(LocalsERPDataTrackingSuccessSelector.getSuccessFilters);

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
        pagination={{ currentPage: successFilters.currentPage, rowsPerPage: successFilters.rowsPerPage }}
        onPaginationChange={onPaginationChange}
      />
      <Modal
        title={t(SUCCESS_JSON_MODAL_TITLE_KEYS[JSONModalType])}
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
