import { memo } from 'react';

import { useTranslation } from 'react-i18next';
import { Radio } from 'antd';

import { PercentageInput, NumberInput } from '@shared/components/GUI';

import useStyles from './styles';

import { DISCOUNT_TYPE } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';

export const ValueRateInput = memo(function ValueRateInput({
  type,
  label,
  disabled,
  value,
  name,
  handleChange,
  errors,
}) {
  const { t } = useTranslation('marketProductPageV2');
  const classes = useStyles();

  const onSelectedTypeChange = e => {
    handleChange({ type: e.target.value, value });
  };

  const onInputChange = newValue => {
    handleChange({ type, value: newValue });
  };

  return (
    <div className={classes.valueRateInput}>
      <div>
        <Radio.Group
          onChange={onSelectedTypeChange}
          value={type}
          disabled={disabled}
          name={[...name, 'type']}
        >
          <Radio value={DISCOUNT_TYPE.PERCENTAGE} key="PERCENTAGE">
            {t('RATE')}
          </Radio>
          <Radio value={DISCOUNT_TYPE.AMOUNT} key="AMOUNT">
            {t('AMOUNT')}
          </Radio>
        </Radio.Group>
      </div>
      <div>
        {type === DISCOUNT_TYPE.AMOUNT ? (
          <NumberInput
            name={[...name, 'value']}
            label={label}
            value={value}
            disabled={disabled}
            onChange={newValue => onInputChange(newValue)}
            errors={errors}
          />
        ) : (
          <PercentageInput
            name={[...name, 'value']}
            label={label}
            value={value}
            disabled={disabled}
            onChange={newValue => onInputChange(newValue)}
            errors={errors}
          />
        )}
      </div>
    </div>
  );
});
