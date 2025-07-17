import { Row, Col, Collapse, Typography, Button, DatePicker, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Moment from 'moment';

import { dailyReportSelector } from '../../redux/selectors';
import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import AntSelect from '@shared/components/UI/AntSelect';
import { LOCATION_BASED_SOURCE_OF_STATEMENTS } from '@app/pages/Payment/Reconciliation/utils';
import { alphabeticallySortByParam } from '@shared/utils/common';
import { EXTENDED_DOMAIN_OPTIONS } from '../../constants';

const { RangePicker } = DatePicker;
const { Text } = Typography;
const { Panel } = Collapse;

const Filter = ({ filters, handleSubmit, pagination }) => {
  const { t } = useTranslation(['reconciliationDailyReport', 'global']);
  const [form] = Form.useForm();
  const transactionReconciliationsIsPending = useSelector(
    dailyReportSelector.getIsPending,
  );

  const onFinish = values => {
    const { reportCheckDate, reportRequestDate, domainTypes, sourceOfStatements } = values;
    handleSubmit({
      domainTypes,
      sourceOfStatements,
      reportCheckStartDate: reportCheckDate ? reportCheckDate[0].format(DEFAULT_DATE_FORMAT) : null,
      reportCheckEndDate: reportCheckDate ? reportCheckDate[1].format(DEFAULT_DATE_FORMAT) : null,
      reportRequestStartDate: reportRequestDate ? reportRequestDate[0].format(DEFAULT_DATE_FORMAT) : null,
      reportRequestEndDate: reportRequestDate ? reportRequestDate[1].format(DEFAULT_DATE_FORMAT) : null,
      page: pagination.currentPage,
      pageSize: pagination.rowsPerPage,
    });
  };

  return (
    <Row className="mt-2 mb-2">
      <Col span={24}>
        <Collapse defaultActiveKey={1}>
          <Panel header={t('global:FILTER')} key={1}>
            <Form
              form={form}
              name="filterForm"
              initialValues={{
                reportCheckDate: filters.reportCheckDate,
                reportRequestDate: filters.reportRequestDate,
                domainTypes: filters.domainTypes,
                sourceOfStatements: filters.sourceOfStatements,
              }}
              onFinish={onFinish}
            >
              <Row gutter={[8, 8]}>
                <Col md={6} xs={24}>
                  <Text>{t('FILTER.REPORT_CHECK_DATE.TITLE')}</Text>
                  <Form.Item name="reportCheckDate">
                    <RangePicker
                      data-testid="report-check-date"
                      className="w-100"
                      format={DEFAULT_DATE_FORMAT}
                      disabled={transactionReconciliationsIsPending}
                      allowClear={false}
                    />
                  </Form.Item>
                </Col>
                <Col md={6} xs={24}>
                  <Text>{t('FILTER.REPORT_REQUEST_DATE.TITLE')}</Text>
                  <Form.Item name="reportRequestDate">
                    <RangePicker
                      className="w-100"
                      format={DEFAULT_DATE_FORMAT}
                      disabled={transactionReconciliationsIsPending}
                    />
                  </Form.Item>
                </Col>
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
                      disabled={transactionReconciliationsIsPending}
                    />
                  </Form.Item>
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
                        EXTENDED_DOMAIN_OPTIONS(t),
                      )}
                      disabled={transactionReconciliationsIsPending}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="end" className="mt-2">
                <Button
                  type="primary"
                  htmlType="submit"
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

Filter.propTypes = {
  filters: PropTypes.shape({
    reportCheckDate: PropTypes.arrayOf(PropTypes.instanceOf(Moment)),
    reportRequestDate: PropTypes.arrayOf(PropTypes.instanceOf(Moment)),
    domainTypes: PropTypes.arrayOf(PropTypes.number),
    sourceOfStatements: PropTypes.arrayOf(PropTypes.number),
    currentPage: PropTypes.number,
    rowsPerPage: PropTypes.number,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    currentPage: PropTypes.number,
    rowsPerPage: PropTypes.number,
  }).isRequired,
};

export default Filter;
