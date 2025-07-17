import { get } from 'lodash';
import { Button, Tag } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

import { ROUTE } from '@app/routes';

import useStyles from './styles';
import { t } from '@shared/i18n';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

const WarehouseInfoTable = ({ warehousesMap, warehouseId, onClose }) => {
  const { Can } = usePermission();
  const classes = useStyles();

  const openWarehouseDetail = () => {
    const path = ROUTE.WAREHOUSE_DETAIL.path.replace(':id', warehouseId);
    window.open(path);
  };

  return (
    <div>
      <div className={classes.markerInfoHeader}>
        <span className="pl-1 font-weight-bold">{t('global:WAREHOUSE')}</span>
        <div>
          <Can permKey={permKey.PAGE_WAREHOUSE_DETAIL}>
            <Button shape="round" size="small" type="ghost" onClick={openWarehouseDetail}>
              {t('global:DETAIL')}
            </Button>
          </Can>
          <Button type="link" onClick={() => onClose()} danger shape="circle" size="middle" icon={<CloseCircleOutlined />} />
        </div>
      </div>
      <div className={classes.markerInfoTable}>
        <table className="table-striped justify-content-end">
          <tbody>
            <tr>
              <td className={classes.markerInfoCell}>{t('global:NAME')} </td>
              <td className={classes.markerInfoCell}>{get(warehousesMap, [warehouseId, 'name'])}</td>
            </tr>
            <tr>
              <td className={classes.markerInfoCell}>{t('global:STATUS')}</td>
              <td className={classes.markerInfoCell}>
                {t(`global:WAREHOUSE_STATUS_TYPES:${get(warehousesMap, [warehouseId, 'status'])}`)}
              </td>
            </tr>
            <tr>
              <td className={classes.markerInfoCell}>{t('global:SERVICE_TYPE')}</td>
              <td className={classes.markerInfoCell}>
                {get(warehousesMap, [warehouseId, 'domainTypes']) &&
                  get(warehousesMap, [warehouseId, 'domainTypes']).map(domainType => {
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

export default WarehouseInfoTable;
