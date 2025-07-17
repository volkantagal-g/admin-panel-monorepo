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
import { useDispatch, useSelector } from 'react-redux';
import {
  CloseCircleFilled,
  PlusOutlined,
} from '@ant-design/icons';

import { Creators } from '../../../redux/actions';
import useStyles from '../styles';
import { createMerchantPaymentProviderSelector, createMerchantSelector } from '../../../redux/selectors';
import { availableChannelList, keyList } from '../../../constants';
import AntSelect from '@shared/components/UI/AntSelect';
import { addSettingsToCreateMerchantPaymentProviderRequest } from '../formHelper';

const { Text } = Typography;
const PaymentProviderForm = () => {
  const { t } = useTranslation(['paymentMerchantPage', 'global', 'error']);
  const dispatch = useDispatch();
  const classes = useStyles();
  const createMerchantPaymentProviderSelectorIsPending = useSelector(
    createMerchantPaymentProviderSelector.getIsPending,
  );

  const createMerchantSelectorData = useSelector(
    createMerchantSelector.getData,
  );

  const createdMerchantId = createMerchantSelectorData?.id;

  const onFinish = values => {
    const { paymentProviders } = values;
    const createMerchantPaymentProviderRequestPayloads = addSettingsToCreateMerchantPaymentProviderRequest(paymentProviders, createdMerchantId);
    dispatch(Creators.createMerchantPaymentProviderRequest({ createMerchantPaymentProviderRequestPayloads }));
  };

  return (
    <Form
      name="new-merchant-payment-provider"
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
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

      <Row className={classes.cardSection}>
        <Col span={24}>
          <Card title={t('paymentMerchantPage:PAYMENT_PROVIDERS')}>
            <Form.List name="paymentProviders">
              {(paymentProviders, { add, remove }) => (
                <>
                  {paymentProviders.map(
                    (paymentProvider, providerIndex) => (
                      <Row gutter={16} key={paymentProvider.key}>
                        <Col span={24}>
                          <div className={classes.cardSection}>
                            <Card>
                              <div className={classes.removeCardIcon}>
                                <CloseCircleFilled
                                  onClick={() => remove(paymentProvider.name)}
                                />
                              </div>
                              <Row gutter={16}>
                                <Col md={3} xs={24}>
                                  <Form.Item
                                    {...paymentProvider}
                                    label="ID"
                                    name={[paymentProvider.name, 'id']}
                                    rules={[{ required: true, message: t('error:REQUIRED') }]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col md={3} xs={24}>
                                  <Form.Item
                                    {...paymentProvider}
                                    label={t('global:NAME')}
                                    name={[paymentProvider.name, 'name']}
                                    rules={[{ required: true, message: t('error:REQUIRED') }]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col md={3} xs={24}>
                                  <Form.Item
                                    {...paymentProvider}
                                    label="Key"
                                    name={[paymentProvider.name, 'key']}
                                    rules={[{ required: true, message: t('error:REQUIRED') }]}
                                  >
                                    <Select
                                      options={keyList}
                                      placeholder="Key"
                                    />
                                  </Form.Item>
                                </Col>
                                <Col md={3} xs={24}>
                                  <Form.Item
                                    rules={[{ required: true, message: t('error:REQUIRED') }]}
                                    label={t('paymentMerchantPage:MERCHANT_ID')}
                                    name={[paymentProvider.name, ['providerMerchantId']]}
                                  >
                                    <Input placeholder={t('paymentMerchantPage:MERCHANT_ID')} />
                                  </Form.Item>
                                </Col>

                                <Col md={7} xs={24}>
                                  <Form.Item
                                    label={t('paymentMerchantPage:MIN_MAX_PURCHASE_AMOUNT')}
                                  >
                                    <Input.Group compact>
                                      <Form.Item name={[
                                        paymentProvider.name,
                                        'minPurchaseAmount',
                                      ]}
                                      >
                                        <InputNumber className={classes.inputNumberSize} type="number" placeholder="Minimum" />
                                      </Form.Item>
                                      <Input
                                        className={classes.inputSplitBox}
                                        placeholder="~"
                                        disabled
                                      />
                                      <Form.Item name={[
                                        paymentProvider.name,
                                        'maxPurchaseAmount',
                                      ]}
                                      >
                                        <InputNumber className={classes.inputNumberSize} type="number" placeholder="Maximum" />

                                      </Form.Item>
                                    </Input.Group>
                                  </Form.Item>
                                </Col>
                                <Col md={2} xs={24}>
                                  <Form.Item
                                    label={t('paymentMerchantPage:ENABLED')}
                                    name={[paymentProvider.name, 'enabled']}
                                    valuePropName="checked"
                                  >
                                    <Switch />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row>
                                <Col span={24}>
                                  <div className={classes.cardSection}>
                                    <Text>
                                      {t(
                                        'paymentMerchantPage:PAYMENT_METHODS',
                                      )}
                                    </Text>
                                  </div>
                                  <Row gutter={16}>
                                    <Form.List
                                      name={[
                                        paymentProvider.name,
                                        'paymentMethods',
                                      ]}
                                    >
                                      {(
                                        paymentMethods,
                                        {
                                          add: addPaymentMethod,
                                          remove: removePaymentMethod,
                                        },
                                      ) => (
                                        <>
                                          {paymentMethods.map(
                                            (
                                              paymentMethod,
                                              paymentMethodIndex,
                                            ) => (
                                              <Col
                                                md={6}
                                                xs={24}
                                                key={paymentMethod.key}
                                              >
                                                <Card
                                                  title={
                                                    paymentMethod[
                                                      providerIndex
                                                    ]?.paymentMethods[
                                                      paymentMethodIndex
                                                    ]?.name
                                                  }
                                                >
                                                  <div
                                                    className={
                                                      classes.removeCardIcon
                                                    }
                                                  >
                                                    <CloseCircleFilled
                                                      onClick={() => removePaymentMethod(
                                                        paymentMethod.name,
                                                      )}
                                                    />
                                                  </div>
                                                  <Form.Item
                                                    label="ID"
                                                    rules={[{ required: true, message: t('error:REQUIRED') }]}
                                                    fieldKey={[
                                                      paymentMethod.fieldKey,
                                                      'id',
                                                    ]}
                                                    name={[
                                                      paymentMethod.name,
                                                      'id',
                                                    ]}
                                                  >
                                                    <Input />
                                                  </Form.Item>
                                                  <Form.Item
                                                    label="Key"
                                                    rules={[{ required: true, message: t('error:REQUIRED') }]}
                                                    fieldKey={[
                                                      paymentMethod.fieldKey,
                                                      'key',
                                                    ]}
                                                    name={[
                                                      paymentMethod.name,
                                                      'key',
                                                    ]}
                                                  >
                                                    <Input />
                                                  </Form.Item>
                                                  <Form.Item
                                                    label={t('global:NAME')}
                                                    rules={[{ required: true, message: t('error:REQUIRED') }]}
                                                    fieldKey={[
                                                      paymentMethod.fieldKey,
                                                      'name',
                                                    ]}
                                                    name={[
                                                      paymentMethod.name,
                                                      'name',
                                                    ]}
                                                  >
                                                    <Input />
                                                  </Form.Item>
                                                  <Form.Item
                                                    label={t(
                                                      'paymentMerchantPage:DISPLAY_ORDER',
                                                    )}
                                                    fieldKey={[
                                                      paymentMethod.fieldKey,
                                                      'displayOrder',
                                                    ]}
                                                    name={[
                                                      paymentMethod.name,
                                                      'displayOrder',
                                                    ]}
                                                  >
                                                    <InputNumber type="number" style={{ width: '100%' }} />
                                                  </Form.Item>
                                                  <Form.Item
                                                    label={t(
                                                      'paymentMerchantPage:AVAILABLE_CHANNELS',
                                                    )}
                                                    rules={[{ required: true, message: t('error:REQUIRED') }]}
                                                    fieldKey={[
                                                      paymentMethod.fieldKey,
                                                      'availableChannels',
                                                    ]}
                                                    name={[
                                                      paymentMethod.name,
                                                      'availableChannels',
                                                    ]}
                                                  >
                                                    <AntSelect options={availableChannelList} mode="multiple" />
                                                  </Form.Item>
                                                  <Form.Item
                                                    label={t(
                                                      'paymentMerchantPage:ENABLED',
                                                    )}
                                                    fieldKey={[
                                                      paymentMethod.fieldKey,
                                                      'enabled',
                                                    ]}
                                                    name={[
                                                      paymentMethod.name,
                                                      'enabled',
                                                    ]}
                                                    valuePropName="checked"
                                                  >
                                                    <Switch />
                                                  </Form.Item>
                                                </Card>
                                              </Col>
                                            ),
                                          )}

                                          <Col md={6} xs={24}>
                                            <Button
                                              onClick={() => addPaymentMethod()}
                                              className={
                                                classes.addPaymentMethod
                                              }
                                            >
                                              <PlusOutlined />
                                              {t(
                                                'paymentMerchantPage:ADD_PAYMENT_METHOD',
                                              )}
                                            </Button>
                                          </Col>
                                        </>
                                      )}
                                    </Form.List>
                                  </Row>
                                </Col>
                              </Row>
                            </Card>
                          </div>
                        </Col>
                      </Row>
                    ),
                  )}
                  <Row gutter={16}>
                    <Col span={24}>
                      <Button
                        onClick={() => add()}
                        className={classes.addIconGrid}
                      >
                        <PlusOutlined />
                        {t('paymentMerchantPage:ADD_PAYMENT_PROVIDER')}
                      </Button>
                    </Col>
                  </Row>
                </>
              )}

            </Form.List>
          </Card>
        </Col>
      </Row>
      <Form.Item>
        <Row justify="end">
          <Col>
            <Form.Item>
              <Button loading={createMerchantPaymentProviderSelectorIsPending} type="primary" htmlType="submit">
                {t('global:SUBMIT')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default PaymentProviderForm;
