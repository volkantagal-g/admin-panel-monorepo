import moment from 'moment';

import { ROUTE } from '@app/routes';
import { getLangKey } from '@shared/i18n';
import LinkOrText from '@shared/components/UI/LinkOrText';
import permKey from '@shared/shared/permKey.json';
import { isMobile } from '@shared/utils/common';

export const getTableColumns = ({ t }) => {
  return [
    {
      title: '#',
      key: '_index',
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: t('NAME'),
      dataIndex: 'name',
      key: 'name',
      width: 250,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => {
        const nameA = a.name[getLangKey()];
        const nameB = b.name[getLangKey()];
        return nameA.localeCompare(nameB);
      },
      render: (name, record) => {
        const { _id } = record;
        const translatedName = name[getLangKey()];
        return (
          <LinkOrText
            permKey={permKey.PAGE_COMPONENT_DETAIL}
            to={ROUTE.COMPONENT_DETAIL.path.replace(':id', _id)}
            text={translatedName}
          />
        );
      },
    },
    {
      title: t('DESCRIPTION'),
      dataIndex: 'description',
      width: isMobile() ? 300 : undefined,
      key: 'description',
      sorter: (a, b) => {
        const descA = a.description[getLangKey()];
        const descB = b.description[getLangKey()];
        return descA.localeCompare(descB);
      },
      render: description => description[getLangKey()],
    },
    {
      title: t('CREATED_AT'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      sorter: (a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA - dateB;
      },
      render: createdAt => {
        return moment(createdAt).format('YYYY-MM-DD');
      },
    },
  ];
};
