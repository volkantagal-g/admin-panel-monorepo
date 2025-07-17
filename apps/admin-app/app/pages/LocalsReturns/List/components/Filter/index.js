import {
  Row,
  Col,
  Collapse,
  Space,
  Select,
  Input,
  Button,
  DatePicker,
  Spin,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';

import { useEffect, useState } from 'react';

import TagOption from '../TagOption';
import { filtersSelector, returnsSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import useStyles from './styles';
import {
  GROUP_STATUS_LIST,
  LOCALS_RETURN_DELIVERY_TYPES,
  LOCALS_RETURN_USER_TYPES,
} from '../../constants';
import { getLangKey } from '@shared/i18n';

const { RangePicker } = DatePicker;

const { Panel } = Collapse;

const Filter = () => {
  const { t } = useTranslation(['localsReturnsPage', 'global']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [returnStatuses, setReturnStatuses] = useState([]);
  const [shops, setShops] = useState([]);
  const [isShopsBusy, setIsShopsBusy] = useState(false);
  const getReturnsPending = useSelector(returnsSelector.getReturnsPending);

  const returnStatusList = GROUP_STATUS_LIST.map(status => {
    const tagText = status[getLangKey()];
    const customValue = status.value;
    return TagOption(customValue, tagText);
  });

  const returnDeliveryTypeList = LOCALS_RETURN_DELIVERY_TYPES.map(
    deliveryType => {
      const tagText = deliveryType[getLangKey()];
      const customValue = deliveryType.value;
      return TagOption(customValue, tagText);
    },
  );

  const returnUserTypeList = LOCALS_RETURN_USER_TYPES.map(
    userType => {
      const tagText = userType[getLangKey()];
      const customValue = userType.value;
      return TagOption(customValue, tagText);
    },
  );

  const updateFilter = (key, value) => {
    dispatch(Creators.setFilter({ key, value }));
    dispatch(Creators.setFilter({ key: 'page', value: 1 }));
  };

  const onSearchShops = keyword => {
    if (!keyword) {
      setShops([]);
      return;
    }

    setIsShopsBusy(true);

    dispatch(Creators.searchShops({
      keyword,
      onSuccess: setShops,
      onFinished: () => setIsShopsBusy(false),
    }));
  };

  const {
    startDate,
    endDate,
    confirmationId,
    returnCode,
    groupStatus,
    statuses,
    deliveryType,
    userType,
  } = useSelector(filtersSelector.getFilters);

  useEffect(() => {
    dispatch(Creators.getReturnStatusesRequest({
      onSuccess: data => setReturnStatuses(data?.map(status => ({
        label: status.text,
        value: status.id,
      }))),
    }));
  }, [dispatch]);

  return (
    <Row gutter={[8, 8]} data-testid="returns-list-filter">
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[6, 6]}>
                <Col span={12}>
                  <RangePicker
                    onChange={dates => {
                      const startTime = moment(dates[0]).utcOffset(0);
                      startTime.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
                      startTime.toISOString();
                      startTime.format();
                      const endTime = moment(dates[1]).utcOffset(0);
                      endTime.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
                      endTime.toISOString();
                      endTime.format();
                      dispatch(
                        Creators.setDates({ dates: [startTime, endTime] }),
                      );
                      dispatch(Creators.setFilter({ key: 'page', value: 1 }));
                    }}
                    value={
                      startDate || endDate
                        ? [moment(startDate), moment(endDate)]
                        : []
                    }
                    allowClear={false}
                    style={{ width: '100%' }}
                  />
                </Col>
                <Col span={6}>
                  <Input
                    placeholder={t('FILTER.ORDER_APPROVE_CODE')}
                    onChange={event => updateFilter('confirmationId', event?.target?.value)}
                    value={confirmationId}
                  />
                </Col>
                <Col span={6}>
                  <Input
                    placeholder={t('FILTER.RETURN_CODE')}
                    onChange={event => updateFilter('returnCode', event?.target?.value)}
                    value={returnCode}
                  />
                </Col>
              </Row>
              <Row gutter={[6, 6, 12]}>
                <Col span={6}>
                  <Select
                    placeholder={t('FILTER.STATUS')}
                    className={classes.filterSelect}
                    defaultValue={GROUP_STATUS_LIST[0].value}
                    onChange={newStatus => updateFilter('groupStatus', newStatus)}
                    onClear={() => updateFilter('groupStatus', null)}
                    value={groupStatus}
                    showArrow
                    allowClear
                  >
                    {returnStatusList}
                  </Select>
                </Col>
                <Col span={6}>
                  <Select
                    placeholder={t('FILTER.RETURN_TYPE')}
                    className={classes.filterSelect}
                    onChange={newDeliveryType => updateFilter('deliveryType', newDeliveryType)}
                    onClear={() => updateFilter('deliveryType', null)}
                    {...(deliveryType && { value: deliveryType })}
                    showArrow
                    allowClear
                  >
                    {returnDeliveryTypeList}
                  </Select>
                </Col>
                <Col span={6}>
                  <Select
                    placeholder={t('FILTER.USER_TYPE')}
                    className={classes.filterSelect}
                    onChange={newUserType => updateFilter('userType', newUserType)}
                    onClear={() => updateFilter('userType', null)}
                    {...(userType && { value: userType })}
                    showArrow
                    allowClear
                  >
                    {returnUserTypeList}
                  </Select>
                </Col>
                <Col span={6}>
                  <Select
                    placeholder={t('FILTER.RETURN_STATUS')}
                    className={classes.filterSelect}
                    onChange={newDeliveryType => updateFilter('statuses', newDeliveryType)}
                    onClear={() => updateFilter('statuses', null)}
                    options={returnStatuses}
                    value={statuses}
                    mode="multiple"
                    showArrow
                    allowClear
                  />
                </Col>
                <Col span={6}>
                  <Select
                    placeholder={t('FILTER.SHOP_NAME')}
                    className={classes.filterSelect}
                    onSearch={onSearchShops}
                    onChange={shopId => updateFilter('shopId', shopId)}
                    notFoundContent={isShopsBusy ? <Spin size="small" /> : null}
                    options={shops?.map(x => ({ label: x.name, value: x.id }))}
                    showArrow
                    allowClear
                    filterOption={false}
                    showSearch
                  />
                </Col>
                <Col span={6}>
                  <Button
                    className="w-100"
                    disabled={getReturnsPending}
                    onClick={() => dispatch(Creators.getReturnRequest())}
                    style={{ backgroundColor: '#5D3EBC', color: '#fff' }}
                  >
                    {t('FILTER.APPLY')}
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
