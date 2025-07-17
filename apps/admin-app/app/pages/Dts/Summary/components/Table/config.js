import _ from 'lodash';

import { Tag } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

import { getLangKey, t } from '@shared/i18n';

export const generateTableColumns = data => {
  const sortedData = _.sortBy(data, rule => {
    return rule.ruleNumber;
  });

  const constantRules = [
    {
      title: t('dtsSummaryPage:RANK'),
      dataIndex: ['currentRank', 'score'],
      key: 'currentRank',
      width: 70,
      fixed: 'left',
      sorter: {
        compare: (a, b) => {
          return a.currentRank.score - b.currentRank.score;
        },
      },
      defaultSortOrder: 'ascend',
    },
    {
      title: t('dtsSummaryPage:WAREHOUSE'),
      dataIndex: 'name',
      key: 'name',
      width: 160,
      fixed: 'left',
      sorter: (a, b) => {
        return a.name.localeCompare(b.name);
      },
    },
    {
      title: t('global:FRANCHISE'),
      dataIndex: 'franchiseName',
      key: 'franchiseName',
      width: 160,
      fixed: 'left',
      sorter: (a, b) => {
        return a.franchiseName.localeCompare(b.franchiseName);
      },
    },
    {
      title: t('dtsSummaryPage:BEFORE'),
      dataIndex: 'previousRank',
      key: 'previousRank',
      width: 75,
      fixed: 'left',
      sorter: {
        compare: (a, b) => {
          return a.previousRank - b.previousRank;
        },
      },
    },
    {
      title: t('dtsSummaryPage:NOW'),
      dataIndex: ['currentRank'],
      key: 'currentRank',
      width: 75,
      fixed: 'left',
      sorter: {
        compare: (a, b) => {
          return a.currentRank.score - b.currentRank.score;
        },
      },
      render: props => {
        if (props.compare) {
          const isIncreased = props.compare === 'increased';
          return (
            <Tag color={isIncreased ? 'red' : 'green'}>
              {isIncreased ? <ArrowDownOutlined /> : <ArrowUpOutlined />} {props.score}
            </Tag>
          );
        }
        return (props.score);
      },
    },
    {
      title: t('dtsSummaryPage:DTS_TOTAL'),
      dataIndex: 'totalPoint',
      key: 'totalPoint',
      width: 100,
      fixed: 'left',
      sorter: {
        compare: (a, b) => {
          return a.totalPoint - b.totalPoint;
        },
      },
    },
    {
      title: t('dtsSummaryPage:DTS_LETTER'),
      dataIndex: 'letterGrade',
      key: 'letterGrade',
      width: 100,
      fixed: 'left',
      sorter: (a, b) => {
        return a.totalPoint - b.totalPoint;
      },
    },
  ];

  const dynamicRules = sortedData.map((rule, index) => {
    return {
      title: rule.title[getLangKey()],
      key: rule.title[getLangKey()],
      width: 120,
      render: record => {
        const foundIndex = _.findIndex(record.categoryPoints, category => {
          return category.id === rule._id;
        });
        return _.get(record, ['categoryPoints', [foundIndex], 'score'], '-');
      },
    };
  });

  return [ ...constantRules, ...dynamicRules];
};
