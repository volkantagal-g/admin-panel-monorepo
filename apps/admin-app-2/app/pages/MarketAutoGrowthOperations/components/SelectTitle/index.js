import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import { COLUMN_TYPES, SELECT_TITLE_ICONS } from '@app/pages/MarketAutoGrowthOperations/constants';
import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';

const SelectTitle = ({ src, description }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketAutoGrowthOperations');

  return (
    <div
      data-testid="select-title"
      className={classes.selectTitle}
    >
      {' '}
      <img
        className={classes.selectTitleIcon}
        alt={description}
        src={SELECT_TITLE_ICONS[src]}
      />{' '}
      {description}
      {src === COLUMN_TYPES.PROMO_TYPE && (
      <Tooltip title={t('PROMO_TYPE_TOOLTIP')}>
        <InfoCircleOutlined className={classes.infoCircleOutlined} />
      </Tooltip>
      )}
    </div>
  );
};
export default SelectTitle;
