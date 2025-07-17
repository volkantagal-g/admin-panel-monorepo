import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Radio, Spin } from 'antd';
import cn from 'classnames';
import moment from 'moment';

import HelperText from '@shared/components/HelperText';

import useStyles from './styles';
import { DELIVERY_TYPES } from './constants';

/**
 * @param {object} Props
 * @param {string} Props.className
 * @param {number} Props.deliveryType
 * @param {string} Props.pickupDate
 * @param {[]} Props.refundOptions
 * @param {string} Props.timeSlot
 * @param {boolean} Props.isAvailableForInstantMoneyRefund
 * @param {number} Props.instantMoneyRefundPriceLimit
 * @param {boolean} Props.isAvailableForIns
 * @param {(value) => void} Props.onRefundTypeChange
 * @param {(value) => void} Props.onPickupDateChange
 * @param {(value) => void} Props.onTimeSlotChange
 */
const Step2 = ({
  className,
  refundOptions,
  deliveryType,
  pickupDate,
  timeSlot,
  availableTimeSlots,
  isTimeSlotsLoading,
  hasError,
  isAvailableForInstantMoneyRefund,
  onlyInstantMoneyRefund,
  instantMoneyRefundPriceLimit,
  onRefundTypeChange,
  onPickupDateChange,
  onTimeSlotChange,
}) => {
  const { t } = useTranslation('artisanOrderPage');
  const pickupDateOptions = availableTimeSlots?.slice(0, 2)?.map(slot => {
    return {
      label: slot.date,
      value: slot.date,
    };
  });

  const timeSlotOptions = availableTimeSlots?.find(slot => slot.date === pickupDate)?.slotValues?.map(slot => {
    const isAvailable = slot.status === 'AVAILABLE';
    const timeSlotStr = `${moment(slot.start).format('HH:mm')} - ${moment(slot.end).format('HH:mm')}`;

    return {
      label: timeSlotStr,
      value: `${slot.id}:${slot.pid}`,
      ...(!isAvailable && { label: `${timeSlotStr} (${t('SLOT_FULL')})` }),
      disabled: !isAvailable,
    };
  });

  const deliveryTypeOptions = refundOptions?.map(x => ({
    label: x.typeText,
    value: x.typeId,
    disabled: !!x?.disabled,
    ...(!isAvailableForInstantMoneyRefund && !onlyInstantMoneyRefund && x.typeId === DELIVERY_TYPES.INSTANT_MONEY_REFUND && { disabled: true }),
    ...(onlyInstantMoneyRefund && x.typeId !== DELIVERY_TYPES.INSTANT_MONEY_REFUND && { disabled: true }),
  }));

  const shopAddress = refundOptions?.find(x => x.typeId === deliveryType)?.subText;

  const styles = useStyles();

  useEffect(() => {
    return () => onRefundTypeChange('');
  }, [onRefundTypeChange]);

  return (
    <div className={cn(styles.step2, className)}>
      <div className={styles.labelWrapper}>
        <span className={styles.label}>{t('REFUND_MODAL.REFUND_TYPE')}</span>
        <Radio.Group
          name="deliveryType"
          size="large"
          buttonStyle="solid"
          value={deliveryType}
          options={deliveryTypeOptions}
          onChange={({ target }) => onRefundTypeChange(target?.value)}
        />
      </div>

      {deliveryType === DELIVERY_TYPES.CUSTOMER_DELIVERS && shopAddress && (
        <HelperText className={styles.helperText} variant="primary">
          {t('REFUND_MODAL.CUSTOMER_DELIVERY_HELPER_TEXT', { shopAddress })}
        </HelperText>
      )}

      {deliveryType === DELIVERY_TYPES.INSTANT_MONEY_REFUND && (
        <HelperText className={styles.helperText} variant="primary">
          {t('REFUND_MODAL.INSTANT_MONEY_REFUND_HELPER_TEXT', { priceLimit: instantMoneyRefundPriceLimit })}
        </HelperText>
      )}

      {deliveryType !== DELIVERY_TYPES.COURIER_RETRIEVES && <div className={styles.spacerV480} />}

      {deliveryType === DELIVERY_TYPES.COURIER_RETRIEVES && (
        <React.Fragment key={DELIVERY_TYPES.COURIER_RETRIEVES}>
          <HelperText className={styles.helperText} variant="primary">
            {t('REFUND_MODAL.COURIER_RETRIEVES_HELPER_TEXT')}
          </HelperText>

          <div className={styles.labelWrapper}>
            <span className={styles.label}>{t('REFUND_MODAL.DELIVERY_DATE')}</span>

            {isTimeSlotsLoading && !hasError && <Spin spinning />}

            {pickupDateOptions && pickupDateOptions?.length === 0 && <span>{t('REFUND_MODAL.ALL_TIME_SLOTS_ARE_FULL')}</span>}

            {!isTimeSlotsLoading && (!pickupDateOptions || hasError) && <span>{t('ERROR_TITLE')}</span>}

            {pickupDateOptions && (
              <Radio.Group
                name="pickupDate"
                aria-label="Pickup date options"
                size="large"
                buttonStyle="solid"
                options={pickupDateOptions}
                value={pickupDate}
                onChange={({ target }) => onPickupDateChange(target?.value)}
              />
            )}

          </div>

          <div className={styles.timeSlotSelection}>
            <span className={styles.label}>{t('REFUND_MODAL.CHOOSE_TIME_FOR_COURIER')}</span>

            {isTimeSlotsLoading && <Spin spinning />}

            {!isTimeSlotsLoading && (
              <Radio.Group
                name="timeSlot"
                size="large"
                aria-label="Time slot selection for courier retrieval"
                options={timeSlotOptions}
                value={timeSlot}
                onChange={({ target }) => onTimeSlotChange(target?.value)}
                style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
              />
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default React.memo(Step2);
