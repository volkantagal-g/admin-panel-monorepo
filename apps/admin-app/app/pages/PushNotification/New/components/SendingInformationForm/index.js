import { memo } from 'react';
import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Tooltip, Space, Badge } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { QuestionCircleOutlined } from '@ant-design/icons';

import AntCard from '@shared/components/UI/AntCard';
import { rules } from '@shared/utils/marketing/formUtils';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { notificationPartialTimeInterval, notificationSendTypeOptions } from '@app/pages/PushNotification/constantValues';
import {
  DAYS_OF_WEEKS,
  MINUTE_IN_HOUR,
  NOTIFICATION_DATE_FORMAT,
  NOTIFICATION_SEND_TYPE,
  SENDING_MINIMUM_DATE_DIFF_MINUTE,
} from '@app/pages/PushNotification/constants';
import LiveClock from '@shared/components/UI/LiveClock';
import MatrixCellPicker from '@shared/components/UI/MatrixCellPicker';

const SendingInformationForm = ({ form }) => {
  const disabledDate = current => {
    // Can not select days before today and today
    return current && current.valueOf() < Date.now();
  };

  const { t } = useTranslation('marketing');
  const { onlyRequired } = rules;

  const weekdays = [
    t(`DAY_OF_WEEKS.${DAYS_OF_WEEKS.SUNDAY}`),
    t(`DAY_OF_WEEKS.${DAYS_OF_WEEKS.MONDAY}`),
    t(`DAY_OF_WEEKS.${DAYS_OF_WEEKS.TUESDAY}`),
    t(`DAY_OF_WEEKS.${DAYS_OF_WEEKS.WEDNESDAY}`),
    t(`DAY_OF_WEEKS.${DAYS_OF_WEEKS.THURSDAY}`),
    t(`DAY_OF_WEEKS.${DAYS_OF_WEEKS.FRIDAY}`),
    t(`DAY_OF_WEEKS.${DAYS_OF_WEEKS.SATURDAY}`),
  ];

  const handleMatrixData = matrixData => {
    form.setFieldsValue({ daysOfWeek: matrixData });
  };

  return (
    <Badge.Ribbon text={<Ribbon />} color="grey">
      <AntCard bordered={false} title={t('PUSH_NOTIFICATION_INFORMATION')}>
        <Row gutter={24}>
          <Col md={12}>

            <Form.Item
              name="validDates"
              dependencies={['sendingType']}
              label={t('NOTIFICATION_START_AND_DATE_RANGE')}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, validDates) {
                    const sendingType = getFieldValue('sendingType');
                    const [startDate, endDate] = validDates;

                    // If sending type daily check sending hours first
                    if (sendingType === NOTIFICATION_SEND_TYPE.DAILY) {
                      const endDateMinutesOfDay = endDate.minutes() + endDate.hours() * MINUTE_IN_HOUR;
                      const startDateMinutesOfDay = startDate.minutes() + startDate.hours() * MINUTE_IN_HOUR;
                      if (endDateMinutesOfDay - startDateMinutesOfDay < SENDING_MINIMUM_DATE_DIFF_MINUTE) {
                        return Promise.reject(t('DAILY_NOTIF_END_TIME_CANT_LESS_THAN_START_TIME'));
                      }
                    }

                    if (!validDates) {
                      return Promise.reject(t('error:REQUIRED'));
                    }

                    if (sendingType === NOTIFICATION_SEND_TYPE.PARTIAL || sendingType === NOTIFICATION_SEND_TYPE.ONE_SHOT) {
                      if (!startDate.isSame(endDate, 'day')) {
                        return Promise.reject(t('NOTIFICATION_START_END_TIME_NEEDS_TO_BE_SAME_DAY'));
                      }
                    }

                    if (endDate.diff(startDate, 'minutes') <= SENDING_MINIMUM_DATE_DIFF_MINUTE) {
                      return Promise.reject(t('END_DATE_MUST_15_MINUTES_LATER_THAN_START_DATE'));
                    }

                    if (startDate.diff(moment()) <= 0) {
                      return Promise.reject(t('START_DATE_CANT_BE_LESS_THAN_NOW'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <DatePicker.RangePicker
                showTime
                format={NOTIFICATION_DATE_FORMAT}
                className="w-100"
                disabledDate={disabledDate}
                allowClear={false}
                ranges={{
                  [t('TO_END_OF_DAY')]: [moment().add(15, 'minutes'), moment().endOf('day')],
                  [t('TO_END_OF_MONTH')]: [moment().add(15, 'minutes'), moment().endOf('month')],
                  [t('TO_END_OF_YEAR')]: [moment().add(15, 'minutes'), moment().endOf('year')],
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24} className="mt-3">
          <Col xs={24} md={12}>
            <Form.Item hasFeedback name="sendingType" label={t('NOTIFICATION_SEND_TYPE')} rules={onlyRequired}>
              <Select
                className="w-100"
                options={convertConstantValuesToSelectOptions(notificationSendTypeOptions)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item noStyle dependencies={['validDates', 'sendingType']}>
          {({ getFieldsValue }) => {
            const { validDates, sendingType } = getFieldsValue(['validDates', 'sendingType']);
            if (validDates && sendingType === NOTIFICATION_SEND_TYPE.DAILY) {
              const [startDate, dueDate] = validDates;
              const formattedStartTime = moment(new Date(startDate.toString())).format('HH:mm');
              const formattedDueTime = moment(new Date(dueDate.toString())).format('HH:mm');
              return (
                <>
                  <Row gutter={24}>
                    <Col xs={24} sm={12} lg={12}>
                      <Form.Item name="daysOfWeek" label={t('DAILY_SCHEDULER')}>
                        <MatrixCellPicker
                          activeCells={[]}
                          colLabels={weekdays}
                          handleMatrixChange={handleMatrixData}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col xs={24} md={6}>
                      <Form.Item
                        label={(
                          <Tooltip title={t('CHECK_START_TIME')}>
                            <Space direction="horizontal">
                              <QuestionCircleOutlined role="button" className="align-middle ml-1" />
                              {t('START_TIME')}
                            </Space>
                          </Tooltip>
                        )}
                        className="d-inline"
                      >
                        <Input disabled value={formattedStartTime} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={6}>
                      <Form.Item
                        label={(
                          <Tooltip title={t('CHECK_END_TIME')}>
                            <Space direction="horizontal">
                              <QuestionCircleOutlined role="button" className="align-middle ml-1" />
                              {t('END_TIME')}
                            </Space>
                          </Tooltip>
                        )}
                        className="d-inline"
                      >
                        <Input disabled value={formattedDueTime} />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              );
            }
            return null;
          }}
        </Form.Item>

        <hr className="mt-4" />

        <Form.Item dependencies={['sendingType']}>
          {({ getFieldValue }) => {
            const sendingType = getFieldValue('sendingType');
            return (
              // Max User Count
              <Row gutter={24}>
                {(NOTIFICATION_SEND_TYPE.ONE_SHOT === sendingType
                  || NOTIFICATION_SEND_TYPE.DAILY === sendingType
                  || NOTIFICATION_SEND_TYPE.PARTIAL === sendingType) && (
                    <Col xs={24} md={6}>
                      <Form.Item
                        name="maxUserCount"
                        className="w-100 d-inline"
                        label={t('MAX_USER_COUNT')}
                        rules={onlyRequired}
                      >
                        <InputNumber controls={false} className="w-100" min={0} />
                      </Form.Item>
                    </Col>
                )}

                {/* Priority */}
                {(NOTIFICATION_SEND_TYPE.ONE_SHOT === sendingType
                  || NOTIFICATION_SEND_TYPE.DAILY === sendingType
                  || NOTIFICATION_SEND_TYPE.PARTIAL === sendingType) && (
                    <Col xs={24} md={6} className="mt-2 mt-md-0">
                      <Form.Item
                        name="priority"
                        className="w-100 d-inline"
                        label={t('NOTIFICATION_PRIORITY')}
                        rules={onlyRequired}
                      >
                        <InputNumber controls={false} className="w-100" min={0} max={10} />
                      </Form.Item>
                    </Col>
                )}

                {/* PieceCount */}
                {NOTIFICATION_SEND_TYPE.PARTIAL === sendingType && (
                  <Col xs={24} md={6} className="mt-2 mt-md-0">
                    <Form.Item
                      name={['partialType', 'pieceCount']}
                      className="w-100 d-inline"
                      label={t('NOTIFICATION_USERS_IN')}
                      rules={onlyRequired}
                    >
                      <InputNumber controls={false} className="w-100" min={0} max={10} />
                    </Form.Item>
                  </Col>
                )}

                {/* timeInterval */}
                {NOTIFICATION_SEND_TYPE.PARTIAL === sendingType && (
                  <Col xs={24} md={6} className="mt-2 mt-md-0">
                    <Form.Item
                      name={['partialType', 'timeInterval']}
                      className="w-100 d-inline"
                      label={t('NOTIFICATION_PARTIAL_TIME')}
                      rules={onlyRequired}
                    >
                      <Select options={convertConstantValuesToSelectOptions(notificationPartialTimeInterval)} />
                    </Form.Item>
                  </Col>
                )}

              </Row>

            );
          }}
        </Form.Item>

      </AntCard>
    </Badge.Ribbon>
  );
};

const Ribbon = () => {
  return (
    <LiveClock />
  );
};

export default memo(SendingInformationForm);
