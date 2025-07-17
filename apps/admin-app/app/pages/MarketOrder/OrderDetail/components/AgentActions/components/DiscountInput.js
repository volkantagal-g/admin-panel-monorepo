import { InputNumber, Modal } from 'antd';
import { useState } from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { leftShiftDigits, toFixedNoRoundOff } from '../utils/helpers';

const { confirm } = Modal;

const getUpdatedAmount = ({
  maxDiscountAmount,
  defaultAmount,
  strVal,
}) => {
  const numVal = Number(strVal);
  const inputStrLength = strVal.length;
  const maxLength = `${maxDiscountAmount.toFixed(0)}`.length + 3;
  const sliceSize = inputStrLength - maxLength + 1;

  if (!strVal.includes('.')) {
    return (toFixedNoRoundOff(Number(numVal) / 100));
  }
  if (strVal.includes('.') && (inputStrLength <= maxLength) && numVal * 10 <= maxDiscountAmount) {
    return toFixedNoRoundOff(leftShiftDigits(strVal));
  }
  if (Number(strVal.slice(1)) !== 0 && (inputStrLength > maxLength || numVal * 10 > maxDiscountAmount)) {
    return toFixedNoRoundOff(leftShiftDigits(numVal)).slice(sliceSize);
  }

  return defaultAmount;
};

const DiscountInput = ({
  classes,
  addonAfter,
  handleInputChange,
  maxDiscountAmount,
  defaultAmount,
  discountAmount,
  orderCurrency,
  discountWarnAmount,
}) => {
  const [discountValue, setDiscountValue] = useState(discountAmount);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { t } = useTranslation('marketOrderPage');

  const showConfirm = (value, event) => {
    if (isConfirmModalOpen) {
      return;
    }
    setIsConfirmModalOpen(true);
    const addDiscountCurrency = text => text
      .replace('DISCOUNT_AMOUNT', value)
      .replace('ORDER_CURRENCY', orderCurrency);

    confirm({
      icon: <ExclamationCircleFilled />,
      content: addDiscountCurrency(t('AGENT_ACTIONS.MODAL.DISCOUNT.MAX_DISCOUNT_WARNING')),
      onOk: () => {
        handleInputChange(value);
        setIsConfirmModalOpen(false);
      },
      onCancel: () => {
        event.target.select();
        setDiscountValue(defaultAmount);
        handleInputChange(defaultAmount);
        setIsConfirmModalOpen(false);
      },

    });
  };

  return (
    <div className={classes.inputNumberWrapper}>
      <InputNumber
        className={classes.inputNumber}
        addonAfter={addonAfter}
        type={isEditing ? 'number' : 'text'}
        defaultValue={defaultAmount}
        data-testid="discount-amount"
        min={0.01}
        max={maxDiscountAmount}
        name="discountAmount"
        value={discountValue}
        step=".01"
        precision={2}
        stringMode
        onBlur={event => {
          let updatedValue = event.target.value.replace(',', '');
          setIsEditing(false);
          updatedValue = Number(updatedValue) > 0 ? updatedValue : defaultAmount;
          setDiscountValue(Number(updatedValue).toLocaleString());
          if (updatedValue > discountWarnAmount) showConfirm(updatedValue, event);
        }}
        onFocus={event => event.target.select()}
        onKeyUp={event => {
          setIsEditing(true);
          const strVal = event.target.value.replace(',', '');
          if (['Backspace', 'Delete', '.'].includes(event.key)) {
            return;
          }
          if (!Number.isFinite(Number(event.key))) {
            setDiscountValue(defaultAmount);
            return;
          }
          const updatedValue = getUpdatedAmount({
            maxDiscountAmount,
            discountAmount,
            strVal,
          });

          setDiscountValue(updatedValue);
          if (updatedValue <= discountWarnAmount) handleInputChange(updatedValue);
        }}
      />
    </div>
  );
};

export default DiscountInput;
