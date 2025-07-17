import { Alert, Checkbox } from 'antd';

import useCurrency from '../hooks/useCurrency';

import useStyles from './RefundTable.styles';

const CheckboxFee = ({
  refunded,
  handleCheckbox,
  fromFeedbackDetail,
  isFullRefund,
  feeAmount,
  feeAmountFromInput,
  feeLabel,
  alertLabel,
  name,
}) => {
  const styles = useStyles();
  const { format: currencyFormatter } = useCurrency();

  if (refunded) {
    return (
      <Alert
        message={alertLabel}
        type="success"
        showIcon
      />
    );
  }

  return (
    <Checkbox
      onChange={handleCheckbox}
      disabled={fromFeedbackDetail || feeAmount === 0 || isFullRefund}
      name={name}
      checked={feeAmountFromInput}
    >
      <span className={styles.feeLabel}>{feeLabel}</span>
      <span className={styles.amount}>({`${currencyFormatter(feeAmount?.toFixed(2) || 0)}`})</span>
    </Checkbox>

  );
};

export default CheckboxFee;
