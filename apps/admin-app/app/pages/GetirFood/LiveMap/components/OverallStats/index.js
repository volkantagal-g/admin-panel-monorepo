import { get } from 'lodash';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const OverallStats = ({ overallStats: { city = {}, country = {} }, children }) => {
  const { t } = useTranslation('foodLiveMapPage');

  const calculateAndReturnGrowthRate = (today, past) => {
    const isGrown = (today > past);
    const difference = (today - past);
    const rate = difference / (past / 100);
    if (rate) {
      if (isGrown) {
        return <span className={classes.positiveGrowth}>{rate.toFixed(0)}</span>;
      }
      return <span className={classes.negativeGrowth}>{rate.toFixed(0)}</span>;
    }
    return <span className={classes.negativeGrowth}>0</span>;
  };

  const classes = useStyles();
  return (
    <div className={classes.bottomLeft}>
      <div className={classes.activeOrderAreaWrapper}>
        <table className={classes.selectedCityActiveOrdersTable}>
          <tbody>
            <tr>
              <td title="Aktif Siparişler(Toplam)" className={classes.activeFoodOrderCountCell}>
                {get(city, 'active_order.gg', 0) + get(city, 'active_order.rg', 0)}
              </td>
              <td title="Hata Alan (Toplam)" className={classes.activeOrderErrorCountCell}>
                {get(city, 'order_detail.gg.error', 0) + get(city, 'order_detail.rg.error', 0)}
              </td>
              <td title="Ciro Toplam(Bugün)" className={classes.overallRevenueCell}>
                {(get(city, 'order_revenue.rg.today', 0) + get(city, 'order_revenue.gg.today', 0)).toFixed(0)}
              </td>
              <td className={classes.financialGrowthCell}>
              </td>
              <td title="Sipariş RG(Bugün)" className={classes.orderCountCell}>{get(city, 'order_count.rg.today', 0).toFixed(0)}</td>
              <td className={classes.financialGrowthCell}>
              </td>
              <td title="Sipariş GG(Bugün)" className={classes.orderCountCell}>{get(city, 'order_count.gg.today', 0).toFixed(0)}</td>
              <td className={classes.financialGrowthCell}>
              </td>
              <td title={t('foodLiveMapPage:TOTAL_ORDER_TODAY')} className={classes.orderCountCell}>
                {(get(city, 'order_count.rg.today', 0) +
                get(city, 'order_count.gg.today', 0)).toFixed(0)}
              </td>
              <td className={classes.financialGrowthCell}>
              </td>
              <td title="GY Dedike(Bugün)" className={classes.dedicatedCourierCountCell}>{get(city, 'order_domain_count.gy.today', 0)}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td title="Aktif Siparişler(RG)" className={classes.activeFoodOrderCountCell}>{get(city, 'active_order.rg', 0)}</td>
              <td title="Hata Alan (RG)" className={classes.activeOrderErrorCountCell}>
                {get(city, ['order_detail', 'rg', 'error'], 0).toFixed(0)}
              </td>
              <td className={classes.overallRevenueCell}>
                {(get(city, 'order_revenue.rg.yesterday', 0) + get(city, 'order_revenue.gg.yesterday', 0)).toFixed(0)}
              </td>
              <td title="Düne kıyasla toplam ciro oranı" className={classes.financialGrowthCell}>
                {calculateAndReturnGrowthRate(
                  (get(city, 'order_revenue.rg.today', 0) + get(city, 'order_revenue.gg.today', 0)).toFixed(0),
                  (get(city, 'order_revenue.rg.yesterday', 0) + get(city, 'order_revenue.gg.yesterday', 0)).toFixed(0))}
              </td>
              <td title="RG sipariş(Dün)" className={classes.orderCountCell}>{get(city, 'order_count.rg.yesterday', 0).toFixed(0)}</td>
              <td title="Düne kıyasla RG sipariş oranı" className={classes.financialGrowthCell}>
                {calculateAndReturnGrowthRate(
                  get(city, 'order_count.rg.today', 0).toFixed(0),
                  get(city, 'order_count.rg.yesterday', 0).toFixed(0))}
              </td>
              <td title="GG sipariş(Dün)" className={classes.orderCountCell}>{get(city, 'order_count.gg.yesterday', 0).toFixed(0)}</td>
              <td title="Düne kıyasla GG sipariş oranı" className={classes.financialGrowthCell}>
                {calculateAndReturnGrowthRate(
                  get(city, 'order_count.gg.today', 0).toFixed(0),
                  get(city, 'order_count.gg.yesterday', 0).toFixed(0))}
              </td>
              <td title={t('foodLiveMapPage:TOTAL_ORDER_YESTERDAY')} className={classes.orderCountCell}>
                {(get(city, ['order_count','rg','yesterday'], 0) +
                get(city, ['order_count','gg','yesterday'], 0)).toFixed(0)}
              </td>
              <td
                title={t('foodLiveMapPage:TOTAL_ORDER_DIFFERENCE_WITH_YESTERDAY')}
                className={classes.financialGrowthCell}
              >
                {calculateAndReturnGrowthRate(
                  (get(city, 'order_count.rg.today', 0) + get(city, 'order_count.gg.today', 0)).toFixed(0),
                  (get(city, ['order_count', 'rg', 'yesterday'], 0) + get(city, ['order_count', 'gg', 'yesterday'], 0)).toFixed(0))}
              </td>
              <td title="GY dedike kurye(Dün)" className={classes.dedicatedCourierCountCell}>
                {get(city, 'order_domain_count.gy.yesterday', 0)}
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td title="Aktif Siparişler(GG)" className={classes.activeFoodOrderCountCell}>{get(city, 'active_order.gg', 0)}</td>
              <td title="Hata Alan (GG)" className={classes.activeOrderErrorCountCell}>
                {get(city, ['order_detail', 'gg', 'error'], 0).toFixed(0)}
              </td>
              <td title="Toplam Ciro(Geçen Hafta)" className={classes.overallRevenueCell}>
                {(get(city, ['order_revenue', 'rg', 'last week'], 0) + get(city, ['order_revenue', 'gg', 'last week'], 0)).toFixed(0)}
              </td>
              <td title="Geçen haftaya kıyasla toplam ciro oranı" className={classes.financialGrowthCell}>
                {calculateAndReturnGrowthRate(
                  (get(city, ['order_revenue', 'rg', 'today'], 0) + get(city, ['order_revenue', 'gg', 'today'], 0)).toFixed(0),
                  (get(city, ['order_revenue', 'rg', 'last week'], 0) + get(city, ['order_revenue', 'gg', 'last week'], 0)).toFixed(0))}
              </td>
              <td title="RG Sipariş(Geçen Hafta)" className={classes.orderCountCell}>
                {get(city, ['order_count', 'rg', 'last week'], 0).toFixed(0)}
              </td>
              <td title="Geçen haftaya kıyasla RG sipariş oranı" className={classes.financialGrowthCell}>
                {calculateAndReturnGrowthRate(
                  get(city, ['order_count', 'rg', 'today'], 0).toFixed(0)
                  , get(city, ['order_count', 'rg', 'last week'], 0).toFixed(0),
                )}
              </td>
              <td title="GG Sipariş(Geçen Hafta)" className={classes.orderCountCell}>
                {get(city, ['order_count', 'gg', 'last week'], 0).toFixed(0)}</td>
              <td title="Geçen haftaya kıyasla GG sipariş oranı" className={classes.financialGrowthCell}>
                {calculateAndReturnGrowthRate(
                  get(city, ['order_count', 'gg', 'today'], 0).toFixed(0)
                  , get(city, ['order_count', 'gg', 'last week'], 0).toFixed(0),
                )}
              </td>
              <td title={t('foodLiveMapPage:TOTAL_ORDER_LAST_WEEK')} className={classes.orderCountCell}>
                {(get(city, ['order_count','rg','last week'], 0) +
                get(city, ['order_count','gg','last week'], 0)).toFixed(0)}
              </td>
              <td
                title={t('foodLiveMapPage:TOTAL_ORDER_DIFFERENCE_WITH_LAST_WEEK')}
                className={classes.financialGrowthCell}
              >
                {calculateAndReturnGrowthRate(
                  (get(city, 'order_count.rg.today', 0) + get(city, 'order_count.gg.today', 0)).toFixed(0),
                  (get(city, ['order_count','rg','last week'], 0) + get(city, ['order_count','gg','last week'], 0)).toFixed(0))}
              </td>
              <td title="GY dedike kurye(Geçen Hafta)" className={classes.dedicatedCourierCountCell}>
                {get(city, ['order_domain_count', 'gy', 'last week'], 0).toFixed(0)}
              </td>
            </tr>
          </tbody>
        </table>
        <table className={classes.selectedCityActiveOrdersTable}>
          <tbody>
            <tr>
              <td title="Aktif Siparişler(Toplam)" className={classes.activeFoodOrderCountCell}>
                {get(country, 'active_order.gg', 0) + get(country, 'active_order.rg', 0)}
              </td>
              <td title="Hata Alan (Toplam)" className={classes.activeOrderErrorCountCell}>
                {get(country, 'order_detail.gg.error', 0) + get(country, 'order_detail.rg.error', 0)}
              </td>
              <td title="Ciro Toplam(Bugün)" className={classes.overallRevenueCell}>
                {(get(country, 'order_revenue.rg.today', 0) + get(country, 'order_revenue.gg.today', 0)).toFixed(0)}
              </td>
              <td className={classes.financialGrowthCell}>
              </td>
              <td title="Sipariş RG(Bugün)" className={classes.orderCountCell}>{get(country, 'order_count.rg.today', 0).toFixed(0)}</td>
              <td className={classes.financialGrowthCell}>
              </td>
              <td title="Sipariş GG(Bugün)" className={classes.orderCountCell}>{get(country, 'order_count.gg.today', 0).toFixed(0)}</td>
              <td className={classes.financialGrowthCell}>
              </td>
              <td title={t('foodLiveMapPage:TOTAL_ORDER_TODAY')} className={classes.orderCountCell}>
                {(get(country, 'order_count.rg.today', 0) +
                  get(country, 'order_count.gg.today', 0)).toFixed(0)}
              </td>
              <td className={classes.financialGrowthCell}>
              </td>
              <td title="GY Dedike(Bugün)" className={classes.dedicatedCourierCountCell}>
                {get(country, 'order_domain_count.gy.today', 0)}
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td title="Aktif Siparişler(RG)" className={classes.activeFoodOrderCountCell}>{get(country, 'active_order.rg', 0)}</td>
              <td title="Hata Alan (RG)" className={classes.activeOrderErrorCountCell}>
                {get(country, ['order_detail', 'rg', 'error'], 0).toFixed(0)}
              </td>
              <td className={classes.overallRevenueCell}>
                {(get(country, 'order_revenue.rg.yesterday', 0) + get(country, 'order_revenue.gg.yesterday', 0)).toFixed(0)}
              </td>
              <td title="Düne kıyasla toplam ciro oranı" className={classes.financialGrowthCell}>
                {calculateAndReturnGrowthRate(
                  (get(country, 'order_revenue.rg.today', 0) + get(country, 'order_revenue.gg.today', 0)).toFixed(0),
                  (get(country, 'order_revenue.rg.yesterday', 0) + get(country, 'order_revenue.gg.yesterday', 0)).toFixed(0))}
              </td>
              <td title="RG sipariş(Dün)" className={classes.orderCountCell}>{get(country, 'order_count.rg.yesterday', 0).toFixed(0)}</td>
              <td title="Düne kıyasla RG sipariş oranı" className={classes.financialGrowthCell}>
                {calculateAndReturnGrowthRate(
                  get(country, 'order_count.rg.today', 0).toFixed(0),
                  get(country, 'order_count.rg.yesterday', 0).toFixed(0))}
              </td>
              <td title="GG sipariş(Dün)" className={classes.orderCountCell}>{get(country, 'order_count.gg.yesterday', 0).toFixed(0)}</td>
              <td title="Düne kıyasla GG sipariş oranı" className={classes.financialGrowthCell}>
                {calculateAndReturnGrowthRate(
                  get(country, 'order_count.gg.today', 0).toFixed(0),
                  get(country, 'order_count.gg.yesterday', 0).toFixed(0))}
              </td>
              <td title={t('foodLiveMapPage:TOTAL_ORDER_YESTERDAY')} className={classes.orderCountCell}>
                {(get(country, ['order_count','rg','yesterday'], 0) +
                  get(country, ['order_count','gg','yesterday'], 0)).toFixed(0)}
              </td>
              <td
                title={t('foodLiveMapPage:TOTAL_ORDER_DIFFERENCE_WITH_YESTERDAY')}
                className={classes.financialGrowthCell}
              >
                {calculateAndReturnGrowthRate(
                  (get(country, 'order_count.rg.today', 0) + get(country, 'order_count.gg.today', 0)).toFixed(0),
                  (get(country, ['order_count', 'rg', 'yesterday'], 0) + get(country, ['order_count', 'gg', 'yesterday'], 0)).toFixed(0))}
              </td>
              <td title="GY dedike kurye(Dün)" className={classes.dedicatedCourierCountCell}>
                {get(country, 'order_domain_count.gy.yesterday', 0)}
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td title="Aktif Siparişler(GG)" className={classes.activeFoodOrderCountCell}>{get(country, 'active_order.gg', 0)}</td>
              <td title="Hata Alan (GG)" className={classes.activeOrderErrorCountCell}>
                {get(country, ['order_detail', 'gg', 'error'], 0).toFixed(0)}
              </td>
              <td title="Toplam Ciro(Geçen Hafta)" className={classes.overallRevenueCell}>
                {(get(country, ['order_revenue', 'rg', 'last week'], 0) +
                  get(country, ['order_revenue', 'gg', 'last week'], 0)).toFixed(0)}
              </td>
              <td title="Geçen haftaya kıyasla toplam ciro oranı" className={classes.financialGrowthCell}>
                {calculateAndReturnGrowthRate(
                  (get(country, ['order_revenue', 'rg', 'today'], 0) + get(country, ['order_revenue', 'gg', 'today'], 0)).toFixed(0),
                  (get(country, ['order_revenue', 'rg', 'last week'], 0) +
                    get(country, ['order_revenue', 'gg', 'last week'], 0)).toFixed(0))}
              </td>
              <td title="RG Sipariş(Geçen Hafta)" className={classes.orderCountCell}>
                {get(country, ['order_count', 'rg', 'last week'], 0).toFixed(0)}
              </td>
              <td title="Geçen haftaya kıyasla RG sipariş oranı" className={classes.financialGrowthCell}>
                {calculateAndReturnGrowthRate(
                  get(country, ['order_count', 'rg', 'today'], 0).toFixed(0)
                  , get(country, ['order_count', 'rg', 'last week'], 0).toFixed(0),
                )}
              </td>
              <td title="GG Sipariş(Geçen Hafta)" className={classes.orderCountCell}>
                {get(country, ['order_count', 'gg', 'last week'], 0).toFixed(0)}</td>
              <td title="Geçen haftaya kıyasla GG sipariş oranı" className={classes.financialGrowthCell}>
                {calculateAndReturnGrowthRate(
                  get(country, ['order_count', 'gg', 'today'], 0).toFixed(0)
                  , get(country, ['order_count', 'gg', 'last week'], 0).toFixed(0),
                )}
              </td>
              <td title={t('foodLiveMapPage:TOTAL_ORDER_LAST_WEEK')} className={classes.orderCountCell}>
                {(get(country, ['order_count','rg','last week'], 0) +
                  get(country, ['order_count','gg','last week'], 0)).toFixed(0)}
              </td>
              <td
                title={t('foodLiveMapPage:TOTAL_ORDER_DIFFERENCE_WITH_LAST_WEEK')}
                className={classes.financialGrowthCell}
              >
                {calculateAndReturnGrowthRate(
                  (get(country, 'order_count.rg.today', 0) + get(country, 'order_count.gg.today', 0)).toFixed(0),
                  (get(country, ['order_count', 'rg', 'last week'], 0) + get(country, ['order_count', 'gg', 'last week'], 0)).toFixed(0))}
              </td>
              <td title="GY dedike kurye(Geçen Hafta)" className={classes.dedicatedCourierCountCell}>
                {get(country, ['order_domain_count', 'gy', 'last week'], 0).toFixed(0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {children}
    </div>
  );
};

export default OverallStats;
