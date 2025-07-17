import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { Col, Form, Modal, Row, Select, Alert, Checkbox } from 'antd';
import { get } from 'lodash';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';

import { validate } from '@shared/yup';

import { Creators } from '../../redux/actions';
import { teamSchema, getInitialValues } from './formHelper';
import { slackConfigurationSelector } from '../../redux/selectors';
import { getSelectFilterOption } from '@shared/utils/common';
import { SLACK_WORKSPACES } from '../../constants';

const { Option } = Select;

type EditDMConfigModalProps = {
  index: number;
  onClose: () => void;
};

const EditDMConfigModal = ({ index, onClose }: EditDMConfigModalProps) => {
  const { t } = useTranslation(['internalAuthentication', 'global']);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const slackConfigurations = useSelector(slackConfigurationSelector.getData);
  const { teamId, serviceId } = useParams();

  const formik = useFormik({
    initialValues: getInitialValues(slackConfigurations?.workspaceDMConfigPairs?.[index]),
    validate: validate(() => teamSchema),
    validateOnChange: false,
    onSubmit: values => {
      const workspaceDMConfigPairs = slackConfigurations.workspaceDMConfigPairs.map(p => ({
        isDMEnabled: !!p.isDMEnabled,
        workspaceName: p.workspaceName,
      }));
      workspaceDMConfigPairs[index] = values;

      dispatch(Creators.updateSlackConfigurationsRequest({
        teamId,
        serviceId,
        workspaceDMConfigPairs,
        successCallback: onClose,
      }));
    },
  });

  const { handleSubmit, values, errors, setFieldValue } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const handleWorkspaceName = useCallback(
    value => setFieldValue('workspaceName', value),
    [setFieldValue],
  );

  const handleIsDMEnabled = useCallback(
    event => {
      setFieldValue('isDMEnabled', event.target.checked);
    },
    [setFieldValue],
  );

  return (
    <Modal
      title={t('EDIT_CHANNEL')}
      visible
      onCancel={onClose}
      onOk={() => handleSubmit()}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row align="bottom">
          <Col span={24}>
            <Form.Item
              help={get(errors, 'workspaceName')}
              validateStatus={get(errors, 'workspaceName') ? 'error' : 'success'}
              name={['workspaceName']}
              label={t('WORKSPACE_NAME')}
            >
              <Select
                value={values.workspaceName}
                onChange={handleWorkspaceName}
                showArrow={false}
                className="w-100"
                showSearch
                filterOption={getSelectFilterOption}
              >
                {Object.entries(SLACK_WORKSPACES).map(([key, name]) => (
                  <Option key={key} value={key}>
                    {name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              help={get(errors, 'isDMEnabled')}
              validateStatus={get(errors, 'isDMEnabled') ? 'error' : 'success'}
              name={['isDMEnabled']}
              label={t('IS_DM_ENABLED')}
              valuePropName="checked"
            >
              <Checkbox
                data-testid="slack-configuration-dm-config-checkbox"
                checked={get(values, 'isDMEnabled', false)}
                onChange={handleIsDMEnabled}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditDMConfigModal;
