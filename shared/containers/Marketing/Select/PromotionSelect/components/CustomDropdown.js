import { Button, Col, Divider, Input, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CustomDropdown = ({ isPending, addItem, menu }) => {
  const { t } = useTranslation('marketing');
  const [promoId, setPromoId] = useState('');
  return (
    <Row>
      <Col md={24} xs={24}>
        {isPending ? <LoadingOutlined className="w-100" spin /> : menu}
        <Divider className="mt-1 mb-3" />
      </Col>
      <Col md={24} xs={24}>
        <Row gutter={4}>
          <Col md={12} xs={12} className="mb-3 ml-2">
            <Input onKeyDown={e => e.stopPropagation()} onChange={e => setPromoId(e.target.value)} value={promoId} />
          </Col>
          <Col md={4} xs={4} className="mb-3">
            <Button
              type="primary"
              onClick={() => {
                addItem(promoId);
                setPromoId('');
              }}
            >{t('ADD_PROMO_ID')}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CustomDropdown;
