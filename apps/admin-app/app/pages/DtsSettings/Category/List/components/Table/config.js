import { Tag } from 'antd';
import { get } from 'lodash';

import { DetailButton } from '@shared/components/UI/List';

import { t } from '@shared/i18n';
import { ROUTE } from '@app/routes';

export const tableColumns = (lang, hasAccessToCategorySettingDetailPage) => {
  const columns = [
    {
      title: t('global:STATUS'),
      dataIndex: 'isActive',
      key: 'isActive',
      width: 100,
      render: isActive => {
        const color = isActive ? 'success' : 'error';
        const text = isActive ? t('global:ACTIVE') : t('global:INACTIVE');
        return (
          <Tag color={color}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: t('dtsCategorySetting:DTS_CATEGORY_SETTING_TITLE'),
      dataIndex: 'title',
      key: 'title',
      width: 200,
      render: title => {
        return title[lang];
      },
    },
    {
      title: t('dtsCategorySetting:DTS_CATEGORY_SETTING_DESCRIPTION'),
      dataIndex: 'description',
      key: 'description',
      width: 200,
      render: description => {
        return description[lang];
      },
    },
  ];

  if (hasAccessToCategorySettingDetailPage) {
    columns.push({
      title: t('global:ACTION'),
      align: 'right',
      width: 100,
      render: record => {
        const id = get(record, '_id', '');
        const path = ROUTE.DTS_CATEGORY_SETTING_DETAIL.path.replace(':id', '');

        return (
          <DetailButton urlPath={path} _id={id} />
        );
      },
    });
  }

  return columns;
};
