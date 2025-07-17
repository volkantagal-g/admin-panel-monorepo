import { useEffect, useRef } from 'react';
import { Row, Col, Collapse, Space, Typography, Button, Input, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import AntSelect from '@shared/components/UI/AntSelect';
import useStyles from './styles';
import {
  ANT_SPACING_24,
  DEFAULT_ACTIVE_KEY,
  DEFAULT_COL_SPACING,
  DEFAULT_ROW_SPACING,
} from '../../constants';
import {
  convertedCourierStatusOptions,
  convertedYesOrNoOptions,
  convertedActivenessOptions,
} from '../../utils';

const { Text } = Typography;
const { Panel } = Collapse;

const Filter = ({ handleSubmit, isPending }) => {
  const classes = useStyles();
  const [form] = Form.useForm();
  const { t } = useTranslation('courierPage');

  const handleFormSubmission = () => {
    handleSubmit({
      name: form.getFieldValue('name'),
      isActivated: form.getFieldValue('isActivated'),
      status: form.getFieldValue('status'),
      isLoggedIn: form.getFieldValue('isLoggedIn'),
    });
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
      <Row gutter={DEFAULT_ROW_SPACING}>
        <Col span={ANT_SPACING_24}>
          <Collapse defaultActiveKey={[DEFAULT_ACTIVE_KEY]}>
            <Panel key={DEFAULT_ACTIVE_KEY} header={t('FILTER')}>
              <Space direction="vertical" className={classes.filterWrapper}>
                <Row gutter={DEFAULT_ROW_SPACING}>
                  <Col {...DEFAULT_COL_SPACING}>
                    <Text>{t('NAME')}</Text>
                    <Form.Item name="name" className={classes.formItem}>
                      <Input
                        disabled={isPending}
                        placeholder={t('NAME')}
                      />
                    </Form.Item>
                  </Col>
                  <Col {...DEFAULT_COL_SPACING}>
                    <Text>{t('STATUS')}</Text>
                    <Form.Item name="status" className={classes.formItem}>
                      <AntSelect
                        options={convertedCourierStatusOptions}
                        placeholder={t('STATUS')}
                        allowClear
                        disabled={isPending}
                        className={classes.filterItem}
                      />
                    </Form.Item>
                  </Col>
                  <Col {...DEFAULT_COL_SPACING}>
                    <Text>{t('ACTIVENESS')}</Text>
                    <Form.Item name="isActivated" className={classes.formItem}>
                      <AntSelect
                        options={convertedActivenessOptions}
                        placeholder={t('ACTIVENESS')}
                        allowClear
                        disabled={isPending}
                        className={classes.filterItem}
                      />
                    </Form.Item>
                  </Col>
                  <Col {...DEFAULT_COL_SPACING}>
                    <Text>{t('IS_LOGGED_IN')}</Text>
                    <Form.Item name="isLoggedIn" className={classes.formItem}>
                      <AntSelect
                        options={convertedYesOrNoOptions}
                        placeholder={t('IS_LOGGED_IN')}
                        allowClear
                        disabled={isPending}
                        className={classes.filterItem}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Space>
              <div className={classes.buttonContainer}>
                <Form.Item>
                  <Button
                    type="primary"
                    loading={isPending}
                    htmlType="submit"
                  >
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

Filter.defaultProps = {
  filters: {},
  handleSubmit: () => null,
  isPending: false,
};

Filter.propTypes = {
  filters: PropTypes.shape({
    name: PropTypes.string,
    isActive: PropTypes.bool,
    status: PropTypes.string,
    isLoggedIn: PropTypes.bool,
  }),
  handleSubmit: PropTypes.func,
  isPending: PropTypes.bool,
};

export default Filter;
