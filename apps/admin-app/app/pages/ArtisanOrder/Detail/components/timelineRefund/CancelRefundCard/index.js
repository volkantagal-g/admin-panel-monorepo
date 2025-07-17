import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CloseCircleFilled } from '@ant-design/icons';

import { Button, Typography } from 'antd';

import { Creators } from '@app/pages/ArtisanOrder/Detail/redux/actions';
import { orderDetailSelector, orderReturnsSelector } from '@app/pages/ArtisanOrder/Detail/redux/selectors';

import useStyles from '@app/pages/ArtisanOrder/Detail/components/timelineRefund/CancelRefundCard/styles';

import Card from '@shared/components/Card';

import { TYPE as CARD_TYPE } from '@shared/components/Card/constants';

const { Text } = Typography;

const CancelRefundCard = () => {
  const dispatch = useDispatch();
  const orderDetail = useSelector(orderDetailSelector.getData);
  const orderReturns = useSelector(orderReturnsSelector.getData);
  const classes = useStyles();
  const { t } = useTranslation('artisanOrderPage');

  const handleCancelRefund = () => {
    const orderId = orderDetail?._id;

    dispatch(Creators.cancelReturnRequest());
    dispatch(Creators.getReturnsAvailabilityRequest({ orderDetailId: orderId }));
  };

  return (
    <Card
      type={CARD_TYPE.DANGER}
      classNames={classes.refundRequestCard}
    >
      <Text strong>{t('REFUND_TIMELINE.REFUND_REQUEST_CREATED')}</Text>
      <Button
        type="default"
        size="middle"
        icon={<CloseCircleFilled />}
        disabled={!orderReturns?.cancellable}
        onClick={handleCancelRefund}
        danger
      >
        {t('REFUND_TIMELINE.CANCEL_REQUEST')}
      </Button>
    </Card>
  );
};

export default CancelRefundCard;
