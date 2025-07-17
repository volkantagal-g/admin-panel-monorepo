import { Card, Checkbox, Col, Row, Space } from 'antd';
import { useTranslation } from 'react-i18next';

import { DEFAULT_ROW_SPACING, ANT_SPACING_24 } from '../../constants';
import useStyles from './styles';

function CreateCourier({ values = {}, setFieldValue = () => null, isPending = false }) {
  const { t } = useTranslation('personPage');
  const classes = useStyles();

  return (
    <Card title={t('CREATE_COURIER.TITLE')}>
      <Row gutter={DEFAULT_ROW_SPACING} align="top">
        <Col span={ANT_SPACING_24}>
          <Space direction="horizontal" className={classes.marginBottom}>
            <Checkbox
              disabled={isPending}
              checked={values.createCourier}
              onChange={() => setFieldValue('createCourier', !values.createCourier)}
            >
              {t('CREATE_COURIER.COURIER_TYPE')}
            </Checkbox>
          </Space>
        </Col>
      </Row>
    </Card>
  );
}

export default CreateCourier;
