import {
  Button,
  Card,
  Col,
  Collapse,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import { useState } from 'react';
import { CloseCircleFilled, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { addPaymentMethodToPaymentProviderSelector, createMerchantPaymentProviderSelector } from '../../../redux/selectors';
import useStyles from '../styles';
import CardFooter from '../../CardFooter';
import AntSelect from '@shared/components/UI/AntSelect';
import { preparePaymentProvidersFormData } from '../formHelpers';
import {
  availableChannelList,
  keyList,
} from '@app/pages/Payment/Merchant/New/constants';
import { Creators } from '../../../redux/actions';
import {
  addSettingsToPaymentMethod,
  addSettingsToPaymentMethods,
  addSettingsToPaymentProvider,
} from '../../../../New/components/New/formHelper';
import {
  checkPaymentMethodExistInPaymentProvider,
  checkPaymentProviderExist,
} from '../../../../../utils';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import CurrencyFormatInput from './CurrencyFormatInput';

const { Panel } = Collapse;
const { Text } = Typography;

const PaymentProviders = ({
  initialPaymentProviders = [],
  t,
  disableEditAction,
  currency,
}) => {
  const [editActive, setEditActive] = useState(false);
  const classes = useStyles();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id: updatedMerchantId } = useParams();
  const addPaymentMethodToPaymentProviderIsPending = useSelector(
    addPaymentMethodToPaymentProviderSelector.getIsPending,
  );
  const createMerchantPaymentProviderIsPending = useSelector(
    createMerchantPaymentProviderSelector.getIsPending,
  );
  const codeAlpha3 = currency?.codeAlpha3;

  const handleSubmitForm = () => {
    // TODO: edit payment providers here

    const { paymentProviderList } = form.getFieldsValue();
    const updatedPaymentProviderList = [];
    const updatedPaymentMethods = []; // includes payment provider key
    try {
      paymentProviderList.forEach((paymentProvider, index) => {
        const { key, name, paymentMethods, merchantId } = paymentProvider;
        const isPaymentProviderExist = checkPaymentProviderExist(
          initialPaymentProviders,
          name,
          key,
        );
        // adding payment method to existing payment provider
        if (isPaymentProviderExist) {
          const initialPaymentMethods =
            initialPaymentProviders[index]?.paymentMethods;
          // check each payment method
          paymentMethods.forEach(method => {
            const isPaymentMethodExist =
              checkPaymentMethodExistInPaymentProvider(
                initialPaymentMethods,
                method.name,
                method.key,
              );
            // TODO: add method exist condition
            if (!isPaymentMethodExist) {
              const paymentMethodsSettings = addSettingsToPaymentMethod(method);
              const methodWithProviderId = {
                providerKey: paymentProvider.key,
                merchantId: updatedMerchantId,
                method: paymentMethodsSettings,
              };
              updatedPaymentMethods.push(methodWithProviderId);
            }
          });
        }
        else {
          const paymentMethodsSettings =
            addSettingsToPaymentMethods(paymentMethods);
          const paymentProviderWithSettings = addSettingsToPaymentProvider(
            paymentProvider,
            paymentMethodsSettings,
            merchantId,
          );
          updatedPaymentProviderList.push(paymentProviderWithSettings);
        }
      });
      if (updatedPaymentMethods.length > 0) {
        dispatch(
          Creators.addPaymentMethodToPaymentProviderRequest({ addMerchantPaymentMethodRequestPayloads: updatedPaymentMethods }),
        );
      }
      if (updatedPaymentProviderList.length > 0) {
        dispatch(
          Creators.createMerchantPaymentProviderRequest({
            createMerchantPaymentProviderRequestPayloads:
              updatedPaymentProviderList,
          }),
        );
      }
    }
    catch (error) {
      dispatch(ToastCreators.error({ message: error }));
    }
  };
  const handleCancel = () => {
    setEditActive(false);
    form.resetFields();
  };
  return (
    <Collapse defaultActiveKey="4">
      <Panel
        header={<div>{t('paymentMerchantPage:PAYMENT_PROVIDERS')}</div>}
        key="4"
      >
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          name="payment-providers-form"
          initialValues={{
            paymentProviderList: preparePaymentProvidersFormData(
              initialPaymentProviders,
            ),
          }}
        >
          <Form.List name="paymentProviderList">
            {(paymentProviders, { add, remove }) => (
              <>
                {paymentProviders.map((paymentProvider, providerIndex) => {
                  return (
                    <Card
                      className="mb-4"
                      key={paymentProvider.key}
                      title={initialPaymentProviders[providerIndex]?.name}
                    >
                      {editActive && (
                        <div className={classes.removeCardIcon}>
                          <CloseCircleFilled
                            onClick={() => remove(paymentProvider.name)}
                          />
                        </div>
                      )}

                      <Row gutter={12}>
                        <Col xs={24} md={3}>
                          <Form.Item
                            fieldKey={[paymentProvider.fieldKey, 'id']}
                            label="ID"
                            rules={[
                              {
                                required: true,
                                message: t('error:REQUIRED'),
                              },
                            ]}
                            name={[paymentProvider.name, 'id']}
                          >
                            <Input disabled={!editActive} />
                          </Form.Item>
                        </Col>
                        <Col md={3} xs={24}>
                          <Form.Item
                            fieldKey={[paymentProvider.fieldKey, 'name']}
                            label={t('global:NAME')}
                            rules={[
                              {
                                required: true,
                                message: t('error:REQUIRED'),
                              },
                            ]}
                            name={[paymentProvider.name, 'name']}
                          >
                            <Input disabled={!editActive} />
                          </Form.Item>
                        </Col>
                        <Col md={3} xs={24}>
                          <Form.Item
                            fieldKey={[paymentProvider.fieldKey, 'key']}
                            label="Key"
                            name={[paymentProvider.name, 'key']}
                            rules={[
                              {
                                required: true,
                                message: t('error:REQUIRED'),
                              },
                            ]}
                          >
                            <Select
                              disabled={!editActive}
                              options={keyList}
                              placeholder="Key"
                            />
                          </Form.Item>
                        </Col>
                        <Col md={3} xs={24}>
                          <Form.Item
                            fieldKey={[
                              paymentProvider.fieldKey,
                              'merchantId',
                            ]}
                            label={t('paymentMerchantPage:MERCHANT_ID')}
                            rules={[
                              {
                                required: true,
                                message: t('error:REQUIRED'),
                              },
                            ]}
                            name={[paymentProvider.name, 'merchantId']}
                          >
                            <Input disabled={!editActive} />
                          </Form.Item>
                        </Col>
                        <Col md={7} lg={6} xs={24}>
                          <Form.Item
                            label={t(
                              'paymentMerchantPage:MIN_MAX_PURCHASE_AMOUNT',
                            )}
                          >
                            <Input.Group compact>
                              <Form.Item
                                name={[
                                  paymentProvider.name,
                                  'minPurchaseAmount',
                                ]}
                              >
                                <CurrencyFormatInput
                                  className={classes.inputNumberSize}
                                  disabled={!editActive}
                                  placeholder="Minimum"
                                  currency={codeAlpha3}
                                />
                              </Form.Item>
                              <Input
                                className={classes.inputSplitBox}
                                placeholder="~"
                                disabled
                              />
                              <Form.Item
                                name={[
                                  paymentProvider.name,
                                  'maxPurchaseAmount',
                                ]}
                              >
                                <CurrencyFormatInput
                                  className={classes.inputNumberSize}
                                  disabled={!editActive}
                                  placeholder="Maximum"
                                  currency={codeAlpha3}
                                />
                              </Form.Item>
                            </Input.Group>
                          </Form.Item>
                        </Col>
                        <Col md={3} xs={24}>
                          <Form.Item
                            fieldKey={[paymentProvider.fieldKey, 'enabled']}
                            label={t('paymentMerchantPage:ENABLED')}
                            name={[paymentProvider.name, 'enabled']}
                            valuePropName="checked"
                          >
                            <Switch disabled={!editActive} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <Text>
                            {t('paymentMerchantPage:PAYMENT_METHODS')}
                          </Text>
                          <Row
                            gutter={12}
                            className={classes.paymentMethodGrid}
                          >
                            <Form.List
                              name={[paymentProvider.name, 'paymentMethods']}
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
                                    (paymentMethod, methodIndex) => (
                                      <Col
                                        md={6}
                                        xs={24}
                                        key={paymentMethod.key}
                                      >
                                        <Form.Item>
                                          <Card
                                            title={
                                              form.getFieldValue(
                                                'paymentProviderList',
                                              )[providerIndex]
                                                ?.paymentMethods[methodIndex]
                                                ?.name
                                            }
                                          >
                                            {editActive && (
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
                                            )}
                                            <Form.Item
                                              fieldKey={[
                                                paymentMethod.fieldKey,
                                                'key',
                                              ]}
                                              label="Key"
                                              name={[
                                                paymentMethod.name,
                                                'key',
                                              ]}
                                            >
                                              <Input disabled={!editActive} />
                                            </Form.Item>
                                            <Form.Item
                                              fieldKey={[
                                                paymentMethod.fieldKey,
                                                'name',
                                              ]}
                                              label={t('global:NAME')}
                                              name={[
                                                paymentMethod.name,
                                                'name',
                                              ]}
                                            >
                                              <Input disabled={!editActive} />
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
                                              <InputNumber
                                                disabled={!editActive}
                                                type="number"
                                                className={classes.fullWidth}
                                              />
                                            </Form.Item>
                                            <Form.Item
                                              {...paymentMethod}
                                              fieldKey={[
                                                paymentMethod.fieldKey,
                                                'availableChannels',
                                              ]}
                                              label={t(
                                                'paymentMerchantPage:AVAILABLE_CHANNELS',
                                              )}
                                              name={[
                                                paymentMethod.name,
                                                'availableChannels',
                                              ]}
                                            >
                                              <AntSelect
                                                mode="multiple"
                                                options={availableChannelList}
                                                disabled={!editActive}
                                              />
                                            </Form.Item>
                                            <Form.Item
                                              fieldKey={[
                                                paymentMethod.fieldKey,
                                                'enabled',
                                              ]}
                                              label={t(
                                                'paymentMerchantPage:ENABLED',
                                              )}
                                              name={[
                                                paymentMethod.name,
                                                'enabled',
                                              ]}
                                              valuePropName="checked"
                                            >
                                              <Switch
                                                disabled={!editActive}
                                              />
                                            </Form.Item>
                                          </Card>
                                        </Form.Item>
                                      </Col>
                                    ),
                                  )}
                                  {editActive && (
                                    <Col md={6} xs={24}>
                                      <Button
                                        onClick={() => addPaymentMethod()}
                                        className={classes.addPaymentMethod}
                                      >
                                        <PlusOutlined />
                                        {t(
                                          'paymentMerchantPage:ADD_PAYMENT_METHOD',
                                        )}
                                      </Button>
                                    </Col>
                                  )}
                                </>
                              )}
                            </Form.List>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  );
                })}
                {editActive && (
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
                )}
              </>
            )}
          </Form.List>
          {!disableEditAction && (
            <CardFooter
              disableEdit
              editActive={editActive}
              setEditActive={setEditActive}
              handleSubmitForm={handleSubmitForm}
              handleCancel={handleCancel}
              loading={
                addPaymentMethodToPaymentProviderIsPending ||
                createMerchantPaymentProviderIsPending
              }
            />
          )}
        </Form>
      </Panel>
    </Collapse>
  );
};

export default PaymentProviders;
