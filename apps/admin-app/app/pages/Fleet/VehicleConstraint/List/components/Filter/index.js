import { useEffect, useRef } from 'react';
import { Row, Col, Collapse, Space, Typography, Button, Form } from 'antd';
import { useTranslation } from 'react-i18next';

import AntSelect from '@shared/components/UI/AntSelect';
import { DEFAULT_ACTIVE_KEY } from '../../../constants';
import { vehicleConstraintStatusOptions, vehicleConstraintTypeOptions } from '../../../utils';
import useStyles from './styles';

const { Text } = Typography;
const { Panel } = Collapse;

const Filter = ({ handleSubmit, isPending }) => {
  const classes = useStyles();
  const { t } = useTranslation('vehicleConstraintPage');
  const [form] = Form.useForm();

  const handleFormSubmission = () => {
    handleSubmit({ types: form.getFieldValue('types'), statuses: form.getFieldValue('statuses') });
  };

  const ref = useRef();

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      const { activeElement } = document;
      const isDropdownOpen = activeElement.closest('.ant-select-single, .ant-dropdown-open');
      if (!isDropdownOpen) {
        ref.current.submit();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Form ref={ref} form={form} onFinish={handleFormSubmission}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Collapse defaultActiveKey={[DEFAULT_ACTIVE_KEY]}>
            <Panel header={t('FILTER')} key={DEFAULT_ACTIVE_KEY}>
              <Space direction="vertical" className={classes.filterWrapper}>
                <Row gutter={[8, 8]}>
                  <Col md={12} xs={24}>
                    <Text>{t('LIST.FILTER.TYPE')}</Text>
                    <Form.Item className={classes.formItem} name="types">
                      <AntSelect
                        mode="multiple"
                        options={vehicleConstraintTypeOptions}
                        placeholder={t('LIST.FILTER.TYPE')}
                        allowClear
                        disabled={isPending}
                        className={classes.filterItem}
                      />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Text>{t('LIST.FILTER.STATUS')}</Text>
                    <Form.Item className={classes.formItem} name="statuses">
                      <AntSelect
                        mode="multiple"
                        options={vehicleConstraintStatusOptions}
                        placeholder={t('LIST.FILTER.STATUS')}
                        allowClear
                        disabled={isPending}
                        className={classes.filterItem}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Space>
              <div className={classes.buttonContainer}>
                <Form.Item className={classes.formItem}>
                  <Button type="primary" loading={isPending} htmlType="submit">
                    {t('BRING')}
                  </Button>
                </Form.Item>
              </div>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </Form>
  );
};

export default Filter;
