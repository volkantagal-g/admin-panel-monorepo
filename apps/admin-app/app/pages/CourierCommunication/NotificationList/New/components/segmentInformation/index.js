import { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Col, Row,
  Radio, Input,
  Typography,
  Divider,
} from 'antd';

import {
  useSelector,
  useDispatch,
} from 'react-redux';

import { createNotificationSelector } from '@app/pages/CourierCommunication/NotificationList/New/redux/selector';

import useStyles from './style';
import AntCard from '@shared/components/UI/AntCard';
import CsvImporter from '@shared/components/UI/CsvImporter';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { SelectCities, SelectWarehouses } from '../../../components';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { WAREHOUSE_REQUEST_FIELDS, NOTIFICATION_COURIER_CHOOSE_TYPES } from '../../constants';
import { Creators } from '@app/pages/CourierCommunication/NotificationList/New/redux/action';

const { Text } = Typography;

const SegmentInformation = ({ handleData }) => {
  const { t } = useTranslation('courierCommunication');
  const classes = useStyles();
  const [courierIds, setCourierIds] = useState(null);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedWarehouses, setSelectedWarehouses] = useState([]);
  const [radioGroupVal, setRadioGroupVal] = useState(NOTIFICATION_COURIER_CHOOSE_TYPES.WAREHOUSE_CHOOSE);
  const dispatch = useDispatch();
  const selectedCountry = useSelector(getSelectedCountryV2);
  const courierList = useSelector(createNotificationSelector.getCourierIdsList);
  const handleImport = csvData => {
    setCourierIds(Object.values(csvData?.data[0]));
    handleData(Object.values(csvData?.data[0]));
  };
  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest({ countryId: selectedCountry._id }));
  }, [dispatch, selectedCountry._id]);

  useEffect(() => {
    const getFilteredWarehouses = ({ citiesForWarehouse }) => {
      dispatch(
        CommonCreators.getFilteredWarehousesRequest({
          cities: citiesForWarehouse?.length ? citiesForWarehouse : undefined,
          fields: WAREHOUSE_REQUEST_FIELDS,
        }),
      );
    };

    if (selectedCities?.length > 0) {
      getFilteredWarehouses({ citiesForWarehouse: selectedCities });
    }
  }, [dispatch, selectedCities]);

  useEffect(() => {
    if (selectedWarehouses?.length > 0) {
      dispatch(Creators.getCourierIdsListRequest({ warehouseIds: selectedWarehouses }));
    }
  }, [dispatch, selectedWarehouses]);

  useEffect(() => {
    if (courierList.length > 0) {
      handleData(courierList);
    }
  }, [courierList, handleData]);

  const handleSegmentChooseChange = val => {
    setRadioGroupVal(val.target.value);
    if (val.target.value === NOTIFICATION_COURIER_CHOOSE_TYPES.CSV_UPLOAD) {
      dispatch(Creators.cleanCourierIds());
      setSelectedCities([]);
      setSelectedWarehouses([]);
    }
  };

  return (
    <AntCard
      bordered={false}
      title={t('SEGMENT_INFORMATION')}
    >
      <Radio.Group
        onChange={handleSegmentChooseChange}
        value={radioGroupVal}
        className={classes.radioGroup}
        onClick={e => e.stopPropagation()}
      >
        <AntCard
          bordered={false}
          title={(
            <Row>
              <Radio value={NOTIFICATION_COURIER_CHOOSE_TYPES.WAREHOUSE_CHOOSE} className={classes.radioWrap}>
                {t('BY_SELECTING_BASED_WAREHOUSE')}
              </Radio>
            </Row>
          )}
        >
          <Row gutter={24}>
            <Col span={12}>
              <SelectCities
                onChangeCallback={val => setSelectedCities(val)}
                disabled={radioGroupVal !== NOTIFICATION_COURIER_CHOOSE_TYPES.WAREHOUSE_CHOOSE}
                value={selectedCities}
              />
            </Col>
            <Col span={12}>
              <SelectWarehouses
                onChangeCallback={val => setSelectedWarehouses(val)}
                disabled={radioGroupVal !== NOTIFICATION_COURIER_CHOOSE_TYPES.WAREHOUSE_CHOOSE}
                value={selectedWarehouses}
              />
            </Col>
          </Row>
          <Row justify="space-between" align="middle">
            <Text>
              {t('COURIER_COUNTER_TEXT', { count: courierList.length })}
            </Text>
          </Row>
        </AntCard>
        <Divider />
        <AntCard
          bordered={false}
          title={(
            <Row>
              <Radio value={NOTIFICATION_COURIER_CHOOSE_TYPES.CSV_UPLOAD} className={classes.radioWrap}>
                {t('BY_UPLOADING_CSV')}
              </Radio>
            </Row>
          )}
        >
          <Row align="middle" gutter={24}>
            <Col flex="auto">
              <Input
                value={courierIds ? `${courierIds?.length} CourierIds are Selected` : null}
                placeholder="Please Upload a Csv File with Comma Separated CourierIds Only"
                disabled={radioGroupVal !== NOTIFICATION_COURIER_CHOOSE_TYPES.CSV_UPLOAD}
              />
            </Col>
            <Col>
              <CsvImporter
                disabled={radioGroupVal !== NOTIFICATION_COURIER_CHOOSE_TYPES.CSV_UPLOAD}
                withoutHeader
                hasNestedHeaderKeys
                onOkayClick={handleImport}
                modalProps={{ width: 1000 }}
                exampleCsv={{ Ids: '602bbf7f64d8a2e29f4542c8,702bbf7f64d8a2e29f4542c8,802bbf7f64d8a2e29f4542c8' }}
              />
            </Col>
          </Row>
        </AntCard>
      </Radio.Group>
    </AntCard>
  );
};

export default memo(SegmentInformation);
