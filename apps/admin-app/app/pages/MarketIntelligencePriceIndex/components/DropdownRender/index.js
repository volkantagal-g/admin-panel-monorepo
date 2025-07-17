import { Divider, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import checked from '@app/pages/MarketIntelligencePriceIndex/img/assets/checked.png';

import useStyles from '@app/pages/MarketIntelligencePriceIndex/styles';

const DropdownRender = (setValue, value, menu, disabled) => {
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceIndex');

  return (
    <div>
      {menu}
      <Divider className={classes.renderDivider} />
      <div className={classes.renderContainer}>
        <Button
          type="text"
          className={classes.tooltipTitle}
          icon={(
            <img
              src={checked}
              alt="add_action"
              className={classes.actionTreeCancel}
            />
          )}
          onClick={() => setValue(value)}
          disabled={disabled}
        >
          &nbsp; {t('APPLY')}
        </Button>
      </div>
    </div>
  );
};

export default DropdownRender;
