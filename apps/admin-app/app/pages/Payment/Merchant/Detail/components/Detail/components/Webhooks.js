import {
  Button,
  Col,
  Collapse,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SaveFilled,
} from '@ant-design/icons';
import { useParams } from 'react-router-dom';

import { createMerchantWebhooksSelector, updateMerchantWebhooksSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';
import CardFooter from '../../CardFooter';
import useStyles from '../styles';
import { webHookList } from '@app/pages/Payment/Merchant/New/constants';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

const { Panel } = Collapse;
const { Text } = Typography;

const Webhooks = ({ initialWebhooks, t, disableEditAction }) => {
  const [editActive, setEditActive] = useState(false);
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const updateMerchantWebhooksSelectorIsPending = useSelector(
    updateMerchantWebhooksSelector.getIsPending,
  );
  const createMerchantWebhooksSelectorIsPending = useSelector(
    createMerchantWebhooksSelector.getIsPending,
  );

  const isLoading = updateMerchantWebhooksSelectorIsPending || createMerchantWebhooksSelectorIsPending;

  const [form] = Form.useForm();

  const handleCancel = () => {
    setEditActive(false);
    form.setFieldsValue({ webHooks: initialWebhooks });
  };

  const addWebhook = async webHookIndex => {
    form
      .validateFields()
      .then(() => {
        const formValues = form.getFieldsValue();
        const updatedWebhook = formValues.webHooks[webHookIndex];
        let updateWebhookPayload = {
          merchantId: id,
          url: updatedWebhook?.url,
          updatedType: updatedWebhook?.type,
          enabled: updatedWebhook?.enabled,
        };
        if (updatedWebhook?.webhookId) {
          updateWebhookPayload = {
            ...updateWebhookPayload,
            webhookId: updatedWebhook.webhookId,
          };
          dispatch(
            Creators.updateMerchantWebhooksRequest(updateWebhookPayload),
          );
        }
        else {
          dispatch(
            Creators.createMerchantWebhooksRequest(updateWebhookPayload),
          );
        }
      })
      .catch(() => {
        dispatch(
          ToastCreators.error({ message: t('error:INVALID') }),
        );
      });
  };

  return (
    <Collapse defaultActiveKey="3">
      <Panel header={<div>{t('paymentMerchantPage:WEB_HOOKS')}</div>} key="3">
        <Form
          form={form}
          initialValues={{ webHooks: initialWebhooks }}
          layout="vertical"
          name="custom-identifiers-form"
          autoComplete="off"
        >
          <Row gutter={12} className={classes.identifiersHeader}>
            <Col md={8} xs={8}>
              <Text> {t('paymentMerchantPage:TYPE')} </Text>
            </Col>
            <Col md={8} xs={8}>
              <Text> URL </Text>
            </Col>
            <Col md={8} xs={8}>
              <Text> {t('paymentMerchantPage:ENABLED')} </Text>
            </Col>
          </Row>
          <Form.List name="webHooks">
            {(webHooks, { add, remove }) => (
              <>
                {webHooks.map((webHook, index) => (
                  <Row gutter={16} key={webHook.key}>
                    <Col md={8} xs={8}>
                      <Form.Item
                        {...webHook}
                        name={[webHook.name, 'type']}
                        rules={[
                          {
                            required: true,
                            message: t('error:REQUIRED'),
                          },
                        ]}
                      >
                        <Select disabled={!editActive} options={webHookList} />
                      </Form.Item>
                    </Col>
                    <Col md={8} xs={8}>
                      <Form.Item
                        {...webHook}
                        rules={[
                          {
                            required: true,
                            type: 'url',
                            message: t('error:VALID_URL'),
                          },
                        ]}
                        name={[webHook.name, 'url']}
                      >
                        <Input disabled={!editActive} />
                      </Form.Item>
                    </Col>
                    <Col md={8} xs={8} className={classes.enabledArea}>
                      <Col md={8}>
                        <Form.Item
                          {...webHook}
                          name={[webHook.name, 'enabled']}
                          valuePropName="checked"
                        >
                          <Switch disabled={!editActive} />
                        </Form.Item>
                      </Col>
                      {editActive && (
                        <>
                          <Col md={8}>
                            <MinusCircleOutlined
                              className={classes.removeIcon}
                              onClick={() => {
                                const isWebhookIdExist = form.getFieldValue([
                                  'webHooks',
                                  index,
                                  'webhookId',
                                ]);
                                if (isWebhookIdExist) {
                                  dispatch(
                                    ToastCreators.error({
                                      message: t(
                                        'paymentMerchantPage:CAN_NOT_BE_DELETED',
                                      ),
                                    }),
                                  );
                                }
                                else {
                                  remove(webHook.name);
                                }
                              }}
                            />
                          </Col>
                          <Col md={8}>
                            {isLoading ? <LoadingOutlined spin /> : (
                              <SaveFilled
                                className={classes.removeIcon}
                                onClick={() => addWebhook(index)}
                              />
                            )}

                          </Col>
                        </>
                      )}
                    </Col>

                  </Row>
                ))}
                {editActive && !disableEditAction && (
                  <Row gutter={16}>
                    <Col span={24}>
                      <Button
                        onClick={() => add({
                          enabled: false,
                          type: '',
                          url: '',
                        })}
                        className={classes.addIconGrid}
                      >
                        <PlusOutlined />
                        {t('paymentMerchantPage:ADD_WEB_HOOKS')}
                      </Button>
                    </Col>
                  </Row>
                )}
              </>
            )}
          </Form.List>
          {!disableEditAction && (
            <CardFooter
              hideSubmitButton
              loading={isLoading}
              editActive={editActive}
              setEditActive={setEditActive}
              handleCancel={handleCancel}
            />
          )}
        </Form>
      </Panel>
    </Collapse>
  );
};

Webhooks.prototype = {
  initialWebhooks: PropTypes.shape({
    type: PropTypes.string,
    url: PropTypes.string,
    enabled: PropTypes.bool,
  }),
  disableEditAction: PropTypes.bool,
  t: PropTypes.func,
};
Webhooks.defaultProps = {
  initialGeneralInfo: {
    type: '',
    url: '',
    enabled: false,
  },
  t: () => {},
  disableEditAction: false,
};

export default Webhooks;
