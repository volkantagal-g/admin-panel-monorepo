import { Tag } from 'antd';
import { get } from 'lodash';

import { DetailButton } from '@shared/components/UI/List';

import { automaticClosingOption } from '../../../constants';

import { t } from '@shared/i18n';
import { ROUTE } from '@app/routes';

export const tableColumns = (lang, hasAccessToRuleDetailPage) => {
  const columns = [
    {
      title: t('global:ACTIVENESS'),
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
      title: t('dtsRulePage:RULE_NUMBER'),
      dataIndex: 'ruleNumber',
      key: 'ruleNumber',
      width: 200,
      render: ruleNumber => {
        return ruleNumber;
      },
    },
    {
      title: t('dtsRulePage:RULE_DESCRIPTION'),
      dataIndex: 'title',
      key: 'title',
      width: 200,
      render: title => {
        if (title[lang].length > 100) {
          const truncatedDescription = `${title[lang].substr(0, 100)}...`;
          return truncatedDescription;
        }
        return title[lang];
      },
    },
    {
      title: t('global:CATEGORY'),
      dataIndex: 'category',
      key: 'category',
      width: 200,
      render: category => {
        return category.title[lang];
      },
    },
    {
      title: t('global:PRIORITY'),
      dataIndex: 'priority',
      key: 'priority',
      width: 200,
      render: priority => {
        return priority.title[lang];
      },
    },
    {
      title: t('dtsRulePage:AUTO_CLOSE_OPTION'),
      dataIndex: 'closeAs',
      key: 'closeAs',
      width: 200,
      render: closeAs => get(automaticClosingOption, `${closeAs}.${lang}`, '-'),
    },
  ];

  if (hasAccessToRuleDetailPage) {
    columns.push({
      title: t('global:ACTION'),
      align: 'right',
      width: 100,
      render: record => {
        const id = get(record, '_id', '');
        const path = ROUTE.DTS_RULE_DETAIL.path.replace(':id', '');

        return (
          <DetailButton urlPath={path} _id={id} />
        );
      },
    });
  }

  return columns;
};
