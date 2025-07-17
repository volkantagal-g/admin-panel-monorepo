// TODO: Vehicle Type filters code will be open when BE is ready
// import { /* useCallback, */ useMemo } from 'react';
import {
  Row,
  Col,
  Collapse,
  Space,
  // Select,
  Typography,
  Button,
} from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
// import { debounce } from 'lodash';

// import TagOption from '../TagOption';
// import { getLangKey } from '@shared/i18n';
import { Creators } from '../../redux/actions';
import { slotDataSelector } from '../../redux/selectors';
import useStyles from './styles';
// import { RETURN_VEHICLE_TYPES } from '../../constants';

const { Panel } = Collapse;
const { Text } = Typography;

const Filter = ({ warehouseId }) => {
  const { t } = useTranslation(['glReturnAlertPage', 'global']);
  const classes = useStyles();
  const dispatch = useDispatch();
  // const DEFAULT_SELECT_MS = 100;
  const slotData = useSelector(slotDataSelector.getData);

  // const vehicleTypeList = RETURN_VEHICLE_TYPES.map(tag => {
  //   const tagText = tag[getLangKey()];
  //   const customValue = tag.value.toString();
  //   return TagOption(customValue, tagText);
  // });

  // const debouncedVehicleTypeSelect = (
  //   useMemo(() => debounce(vehicleType => dispatch(Creators.setVehicleType({ vehicleType })), DEFAULT_SELECT_MS), [dispatch])
  // );

  // const vehicleTypeSelect = useCallback(vehicleType => {
  //   debouncedVehicleTypeSelect(vehicleType);
  // }, [debouncedVehicleTypeSelect]);

  const handleUpdateCourierPlan = () => {
    dispatch(Creators.getUpdatedCourierPlanRequest({ warehouseId }));
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                {/* <Col span={6}>
                  <Text>{t('FILTER.VEHICLE_TYPE.TITLE')}</Text>
                  <Select
                    placeholder={t('FILTER.VEHICLE_TYPE.DESC')}
                    className={classes.filterSelect}
                    onChange={vehicleTypeSelect}
                    showArrow
                    allowClear
                  >
                    {vehicleTypeList}
                  </Select>
                </Col> */}
                <Col span={24} className={classes.updateButton}>
                  <Text className={classes.lastUpdatedText}>
                    <b>{t('LAST_UPDATED')}</b>
                    <br />
                    {moment.utc(slotData?.lastUpdate).local().format('DD.MM.YYYY HH:mm:ss')}
                  </Text>
                  <Button
                    data-testid="updateCourierPlan"
                    className={classes.buttonWrapper}
                    onClick={() => {
                      handleUpdateCourierPlan(warehouseId);
                    }}
                  >
                    {t('UPDATE_COURIER_PLAN')}
                  </Button>
                </Col>
              </Row>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
