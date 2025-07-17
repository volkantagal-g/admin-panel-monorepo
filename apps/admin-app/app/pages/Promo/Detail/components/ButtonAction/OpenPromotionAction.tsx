import { useTranslation } from 'react-i18next';
import { Col, Form } from 'antd';

import { ActionFormProps } from '@app/pages/Promo/Detail/components/ButtonAction/formHelper';
import { SelectPromo } from '@shared/containers/Select/Promo';

export function OpenPromotionAction({ onChange, value, disabled }: ActionFormProps) {
  const { t } = useTranslation('bannerAction');

  return (
    <Col xs={24} lg={24} className="mt-2">
      <Form.Item
        label={t('OPEN_PROMO')}
        className="d-inline"
      >
        <SelectPromo
          slice="open-promotion-action-type"
          disabled={disabled}
          options={value.data.promoId ? [
            { value: value.data.promoId, label: value.data.promoCode },
          ] : undefined}
          value={value.data.promoId}
          onChange={(_, option: any) => onChange({
            ...value,
            data: { promoId: option.value, promoCode: option.label },
          })}
          showIds
        />
      </Form.Item>
    </Col>
  );
}
