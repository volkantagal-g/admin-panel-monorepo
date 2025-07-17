import { Modal } from '@shared/components/GUI';
import useStyles from '@app/pages/MarketProductChainManagement/components/Modals/styles';
import { useMarketTranslation } from '@app/pages/MarketProductChainManagement/hooks/useMarketTranslation';

const SaveModal = ({
  isOpen,
  onCancel,
  onConfirm,
  warehouseName,
}) => {
  const { t } = useMarketTranslation();
  const classes = useStyles();

  return (
    <Modal
      visible={isOpen}
      centered
      title={t('ARE_YOU_SURE_TO_SAVE')}
      onCancel={onCancel}
      okText={t('BUTTONS.SAVE')}
      cancelText={t('BUTTONS.CANCEL')}
      onOk={onConfirm}
      closable={false}
      className={classes.modal}
    >
      <div className={classes.modalSubtitle}>
        {t('ARE_YOU_SURE_TO_SAVE_SUBTITLE', { warehouseName })}
      </div>
    </Modal>
  );
};

export default SaveModal;
