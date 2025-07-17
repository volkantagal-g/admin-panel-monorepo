import { Tooltip, Typography } from 'antd';

const { Text } = Typography;

export const generateTableColumns = ({ t, classes }) => {
  const constantRules = [
    {
      dataIndex: 'key',
      key: 'key',
      render: (data, row) => (
        <Tooltip title={row.value?.totalTooltipTranslationKey && t(row.value.totalTooltipTranslationKey)}>
          <Text>{t(data)}</Text>
        </Tooltip>
      ),
    },
    {
      dataIndex: 'value',
      key: 'value',
      align: 'right',
      render: ({ total, totalTooltipTranslationKey }) => (
        <Tooltip title={totalTooltipTranslationKey && t(totalTooltipTranslationKey)}>
          <span className={classes.textBold}>{total}</span>
        </Tooltip>
      ),
    },
    {
      dataIndex: 'value',
      align: 'right',
      width: 35,
      render: ({ average, averageTooltipTranslationKey }) => (
        <Tooltip title={t(averageTooltipTranslationKey || 'global:AVERAGE')}>
          <span className={classes.textBold}>{average}</span>
        </Tooltip>
      ),
    },
  ];

  return constantRules;
};
