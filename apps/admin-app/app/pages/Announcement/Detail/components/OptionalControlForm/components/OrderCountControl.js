import { memo } from 'react';
import { Row, Col, Form, Input } from 'antd';

import { useTranslation } from 'react-i18next';

import { GETIR_10_DOMAIN_TYPE, GETIR_FOOD_DOMAIN_TYPE, GETIR_LOCALS_DOMAIN_TYPE } from '@shared/shared/constants';
import { domainTypes } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';

const orderCountControlOptions = {
  [GETIR_10_DOMAIN_TYPE]: 'SucOrderCount',
  [GETIR_FOOD_DOMAIN_TYPE]: 'SucFoodOrderCount',
  [GETIR_LOCALS_DOMAIN_TYPE]: 'SucLocalsOrderCount',
};

const OrderCountControl = ({ disabled }) => {
  const { t } = useTranslation('marketing');
  return (
    <>
      <Row gutter={24} className="mb-3">
        <Col>
          <p>{t('ORDER_COUNT_CONTROL')}</p>
        </Col>
      </Row>

      <Row gutter={24}>
        {Object.entries(orderCountControlOptions).map(([key, value]) => (
          <Col lg={4} key={key}>
            <p>{domainTypes[key][getLangKey()]}</p>

            <Row>
              <Col lg={24}>
                <Form.Item name={`min${value}`}>
                  <Input placeholder="min" disabled={disabled} />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col lg={24}>
                <Form.Item name={`max${value}`}>
                  <Input placeholder="max" disabled={disabled} />
                </Form.Item>
              </Col>
            </Row>

          </Col>
        ))}
      </Row>
    </>

  );
};

export default memo(OrderCountControl);
