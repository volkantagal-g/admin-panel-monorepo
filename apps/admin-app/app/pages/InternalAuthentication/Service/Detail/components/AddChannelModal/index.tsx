import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { Col, Form, Input, Modal, Row, Select, Alert } from 'antd';
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

type AddChannelModalProps = {
  onClose: () => void;
};

const AddChannelModal = ({ onClose }: AddChannelModalProps) => {
  const { t } = useTranslation(['internalAuthentication', 'global']);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const slackConfigurations = useSelector(slackConfigurationSelector.getData);
  const { teamId, serviceId } = useParams();

  const formik = useFormik({
    initialValues: getInitialValues(),
    validate: validate(() => teamSchema),
    validateOnChange: false,
    onSubmit: values => {
      const workspaceChannelNamePairs = slackConfigurations.workspaceChannelNamePairs?.map(p => ({
        channelName: p.channelName,
        workspaceName: p.workspaceName,
      })) ?? [];

      dispatch(Creators.updateSlackConfigurationsRequest({
        teamId,
        serviceId,
        workspaceChannelNamePairs: [...workspaceChannelNamePairs, values],
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

  const handleChannelName = useCallback(
    event => {
      const value = get(event, 'target.value', '');
      setFieldValue('channelName', value);
    },
    [setFieldValue],
  );

  return (
    <Modal
      title={t('ADD_NEW_CHANNEL')}
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
            <Alert message={t('internalAuthentication:WARNING_CHANNEL_MUST_EXIST')} type="warning" />
            <Form.Item
              help={get(errors, 'channelName')}
              validateStatus={get(errors, 'channelName') ? 'error' : 'success'}
              name={['channelName']}
              label={t('CHANNEL_NAME')}
            >
              <Input
                data-testid="slack-configuration-channel-name-input"
                value={values.channelName}
                onChange={handleChannelName}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddChannelModal;
