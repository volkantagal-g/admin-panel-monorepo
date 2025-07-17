import { Typography, Button, Row } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getIsCourierOnDuty } from '@shared/utils/courier';
import permKeys from '@shared/shared/permKey.json';
import AntTable from '@shared/components/UI/AntTableV2';
import RedirectButton from '@shared/components/UI/RedirectButtonV2';
import { getTableColumns } from './config';
import { Creators } from '../../redux/actions';
import { getSelectedDivisionSelector, selectedPlaceMarkSelector } from '../../redux/selectors';
import AnalyticsService from '@shared/services/analytics';
import { LIVE_MAP_EVENTS } from '@app/pages/GetirMarket/LiveMap/mixPanelEvents';
import { warehouseStatuses, courierStatuses, domainTypes } from '@shared/shared/constantValues';

import useStyles from './styles';

const { Title } = Typography;

const EventPanel = () => {
  const selectedDivision = useSelector(getSelectedDivisionSelector);

  const classes = useStyles({ desktopTop: selectedDivision ? '600px' : '500px' });
  const dispatch = useDispatch();
  const { t } = useTranslation('global');
  const selectedPlaceMark = useSelector(selectedPlaceMarkSelector.formattedEventData);
  const id = useSelector(selectedPlaceMarkSelector.getId);
  const type = useSelector(selectedPlaceMarkSelector.getType);
  const selectedPlaceMarkData = useSelector(selectedPlaceMarkSelector.getData);

  const getTitle = () => {
    switch (type) {
      case 'courier':
        return t('COURIER');
      case 'warehouse':
        return t('WAREHOUSE');
      case 'failedOrder':
        return t(`global:GETIR_MARKET_DOMAIN_TYPES:${selectedPlaceMarkData.domainType}`);
      default:
        return '';
    }
  };

  const handleCloseButton = () => {
    dispatch(Creators.setSelectedPlaceMark({ data: null }));
    AnalyticsService.track(LIVE_MAP_EVENTS.BUTTON_CLICK, { button: LIVE_MAP_EVENTS.EVENT_PANEL.CANCEL_CLICK, source: selectedPlaceMarkData?.type });
  };

  const isCourier = type === 'courier';
  const isWarehouse = type === 'warehouse';
  const isFailedOrder = type === 'failedOrder';

  const handleClick = buttonType => {
    const status = selectedPlaceMarkData.type === 'warehouse' ? warehouseStatuses[selectedPlaceMarkData.status]?.en :
      courierStatuses[selectedPlaceMarkData.status]?.en;
    const services = selectedPlaceMarkData.domainTypes.map(service => domainTypes[service]?.en);
    if (buttonType === 'courier') {
      AnalyticsService.track(LIVE_MAP_EVENTS.BUTTON_CLICK, { button: LIVE_MAP_EVENTS.EVENT_PANEL.COURIER_DETAIL_CLICK, status, service: services });
    }
    else if (buttonType === 'order') {
      AnalyticsService.track(LIVE_MAP_EVENTS.BUTTON_CLICK, { button: LIVE_MAP_EVENTS.EVENT_PANEL.COURIER_ORDER_CLICK, status, service: services });
    }
    else {
      AnalyticsService.track(LIVE_MAP_EVENTS.BUTTON_CLICK, { button: LIVE_MAP_EVENTS.EVENT_PANEL.WAREHOUSE_DETAIL_CLICK, status, service: services });
    }
  };

  return selectedPlaceMark ? (
    <div className={classes.container}>
      <Row justify="space-between" align="middle" className={classes.header}>
        <Title level={5} className={classes.title}>{getTitle()}</Title>
        <div className={classes.buttonsContainer}>
          {isCourier && (
            <>
              {
                selectedPlaceMarkData.marketOrder && getIsCourierOnDuty(selectedPlaceMarkData.status) ? (
                  <RedirectButton
                    text={t('global:ORDER')}
                    to={`/marketOrder/detail/${selectedPlaceMarkData.marketOrder}`}
                    permKey={permKeys.PAGE_GETIR_MARKET_ORDER_DETAIL}
                    target="_blank"
                    size="small"
                    className={classes.btnXS}
                    onClick={() => handleClick('order')}
                  />
                ) : null
              }
              <RedirectButton
                to={`/courier/detail/${id}`}
                text={t('DETAIL')}
                permKey={permKeys.PAGE_COURIER_DETAIL}
                target="_blank"
                size="small"
                className={classes.btnXS}
                onClick={() => handleClick('courier')}
              />
            </>
          )}
          {isWarehouse && (
            <RedirectButton
              to={`/warehouse/detail/${id}`}
              text={t('DETAIL')}
              permKey={permKeys.PAGE_WAREHOUSE_DETAIL}
              target="_blank"
              size="small"
              className={classes.btnXS}
              onClick={() => handleClick('warehouse')}
            />
          )}
          {isFailedOrder && (
            <RedirectButton
              text={t('global:ORDER')}
              to={`/marketOrder/detail/${id}`}
              permKey={permKeys.PAGE_GETIR_MARKET_ORDER_DETAIL}
              target="_blank"
              size="small"
              className={classes.btnXS}
            />
          )}
          <Button
            onClick={handleCloseButton}
            type="danger"
            size="small"
            className={classes.btnXS}
          >
            <CloseOutlined className={classes.closeButtonIcon} />
          </Button>
        </div>
      </Row>

      <AntTable
        data={selectedPlaceMark}
        columns={getTableColumns({ classes })}
        showHeader={false}
        showFooter={false}
        scroll={null}
        className={classes.table}
      />
    </div>
  ) : null;
};

export default EventPanel;
