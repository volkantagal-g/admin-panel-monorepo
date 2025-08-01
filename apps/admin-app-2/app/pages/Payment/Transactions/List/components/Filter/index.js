import { Row, Col, Collapse, Typography, Button, Input, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { merchantListSelector, transactionsSelector } from '../../redux/selectors';
import { INIT_FILTERS } from '../../constants';
import { Creators } from '../../redux/actions';
import AntSelect from '@shared/components/UI/AntSelect';
import { STATUS_OPTIONS, CUSTOM_DATE_FORMAT, DEVICE_TYPE_OPTIONS } from '@app/pages/Payment/constants';
import { alphabeticallySortByParam } from '@shared/utils/common';
import CustomDayRangePicker from '@shared/components/UI/CustomDayRangePicker';

const { Text } = Typography;
const { Panel } = Collapse;

const Filter = () => {
  const { t } = useTranslation(['paymentTransactionPage', 'global']);
  const [isMoreFilterActive, setIsMoreFilterActive] = useState(false);
  const classes = useStyles();
  const transactionsSelectorIsPending = useSelector(transactionsSelector.getIsPending);
  const merchantListSelectorData = useSelector(merchantListSelector.getData);
  const merchantListSelectorIsPending = useSelector(
    merchantListSelector.getIsPending,
  );
  const merchantNameList = [];
  const merchantKeyList = [];

  merchantListSelectorData?.forEach(merchant => {
    merchantNameList.push({ label: merchant?.settings.displayName, value: merchant?.id });
    merchantKeyList.push({ label: merchant?.key, value: merchant?.key });
  });

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [createdAt, setCreatedAt] = useState(INIT_FILTERS.createdAt);
  const [uniqueSearchActive, setUniqueSearchActive] = useState(false);

  // for prevent backend bottleneck, filter area split into two main pieces. Unique search and regular search.
  // if filtering field is indexed from db, it called 'unique search'
  const uniquenessSearchActive = () => {
    form.setFieldsValue({
      merchantReference: INIT_FILTERS.merchantReference,
      merchantId: INIT_FILTERS.merchantId,
      merchantKey: INIT_FILTERS.merchantKey,
      merchantIdByName: INIT_FILTERS.merchantId,
      paymentProvider: INIT_FILTERS.paymentProvider,
      paymentMethod: INIT_FILTERS.paymentMethod,
      status: INIT_FILTERS.status,
      mixed: INIT_FILTERS.mixed,
      shopperId: INIT_FILTERS.shopperId,
      deviceType: INIT_FILTERS.deviceType,
    });
    setCreatedAt(null);
  };

  const uniquenessSearchDisable = () => {
    form.setFieldsValue({
      transactionId: INIT_FILTERS.transactionId,
      eventId: INIT_FILTERS.eventId,
      merchantOrderId: INIT_FILTERS.merchantOrderId,
      pspReference: INIT_FILTERS.pspReference,
    });
    if (createdAt === null) {
      setCreatedAt(INIT_FILTERS.createdAt);
    }
  };

  const onFinish = values => {
    dispatch(Creators.submitFilters({ filters: { ...values, createdAt } }));
  };

  useEffect(() => {
    dispatch(Creators.getMerchantListRequest());
    dispatch(Creators.submitFilters({ filters: INIT_FILTERS }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onValuesChange = (__changedFields, allFields) => {
    const { transactionId, merchantOrderId, eventId, pspReference } = allFields;
    const isUniqueSearchActive = transactionId || merchantOrderId || eventId || pspReference;

    if (isUniqueSearchActive) {
      setUniqueSearchActive(true);
      uniquenessSearchActive();
    }
    else {
      setUniqueSearchActive(false);
      uniquenessSearchDisable();
    }
  };

  return (
    <Row className={classes.margin8}>
      <Col span={24}>
        <Collapse defaultActiveKey={1}>
          <Panel header={t('global:FILTER')} key={1}>
            <Form
              form={form}
              name="filterForm"
              initialValues={{
                transactionId: INIT_FILTERS.transactionId,
                merchantReference: INIT_FILTERS.merchantReference,
                merchantId: INIT_FILTERS.merchantId,
                merchantKey: INIT_FILTERS.merchantKey,
                merchantIdByName: INIT_FILTERS.merchantId,
                paymentProvider: INIT_FILTERS.paymentProvider,
                paymentMethod: INIT_FILTERS.paymentMethod,
                status: INIT_FILTERS.status,
                mixed: INIT_FILTERS.mixed,
                eventId: INIT_FILTERS.eventId,
                shopperId: INIT_FILTERS.shopperId,
                merchantOrderId: INIT_FILTERS.merchantOrderId,
                pspReference: INIT_FILTERS.pspReference,
                deviceType: INIT_FILTERS.deviceType,
              }}
              onFinish={onFinish}
              onValuesChange={onValuesChange}
              className={classes.antDefaultForm}
            >
              <Row gutter={[8, 8]}>
                <Col md={4} xs={24}>
                  <Text>{t('FILTER.MERCHANT_ORDER_ID.TITLE')}</Text>
                  <Form.Item name="merchantOrderId">
                    <Input
                      disabled={transactionsSelectorIsPending}
                      placeholder={t('FILTER.MERCHANT_ORDER_ID.DESC')}
                    />
                  </Form.Item>
                </Col>
                <Col md={4} xs={24}>
                  <Text>{t('FILTER.TRANSACTION_ID.TITLE')}</Text>
                  <Form.Item name="transactionId">
                    <Input
                      disabled={transactionsSelectorIsPending}
                      placeholder={t('FILTER.TRANSACTION_ID.DESC')}
                    />
                  </Form.Item>
                </Col>
                <Col md={4} xs={24}>
                  <Text>{t('FILTER.EVENT_ID.TITLE')}</Text>
                  <Form.Item name="eventId">
                    <Input
                      disabled={transactionsSelectorIsPending}
                      placeholder={t('FILTER.EVENT_ID.DESC')}
                    />
                  </Form.Item>
                </Col>
                <Col md={4} xs={24}>
                  <Text>{t('FILTER.PSP_REFERENCE.TITLE')}</Text>
                  <Form.Item name="pspReference">
                    <Input
                      disabled={transactionsSelectorIsPending}
                      placeholder={t('FILTER.PSP_REFERENCE.DESC')}
                    />
                  </Form.Item>
                </Col>
                <Col md={4} xs={24}>
                  <Text>{t('FILTER.SHOPPER_ID.TITLE')}</Text>
                  <Form.Item name="shopperId">
                    <Input
                      disabled={transactionsSelectorIsPending || uniqueSearchActive}
                      placeholder={t('FILTER.SHOPPER_ID.DESC')}
                    />
                  </Form.Item>
                </Col>
                <Col md={4} xs={24}>
                  <Text>{t('FILTER.PAYMENT_PROVIDER.TITLE')}</Text>
                  <Form.Item name="paymentProvider">
                    <Input
                      disabled={transactionsSelectorIsPending || uniqueSearchActive}
                      placeholder={t('FILTER.PAYMENT_PROVIDER.DESC')}
                    />
                  </Form.Item>
                </Col>
                <Col md={4} xs={24}>
                  <Text>{t('FILTER.PAYMENT_METHOD.TITLE')}</Text>
                  <Form.Item name="paymentMethod">
                    <Input
                      disabled={transactionsSelectorIsPending || uniqueSearchActive}
                      placeholder={t('FILTER.PAYMENT_METHOD.DESC')}
                    />
                  </Form.Item>
                </Col>
                <Col md={4} xs={24}>
                  <Text>{t('MIXED_PAYMENT')}</Text>
                  <Form.Item name="mixed">
                    <AntSelect
                      allowClear
                      showSearch
                      className="w-100"
                      optionFilterProp="label"
                      placeholder={t('MIXED_PAYMENT')}
                      disabled={transactionsSelectorIsPending || uniqueSearchActive}
                      options={[{ label: t('MIXED_PAYMENT'), value: true }, { label: t('SINGLE_PAYMENT'), value: false }]}
                    />
                  </Form.Item>
                </Col>
                <Col md={4} xs={24}>
                  <Text>{t('FILTER.STATUS.TITLE')}</Text>
                  <Form.Item name="status">
                    <AntSelect
                      allowClear
                      showSearch
                      className="w-100"
                      optionFilterProp="label"
                      placeholder={t('FILTER.STATUS.DESC')}
                      disabled={transactionsSelectorIsPending || uniqueSearchActive}
                      options={alphabeticallySortByParam(STATUS_OPTIONS)}
                    />
                  </Form.Item>
                </Col>

                <Col md={8} xs={24}>
                  <Text>{t('global:CREATED_AT')}</Text>
                  <CustomDayRangePicker
                    className={classes.filterItem}
                    value={createdAt}
                    onChange={val => setCreatedAt(val)}
                    disabled={transactionsSelectorIsPending || uniqueSearchActive}
                    format={CUSTOM_DATE_FORMAT}
                    showTime
                    allowClear={false}
                  />
                </Col>
                {
                  isMoreFilterActive && (
                    <>
                      <Col md={4} xs={24}>
                        <Text>{t('FILTER.MERCHANT_ID.TITLE')}</Text>
                        <Form.Item name="merchantId">
                          <Input
                            disabled={transactionsSelectorIsPending || uniqueSearchActive}
                            placeholder={t('FILTER.MERCHANT_ID.DESC')}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={4} xs={24}>
                        <Text>{t('FILTER.MERCHANT.TITLE')}</Text>
                        <Form.Item name="merchantIdByName">
                          <AntSelect
                            allowClear
                            showSearch
                            className="w-100"
                            optionFilterProp="label"
                            placeholder={t('FILTER.MERCHANT.DESC')}
                            disabled={transactionsSelectorIsPending || merchantListSelectorIsPending || uniqueSearchActive}
                            options={alphabeticallySortByParam(merchantNameList)}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={4} xs={24}>
                        <Text>{t('FILTER.MERCHANT_KEY.TITLE')}</Text>
                        <Form.Item name="merchantKey">
                          <AntSelect
                            allowClear
                            showSearch
                            className="w-100"
                            optionFilterProp="label"
                            placeholder={t('FILTER.MERCHANT_KEY.DESC')}
                            disabled={transactionsSelectorIsPending || merchantListSelectorIsPending || uniqueSearchActive}
                            options={alphabeticallySortByParam(merchantKeyList)}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={4} xs={24}>
                        <Text>{t('FILTER.MERCHANT_REFERENCE.TITLE')}</Text>
                        <Form.Item name="merchantReference">
                          <Input
                            disabled={transactionsSelectorIsPending || uniqueSearchActive}
                            placeholder={t('FILTER.MERCHANT_REFERENCE.DESC')}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={4} xs={24}>
                        <Text>{t('FILTER.DEVICE_TYPE.TITLE')}</Text>
                        <Form.Item name="deviceType">
                          <AntSelect
                            allowClear
                            showSearch
                            className="w-100"
                            optionFilterProp="label"
                            placeholder={t('FILTER.DEVICE_TYPE.DESC')}
                            disabled={transactionsSelectorIsPending || uniqueSearchActive}
                            options={alphabeticallySortByParam(DEVICE_TYPE_OPTIONS)}
                          />
                        </Form.Item>
                      </Col>
                    </>
                  )
                }
                <Col md={4} xs={24} className="d-flex align-items-center">
                  <Button type="link" onClick={() => setIsMoreFilterActive(!isMoreFilterActive)}>
                    {isMoreFilterActive ? t('LESS_FILTER') : t('MORE_FILTER')}
                  </Button>
                </Col>
              </Row>
              <Row justify="end" className={classes.margin8}>
                <Button htmlType="submit" type="primary" disabled={transactionsSelectorIsPending}>
                  {t('BRING')}
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
