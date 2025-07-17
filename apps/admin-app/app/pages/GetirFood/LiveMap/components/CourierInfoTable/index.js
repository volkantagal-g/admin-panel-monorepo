import { get } from 'lodash';
import moment from 'moment';
import { Button, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { CloseCircleOutlined } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';
import { courierStatusesForFood } from '@shared/shared/constantValues';
import { ROUTE } from '@app/routes';

import useStyles from './styles';

const CourierInfoTable = ({ couriersMap, courierId, onClose, warehousesMap }) => {
  const classes = useStyles();
  const { t } = useTranslation('foodLiveMapPage');
  const getDurationFromNow = time => {
    return moment(time).fromNow();
  };

  const lastUpdateTime = get(couriersMap, [courierId, 'statusLastChangedAt']);

  const handleOpenCourierDetail = () => {
    const path = ROUTE.COURIER_DETAIL.path.replace(':id', courierId);
    window.open(path);
  };

  return (
    <div>
      <div className={classes.markerInfoHeader}>
        <span className="pl-1 font-weight-bold">{t('foodLiveMapPage:COURIER')}</span>
        <div>
          <Button shape="round" size="small" type="ghost" onClick={handleOpenCourierDetail}>
            {t('global:DETAIL')}
          </Button>
          <Button type="link" onClick={() => onClose()} danger shape="circle" size="middle" icon={<CloseCircleOutlined />} />
        </div>
      </div>
      <div className={classes.markerInfoTable}>
        <table className="table-striped justify-content-end">
          <tbody>
            <tr>
              <td className={classes.markerInfoCell}>{t('foodLiveMapPage:COURIER')}</td>
              <td className={classes.markerInfoCell}>{get(couriersMap, [courierId, 'name'])}</td>
            </tr>
            <tr>
              <td className={classes.markerInfoCell}>{t('global:PHONE')} </td>
              <td className={classes.markerInfoCell}>{get(couriersMap, [courierId, 'gsm'])}</td>
            </tr>
            <tr>
              <td className={classes.markerInfoCell}>{t('global:STATUS')}</td>
              <td className={classes.markerInfoCell}>
                {get(courierStatusesForFood, [get(couriersMap, [courierId, 'status']), getLangKey()])}
              </td>
            </tr>
            <tr>
              <td className={classes.markerInfoCell}>{t('foodLiveMapPage:LAST_UPDATE')}</td>
              <td className={classes.markerInfoCell}>
                {`${getDurationFromNow(get(couriersMap, [courierId, 'statusLastChangedAt']))}
                   (${moment(lastUpdateTime).format('HH:mm')})`}
              </td>
            </tr>
            <tr>
              <td className={classes.markerInfoCell}>{t('global:WAREHOUSE')} </td>
              <td className={classes.markerInfoCell}>{get(warehousesMap, [get(couriersMap, [courierId, 'warehouse']), 'name'])}</td>
            </tr>
            <tr>
              <td className={classes.markerInfoCell}>{t('foodLiveMapPage:SERVICE_TYPE')}</td>
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
