import { useState } from 'react';
import { Col, Row, Button, Space, Input } from 'antd';

import { t } from '@shared/i18n';
import useStyles from './styles';

const Filter = ({ handleSubmit, filters, isPending }) => {
  const classes = useStyles();
  const [cardNumber, setCardNumber] = useState(filters.cardNumber);

  const submitButtonClick = () => {
    handleSubmit({ cardNumber });
  };

  return (
    <Space direction="vertical" className={classes.filterWrapper}>
      <Row gutter={[8, 8]} justify="space-between">
        <Col xs={16} sm={12}>
          <Input
            onChange={event => setCardNumber(event.target.value)}
            value={cardNumber}
            disabled={isPending}
            type="number"
            placeholder={t('marketFranchisePage:CRISIS_CARD_NUMBER')}
          />
        </Col>
        <Col>
          <div className={classes.buttonWrapper}>
            <Button
              type="primary"
              onClick={submitButtonClick}
              disabled={isPending}
            >
              {t('global:BRING')}
            </Button>
          </div>
        </Col>
      </Row>
    </Space>
  );
};

export default Filter;
