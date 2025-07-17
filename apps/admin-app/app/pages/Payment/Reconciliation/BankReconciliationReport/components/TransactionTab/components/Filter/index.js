import { useState } from 'react';
import { Row, Col, Collapse, Typography, Button, Form, Input, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { transactionReconciliationsSelector } from '../../../../redux/selectors';
import { INIT_FILTERS_TRANSACTION } from '@app/pages/Payment/Reconciliation/BankReconciliationReport/constants';
import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import { Creators } from '../../../../redux/actions';
import CustomDayRangePicker from '@shared/components/UI/CustomDayRangePicker';

const { Text } = Typography;
const { Panel } = Collapse;

const Filter = () => {
  const { t } = useTranslation(['bankReconciliationReportPage', 'global']);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const transactionReconciliationsIsPending = useSelector(
    transactionReconciliationsSelector.getIsPending,
  );

  const [checkDate, setCheckDate] = useState(INIT_FILTERS_TRANSACTION.checkDate);

  const [transactionDate, setTransactionDate] = useState(INIT_FILTERS_TRANSACTION.transactionDate);

  const [uniqueSearchActive, setUniqueSearchActive] = useState(false);

  const onValuesChange = (changedFields, allFields) => {
    const { rentId, originalTransactionId } = allFields;

    // indexed value search
    if (rentId || originalTransactionId) {
      setUniqueSearchActive(true);
      setCheckDate(null);
      setTransactionDate(null);
      form.setFieldsValue({ isReconciled: undefined });
    }
    else {
      // checkDate have to be filled, should't be empty!
      if (checkDate === null) {
        setCheckDate(INIT_FILTERS_TRANSACTION.checkDate);
      }
      // isReconciled have to be defined, should't be undefined!
      if (form.getFieldValue('isReconciled') === undefined) {
        form.setFieldsValue({ isReconciled: INIT_FILTERS_TRANSACTION.isReconciled });
      }
      setUniqueSearchActive(false);
    }
  };

  const onFinish = values => {
    const filters = {
      ...values,
      checkStartDate: checkDate
        ? checkDate[0].format(DEFAULT_DATE_FORMAT)
        : null,
      checkEndDate: checkDate
        ? checkDate[1].format(DEFAULT_DATE_FORMAT)
        : null,
      transactionStartDate: transactionDate
        ? transactionDate[0].format(DEFAULT_DATE_FORMAT)
        : null,
      transactionEndDate: transactionDate
        ? transactionDate[1].format(DEFAULT_DATE_FORMAT)
        : null,
    };
    dispatch(Creators.submitTransactionFilters({ filters }));
  };

  return (
    <Row className="mt-2 mb-4">
      <Col span={24} data-testid="transaction-reconciliation-filter">
        <Collapse defaultActiveKey={1}>
          <Panel header={t('global:FILTER')} key={1}>
            <Form
              form={form}
              name="filterForm"
              initialValues={{
                rentId: INIT_FILTERS_TRANSACTION.rentId,
                originalTransactionId: INIT_FILTERS_TRANSACTION.originalTransactionId,
                isReconciled: INIT_FILTERS_TRANSACTION.isReconciled,
              }}
              onFinish={onFinish}
              onValuesChange={onValuesChange}
            >
              <Row gutter={[8, 8]}>
                <Col md={5} xs={24}>
                  <Text>{t('FILTER.RENT_ID.TITLE')}</Text>
                  <Form.Item
                    name="rentId"
                  >
                    <Input placeholder={t('FILTER.RENT_ID.DESC')} disabled={transactionReconciliationsIsPending} />
                  </Form.Item>
                </Col>
                <Col md={5} xs={24}>
                  <Text>{t('FILTER.ORIGINAL_TRANSACTION_ID.TITLE')}</Text>
                  <Form.Item
                    name="originalTransactionId"
                  >
                    <Input placeholder={t('FILTER.ORIGINAL_TRANSACTION_ID.DESC')} disabled={transactionReconciliationsIsPending} />
                  </Form.Item>
                </Col>
                <Col md={5} xs={24}>
                  <Text>{t('FILTER.RECONCILIATION_DATE.TITLE')}</Text>
                  <CustomDayRangePicker
                    className="w-100"
                    value={checkDate}
                    onChange={val => setCheckDate(val)}
                    format={DEFAULT_DATE_FORMAT}
                    disabled={uniqueSearchActive || transactionReconciliationsIsPending}
                    allowClear={false}
                  />
                </Col>
                <Col md={5} xs={24}>
                  <Text>{t('FILTER.TRANSACTION_DATE.TITLE')}</Text>
                  <CustomDayRangePicker
                    className="w-100"
                    value={transactionDate}
                    onChange={val => setTransactionDate(val)}
                    format={DEFAULT_DATE_FORMAT}
                    disabled={uniqueSearchActive || transactionReconciliationsIsPending}
                  />
                </Col>
                <Col md={4} xs={24} className="d-flex justify-content-center align-items-center">
                  <Form.Item name="isReconciled" valuePropName="checked" className="m-0">
                    <Checkbox
                      className="w-100"
                      disabled={transactionReconciliationsIsPending || uniqueSearchActive}
                    >{t('FILTER.IS_RECONCILED')}
                    </Checkbox>
                  </Form.Item>
                </Col>

              </Row>

              <Row justify="end" className="mt-2">
                <Button
                  type="primary"
                  htmlType="submit"
                  data-testid="transaction-filter-button"
                  loading={transactionReconciliationsIsPending}
                  disabled={transactionReconciliationsIsPending}
                >
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
