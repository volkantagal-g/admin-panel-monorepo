import { useEffect, useState } from 'react';
import {
  Select,
  Form,
  Row,
  Col,
  DatePicker,
  Checkbox,
  Space,
  Button,
  Radio,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  get,
  filter,
  toString,
  map,
  difference,
  isEmpty,
  includes,
  forEach,
  union,
} from 'lodash';
import { toast } from 'react-toastify';

import {
  getWarehousesSelector,
  getSuppliersSelector,
} from '@shared/redux/selectors/common';
import { getLangKey } from '@shared/i18n';
import {
  WAREHOUSE_TYPES,
  AutoTransferServiceTypes,
  warehouseTypes,
  AUTO_TRANSFER_SERVICE_TYPE,
  MATCH_TYPES,
  GETIR_MARKET_DOMAIN_TYPES,
  GETIR_MARKET_STATE,
  domainTypes,
} from '@app/pages/Stock/Transfer/constants';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import AntCard from '@shared/components/UI/AntCard';
import AntInputNumber from '@shared/components/UI/AntInputNumber';
import { arraysAreEqualSets, getSelectFilterOption } from '@shared/utils/common';
import { getUser } from '@shared/redux/selectors/auth';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import CsvImporter from '@shared/components/UI/CsvImporter';
import {
  categoryParamsSelector,
  regularWarehousesSelector,
  productParamsSelector,
} from '@app/pages/Stock/Transfer/Auto/redux/selectors';
import { Creators } from '@app/pages/Stock/Transfer/Auto/redux/actions';
import { toFakeLocalDate } from '@shared/utils/dateHelper';
import { disableDateBiggerThanToday } from '@app/pages/Stock/utils/disabledDates';
import useStyles from './styles';
import { initialValues } from './config';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';
const exampleCsv = { ID: 'id', WarehouseName: 'string' };
const exampleCsvVolume = { ID: 'id', LitreHacim: 'number', Oran: 'number' };

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    md: { span: 6 },
    lg: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 12 },
    lg: { span: 12 },
  },
};

const STOCK_ORDER_DAY = 7;
const STORE_STOCK_DAY = 7;
const STORE_LEAD_DAY = 5;

const convertStringItemToNumber = stringItems => {
  return stringItems && stringItems.map(item => Number(item));
};

const getirMarketDomainTypesCodes = new Set(
  Object.values(GETIR_MARKET_DOMAIN_TYPES),
);

const serviceTypesOptions = () => {
  return Object.entries(AutoTransferServiceTypes).map(([key, value]) => {
    return {
      value: toString(key),
      label: value[getLangKey()],
    };
  });
};

const domainTypesOptions = () => {
  return Object.entries(domainTypes).map(([key, value]) => {
    return {
      value: toString(key),
      label: value[getLangKey()],
    };
  });
};

const warehouseTypesOptions = () => {
  return Object.entries(warehouseTypes).map(([key, value]) => {
    return {
      value: toString(key),
      label: value[getLangKey()],
    };
  });
};

const getSupplierOptions = (suppliers = []) => {
  return suppliers.map(supplier => {
    return {
      value: get(supplier, '_id', ''),
      label: get(supplier, ['name'], ''),
    };
  });
};

