import { Typography } from 'antd';

import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const { Text } = Typography;

const CustomConfigSummary = ({ selectedCustomConfig }) => {
  const classes = useStyles();
  const { t } = useTranslation(['algorithmConfigPage']);

  if (selectedCustomConfig) {
    return (
      <div className={classes.customConfigSummaryContainer}>
        <Text>{t('VALUE')}: </Text>
        <pre>{JSON.stringify(selectedCustomConfig?.value, null, 2)}</pre>
        <br />
        <Text>{t('ALIAS')}: </Text>
        <Text strong>{selectedCustomConfig.alias}</Text>
        <br />
        <Text>{t('TYPE')}: </Text>
        <Text strong>{selectedCustomConfig.type}</Text>
      </div>
    );
  }
  return null;
};

export default CustomConfigSummary;
