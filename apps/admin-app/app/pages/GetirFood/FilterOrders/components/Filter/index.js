import {
  Row,
  Col,
  Collapse,
  DatePicker,
  Input,
  Space,
  Select,
  Spin,
  Typography,
  Button,
} from 'antd';
import WarningOutlined from '@ant-design/icons/WarningOutlined';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '@app/pages/GetirFood/FilterOrders/redux/actions';
import {
  useRangePicker,
  useRestaurants,
  useOrderStatuses,
  useDeliveryTypes,
  useTimeTypes,
  usePaymentMethods,
  useCities,
  usePlatformTypes,
  useConfirmationCode,
} from '../../hooks';
import useStyles from './styles';
import { searchSelectOption } from '@app/pages/GetirFood/FilterOrders/utils';
import useTrackableDeliveryTypes from '../../hooks/useTrackableDeliveryTypes';

const { Panel } = Collapse;
const { Text } = Typography;
const { RangePicker } = DatePicker;

const Filter = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['foodOrderFilterPage', 'global']);
  const classes = useStyles();

  const { startDate, endDate, handleDateChange } = useRangePicker();
  const { foodRestaurantsPending, restaurants, restaurantsSearch, restaurantsSelect } = useRestaurants();
  const { orderStatusesList, orderStatusSelect } = useOrderStatuses();
  const { deliveryTypesList, deliveryTypeSelect } = useDeliveryTypes();
  const { courierIsRDUList, courierTrackabilityTypeSelect } = useTrackableDeliveryTypes();
  const { timeTypesList, timeTypesSelect } = useTimeTypes();
  const { paymentMethodsList, paymentMethodSelect } = usePaymentMethods();
  const { cityList, citySelect } = useCities();
  const { platformTypesList, platformTypesSelect } = usePlatformTypes();
  const { confirmationCode, setConfirmationCode } = useConfirmationCode();

  const applyFilters = () => {
    dispatch(Creators.getResultsRequest());
  };

  return (
    <Row>
      <Col span={24}>
        <Collapse defaultActiveKey={['PAGE_GETIR_FOOD_ACTIVE_ORDERS_FILTER_DEFAULT_TAB']}>
          <Panel header={t('global:FILTER')} key="PAGE_GETIR_FOOD_ACTIVE_ORDERS_FILTER_DEFAULT_TAB">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row>
                <Col span={24}>
                  <Text>{t('DATE')}</Text>
                  <div className={classes.filterSelect}>
                    <RangePicker
                      name="startDate"
                      value={[startDate, endDate]}
                      onCalendarChange={handleDateChange()}
                    />
                  </div>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={8}>
                  <Text>{t('FILTER.RESTAURANTS.TITLE')}</Text>
                  <Select
                    placeholder={t('FILTER.RESTAURANTS.DESC')}
                    className={classes.filterSelect}
                    onSearch={restaurantsSearch}
                    onChange={restaurantsSelect}
                    notFoundContent={foodRestaurantsPending ? <Spin size="small" /> : null}
                    filterOption={false}
                    showArrow
                    allowClear
                    showSearch
                  >
                    {restaurants}
                  </Select>
                </Col>
                <Col span={8}>
                  <Text>{t('FILTER.STATUS.TITLE')}</Text>
                  <Select
                    placeholder={t('FILTER.STATUS.DESC')}
                    className={classes.filterSelect}
                    onChange={orderStatusSelect}
                    filterOption={(inputValue, option) => searchSelectOption({ inputValue, option })}
                    showSearch
                    showArrow
                    allowClear
                  >
                    {orderStatusesList}
                  </Select>
                </Col>
                <Col span={8}>
                  <Text>{t('FILTER.DELIVERY_TYPE.TITLE')}</Text>
                  <Select
                    mode="multiple"
                    placeholder={t('FILTER.DELIVERY_TYPE.DESC')}
                    className={classes.filterSelect}
                    onChange={deliveryTypeSelect}
                    filterOption={(inputValue, option) => searchSelectOption({ inputValue, option })}
                    showArrow
                    allowClear
                  >
                    {deliveryTypesList}
                  </Select>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={8}>
                  <Text>{t('FILTER.COURIER_TRACKABILITY.TITLE')}</Text>
                  <Select
                    placeholder={t('FILTER.COURIER_TRACKABILITY.DESC')}
                    className={classes.filterSelect}
                    onChange={courierTrackabilityTypeSelect}
                    showArrow
                    allowClear
                  >
                    {courierIsRDUList}
                  </Select>
                </Col>
                <Col span={8}>
                  <Text>{t('FILTER.TIME_TYPE.TITLE')}</Text>
                  <Select
                    mode="multiple"
                    placeholder={t('FILTER.TIME_TYPE.DESC')}
                    className={classes.filterSelect}
                    onChange={timeTypesSelect}
                    filterOption={(inputValue, option) => searchSelectOption({ inputValue, option })}
                    showArrow
                    allowClear
                  >
                    {timeTypesList}
                  </Select>
                </Col>
                <Col span={8}>
                  <Text>{t('FILTER.PAYMENT_METHOD.TITLE')}</Text>
                  <Select
                    mode="multiple"
                    placeholder={t('FILTER.PAYMENT_METHOD.DESC')}
                    className={classes.filterSelect}
                    onChange={paymentMethodSelect}
                    filterOption={(inputValue, option) => searchSelectOption({ inputValue, option })}
                    showArrow
                    allowClear
                  >
                    {paymentMethodsList}
                  </Select>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={8}>
                  <Text>{t('global:CITY')}</Text>
                  <Select
                    placeholder={t('FILTER.CITY_DESC')}
                    className={classes.filterSelect}
                    onChange={citySelect}
                    filterOption={(inputValue, option) => searchSelectOption({ inputValue, option })}
                    showSearch
                    showArrow
                    allowClear
                  >
                    {cityList}
                  </Select>
                </Col>
                <Col span={8}>
                  <Text>{t('FILTER.PLATFORM.TITLE')}</Text>
                  <Select
                    mode="multiple"
                    placeholder={t('FILTER.PLATFORM.DESC')}
                    className={classes.filterSelect}
                    onChange={platformTypesSelect}
                    filterOption={(inputValue, option) => searchSelectOption({ inputValue, option })}
                    showArrow
                    allowClear
                  >
                    {platformTypesList}
                  </Select>
                </Col>
                <Col span={8}>
                  <Text>{t('CONFIRMATION_CODE')}</Text>
                  <Input
                    placeholder={`${t('CONFIRMATION_CODE')}`}
                    onChange={event => setConfirmationCode(event.target.value)}
                    maxLength={4}
                    allowClear
                  />
                  {
                    confirmationCode.length !== 0 && (
                      <small className={confirmationCode.length === 4 ? classes.success : classes.danger}>
                        <WarningOutlined /> {t('FILTER.CONFIRMATION_CODE.WARNING')}
                      </small>
                    )
                  }
                </Col>
              </Row>
              <Row justify="end">
                <Row gutter={[8, 8]} justify="end">
                  <Col span={24} className={classes.actionButtonsWrapper}>
                    <Space size="small">
                      <Button type="primary" onClick={applyFilters}>
                        {t('global:FILTER')}
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </Row>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
