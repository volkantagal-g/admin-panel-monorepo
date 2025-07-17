import { get } from 'lodash';

import moment from 'moment';

import { t } from '@shared/i18n';
import { CREATED_AT } from '../../constants';
import { getLocalDateTimeFormat } from '@shared/utils/localization';

export const getTableColumns = ({ columns }) => {
  const data = columns.map(column => {
    return {
      title: t(column.translationKey),
      width: '150px',
      key: column.name,
      render: row => {
        if (column.type === 'object') {
          return get(row, `${column.name}.${column.listValue}`, '-');
        }
        if (column.type === 'array') {
          let name = '';
          column.childs.forEach((child, index) => {
            name += get(row, `${column.name}.0.${child.name}.${child.listValue}`, '-');
            if (column.childs.length - 1 !== index) {
              name += ',';
            }
          });
          return name;
        }
        if (column.name === CREATED_AT) {
          return moment(row?.[column?.name] || '-').format(getLocalDateTimeFormat());
        }
        return get(row, column.name, '-');
      },
    };
  });
  return data;
};
