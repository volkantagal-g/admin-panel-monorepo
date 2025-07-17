import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import {
  Col,
  Row,
  Input,
  Button,
  Collapse,
  Tooltip,
  Form,
} from 'antd';

import { validate } from '@shared/yup';
import { removeWebhelpIdFromUserSelector, updateUsersWebhelpIdSelector, usersSelector } from '../../redux/selectors';
import useStyles from './styles';
import { validationSchema } from './formHelper';

const { Panel } = Collapse;

const Filter = ({ filters, onFilterChange }) => {
  const getUsersIsPending = useSelector(usersSelector.getIsPending);
  const updateUsersWebhelpIdIsPending = useSelector(updateUsersWebhelpIdSelector.getIsPending);
  const removeWebhelpIdFromUserIsPending = useSelector(removeWebhelpIdFromUserSelector.getIsPending);
  const classes = useStyles();
  const { t } = useTranslation('userPage');
  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: {
      searchTerm: filters.searchTerm,
      webhelpId: filters.webhelpId,
    },
    validate: validate(validationSchema),
    onSubmit: values => {
      onFilterChange({ searchTerm: values.searchTerm, webhelpId: values.webhelpId });
    },
  });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey="1">
          <Panel header={t('global:FILTER')} key="1">
            <Form
              form={form}
              layout="vertical"
            >
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    name="searchTerm"
                    label={t('global:USER')}
                    help={touched.searchTerm && errors.searchTerm}
                    validateStatus={touched.searchTerm && errors.searchTerm ? 'error' : 'success'}
                  >
                    <Input
                      placeholder={t('global:USER')}
                      onChange={handleChange}
                      onPressEnter={handleSubmit}
                      disabled={getUsersIsPending || updateUsersWebhelpIdIsPending || removeWebhelpIdFromUserIsPending}
                      suffix={(
                        <Tooltip title={`${t('global:NAME_1')}, ${t('global:EMAIL')}`}>
                          <InfoCircleOutlined />
                        </Tooltip>
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="webhelpId"
                    label={t('userPage:WEBHELP_ID')}
                    help={touched.webhelpId && errors.webhelpId}
                    validateStatus={touched.webhelpId && errors.webhelpId ? 'error' : 'success'}
                  >
                    <Input
                      placeholder={t('userPage:WEBHELP_ID')}
                      onChange={handleChange}
                      onPressEnter={handleSubmit}
                      disabled={getUsersIsPending || updateUsersWebhelpIdIsPending || removeWebhelpIdFromUserIsPending || values.searchTerm}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Button type="primary" onClick={handleSubmit} className={classes.submitButton}>
                  {t('global:BRING')}
                </Button>
              </Row>
            </Form>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
