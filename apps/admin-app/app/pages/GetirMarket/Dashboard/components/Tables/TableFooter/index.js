import { Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import AnalyticsService from '@shared/services/analytics';

import useStyles from './styles';
import { MARKET_DASHBOARD_EVENTS } from '../../../mixPanelEvents';

const { Text } = Typography;

const FooterButton = ({ setLimit, limit, type }) => {
  const classes = useStyles();
  const { t } = useTranslation('getirMarketDashboardPage');

  const handleSetLimit = () => {
    setLimit(type);
    AnalyticsService.track(
      MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.EVENT_NAME,
      {
        button: MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.TABLE_LISTING[type],
        tableName: MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.TABLE_SORTING.PRODUCTS.NAME,
      },
    );
  };
  return (
    <Button className={classes.button} onClick={handleSetLimit} type={limit === type && 'primary'}>
      {type === 'All' ? t('ALL') : type}
    </Button>
  );
};

const TableFooter = ({ setLimit, limit, filteredTotalCount, filteredTotalPrice, filteredRate }) => {
  const classes = useStyles();
  return (
    <div className={classes.footerContainer}>
      <div className={classes.buttonContainer}>
        <FooterButton setLimit={setLimit} limit={limit} type={10} />
        <FooterButton setLimit={setLimit} limit={limit} type={25} />
        <FooterButton setLimit={setLimit} limit={limit} type={100} />
        <FooterButton setLimit={setLimit} limit={limit} type="All" />
      </div>
      <div className={filteredRate ? '' : classes.totalsContainer}>
        <Text strong className={classes.marginRight}>
          {filteredTotalCount}
        </Text>
        <Text strong className={classes.marginRight}>
          {filteredTotalPrice}
        </Text>
        {
          filteredRate ?? (
            <Text className={classes.filteredRateText}>{filteredRate}</Text>
          )
        }
      </div>
    </div>
  );
};

export default TableFooter;
