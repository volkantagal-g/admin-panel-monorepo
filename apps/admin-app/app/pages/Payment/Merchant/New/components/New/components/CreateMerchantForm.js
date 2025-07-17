import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';

import useStyles from '../styles';
import { customIdentifierTypeList } from '@app/pages/Payment/constants';
import { createMerchantSelector } from '../../../redux/selectors';
import { captureTypeList, webHookList } from '../../../constants';
import { CustomIdentifierValueInput } from '../../../../Detail/components/CustomIdentifierValueInput';

const { Text } = Typography;

const CreateMerchantForm = ({ onFinish }) => {
  const { t } = useTranslation(['paymentMerchantPage', 'global', 'error']);
  const [form] = Form.useForm();
  const [disableForm, setDisableForm] = useState(false);
  const classes = useStyles();

  const createMerchantSelectorIsPending = useSelector(
    createMerchantSelector.getIsPending,
  );

  const createMerchantSelectorData = useSelector(
    createMerchantSelector.getData,
  );

  const createdMerchantId = createMerchantSelectorData?.id;

  useEffect(() => {
    if (createdMerchantId) {
      setDisableForm(true);
    }
  }, [createdMerchantId]);

  return (
    <Form
      form={form}
      name="new-merchant"
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        enabled: true,
        customIdentifiers: [{ key: '', type: 'number', value: '' }],
        webHooks: [{ type: 'PAYMENT_STATUS_WEBHOOK', url: '', enabled: true }],
        minPurchaseAmount: 0,
        maxPurchaseAmount: 1000,
        paymentProviders: [
          {
            id: '',
            name: '',
            enabled: true,
            key: '',
            maxPurchaseAmount: 1000,
            minPurchaseAmount: 0,
            paymentMethods: [
              { availableChannels: [], enabled: true, key: '', name: '', id: '', displayOrder: 1 },
            ],
            providerMerchantId: '',
          },
        ],
      }}
    >
      <div className={classes.cardSection}>
        <Row gutter={16}>
          <Col md={4} xs={24}>
            <Form.Item
              label={t('paymentMerchantPage:DISPLAY_NAME')}
              name="displayName"
              rules={[{ required: true, message: t('error:REQUIRED') }]}
            >
              <Input data-testid="merchant-display-name" disabled={disableForm} placeholder={t('paymentMerchantPage:DISPLAY_NAME')} />
            </Form.Item>
          </Col>
          <Col md={4} xs={24}>
            <Form.Item
              label="Key"
              name="key"
              rules={[{ required: true, message: t('error:REQUIRED') }]}
            >
              <Input data-testid="merchant-key" disabled={disableForm} placeholder="Key" />
            </Form.Item>
          </Col>
          <Col md={4} xs={24}>
            <Form.Item
              label={t('paymentMerchantPage:CAPTURE_TYPE')}
              name="captureType"
              rules={[{ required: true, message: t('error:REQUIRED') }]}
            >
              <Select
                data-testid="merchant-capture-type"
                disabled={disableForm}
                options={captureTypeList}
                placeholder={t('paymentMerchantPage:CAPTURE_TYPE_PLACEHOLDER')}
              />
            </Form.Item>
          </Col>
          <Col md={7} xs={24}>
            <Form.Item
              label={t('paymentMerchantPage:MIN_MAX_PURCHASE_AMOUNT')}
            >
              <Input.Group compact>
                <Form.Item name="minPurchaseAmount">
                  <InputNumber disabled={disableForm} style={{ width: 150 }} type="number" placeholder="Minimum" />
                </Form.Item>
                <Input
                  className="site-input-split"
                  style={{
                    width: 30,
                    borderLeft: 0,
                    borderRight: 0,
                    pointerEvents: 'none',
                  }}
                  placeholder="~"
                  disabled
                />
                <Form.Item name="maxPurchaseAmount">
                  <InputNumber disabled={disableForm} style={{ width: 150 }} type="number" className="site-input-right" placeholder="Maximum" />

                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Col>
          <Col md={4} xs={24}>
            <Form.Item
              label={t('paymentMerchantPage:ENABLED')}
              name="enabled"
              valuePropName="checked"
            >
              <Switch disabled={disableForm} />
            </Form.Item>
          </Col>
        </Row>
      </div>
      <div className={classes.cardSection}>
        <Row gutter={16}>
          <Col span={12} md={12} xs={24}>
            <Card title={t('paymentMerchantPage:WEB_HOOKS')}>
              <Row gutter={16} className={classes.formListHeader}>
                <Col md={9}>
                  <Text> {t('paymentMerchantPage:TYPE')} </Text>
                </Col>
                <Col md={9}>
                  <Text> URL </Text>
                </Col>
                <Col md={3}>
                  <Text> {t('paymentMerchantPage:ENABLED')} </Text>
                </Col>
              </Row>
              <Form.List name="webHooks">
                {(webHooks, { add, remove }) => (
                  <>
                    {webHooks.map(webHook => (
                      <Row gutter={16} key={webHook.key}>
                        <Col md={9} xs={24}>
                          <Form.Item
                            {...webHook}
                            rules={[
                              {
                                required: true,
                                message: t('error:REQUIRED'),
                              },
                            ]}
                            name={[webHook.name, 'type']}
                          >
                            <Select
                              disabled={disableForm}
                              options={webHookList}
                            />
                          </Form.Item>
                        </Col>
                        <Col md={9} xs={24}>
                          <Form.Item
                            {...webHook}
                            name={[webHook.name, 'url']}
                            rules={[
                              {
                                required: true,
                                type: 'url',
                                message: t('error:VALID_URL'),
                              },
                            ]}
                          >
                            <Input data-testid="merchant-webhook-url" disabled={disableForm} />
                          </Form.Item>
                        </Col>
                        <Col md={3} className={classes.textCenter}>
                          <Form.Item
                            {...webHook}
                            rules={[
                              {
                                required: true,
                                message: t('error:REQUIRED'),
                              },
                            ]}
                            name={[webHook.name, 'enabled']}
                            valuePropName="checked"
                          >
                            <Switch disabled={disableForm} />
                          </Form.Item>
                        </Col>
                        <Col md={1}>
                          <MinusCircleOutlined
                            className={classes.removeIcon}
                            onClick={() => remove(webHook.name)}
                          />
                        </Col>

                      </Row>
                    ))}
                    <Row gutter={16}>
                      <Col span={24}>
                        <Button
                          disabled={disableForm}
                          onClick={() => add()}
                          className={classes.addIconGrid}
                        >
                          <PlusOutlined />
                          {t('paymentMerchantPage:ADD_WEB_HOOKS')}
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
              </Form.List>
            </Card>
          </Col>
          <Col span={12} md={12} xs={24}>
            <Card title={t('paymentMerchantPage:CUSTOM_IDENTIFIERS')}>
              <Row gutter={16} className={classes.formListHeader}>
                <Col md={7}>
                  <Text> Key </Text>
                </Col>
                <Col md={7}>
                  <Text> Type </Text>
                </Col>
                <Col md={7}>
                  <Text> Value </Text>
                </Col>
              </Row>
              <Form.List name="customIdentifiers">
                {(customIdentifiers, { add, remove }) => (
                  <>
                    {customIdentifiers.map((customIdentifier, index) => (
                      <Row gutter={16} key={customIdentifier.key}>
                        <Col md={7} xs={24}>
                          <Form.Item
                            {...customIdentifier}
                            name={[customIdentifier.name, 'key']}
                            rules={[
                              {
                                required: true,
                                message: t('error:REQUIRED'),
                              },
                            ]}
                          >
                            <Input
                              placeholder={t('paymentMerchantPage:CUSTOM_IDENTIFIER_KEY')}
                              data-testid="merchant-custom-identifier-key"
                              disabled={disableForm}
                            />
                          </Form.Item>
                        </Col>
                        <Col md={7} xs={24}>
                          <Form.Item
                            {...customIdentifier}
                            rules={[
                              {
                                required: true,
                                message: t('error:REQUIRED'),
                              },
                            ]}
                            name={[customIdentifier.name, 'type']}
                          >
                            <Select
                              disabled={disableForm}
                              options={customIdentifierTypeList}
                            />
                          </Form.Item>
                        </Col>
                        <Col md={7} xs={24}>
                          <Form.Item noStyle dependencies={[['customIdentifiers', index, 'type']]}>
                            {() => {
                              const valueOfCustomIdentifiers = form.getFieldValue('customIdentifiers');
                              const customIdentifierType = valueOfCustomIdentifiers[index]?.type;
                              return (
                                <Form.Item {...customIdentifier} name={[customIdentifier.name, 'value']}>
                                  <CustomIdentifierValueInput placeholder={t('global:VALUE')} type={customIdentifierType} />
                                </Form.Item>
                              );
                            }}
                          </Form.Item>
                        </Col>
                        <Col md={2}>
                          <MinusCircleOutlined
                            className={classes.removeIcon}
                            onClick={() => remove(customIdentifier.name)}
                          />
                        </Col>
                      </Row>
                    ))}
                    <Row gutter={16}>
                      <Col span={24}>
                        <Button
                          onClick={() => add({ key: '', type: 'number', value: '' })}
                          disabled={disableForm}
                          className={classes.addIconGrid}
                        >
                          <PlusOutlined />
                          {t('paymentMerchantPage:ADD_CUSTOM_IDENTIFIERS')}
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
              </Form.List>
            </Card>
          </Col>
        </Row>
      </div>
      {
        // create new merchant button active if merchant is not created
        !disableForm && (
          <Row justify="end">
            <Col>
              <Form.Item>
                <Button loading={createMerchantSelectorIsPending} type="primary" htmlType="submit">
                  {t('global:SUBMIT')}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        )
      }
    </Form>

  );
};

export default CreateMerchantForm;
