import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@shared/components/GUI';

import useStyles from '../styles';

const { Group: CheckboxGroup } = Checkbox;

const FreezeColumnsModal = ({
  openFreezeColumnsModal,
  setOpenFreezeColumnsModal,
  options,
  selectedFreezeColumns,
  setSelectedFreezeColumns,
}) => {
  const { t } = useTranslation('marketProductChainManagement');
  const classes = useStyles();

  const [localColumns, setLocalColumns] = useState([]);

  useEffect(() => {
    if (openFreezeColumnsModal) {
      setLocalColumns(selectedFreezeColumns);
    }
  }, [openFreezeColumnsModal, selectedFreezeColumns]);

  const handleOk = () => {
    setSelectedFreezeColumns(localColumns);
    setOpenFreezeColumnsModal(false);
  };

  const handleCancel = () => {
    setLocalColumns(selectedFreezeColumns);
    setOpenFreezeColumnsModal(false);
  };

  const handleChange = checkedValues => {
    setLocalColumns(checkedValues);
  };

  return (
    <Modal
      visible={openFreezeColumnsModal}
      centered
      title={t('FREEZE_COLUMNS')}
      onCancel={handleCancel}
      okText={t('BUTTONS.SAVE')}
      className={classes.modal}
      closable={false}
      onOk={handleOk}
    >
      <div className={classes.modalSubtitle}>
        {t('FREEZE_COLUMNS_SUBTITLE')}
      </div>
      <CheckboxGroup
        options={options}
        value={localColumns}
        onChange={handleChange}
      />
    </Modal>
  );
};

export default FreezeColumnsModal;
