import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Row, Col, Checkbox, Select } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import { useEffect, useMemo } from 'react';

import { convertSelectOptions, convertConstantValuesToSelectOptions } from '@shared/utils/common';

import { Creators } from '@app/pages/CourierCommunication/NotificationList/Detail/redux/actions';
import { notificationSelector } from '@app/pages/CourierCommunication/NotificationList/Detail/redux/selectors';

import AntCard from '@shared/components/UI/AntCard';
import { ChannelOptions, priorityOptions, CATEGORY_FIELDS } from '@app/pages/CourierCommunication/NotificationList/New/constants';
import { rules } from '@app/pages/CourierCommunication/NotificationList/Detail/components/Form/helpers';

const GeneralInformation = ({ handleOnChange, isDisabled, values }) => {
  const { t } = useTranslation('courierCommunication');
  const dispatch = useDispatch();

  const categories = useSelector(notificationSelector.getCategories);
  const isPendingCategories = useSelector(notificationSelector.getIsPendingCategories);

  const { name, channel, priority, category } = values;

  const handleNameChange = event => {
    const value = get(event, 'target.value', '');
    handleOnChange('name', value);
  };

  const handleNotificationChannelChange = checkedValues => {
    handleOnChange('channel', checkedValues);
  };

  const handlePriorityChange = newValue => {
    handleOnChange('priority', newValue);
  };

  const handleCategory = newValue => {
    handleOnChange('category', newValue);
  };

  useEffect(() => {
    dispatch(Creators.getCategoriesRequest({ fields: CATEGORY_FIELDS }));
  }, [dispatch]);

  const categoryOptions = useMemo(() => {
    return convertSelectOptions(categories, {
      valueKey: '_id',
      labelKey: 'name',
      isTranslation: true,
    });
  }, [categories]);

  return (
    <AntCard title={t('GENERAL_INFORMATION')}>
      <Row gutter={24}>
        <Col lg={12}>
          <Form.Item name="name" label={t('NOTIFICATION_NAME')} required rules={rules.requiredWithoutType}>
            <Input
              value={name}
              onChange={handleNameChange}
              disabled={isDisabled}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col lg={12}>
          <Form.Item
            label={<>{t('CATEGORIES')}</>}
            rules={rules.requiredWithoutType}
          >
            <Select
              showArrow
              allowClear
              value={category}
              options={categoryOptions}
              placeholder={t('CATEGORIES')}
              onChange={handleCategory}
              disabled={isDisabled || isPendingCategories}
              loading={isPendingCategories}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col lg={12}>
          <Form.Item name="channel" label={t('NOTIFICATION_CHANNEL')} required rules={rules.requiredArray}>
            <Checkbox.Group
              value={channel}
              options={ChannelOptions()}
              onChange={handleNotificationChannelChange}
              disabled={isDisabled}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col lg={12}>
          <Form.Item
            name="priority"
            label={<>{t('PRIORITY')} <QuestionCircleOutlined role="button" className="align-middle ml-1" /></>}
            required
            rules={rules.requiredWithoutType}
          >
            <Select
              showArrow
              allowClear
              options={convertConstantValuesToSelectOptions(priorityOptions)}
              value={priority}
              disabled={isDisabled}
              placeholder={t('PRIORITY')}
              onChange={handlePriorityChange}
            />
          </Form.Item>
        </Col>
      </Row>
    </AntCard>
  );
};

export default GeneralInformation;
