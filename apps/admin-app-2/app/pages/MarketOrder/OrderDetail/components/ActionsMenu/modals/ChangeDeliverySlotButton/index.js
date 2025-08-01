import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getSlottedDeliveryOptionsSelector, orderDetailSelector } from '../../../../redux/selectors';
import { Creators } from '../../../../redux/actions';
import { Button } from '@shared/components/GUI';

const ChangeDeliverySlot = () => {
  const { t } = useTranslation('marketOrderPage');
  const dispatch = useDispatch();

  const orderDetail = useSelector(orderDetailSelector.getData);
  const { delivery } = orderDetail ?? {};
  const isModalVisible = useSelector(
    getSlottedDeliveryOptionsSelector.isSlotModalVisible,
  );
  const { slottedDeliveryInfo: { slotId: deliverySlotId } = {} } =
    delivery ?? {};

  const onToggleModal = () => {
    dispatch(Creators.toggleSlotModal({ isVisible: !isModalVisible }));
  };

  return deliverySlotId ? (
    <Button
      key="2"
      color="secondary"
      type="text"
      size="extra-small"
      data-testid="change-delivery-slot-modal"
      className="w-100 my-1"
      onClick={onToggleModal}
    >
      {t('ACTION.CHANGE_SLOT')}
    </Button>
  ) : null;
};

export default ChangeDeliverySlot;
