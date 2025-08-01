import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { cancelOrderSelector } from '../../../../redux/selectors';
import { Creators } from '../../../../redux/actions';
import { Button } from '@shared/components/GUI';

const CancelMarketOrderButton = () => {
  const { t } = useTranslation('marketOrderPage');
  const dispatch = useDispatch();

  const isModalVisible = useSelector(
    cancelOrderSelector.isCancelOrderModalVisible,
  );

  const onToggleModal = () => {
    dispatch(Creators.toggleCancelOrderModal({ isVisible: !isModalVisible }));
  };

  return (
    <Button
      key="1"
      color="danger"
      size="extra-small"
      data-testid="action-menu-list-item-cancel-modal"
      className="w-100 my-1"
      onClick={onToggleModal}
    >
      {t('ACTION.CANCEL_ORDER')}
    </Button>
  );
};

export default CancelMarketOrderButton;
