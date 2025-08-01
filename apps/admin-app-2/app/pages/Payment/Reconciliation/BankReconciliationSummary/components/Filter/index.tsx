import { Button, Col, Collapse, Form, Row, Typography } from 'antd';
import { ReactElement, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { INIT_FILTERS, InitFiltersTypes } from '../constants';
import AntSelect from '@shared/components/UI/AntSelect';
import { alphabeticallySortByParam } from '@shared/utils/common';
import CustomDayRangePicker from '@shared/components/UI/CustomDayRangePicker';
import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import { bankReconciliationSummarySelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { ALL_DOMAIN_OPTIONS } from '../../../constants';
import { LOCATION_BASED_SOURCE_OF_STATEMENTS } from '../../../utils';

const { Text } = Typography;
const { Panel } = Collapse;

const Filter = (): ReactElement => {
  const { t } = useTranslation(['bankReconciliationReportPage', 'global']);
  const bankReconciliationSummaryIsPending = useSelector(
    bankReconciliationSummarySelector.getIsPending,
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values: InitFiltersTypes) => {
    dispatch(Creators.getBankReconciliationSummaryRequest({ ...values }));
  };

  useEffect(() => {
    dispatch(
      Creators.getBankReconciliationSummaryRequest({ ...INIT_FILTERS }),
    );
  }, [dispatch]);

  return (
    <Collapse defaultActiveKey={1}>
      <Panel header={t('global:FILTER')} key={1}>
        <Form
          form={form}
          name="filterForm"
          initialValues={{
            domainType: INIT_FILTERS.domainType,
            sourceOfStatement: INIT_FILTERS.sourceOfStatement,
            date: INIT_FILTERS.date,
          }}
          onFinish={onFinish}
          className="w-100"
        >
          <Col span={24}>
            <Row gutter={16}>
              <Col md={6} xs={24}>
                <Text>{t('FILTER.DOMAIN.TITLE')}</Text>
                <Form.Item name="domainType" className="mb-0">
                  <AntSelect
                    placeholder={t('FILTER.DOMAIN.DESC')}
                    className="w-100"
                    optionFilterProp="label"
                    options={alphabeticallySortByParam(ALL_DOMAIN_OPTIONS(t))}
                    disabled={bankReconciliationSummaryIsPending}
                  />
                </Form.Item>
              </Col>
              <Col md={6} xs={24}>
                <Text>{t('FILTER.POS_BANK.TITLE')}</Text>
                <Form.Item name="sourceOfStatement" className="mb-0">
                  <AntSelect
                    placeholder={t('FILTER.POS_BANK.DESC')}
                    className="w-100"
                    optionFilterProp="label"
                    options={LOCATION_BASED_SOURCE_OF_STATEMENTS}
                    disabled={bankReconciliationSummaryIsPending}
                  />
                </Form.Item>
              </Col>
              <Col md={6} xs={24}>
                <Text>{t('global:DATE')}</Text>
                <Form.Item name="date" className="mb-0">
                  <CustomDayRangePicker
                    disabled={bankReconciliationSummaryIsPending}
                    format={DEFAULT_DATE_FORMAT}
                    rangeInDays={30}
                    className="w-100"
                    data-testid="bank-reconciliation-summary-datepicker"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Row justify="end">
            <Form.Item className="mb-0">
              <Button
                type="primary"
                disabled={bankReconciliationSummaryIsPending}
                htmlType="submit"
              >
                {t('BRING')}
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default Filter;
