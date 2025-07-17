import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Spin, Tooltip } from 'antd';

import useStyles from './styles';

const { Text } = Typography;

const DurationItem = ({ title, value, loading, tooltip }) => {
  const classes = useStyles();
  const { t } = useTranslation('getirMarketDashboardPage');

  return (
    <div className={classes.container}>
      <div>
        {
          tooltip ? (
            <Tooltip title={t(tooltip)}>
              <Text>
                {title}
              </Text>
            </Tooltip>
          )
            : (
              <Text>
                {title}
              </Text>
            )
        }
      </div>
      <div>
        {
          loading ?
            (
              <Spin size="small" />
            ) :
            (
              <Text className={classes.valueContainer}>
                {value || 0}
              </Text>
            )
        }
      </div>
    </div>
  );
};

export default memo(DurationItem);
