import {
  Select,
  Form,
  Row,
  Col,
  DatePicker,
  Checkbox,
  Space,
  Button,
} from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { toast } from 'react-toastify';
import moment from 'moment';

import { getSuppliersSelector } from '@shared/redux/selectors/common';
import { itemParamsSelector } from '@app/pages/Stock/Order/VolumeAuto/redux/selectors';
import { Creators } from '@app/pages/Stock/Order/VolumeAuto/redux/actions';
import { toFakeLocalDate } from '@shared/utils/dateHelper';
import { GETIR_AUTO_STOCK_ORDER_TYPES } from '@app/pages/Stock/Order/constants';
import AntCard from '@shared/components/UI/AntCard';
import AntInputNumber from '@shared/components/UI/AntInputNumber';
import { getSelectFilterOption } from '@shared/utils/common';
import CsvImporter from '@shared/components/UI/CsvImporter';
import { getUser } from '@shared/redux/selectors/auth';
import { disableDateBiggerThanToday } from '@app/pages/Stock/utils/disabledDates';
import useStyles from './styles';
import { initialValues } from './config';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';
const exampleCsv = { ID: 'id', LitreHacim: 'number', Oran: 'number' };
const STORE_STOCK_DAY = 7;
const PAST_STOCK_ORDER_DAY = 7;
const IGNORE_STOCK = false;
const MAX_COLI_COUNT = 5;

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

const getSupplierOptions = (suppliers = []) => {
  return suppliers.map(supplier => {
    return {
      value: _.get(supplier, '_id', ''),
      label: _.get(supplier, ['name'], ''),
    };
  });
};

const StockOrderVolumeAutoForm = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation('stockOrderVolumeAuto');
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isMaxColiCountExist, setIsMaxColiCountExist] = useState(initialValues.maxColiCountExist);
  const [csvData, setCsvData] = useState(undefined);
  const suppliers = useSelector(getSuppliersSelector.getData);
  const suppliersPending = useSelector(
    getSuppliersSelector.getIsPending,
  );
  const itemParams = useSelector(
    itemParamsSelector.getItemParams,
  );
  const user = getUser();
  const userEmail = _.get(user, 'email', '');

  const handleMaxColiCountChange = e => {
    setIsMaxColiCountExist(e.target.checked);
  };

  const handleValuesChage = values => {
    if (values.suppliers) {
      dispatch(Creators.setSupplierId({ data: values.suppliers }));
    }
  };

  const handleSubmit = values => {
    if (!csvData) {
      toast.error(t('ERR_EMPTY_STORE_VOLUMES'));
      return;
    }
    if (!values.suppliers) {
      toast.error(t('ERR_EMPTY_SUPPLIER'));
      return;
    }

    const params = {};
    itemParams.forEach(item => {
      params[item._id] = {
        maxColiBool: item.maxColiBool,
        maxColiCount: item.maxColiCount,
        demandDates: {
          startDate: toFakeLocalDate(item.demandDates.startDate.valueOf()),
          endDate: toFakeLocalDate(moment(item.demandDates.endDate).endOf('day').valueOf()),
        },
        mainStockDay: item.mainStockDay,
        mainLeadDay: item.mainLeadDay,
        storeStockDay: STORE_STOCK_DAY,
        ignoreStock: IGNORE_STOCK,
        pastStockOrderDay: PAST_STOCK_ORDER_DAY,
        activeStockOrderDate: toFakeLocalDate(item.activeStockOrderDate.valueOf()),
        activeStockTransferDate: toFakeLocalDate(item.activeStockTransferDate.valueOf()),
        growRate: item.growRate,
      };
    });

    const data = {
      email: userEmail,
      serviceType: GETIR_AUTO_STOCK_ORDER_TYPES.AUTO_STOCK_ORDER_VOLUME_SERVICE_TYPE,
      transferDay: values.storeTransferDay,
      supplier: values.suppliers,
      maxStockDay: values.maximumStockDay,
      startDateL: toFakeLocalDate(values.demandRange[0].valueOf()),
      endDateL: toFakeLocalDate(moment(values.demandRange[1]).endOf('day').valueOf()),
      activeStockOrderDateL: toFakeLocalDate(values.pastStockOrderDay.valueOf()),
      activeStockTransferDateL: toFakeLocalDate(values.pastStockTransferDay.valueOf()),
      growRate: values.demandMultiplier,
      maxColiBool: values.maxColiCountExist,
      maxColiCount: MAX_COLI_COUNT,
      storeStockDay: STORE_STOCK_DAY,
      storeVolumes: csvData,
      itemParams: params,
      timestamp: Date.now(),
    };

    dispatch(Creators.getAutoStockOrderRequest({ data }));
  };

  const handleCsvImport = ({ data }) => {
    try {
      const wrongRows = [];
      const rowData = {};

      data.forEach((row, index) => {
        if (row.ID && row.LitreHacim && row.Oran) {
          rowData[row.ID] = {
            fridgeVolume: row.LitreHacim,
            maxVolumeRatio: row.Oran,
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

      setCsvData(rowData);
      toast.success(t('STORE_VOLUMES_EXCEL_UPLOADED'));
    }
    catch (e) {
      toast.error(t('STORE_VOLUMES_EXCEL_UPLOADED'));
    }
  };

  return (
    <AntCard bordered={false}>
      <Form
        form={form}
        {...formItemLayout}
        layout="horizontal"
        initialValues={initialValues}
        onFinish={handleSubmit}
        onValuesChange={handleValuesChage}
      >
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item name="suppliers" label={t('SUPPLIER')} className={classes.formItemWrapper}>
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
          <Col span={24}>
            <Form.Item name="demandRange" label={t('DEMAND_RANGE')} className={classes.formItemWrapper}>
              <RangePicker format={dateFormat} className="w-100" allowClear={false} disabledDate={disableDateBiggerThanToday} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="storeTransferDay" label={t('STORE_TRANSFER_DAY')} className={classes.formItemWrapper}>
              <AntInputNumber className="w-100" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="maximumStockDay" label={t('MAXIMUM_STOCK_DAY')} className={classes.formItemWrapper}>
              <AntInputNumber className="w-100" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={t('MAXIMUM_COLI_COUNT_EXISTS')}
              name="maxColiCountExist"
              valuePropName="checked"
              className={classes.formItemWrapper}
            >
              <Checkbox onChange={handleMaxColiCountChange} className={classes.maxColiCountField} />
            </Form.Item>
          </Col>
          {isMaxColiCountExist && (
            <Col span={24}>
              <Form.Item
                label={t('MAXIMUM_COLI_COUNT')}
                name="maxBoxCount"
                className={classes.formItemWrapper}
              >
                <AntInputNumber className="w-100" />
              </Form.Item>
            </Col>
          )}
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
        </Row>
        <Row gutter={[8, 8]} justify="end">
          <Col span={24} className={classes.actionButtonsWrapper}>
            <Space size="small">
              <Button type="primary">
                <CsvImporter importButtonText={t('IMPORT_EXCEL')} onOkayClick={handleCsvImport} exampleCsv={exampleCsv} />
              </Button>
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

export default StockOrderVolumeAutoForm;
