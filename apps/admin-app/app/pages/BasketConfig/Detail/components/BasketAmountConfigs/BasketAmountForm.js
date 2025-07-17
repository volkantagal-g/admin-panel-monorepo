import { Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { TextInput } from '@shared/components/GUI';

const BasketAmountForm = ({
  setFieldValue,
  disabled,
  errors,
  minName,
  maxName,
  minDiscountedAmount,
  maxDiscountedAmount,
}) => {
  const { t } = useTranslation('basketConfigPage');
  return (
    <>
      <Col xs={24} md={8}>
        <TextInput
          onChange={({ target }) => setFieldValue(minName, target.value || null)}
          name={minName}
          label={t('MINIMUM_BASKET_AMOUNT')}
          mode="number"
          errors={errors}
          disabled={disabled}
          value={minDiscountedAmount}
          hasForm
        />
      </Col>
      <Col xs={24} md={8}>
        <TextInput
          hasForm
          onChange={({ target }) => setFieldValue(maxName, target.value || null)}
          name={maxName}
          label={t('MAXIMUM_BASKET_AMOUNT')}
          mode="number"
          errors={errors}
          disabled={disabled}
          value={maxDiscountedAmount}
        />
      </Col>
    </>
  );
};
export default BasketAmountForm;
