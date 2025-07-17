import { Form } from 'antd';

import {
  CONFIG_VALUE_TYPE,
  GET_FINANCIAL_CONFIG_FORM_ITEM,
} from '../../constants';

export const tableColumns = (t, classes) => [
  {
    title: <b>{t('TABLE.HEADERS.CONFIG_NAME')}</b>,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: <b>{t('TABLE.HEADERS.CONFIG_DETAILS')}</b>,
    dataIndex: 'description',
    key: 'description',
    ellipsis: true,
  },
  {
    title: <b>{t('TABLE.HEADERS.CONFIG_VALUE')}</b>,
    dataIndex: 'value',
    key: 'value',
    width: 300,
    render: (_, record, index) => {
      return (
        <Form.Item
          name={[index, 'value']}
          className={classes.formItem}
          shouldUpdate
          {...(record?.configValueType === CONFIG_VALUE_TYPE.BOOLEAN ? { valuePropName: 'checked' } : {})}
        >
          {GET_FINANCIAL_CONFIG_FORM_ITEM[record?.configValueType]}
        </Form.Item>
      );
    },
  },
];
