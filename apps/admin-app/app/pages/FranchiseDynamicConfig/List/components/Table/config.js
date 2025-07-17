import { isEmpty } from 'lodash';

import moment from 'moment';

import { getLangKey, t } from '@shared/i18n';
import { getLocalDateFormat } from '@shared/utils/localization';
import { DetailButton } from '@shared/components/UI/List';
import { BooleanColumnCodes } from '../../constants';
import { ROUTE } from '@app/routes';

const lang = getLangKey();

export const getTableColumns = (tableColumns, configType, sortedInfo, hasAccessToDetailPage) => {
  const selectedConfigColumn = tableColumns.find(row => row.name === configType);

  const columns = [];

  if (!isEmpty(selectedConfigColumn)) {
    const { fields } = selectedConfigColumn;
    fields.forEach(field => {
      if (!field.isHiddenFromListing) {
        columns.push(
          {
            title: field.label[lang],
            dataIndex: field.name,
            key: field.name,
            sorter: field.isSortable,
            sortDirections: ['ascend', 'descend', 'ascend'],
            sortOrder: sortedInfo.columnKey === field.name ? sortedInfo.order : null,
            width: '100px',
            render: row => {
              if (field.valueEnums[0] === 'date' || field.type === 'date') {
                return moment(row).format(getLocalDateFormat());
              }
              if (field.name === 'is_business_change' || field.name === 'is_sc' || field.type === 'boolean') {
                return BooleanColumnCodes[+row][lang];
              }
              if (field.type === 'translation') {
                return row[lang];
              }
              return row?.lang || row;
            },
          },
        );
      }
    });
    if (hasAccessToDetailPage) {
      columns.push({
        title: t('ACTION'),
        dataIndex: '_id',
        key: '_id',
        width: '50px',
        align: 'right',
        render: record => {
          const id = record || '';
          const path = ROUTE.FRANCHISE_CONFIG_DETAIL.path.replace(':id', '');

          return (
            <DetailButton _id={id} urlPath={path} />
          );
        },

      });
    }

    return columns;
  }
  return [];
};
