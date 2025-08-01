import { Button, Col, Collapse, Row, Typography, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../../redux/actions';
import { CUSTOM_DATE_FORMAT, INIT_FILTERS, PAYOUT_OPTIONS } from '../../constants';
import { filterSelector, payoutDetailedReportsSelector } from '../../redux/selectors';
import CustomDayRangePicker from '@shared/components/UI/CustomDayRangePicker';
import AntSelect from '@shared/components/UI/AntSelect';

const { Text } = Typography;
const { Panel } = Collapse;

export default function Filter() {
  const [uniqueSearchActive, setUniqueSearchActive] = useState(false);

  const { t } = useTranslation(['payoutTransactionsForDomains', 'global']);
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const payoutDetailedReportsIsPending = useSelector(
    payoutDetailedReportsSelector.getIsPending,
  );

  const payoutDetailedReportsFilterSelector = useSelector(filterSelector.getFilter);

  const onFinish = values => {
    dispatch(Creators.submitFilters({ filters: { ...values } }));
  };

  useEffect(() => {
    dispatch(Creators.submitFilters({ filters: { ...payoutDetailedReportsFilterSelector?.date } }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      activityId: payoutDetailedReportsFilterSelector?.activityId,
      iban: payoutDetailedReportsFilterSelector?.iban,
      payoutStatus: payoutDetailedReportsFilterSelector?.payoutStatus,
      date: payoutDetailedReportsFilterSelector?.date,
    });
  }, [form, payoutDetailedReportsFilterSelector]);

  const uniquenessSearchActive = () => {
    form.setFieldsValue({
      iban: INIT_FILTERS?.iban,
      payoutStatus: INIT_FILTERS?.payoutStatus,
      date: null,
    });
  };

  const uniquenessSearchDisable = () => {
    form.setFieldsValue({ activityId: INIT_FILTERS?.activityId, date: INIT_FILTERS?.date });
  };

  const onValuesChange = (changedFields, allFields) => {
    const { activityId } = allFields;
    const isUniqueSearchActive = !!activityId;

    if (isUniqueSearchActive) {
      setUniqueSearchActive(true);
      uniquenessSearchActive();
    }
    else if (!changedFields?.date) {
      setUniqueSearchActive(false);
      uniquenessSearchDisable();
    }
  };

  return (
    <Row className="mt-4">
      <Col span={24}>
        <Collapse defaultActiveKey={1}>
          <Panel header={t('global:FILTER')} key={1}>
            <Form
              form={form}
              name="filterForm"
              onFinish={onFinish}
              onValuesChange={onValuesChange}
            >
              <Row gutter={[8, 8]}>
                <Col md={6} xs={24}>
                  <Text>
                    {t('payoutTransactionsForDomains:ACTIVITY_ID.TITLE')}
                  </Text>
                  <Form.Item name="activityId">
                    <Input
                      disabled={payoutDetailedReportsIsPending}
                      placeholder={t(
                        'payoutTransactionsForDomains:ACTIVITY_ID.DESC',
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col md={6} xs={24}>
                  <Text>IBAN</Text>
                  <Form.Item name="iban">
                    <Input
                      disabled={payoutDetailedReportsIsPending || uniqueSearchActive}
                      placeholder="IBAN"
                    />
                  </Form.Item>
                </Col>
                <Col md={6} xs={24}>
                  <Text>
                    {t('payoutTransactionsForDomains:PAYOUT_STATUS.TITLE')}
                  </Text>
                  <Form.Item name="payoutStatus">
                    <AntSelect
                      placeholder={t(
                        'payoutTransactionsForDomains:PAYOUT_STATUS.DESC',
                      )}
                      allowClear
                      className="w-100"
                      optionFilterProp="label"
                      options={PAYOUT_OPTIONS(t)}
                      disabled={payoutDetailedReportsIsPending || uniqueSearchActive}
                    />
                  </Form.Item>
                </Col>
                <Col md={6} xs={24}>
                  <Text>{t('DATE')}</Text>
                  <Form.Item name="date">
                    <CustomDayRangePicker
                      className="w-100"
                      name="date"
                      format={CUSTOM_DATE_FORMAT}
                      allowClear={false}
                      showTime
                      disabled={payoutDetailedReportsIsPending || uniqueSearchActive}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="end" className="mt-2">
                <Button
                  htmlType="submit"
                  type="primary"
                  disabled={payoutDetailedReportsIsPending}
                  loading={payoutDetailedReportsIsPending}
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
}