const StockTransferAutoForm = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation('stockTransferAuto');
  const dispatch = useDispatch();
  const classes = useStyles();
  const selectedCountry = getSelectedCountry();
  const user = getUser();
  const suppliers = useSelector(getSuppliersSelector.getData);
  const suppliersPending = useSelector(
    getSuppliersSelector.getIsPending,
  );
  const categoryParams = useSelector(categoryParamsSelector.getCategoryParams);
  const regularWarehousesParams = useSelector(regularWarehousesSelector.getRegularWarehouses);
  const productParams = useSelector(productParamsSelector.getProductParams);
  const warehouses = useSelector(getWarehousesSelector.getData);
  const warehousesPending = useSelector(getWarehousesSelector.getIsPending);
  const [mainStores, setMainStores] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState(initialValues.serviceType);
  const [selectedMatchType, setSelectedMatchType] = useState(MATCH_TYPES.INCLUDES);
  const [updatedWarehouses, setUpdatedWarehouses] = useState([]);
  const [warehouseParamsMap, setWarehouseParamsMap] = useState({});
  const [storeVolumes, setStoreVolumes] = useState(null);

  const userEmail = get(user, 'email', '');
  const formValues = form.getFieldsValue();

  useEffect(() => {
    dispatch(CommonCreators.getWarehousesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (warehouses) {
      setUpdatedWarehouses(warehouses);
    }
  }, [warehouses]);

  useEffect(() => {
    if (warehouses) {
      const filteredMainStores = filter(warehouses, {
        warehouseType: WAREHOUSE_TYPES.MAIN,
        country: { code: { alpha2: get(selectedCountry, 'code.alpha2', '') } },
      });
      setMainStores(filteredMainStores);
    }
  }, [warehouses, selectedCountry]);

  useEffect(() => {
    if (formValues.warehouses) {
      dispatch(Creators.setFormWarehouses({ data: formValues.warehouses }));
    }
  }, [dispatch, warehouses, formValues]);

  const onWarehouseSelect = () => {
    const values = form.getFieldsValue();
    if (
      !values.warehouses ||
      !values.warehouses.length
    ) {
      setWarehouseParamsMap({});
      return;
    }
    setWarehouseParamsMap({});
    forEach(
      filter(updatedWarehouses, warehouse => values.warehouses.includes(warehouse._id)),
      warehouse => {
        warehouseParamsMap[warehouse._id] = {
          name: warehouse.name,
          isSelected: false,
          stockDay: 21,
          ignoreStock: false,
          growRate: 7,
        };

        setWarehouseParamsMap(warehouseParamsMap);
      },
    );
  };

  const handleCsvImportWarehouses = ({ data }) => {
    const values = form.getFieldsValue();

    const warehouseIds = updatedWarehouses.map(warehouse => warehouse._id);
    if (!data) {
      toast.error(t('CHECK_CSV_FILE'));
      return;
    }

    const importData = filter(data, warehouse => {
      return warehouseIds.includes(warehouse.id);
    }).map(warehouse => warehouse.id);

    if (importData.length === 0) {
      toast.error(t('CHECK_SELECTED_COUNTRY'));
      return;
    }

    const mergedWarehouses = union(
      values.warehouses,
      importData,
    );

    form.setFieldsValue({ warehouses: mergedWarehouses });

    onWarehouseSelect();
    toast.success(t('WAREHOUSE_IMPORT_SUCCESS'));
  };

  const handleCsvImportVolumes = result => {
    const { data } = result;
    const tempStoreValues = {};
    const wrongRows = [];
    data.forEach((obj, index) => {
      if (obj.ID && obj.LitreHacim && obj.Oran) {
        tempStoreValues[obj.ID] = {
          fridgeVolume: obj.LitreHacim,
          maxVolumeRatio: obj.Oran,
        };
      }
      else {
        wrongRows.push(index + 1);
      }
    });
    if (wrongRows.length > 0) {
      toast.error(`${t('ERR_CSV_ROW_ERROR_MESSAGE')} - ${wrongRows.join(', ')}`);
      return;
    }
    setStoreVolumes(tempStoreValues);
    toast.success(`${t('STORE_VOLUMES_EXCEL_UPLOADED')} - ${wrongRows.join(', ')}`);
  };

  const onWarehouseTypeSelect = ({ matchedWarehouses }) => {
    const values = form.getFieldValue();
    const filteredWarehouses = filter(
      matchedWarehouses,
      warehouse => !isEmpty(convertStringItemToNumber(values.warehouseTypes)) &&
        includes(
          convertStringItemToNumber(values.warehouseTypes),
          warehouse.warehouseType,
        ),
    );

    const mainStoreMatchedWarehouses = filteredWarehouses.filter(
      warehouse => warehouse.mainStore === values.mainStore,
    );

    const mainStoreMatchedWarehousesIds = map(
      mainStoreMatchedWarehouses,
      warehouse => warehouse._id,
    );

    form.setFieldsValue({ warehouses: mainStoreMatchedWarehousesIds });
    onWarehouseSelect();
  };

  const onDomainTypeSelect = ({ includedDomainTypes, matchType }) => {
    const values = form.getFieldsValue();

    const filteredWarehouses = filter(
      warehouses,
      warehouse => warehouse.country &&
        warehouse.country.code &&
        warehouse.country.code.alpha2 === get(selectedCountry, 'code.alpha2', '') &&
        warehouse.state === GETIR_MARKET_STATE.ACTIVE,
    );

    // remove domain types that are not in GETIR_MARKET_DOMAIN_TYPES
    const mappedWarehouses = map(filteredWarehouses, warehouse => {
      const warehouseCopy = { ...warehouse };
      const filteredDomainTypes = warehouse.domainTypes.filter(
        domainType => getirMarketDomainTypesCodes.has(domainType),
      );
      warehouseCopy.domainTypes = filteredDomainTypes;
      return warehouseCopy;
    });

    let matchedWarehouses = {};

    if (matchType === MATCH_TYPES.EXACT) {
      matchedWarehouses = filter(
        mappedWarehouses,
        warehouse => arraysAreEqualSets(warehouse.domainTypes, convertStringItemToNumber(values.domainTypes)),
      );
      setUpdatedWarehouses(matchedWarehouses);
    }
    else {
      matchedWarehouses = filter(
        mappedWarehouses,
        warehouse => difference(
          convertStringItemToNumber(includedDomainTypes || values.domainTypes),
          warehouse.domainTypes,
        ).length < (includedDomainTypes?.length || values.domainTypes.length),
      );
      setUpdatedWarehouses(matchedWarehouses);
    }

    onWarehouseTypeSelect({ matchedWarehouses });
  };

  const initWarehouses = () => {
    const includedDomainTypes = map(
      domainTypesOptions(),
      domainType => domainType.value,
    );
    const includedWarehouseTypes = filter(
      warehouseTypesOptions(),
      warehouseType => warehouseType && Number(warehouseType.value) !== WAREHOUSE_TYPES.VIRTUAL,
    ).map(warehouse => warehouse.value);

    form.setFieldsValue({
      domainTypes: includedDomainTypes,
      warehouseTypes: includedWarehouseTypes,
    });
    onDomainTypeSelect({ includedDomainTypes, matchType: selectedMatchType });
  };

  const handleSelectedMatchTypeChange = e => {
    setSelectedMatchType(e.target.value);
    const values = form.getFieldValue();
    onDomainTypeSelect({ includedDomainTypes: values.domainTypes, matchType: e.target.value });
  };

  const handleOnValuesChange = values => {
    if (values.serviceType) {
      setSelectedServiceType(values.serviceType);
      form.resetFields(['mainStore', 'domainTypes', 'warehouseTypes', 'warehouses', 'supplier']);
      dispatch(Creators.setServiceType({ data: values.serviceType }));
      dispatch(Creators.setFormWarehouses({ data: [] }));
    }
    if (values.mainStore) {
      initWarehouses();
    }
    if (values.warehouses) {
      dispatch(Creators.setFormWarehouses({ data: values.warehouses }));
    }
    if (values.supplier) {
      dispatch(Creators.setSupplierId({ data: values.supplier }));
    }
  };

  const handleSubmit = values => {
    const {
      serviceType,
      mainStore,
      supplier,
      ignoreCurrentStock,
      pastStockOrderDay,
      pastStockTransferDay,
      demandMultiplier,
      maximumStockDay,
      storeLeadDay,
      stockDay,
    } = values;

    let params = null;

    if (
      serviceType === AUTO_TRANSFER_SERVICE_TYPE.DEFAULT ||
      serviceType === AUTO_TRANSFER_SERVICE_TYPE.VOLUME_TRANSFER
    ) {
      if (!mainStore) {
        toast.error(t('SELECT_MAIN_STORE'));
        return;
      }
      if (isEmpty(values.warehouses)) {
        toast.error(t('SELECT_STORE'));
        return;
      }
    }
    if (serviceType === AUTO_TRANSFER_SERVICE_TYPE.DIRECT_DISPATCH) {
      if (!supplier) {
        toast.error(t('SELECT_SUPPLIER'));
        return;
      }
    }

    if (serviceType === AUTO_TRANSFER_SERVICE_TYPE.DEFAULT) {
      params = {
        email: userEmail,
        serviceType:
          parseInt(serviceType, 10) ||
          parseInt(AUTO_TRANSFER_SERVICE_TYPE.DEFAULT, 10),
        mainStore,
        stockDay,
        startDate: toFakeLocalDate(values.demandRange[0].valueOf()),
        endDate: toFakeLocalDate(values.demandRange[1].endOf('day').valueOf()),
        ignoreStock: ignoreCurrentStock,
        activeStockOrderDate: toFakeLocalDate(pastStockOrderDay.valueOf()),
        activeStockTransferDate: toFakeLocalDate(pastStockTransferDay.valueOf()),
        growRate: demandMultiplier,
        includedWarehouses: values.warehouses,
        timestamp: Date.now(),
      };

      const categoryParamsMap = {};
      Object.entries(categoryParams).forEach(([key, value]) => {
        const { ignoreStock, growRate } = value;
        categoryParamsMap[key] = { stockDay: value.stockDay, ignoreStock, growRate };
      });
      params.categoryParams = categoryParamsMap;

      const warehouseParams = {};
      Object.entries(regularWarehousesParams).forEach(([key, value]) => {
        const { ignoreStock, growRate } = value;
        warehouseParams[key] = { stockDay: value.stockDay, ignoreStock, growRate };
      });
      params.warehouseParams = warehouseParams;
    }

    if (serviceType === AUTO_TRANSFER_SERVICE_TYPE.DIRECT_DISPATCH) {
      params = {
        email: userEmail,
        serviceType:
          parseInt(serviceType, 10) ||
          parseInt(AUTO_TRANSFER_SERVICE_TYPE.DEFAULT, 10),
        supplier,
        maxStockDay: maximumStockDay,
        storeLeadDay,
        ignoreStock: ignoreCurrentStock,
        startDate: toFakeLocalDate(values.demandRange[0].valueOf()),
        endDate: toFakeLocalDate(values.demandRange[1].endOf('day').valueOf()),
        activeStockOrderDate: toFakeLocalDate(pastStockOrderDay.valueOf()),
        activeStockTransferDate: toFakeLocalDate(pastStockTransferDay.valueOf()),
        growRate: demandMultiplier,
        timestamp: Date.now(),
      };
      const itemParams = {};
      productParams.forEach(item => {
        itemParams[item._id] = {
          demandDates: {
            startDate: toFakeLocalDate(item.demandDates.startDate.valueOf()),
            endDate: toFakeLocalDate(item.demandDates.endDate.endOf('day').valueOf()),
          },
          maxColiBool: item.maxColiBool,
          maxColiCount: item.maxColiCount,
          mainStockDay: item.mainStockDay,
          mainLeadDay: item.mainLeadDay,
          storeStockDay: STORE_STOCK_DAY,
          ignoreStock: item.ignoreStock,
          activeStockOrderDate: toFakeLocalDate(item.activeStockOrderDate.valueOf()),
          activeStockTransferDate: toFakeLocalDate(item.activeStockTransferDate.valueOf()),
          growRate: item.growRate,
          pastStockOrderDay: STOCK_ORDER_DAY,
        };
      });
      params.itemParams = itemParams;
      params.storeVolumes = storeVolumes;
    }

    if (serviceType === AUTO_TRANSFER_SERVICE_TYPE.VOLUME_TRANSFER) {
      params = {
        email: userEmail,
        serviceType:
          parseInt(serviceType, 10) ||
          parseInt(AUTO_TRANSFER_SERVICE_TYPE.DEFAULT, 10),
        mainStore,
        maxStockDay: maximumStockDay,
        storeLeadDay: STORE_LEAD_DAY,
        startDate: toFakeLocalDate(values.demandRange[0].valueOf()),
        endDate: toFakeLocalDate(values.demandRange[1].endOf('day').valueOf()),
        ignoreStock: ignoreCurrentStock,
        activeStockOrderDate: toFakeLocalDate(pastStockOrderDay.valueOf()),
        activeStockTransferDate: toFakeLocalDate(pastStockTransferDay.valueOf()),
        growRate: demandMultiplier,
        includedWarehouses: values.warehouses,
        timestamp: Date.now(),
      };

      const categoryParamsMap = {};
      Object.entries(categoryParams).forEach(([key, value]) => {
        const { ignoreStock, growRate } = value;
        categoryParamsMap[key] = { stockDay: value.stockDay, ignoreStock, growRate };
      });
      params.categoryParams = categoryParamsMap;
      params.storeVolumes = storeVolumes;
    }

    dispatch(Creators.getStockTransferAutoRequest({ data: params }));
  };

  return (
    <AntCard bordered={false}>
      <Form
        form={form}
        {...formItemLayout}
        layout="horizontal"
        initialValues={initialValues}
        onFinish={handleSubmit}
        onValuesChange={handleOnValuesChange}
        data-testid="stock-transfer-auto-form"
      >
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item name="serviceType" label={t('SERVICE_TYPE')} className={classes.formItemWrapper}>
              <Select
                placeholder={t('SERVICE_TYPE')}
                options={serviceTypesOptions()}
                data-testid="service-type"
              />
            </Form.Item>
          </Col>
          {selectedServiceType === AUTO_TRANSFER_SERVICE_TYPE.DIRECT_DISPATCH && (
            <Col span={24}>
              <Form.Item name="supplier" label={t('SUPPLIER')} className={classes.formItemWrapper}>
                <Select
                  showSearch
                  filterOption={getSelectFilterOption}
                  placeholder={t('SUPPLIER')}
                  options={getSupplierOptions(suppliers)}
                  loading={suppliersPending}
                  data-testid="supplier"
                />
              </Form.Item>
            </Col>
          )}
          {(selectedServiceType === AUTO_TRANSFER_SERVICE_TYPE.DEFAULT ||
            selectedServiceType === AUTO_TRANSFER_SERVICE_TYPE.VOLUME_TRANSFER) &&
            (
              <Col span={24}>
                <Form.Item name="mainStore" label={t('MAIN_STORE')} className={classes.formItemWrapper}>
                  <Select
                    showSearch
                    filterOption={getSelectFilterOption}
                    placeholder={t('MAIN_STORE')}
                    options={mainStores.map(mainStore => ({
                      value: mainStore._id,
                      label: mainStore.name,
                    }))}
                    loading={warehousesPending}
                  />
                </Form.Item>
              </Col>
            )}
          {(selectedServiceType === AUTO_TRANSFER_SERVICE_TYPE.DEFAULT ||
            selectedServiceType === AUTO_TRANSFER_SERVICE_TYPE.VOLUME_TRANSFER) &&
            (
              <Col span={24}>
                <Form.Item label={t('DOMAIN_TYPE')} className={classes.formItemWrapper}>
                  <Space className={classes.csvImportWrapper}>
                    <Form.Item name="domainTypes" className={classes.formItemWrapper}>
                      <Select
                        placeholder={t('DOMAIN_TYPE')}
                        options={domainTypesOptions()}
                        mode="multiple"
                        onSelect={onDomainTypeSelect}
                        onDeselect={onDomainTypeSelect}
                        filterOption={getSelectFilterOption}
                      />
                    </Form.Item>
                    <Radio.Group value={selectedMatchType} onChange={handleSelectedMatchTypeChange}>
                      <Radio value={MATCH_TYPES.EXACT}>{t('EXACT_MATCH')}</Radio>
                      <Radio value={MATCH_TYPES.INCLUDES}>{t('INCLUDING_MATCH')}</Radio>
                    </Radio.Group>
                  </Space>
                </Form.Item>
              </Col>
            )}
          {(selectedServiceType === AUTO_TRANSFER_SERVICE_TYPE.DEFAULT ||
            selectedServiceType === AUTO_TRANSFER_SERVICE_TYPE.VOLUME_TRANSFER) &&
            (
              <Col span={24}>
                <Form.Item name="warehouseTypes" label={t('WAREHOUSE_TYPES')} className={classes.formItemWrapper}>
                  <Select
                    placeholder={t('WAREHOUSE_TYPES')}
                    options={warehouseTypesOptions()}
                    mode="multiple"
                    onSelect={onDomainTypeSelect}
                    onDeselect={onDomainTypeSelect}
                    filterOption={getSelectFilterOption}
                  />
                </Form.Item>
              </Col>
            )}
          {(selectedServiceType === AUTO_TRANSFER_SERVICE_TYPE.DEFAULT ||
            selectedServiceType === AUTO_TRANSFER_SERVICE_TYPE.VOLUME_TRANSFER) &&
            (
              <Col span={24}>
                <Form.Item label={t('global:WAREHOUSES')} className={classes.formItemWrapper}>
                  <Space className={classes.csvImportWrapper} align="center" direction="vertical">
                    <Form.Item name="warehouses" className={classes.formItemWrapper}>
                      <Select
                        placeholder={t('global:WAREHOUSES')}
                        options={updatedWarehouses.map(warehouse => ({
                          value: warehouse._id,
                          label: warehouse.name,
                        }))}
                        mode="multiple"
                        onSelect={onWarehouseSelect}
                        onDeselect={onWarehouseSelect}
                        filterOption={getSelectFilterOption}
                      />
                    </Form.Item>
                    <Button disabled={!formValues.mainStore}>
                      <CsvImporter
                        importButtonText={t('IMPORT_CSV')}
                        onOkayClick={handleCsvImportWarehouses}
                        exampleCsv={exampleCsv}
                      />
                    </Button>

                  </Space>
                </Form.Item>
              </Col>
            )}
          <Col span={24}>
            <Form.Item name="demandRange" label={t('DEMAND_RANGE')} className={classes.formItemWrapper}>
              <RangePicker format={dateFormat} className="w-100" allowClear={false} disabledDate={disableDateBiggerThanToday} />
            </Form.Item>
          </Col>
          {(selectedServiceType === AUTO_TRANSFER_SERVICE_TYPE.VOLUME_TRANSFER ||
            selectedServiceType === AUTO_TRANSFER_SERVICE_TYPE.DIRECT_DISPATCH) &&
            (
              <Col span={24}>
                <Form.Item name="maximumStockDay" label={t('MAXIMUM_STOCK_DAY')} className={classes.formItemWrapper}>
                  <AntInputNumber className="w-100" />
                </Form.Item>
              </Col>
            )}
          {selectedServiceType === AUTO_TRANSFER_SERVICE_TYPE.DIRECT_DISPATCH && (
            <Col span={24}>
              <Form.Item name="storeLeadDay" label={t('STORE_LEAD_DAY')} className={classes.formItemWrapper}>
                <AntInputNumber className="w-100" />
              </Form.Item>
            </Col>
          )}
          {selectedServiceType === AUTO_TRANSFER_SERVICE_TYPE.DEFAULT && (
            <Col span={24}>
              <Form.Item name="stockDay" label={t('STOCK_DAY')} className={classes.formItemWrapper}>
                <AntInputNumber className="w-100" />
              </Form.Item>
            </Col>
          )}

          <Col span={24}>
            <Form.Item
              label={t('IGNORE_CURRENT_STOCK')}
              name="ignoreCurrentStock"
              valuePropName="checked"
              className={classes.formItemWrapper}
            >
              <Checkbox className={classes.ignoreCurrentStockField} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="pastStockOrderDay" label={t('PAST_PO_DAY')} className={classes.formItemWrapper}>
              <DatePicker format={dateFormat} className="w-100" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="pastStockTransferDay" label={t('PAST_ST_DAY')} className={classes.formItemWrapper}>
              <DatePicker format={dateFormat} className="w-100" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="demandMultiplier" label={t('GROWTH_RATE')} className={classes.formItemWrapper}>
              <AntInputNumber className="w-100" />
            </Form.Item>
          </Col>
          {(selectedServiceType === AUTO_TRANSFER_SERVICE_TYPE.VOLUME_TRANSFER ||
            selectedServiceType === AUTO_TRANSFER_SERVICE_TYPE.DIRECT_DISPATCH) &&
            (
              <Col span={24}>
                <Form.Item label={t('VOLUME')} className={classes.formItemWrapper}>
                  <Space className={classes.csvImportWrapper}>
                    <Button>
                      <CsvImporter
                        importButtonText={t('IMPORT_CSV')}
                        onOkayClick={handleCsvImportVolumes}
                        exampleCsv={exampleCsvVolume}
                      />
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            )}
        </Row>
        <Row gutter={[8, 8]} justify="end">
          <Col span={24} className={classes.actionButtonsWrapper}>
            <Space size="small">
              <Button type="primary" htmlType="submit">
                {t('EXPORT_EXCEL')}
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default StockTransferAutoForm;
