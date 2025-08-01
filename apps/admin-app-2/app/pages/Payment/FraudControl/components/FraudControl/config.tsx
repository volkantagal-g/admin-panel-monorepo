import moment from 'moment';
import { Button, Space } from 'antd';

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { TFunction } from 'react-i18next';

import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import { RuleType } from '../../redux/reducer';

export const columns = (
  t: TFunction<('global' | 'paymentFraudControlPage')[], undefined>,
  handleOpenRuleModal: { (id: string, name: string): void },
  isAuthForUpdateRule: boolean,
) => {
  return [
    {
      title: t('paymentFraudControlPage:RULE_NAME'),
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: t('paymentFraudControlPage:EVENT_KEY_FIELD'),
      dataIndex: 'eventKeyField',
      key: 'eventKeyField',
      align: 'center',
    },
    {
      title: t('paymentFraudControlPage:RULE_VALUE_TYPE'),
      dataIndex: 'ruleValueType',
      key: 'ruleValueType',
      align: 'center',
    },
    {
      title: t('global:CREATED_AT'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (createdAt: Date) => {
        return moment(createdAt).format(DEFAULT_DATE_FORMAT);
      },
      defaultSortOrder: 'descend',
      /* eslint-disable-next-line no-unsafe-optional-chaining */
      sorter: (a: RuleType, b: RuleType) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: t('paymentFraudControlPage:IS_ENABLE'),
      dataIndex: 'enable',
      key: 'enable',
      align: 'center',
      render: (enable: boolean) => {
        return enable ? (
          <CheckCircleOutlined className="text-success" />
        ) : (
          <CloseCircleOutlined className="text-danger" />
        );
      },
      defaultSortOrder: 'descend',
      /* eslint-disable-next-line no-unsafe-optional-chaining */
      sorter: (a: any, b: any) => a?.enable - b?.enable,
    },
    ...(isAuthForUpdateRule
      ? [
        {
          title: t('global:ACTION'),
          fixed: 'right',
          align: 'right',
          render: (data: RuleType) => {
            const id = data?.id;
            const name = data?.name;
            return (
              <Space size="middle">
                <Button
                  onClick={() => handleOpenRuleModal(id, name)}
                  type="primary"
                >
                  {t('global:UPDATE')}
                </Button>
              </Space>
            );
          },
        },
      ]
      : []),
  ];
};
