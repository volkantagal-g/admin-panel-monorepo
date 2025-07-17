import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';
import { getActiveOrderStats } from '../../redux/selectors';

const ActiveOrders = () => {
  const classes = useStyles();
  const { t } = useTranslation('artisanLiveMapPage');
  const activeOrderStats = useSelector(getActiveOrderStats.getData || []);

  return (
    <div>
      <div className={classes.shopStatistics}>
        <table>
          <tbody>
            <tr>
              <td title={t('STORE_STATS.ACTIVES.LONG')}>{t('STORE_STATS.ACTIVES.SHORT')}: {activeOrderStats.actives}</td>
              <td title={t('STORE_STATS.OPENS.LONG')}>{t('STORE_STATS.OPENS.SHORT')}: {activeOrderStats.opens}</td>
              <td title={t('STORE_STATS.OPEN_AND_SD.LONG')}>{t('STORE_STATS.OPEN_AND_SD.SHORT')}: {activeOrderStats.openAndRGs}</td>
              <td title={t('STORE_STATS.COURIER_OPEN_AND_SD.LONG')}>
                {t('STORE_STATS.COURIER_OPEN_AND_SD.SHORT')}: {activeOrderStats.courierRGToOpenRGRatio}
              </td>
              <td title={t('STORE_STATS.BUSY_ONES.LONG')}>
                {t('STORE_STATS.BUSY_ONES.SHORT')}: {activeOrderStats.busyOnes} ({activeOrderStats.busyToCourierAndRGRatio})
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveOrders;
