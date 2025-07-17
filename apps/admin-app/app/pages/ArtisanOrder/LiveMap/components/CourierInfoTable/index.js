import { get } from 'lodash';
import moment from 'moment';
import { Button, Tag } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import { getLangKey } from '@shared/i18n';
import { COURIER_STATUS_PREPARING, COURIER_STATUS_BEFORE_PREPARING } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';

const CourierInfoTable = ({ couriersMap, courierId, onClose, warehousesMap, activeOrders }) => {
  const { t } = useTranslation(['artisanLiveMapPage', 'warehousePage']);
  const getDurationFromNow = time => {
    return moment(time).fromNow();
  };

  const classes = useStyles();
  const lastUpdateTime = get(couriersMap, [courierId, 'statusLastChangedAt']);

  const isCourierStatusPreparing = () => {
    const status = get(couriersMap, [courierId, 'status']);
    const { courierVerifyAfterCheckoutDate } = activeOrders.find(order => order?.courier?.id === courierId) || {};
    if (status === COURIER_STATUS_PREPARING && !courierVerifyAfterCheckoutDate) {
      return COURIER_STATUS_BEFORE_PREPARING;
    }
    return status;
  };

  return (
    <div>
      <div className={classes.markerInfoHeader}>
        <span className="pl-1 font-weight-bold">{t('artisanLiveMapPage:COURIER')}</span>
        <div>
          <Link to={{ pathname: ROUTE.COURIER_DETAIL.path.replace(':id', courierId) }} target="_blank">
            <Button shape="round" size="small" type="ghost">
              {t('global:DETAIL')}
            </Button>
          </Link>
          <Button type="link" onClick={() => onClose()} danger shape="circle" size="middle" icon={<CloseCircleOutlined />} />
        </div>
      </div>
      <div className={classes.markerInfoTable}>
        <table className="table-striped justify-content-end">
          <tbody>
            <tr>
              <td className={classes.markerInfoCell}>{t('artisanLiveMapPage:NAME')}</td>
              <td className={classes.markerInfoCell}>{get(couriersMap, [courierId, 'name'])}</td>
            </tr>
            <tr>
              <td className={classes.markerInfoCell}>{t('global:GSM')}</td>
              <td className={classes.markerInfoCell}>{get(couriersMap, [courierId, 'gsm'])}</td>
            </tr>
            <tr>
              <td className={classes.markerInfoCell}>{t('global:STATUS')}</td>
              <td className={classes.markerInfoCell}>{t(`warehousePage:COURIER_STATUSES:${isCourierStatusPreparing()}`)}</td>
            </tr>
            <tr>
              <td className={classes.markerInfoCell}>{t('global:LAST_STATUS')}</td>
              <td className={classes.markerInfoCell}>
                {`${getDurationFromNow(get(couriersMap, [courierId, 'statusLastChangedAt']))}
                   (${moment(lastUpdateTime).format('HH:mm')})`}
              </td>
            </tr>
            <tr>
              <td className={classes.markerInfoCell}>{t('global:LAST_COORD_TIME')}</td>
              <td className={classes.markerInfoCell}>
                {moment(get(couriersMap, [courierId, 'location', 'time']))
                  .locale(getLangKey())
                  .fromNow()}
              </td>
            </tr>
            <tr>
              <td className={classes.markerInfoCell}>{t('global:WAREHOUSE')} </td>
              <td className={classes.markerInfoCell}>{get(warehousesMap, [get(couriersMap, [courierId, 'warehouse']), 'name'])}</td>
            </tr>
            <tr>
              <td className={classes.markerInfoCell}>{t('artisanLiveMapPage:SERVICE_TYPE')}</td>
              <td colSpan={2} className={classes.markerInfoCell}>
                {get(couriersMap, [courierId, 'domainTypes']) &&
                  get(couriersMap, [courierId, 'domainTypes']).map(domainType => {
                    return (
                      <Tag key={domainType} className={classes.domainTypeTag} color="#5D3EBC">
                        <span className="align-content-center">{t(`global:GETIR_MARKET_DOMAIN_TYPES:${domainType}`)}</span>
                      </Tag>
                    );
                  })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourierInfoTable;
