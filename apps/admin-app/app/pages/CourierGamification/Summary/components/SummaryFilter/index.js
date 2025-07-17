import { Col, Input, Row, Form, Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { alphabeticallySortByParam } from '@shared/utils/common';
import { getGMFCTaskProgressStatus } from '../../../constant';

import useStyles from './styles';

const SummaryFilter = ({ handleSaveButtonClick, setFieldValue, values, form }) => {
  const { t } = useTranslation('courierGamificationPage');
  const classes = useStyles();

  return (
    <Form id="gmfc-summary-form" layout="vertical" form={form}>
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={11} md={11}>
          <Form.Item name="progressTypes" label={t('PROGRESS_TYPES')}>
            <Select
              value={values?.progressStatus}
              placeholder={t('PROGRESS_TYPES')}
              mode="multiple"
              fieldName="progressTypes"
              options={alphabeticallySortByParam(getGMFCTaskProgressStatus(t))}
              onChange={data => {
                setFieldValue('progressStatus', data);
              }}
              autoComplete="off"
              showSearch
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={11} md={11}>
          <Form.Item name="personIds" label={t('PERSON_IDS')}>
            <Input
              placeholder={t('PERSON_IDS')}
              onChange={e => {
                setFieldValue('personIds', e?.target?.value?.length === 0 ? [] : [e?.target?.value.trim()]);
              }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={2} md={2} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Form.Item className={classes.buttonContainer}>
            <Button type="primary" size="small" htmlType="submit" onClick={handleSaveButtonClick}>
              {t('global:BRING')}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SummaryFilter;
