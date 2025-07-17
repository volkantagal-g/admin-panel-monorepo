import { memo, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Form, Input, Row, Space, Checkbox, Select } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { convertSelectOptions, convertConstantValuesToSelectOptions } from '@shared/utils/common';

import { ChannelOptions, CATEGORY_FIELDS, priorityOptions } from '@app/pages/CourierCommunication/NotificationList/New/constants';
import { rules } from '@app/pages/CourierCommunication/NotificationList/New/formHelper';
import { Creators } from '@app/pages/CourierCommunication/NotificationList/New/redux/action';
import { createNotificationSelector } from '@app/pages/CourierCommunication/NotificationList/New/redux/selector';

import AntCard from '@shared/components/UI/AntCard';

const CardHeader = () => {
  const { t } = useTranslation('courierCommunication');
  return <Col md={16} xs={16}>{t('GENERAL_INFORMATION')}</Col>;
};

const GeneralInformation = ({ handleName, handleCheckedList, handlePriority, handleCategory }) => {
  const { t } = useTranslation('courierCommunication');
  const dispatch = useDispatch();

  const categories = useSelector(createNotificationSelector.getCategories);
  const isPendingCategories = useSelector(createNotificationSelector.getIsPendingCategories);

  const [checkedList, setCheckedList] = useState(['app']);

  useEffect(() => {
    dispatch(Creators.getCategoriesRequest({ fields: CATEGORY_FIELDS }));
  }, [dispatch]);

  const categoryOptions = useMemo(() => (
    convertSelectOptions(categories, {
      valueKey: '_id',
      labelKey: 'name',
      isTranslation: true,
    })
  ), [categories]);

  const handleChannelChange = checkedValues => {
    setCheckedList(() => {
      handleCheckedList(checkedValues);
      return checkedValues;
    });
  };

  return (
    <AntCard bordered={false} title={<CardHeader />}>
      <Space direction="vertical" className="w-100">
        <Row gutter={24}>
          <Col lg={12}>
            <Form.Item
              label={t('NOTIFICATION_NAME')}
              rules={rules.onlyRequired}
            >
              <Input onChange={e => handleName(e.target.value)} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={12}>
            <Form.Item
              label={<> {t('PRIORITY')} <QuestionCircleOutlined role="button" className="align-middle ml-1" /></>}
              rules={rules.onlyRequired}
            >
              <Select
                data-testid="priority"
                showArrow
                allowClear
                options={convertConstantValuesToSelectOptions(priorityOptions)}
                placeholder={t('PRIORITY')}
                onChange={value => handlePriority(value)}
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
                options={categoryOptions}
                disabled={isPendingCategories}
                placeholder={t('CATEGORIES')}
                onChange={value => handleCategory(value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={12}>
            <Form.Item
              label={t('NOTIFICATION_CHANNEL')}
              rules={rules.onlyRequired}
            >
              <Checkbox.Group value={checkedList} options={ChannelOptions()} onChange={handleChannelChange} />
            </Form.Item>
          </Col>
        </Row>
      </Space>
    </AntCard>
  );
};

export default memo(GeneralInformation);
