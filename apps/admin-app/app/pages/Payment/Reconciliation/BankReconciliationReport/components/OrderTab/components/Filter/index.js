import { useState } from 'react';
import { Row, Col, Collapse, Typography, Button, Checkbox, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import AntSelect from '@shared/components/UI/AntSelect';
import useStyles from './styles';
import { alphabeticallySortByParam } from '@shared/utils/common';
import { INIT_FILTERS_ORDER, REFUND_STATUS_OPTIONS, ORDER_STATUS_OPTIONS } from '../../../../constants';
import { reconciliationsSelector } from '../../../../redux/selectors';
import { isLocationTurkey } from '../../../../utils';
import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import { LOCATION_BASED_SOURCE_OF_STATEMENTS } from '@app/pages/Payment/Reconciliation/utils';
import { ALL_DOMAIN_OPTIONS } from '@app/pages/Payment/Reconciliation/constants';
import { Creators } from '../../../../redux/actions';
import CustomDayRangePicker from '@shared/components/UI/CustomDayRangePicker';

const { Text } = Typography;
const { Panel } = Collapse;

const Filter = () => {
  const { t } = useTranslation(['bankReconciliationReportPage', 'global']);
  const classes = useStyles();
  const reconciliationsIsPending = useSelector(
    reconciliationsSelector.getIsPending,
  );
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [checkoutDate, setCheckoutDate] = useState(INIT_FILTERS_ORDER.checkoutDate);

  const [reconciliationCheckDate, setReconciliationCheckDate] = useState(
    INIT_FILTERS_ORDER.reconciliationCheckDate,
  );

  const [uniqueSearchActive, setUniqueSearchActive] = useState(false);

  // for prevent backend bottleneck, filter area split into two main pieces. Unique search and regular search.
  // if filtering field is indexed from db, it called 'unique search'

  const uniquenessSearchActive = () => {
    form.setFieldsValue({
      sourceOfStatements: INIT_FILTERS_ORDER.sourceOfStatements,
      domainTypes: INIT_FILTERS_ORDER.domainTypes,
      isRefundable: undefined,
      refundStatus: INIT_FILTERS_ORDER.refundStatus,
      orderStatus: INIT_FILTERS_ORDER.orderStatus,
    });
    setReconciliationCheckDate(null);
    setCheckoutDate(INIT_FILTERS_ORDER.checkoutDate);
  };

  const uniquenessSearchDisable = () => {
    form.setFieldsValue({
      orderIds: INIT_FILTERS_ORDER.orderIds,
      transactionIds: INIT_FILTERS_ORDER.transactionIds,
      basketIds: INIT_FILTERS_ORDER.basketIds,
    });
    // reconciliationCheckDate have to be filled, should't be empty!
    if (reconciliationCheckDate === null) {
      setReconciliationCheckDate(INIT_FILTERS_ORDER.reconciliationCheckDate);
    }
    // isRefundable have to be defined, should't be undefined!
    if (form.getFieldValue('isRefundable') === undefined) {
      form.setFieldsValue({ isRefundable: INIT_FILTERS_ORDER.isRefundable });
    }
  };

  const onFinish = values => {
    const filters = {
      ...values,
      // location based conditions. in API, these 4 fields are not nullable
      transactionIds: values.transactionIds ? values.transactionIds : [],
      externalPaymentTokens: values.externalPaymentTokens ? values.externalPaymentTokens : [],
      sourceOfStatements: values.sourceOfStatements ? values.sourceOfStatements : [],
      basketIds: values.basketIds ? values.basketIds : [],

      checkoutStartDate: checkoutDate
        ? checkoutDate[0].format('YYYY-MM-DD')
        : null,
      checkoutEndDate: checkoutDate
        ? checkoutDate[1].format('YYYY-MM-DD')
        : null,
      reconciliationCheckStartDate: reconciliationCheckDate
        ? reconciliationCheckDate[0].format('YYYY-MM-DD')
        : null,
      reconciliationCheckEndDate: reconciliationCheckDate
        ? reconciliationCheckDate[1].format('YYYY-MM-DD')
        : null,
    };
    dispatch(Creators.submitOrderFilters({ filters }));
  };

  const onValuesChange = (changedFields, allFields) => {
    const { orderIds, transactionIds, basketIds } = allFields;
    const isUniqueSearchActive = orderIds?.length > 0 || transactionIds?.length > 0 || basketIds?.length > 0;

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
    <Row className="mt-2 mb-4" data-testid="reconciliation-filter">
      <Col span={24}>
        <Collapse defaultActiveKey={1}>
          <Panel header={t('global:FILTER')} key={1}>
            <Form
              form={form}
              name="filterForm"
              initialValues={{
                orderIds: INIT_FILTERS_ORDER.orderIds,
                basketIds: INIT_FILTERS_ORDER.basketIds,
                transactionIds: INIT_FILTERS_ORDER.transactionIds,
                isRefundable: INIT_FILTERS_ORDER.isRefundable,
                refundStatus: INIT_FILTERS_ORDER.refundStatus,
                orderStatus: INIT_FILTERS_ORDER.orderStatus,
                domainTypes: INIT_FILTERS_ORDER.domainTypes,
                sourceOfStatements: INIT_FILTERS_ORDER.sourceOfStatements,
                externalPaymentTokens: INIT_FILTERS_ORDER.externalPaymentTokens,
              }}
              onFinish={onFinish}
              onValuesChange={onValuesChange}
              className={classes.form}
            >
              <Row gutter={[8, 8]}>
                <Col md={6} xs={24}>
                  <Text>{t('FILTER.ORDER_ID.TITLE')}</Text>
                  <Form.Item name="orderIds">
                    <AntSelect
                      allowClear
                      className="w-100"
                      mode="tags"
                      tokenSeparators={[' ']}
                      placeholder={t('FILTER.ORDER_ID.DESC')}
                      disabled={reconciliationsIsPending}
                    />
                  </Form.Item>
                </Col>
                {isLocationTurkey && (
                  <Col md={6} xs={24}>
                    <Text>{t('FILTER.EVENT_ID.TITLE')}</Text>
                    <Form.Item name="transactionIds">
                      <AntSelect
                        allowClear
                        tokenSeparators={[' ']}
                        placeholder={t('FILTER.EVENT_ID.DESC')}
                        className="w-100"
                        mode="tags"
                        disabled={reconciliationsIsPending}
                      />
                    </Form.Item>
                  </Col>
                )}
                {
                  isLocationTurkey && (
                  <Col md={6} xs={24}>
                    <Text>{t('FILTER.BASKET_ID.TITLE')}</Text>
                    <Form.Item name="basketIds">
                      <AntSelect
                        allowClear
                        tokenSeparators={[' ']}
                        placeholder={t('FILTER.BASKET_ID.DESC')}
                        className="w-100"
                        mode="tags"
                        disabled={reconciliationsIsPending}
                      />
                    </Form.Item>
                  </Col>
                  )
                }
                {
                  isLocationTurkey && (
                  <Col md={6} xs={24}>
                    <Text>{t('FILTER.POS_BANK.TITLE')}</Text>
                    <Form.Item name="sourceOfStatements">
                      <AntSelect
                        mode="multiple"
                        placeholder={t('FILTER.POS_BANK.DESC')}
                        allowClear
                        className="w-100"
                        optionFilterProp="label"
                        options={LOCATION_BASED_SOURCE_OF_STATEMENTS}
                        disabled={reconciliationsIsPending || uniqueSearchActive}
                      />
                    </Form.Item>
                  </Col>
                  )
                }
                <Col md={6} xs={24}>
                  <Text>{t('FILTER.CHECKOUT_DATE.TITLE')}</Text>
                  <CustomDayRangePicker
                    className="w-100"
                    value={checkoutDate}
                    onChange={val => setCheckoutDate(val)}
                    disabled={reconciliationsIsPending || uniqueSearchActive}
                    format={DEFAULT_DATE_FORMAT}
                    rangeInDays={30}
                  />
                </Col>

                <Col md={6} xs={24}>
                  <Text>{t('FILTER.RECONCILIATION_CHECK_DATE.TITLE')}</Text>
                  <CustomDayRangePicker
                    data-testid="reconciliation-check-date"
                    className="w-100"
                    value={reconciliationCheckDate}
                    rangeInDays={30}
                    onChange={val => setReconciliationCheckDate(val)}
                    disabled={reconciliationsIsPending || uniqueSearchActive}
                    format={DEFAULT_DATE_FORMAT}
                    allowClear={false}
                  />
                </Col>
                <Col md={6} xs={24}>
                  <Text>{t('FILTER.DOMAIN.TITLE')}</Text>
                  <Form.Item name="domainTypes">
                    <AntSelect
                      mode="multiple"
                      placeholder={t('FILTER.DOMAIN.DESC')}
                      allowClear
                      className="w-100"
                      optionFilterProp="label"
                      options={alphabeticallySortByParam(
                        ALL_DOMAIN_OPTIONS(t),
                      )}
                      disabled={reconciliationsIsPending || uniqueSearchActive}
                    />
                  </Form.Item>
                </Col>
                <Col md={6} xs={24}>
                  <Text>{t('FILTER.REFUND_STATUS.TITLE')}</Text>
                  <Form.Item name="refundStatus">
                    <AntSelect
                      mode="multiple"
                      placeholder={t('FILTER.REFUND_STATUS.DESC')}
                      allowClear
                      className="w-100"
                      optionFilterProp="label"
                      options={REFUND_STATUS_OPTIONS(t)}
                      disabled={reconciliationsIsPending || uniqueSearchActive}
                    />
                  </Form.Item>
                </Col>
                <Col md={6} xs={24}>
                  <Text>{t('FILTER.ORDER_STATUS.TITLE')}</Text>
                  <Form.Item name="orderStatus">
                    <AntSelect
                      mode="multiple"
                      placeholder={t('FILTER.ORDER_STATUS.DESC')}
                      allowClear
                      className="w-100"
                      optionFilterProp="label"
                      options={ORDER_STATUS_OPTIONS(t)}
                      disabled={reconciliationsIsPending || uniqueSearchActive}
                    />
                  </Form.Item>
                </Col>
                <Col md={6} xs={24} className={classes.checkBoxCol}>
                  <Form.Item name="isRefundable" valuePropName="checked">
                    <Checkbox
                      data-testid="reconciliation-refundable"
                      className="w-100"
                      disabled={reconciliationsIsPending || uniqueSearchActive}
                    >{t('FILTER.IS_REFUNDABLE')}
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>

              <Row justify="end" className="mt-2">
                <Form.Item>
                  <Button
                    type="primary"
                    data-testid="order-filter-button"
                    disabled={reconciliationsIsPending}
                    htmlType="submit"
                  >
                    {t('BRING')}
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
