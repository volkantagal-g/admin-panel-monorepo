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
  const classes = useStyles({ isPending });

  return (
    <div className={classes.card}>
      <Button className={classes.button} loading={isPending} onClick={openPaybackModal} type="primary">
        <div className={classes.buttonContent}>
          {paybackButtonLabel}
          <MinusOutlined />
        </div>
      </Button>
      <Alert className={classes.alert} message={paybackWarningMessage} type="warning" showIcon />
      <Button className={classes.button} loading={isPending} onClick={openPaymentModal} type="primary">
        <div className={classes.buttonContent}>
          {paymentButtonLabel}
          <PlusOutlined />
        </div>
      </Button>
      <Alert className={classes.alert} message={paymentWarningMessage} type="warning" showIcon />
    </div>
  );
};

export default TransactionButtons;
