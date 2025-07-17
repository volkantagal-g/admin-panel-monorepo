import { Checkbox } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@shared/components/GUI';
import { defaultVisibleColumns } from '@app/pages/MarketProductChainManagement/components/DraggableTable/config';
import { PAGE_TYPES, PRODUCT_TABS } from '@app/pages/MarketProductChainManagement/constants';

import useStyles from '../styles';

const { Group: CheckboxGroup } = Checkbox;

const ManageColumnsModal = ({
  openManageColumnsModal,
  setOpenManageColumnsModal,
  options,
  selectedManageColumns,
  setSelectedManageColumns,
  activeTab,
  pageType,
}) => {
  const { t } = useTranslation('marketProductChainManagement');
  const classes = useStyles();

  const [localColumns, setLocalColumns] = useState([]);

  useEffect(() => {
    let defaultColumns = defaultVisibleColumns[activeTab] || [];

    if (activeTab === PRODUCT_TABS.SUPPLIERS && pageType === PAGE_TYPES.PRODUCT) {
      defaultColumns = ['name', 'type', 'netBuyingPrice', 'bonuses', 'preferred'];
    }

    if (!selectedManageColumns?.length && setSelectedManageColumns) {
      setSelectedManageColumns(defaultColumns);
    }
  }, [activeTab, pageType, setSelectedManageColumns, selectedManageColumns?.length]);

  useEffect(() => {
    if (openManageColumnsModal) {
      setLocalColumns(selectedManageColumns || []);
    }
  }, [openManageColumnsModal, selectedManageColumns]);

  const handleOk = useCallback(() => {
    if (setSelectedManageColumns) {
      setSelectedManageColumns(localColumns);
    }
    setOpenManageColumnsModal(false);
  }, [localColumns, setSelectedManageColumns, setOpenManageColumnsModal]);

  const handleCancel = useCallback(() => {
    setLocalColumns(selectedManageColumns);
    setOpenManageColumnsModal(false);
  }, [setOpenManageColumnsModal, selectedManageColumns]);

  const handleChange = useCallback(checkedValues => {
    setLocalColumns(checkedValues);
  }, []);

  return (
    <Modal
      visible={openManageColumnsModal}
      centered
      title={t('MANAGE_COLUMNS')}
      onCancel={handleCancel}
      okText={t('BUTTONS.SAVE')}
      className={classes.modal}
      closable={false}
      onOk={handleOk}
    >
      <div className={classes.modalSubtitle}>
        {t('MANAGE_COLUMNS_SUBTITLE')}
      </div>
      <CheckboxGroup
        options={options}
        value={localColumns}
        onChange={handleChange}
      />
    </Modal>
  );
};

export default ManageColumnsModal;
