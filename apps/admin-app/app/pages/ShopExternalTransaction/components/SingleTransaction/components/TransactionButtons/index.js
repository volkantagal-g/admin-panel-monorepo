import { Button, Alert } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import useStyles from './styles';

const TransactionButtons = ({
  paybackButtonLabel,
  paymentButtonLabel,
  paybackWarningMessage,
  paymentWarningMessage,
  openPaybackModal,
  openPaymentModal,
  isPending,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <Button className={classes.button} loading={isPending} onClick={openPaybackModal} type="primary" icon={<MinusOutlined />}>
        {paybackButtonLabel}
      </Button>
      <Alert className={classes.alert} message={paybackWarningMessage} type="warning" showIcon />

      <Button className={classes.button} loading={isPending} onClick={openPaymentModal} type="primary" icon={<PlusOutlined />}>
        {paymentButtonLabel}
      </Button>
      <Alert className={classes.alert} message={paymentWarningMessage} type="warning" showIcon />
    </div>
  );
};

export default TransactionButtons;
