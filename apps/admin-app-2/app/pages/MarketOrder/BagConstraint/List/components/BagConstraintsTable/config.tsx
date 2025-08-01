import { Button, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';
import permKey from '@shared/shared/permKey.json';

export const getTableColumns = ({ t, canAccess, onSelectBagConstraint }) => [
  {
    title: t('global:DESCRIPTION'),
    dataIndex: 'description',
    key: 'description',
    width: 200,
    render: description => description[getLangKey()],
  },
  {
    title: t('FIRST_GROUP'),
    dataIndex: 'firstGroup',
    width: 350,
    render: firstGroup => {
      return firstGroup?.map(item => (
        <Tag style={{ margin: 3 }} key={item?.id}>
          {item?.name}
        </Tag>
      ));
    },
  },
  {
    title: t('SECOND_GROUP'),
    dataIndex: 'secondGroup',
    width: 350,
    render: secondGroup => {
      return secondGroup?.map(item => {
        return (
          <Tag style={{ margin: 3 }} key={item?.id}>
            {item?.name}
          </Tag>
        );
      });
    },
  },
  {
    title: t('RULE'),
    dataIndex: 'match',
    width: 200,
    render: match => (match
      ? t('FIRST_CONSTRAINT_TYPE_TEXT')
      : t('SECOND_CONSTRAINT_TYPE_TEXT')),
  },

  {
    title: t('global:STATUS'),
    dataIndex: 'isActive',
    render: isActive => (isActive ? (
      <CheckCircleOutlined style={{ fontSize: '16px', color: 'green' }} />
    ) : (
      <CloseCircleOutlined style={{ fontSize: '16px', color: 'red' }} />
    )),
  },
  {
    title: t('global:ACTION'),
    render: bagConstraint => {
      return (
        <Button
          onClick={() => (canAccess(permKey.PAGE_GETIR_MARKET_BAG_CONSTRAINT_DETAIL)
            ? onSelectBagConstraint(bagConstraint)
            : null)}
        >
          {t('global:DETAIL')}
        </Button>
      );
    },
  },
];
