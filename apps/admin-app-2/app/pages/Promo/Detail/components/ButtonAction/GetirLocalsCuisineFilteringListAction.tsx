import { useTranslation } from 'react-i18next';
import { Col, Form } from 'antd';

import { ActionFormProps } from '@app/pages/Promo/Detail/components/ButtonAction/formHelper';
import LocalsMerchantType from '@shared/containers/Select/LocalsMerchantType';

export function GetirLocalsCuisineFilteringListAction({ onChange, value, disabled }: ActionFormProps) {
  const { t } = useTranslation('bannerAction');

  return (
    <Col xs={24} lg={24} className="mt-2">
      <Form.Item
        label={t('MERCHANT_TYPE')}
        className="d-inline"
      >
        <LocalsMerchantType
          mode="single"
          disabled={disabled}
          value={value.data?.clickCategory}
          onChange={(clickCategory: MongoIDType) => onChange({ ...value, data: { clickCategory } })}
        />
      </Form.Item>
    </Col>
  );
}
