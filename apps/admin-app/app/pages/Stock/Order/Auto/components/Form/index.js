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
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';
import moment from 'moment';

import { getSuppliersSelector } from '@shared/redux/selectors/common';
import { itemParamsSelector, supplierIdSelector } from '@app/pages/Stock/Order/Auto/redux/selectors';
import { Creators } from '@app/pages/Stock/Order/Auto/redux/actions';
import { toFakeLocalDate } from '@shared/utils/dateHelper';
import { GETIR_AUTO_STOCK_ORDER_TYPES } from '@app/pages/Stock/Order/constants';
import AntCard from '@shared/components/UI/AntCard';
import AntInputNumber from '@shared/components/UI/AntInputNumber';
import { getSelectFilterOption } from '@shared/utils/common';
import { getUser } from '@shared/redux/selectors/auth';
import useStyles from './styles';
import { initialValues } from './config';
import { disableDateBiggerThanToday } from '@app/pages/Stock/utils/disabledDates';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';
const STOCK_ORDER_DAY = 7;

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
      value: get(supplier, '_id', ''),
      label: get(supplier, ['name'], ''),
    };
  });
};

const StockOrderAutoForm = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation('stockOrderAuto');
  const dispatch = useDispatch();
  const classes = useStyles();

  const suppliers = useSelector(getSuppliersSelector.getData);
  const suppliersPending = useSelector(
    getSuppliersSelector.getIsPending,
  );
  const itemParams = useSelector(
    itemParamsSelector.getItemParams,
  );
  const supplierId = useSelector(
    supplierIdSelector.getSupplierId,
  );
  const user = getUser();
  const userEmail = get(user, 'email', '');

  const handleValuesChage = values => {
    if (values.suppliers) {
      dispatch(Creators.setSupplierId({ data: values.suppliers }));
    }
  };

  const handleSubmit = values => {
    const params = {};
    itemParams.forEach(item => {
      params[item._id] = {
        demandDates: {
          startDate: moment(item.demandDates.startDate).valueOf(),
          endDate: moment(item.demandDates.endDate).endOf('day').valueOf(),
        },
        demandDatesL: {
          startDate: toFakeLocalDate(item.demandDates.startDate.valueOf()),
          endDate: toFakeLocalDate(moment(item.demandDates.endDate).endOf('day').valueOf()),
        },
        mainStockDay: item.mainStockDay,
        mainLeadDay: item.mainLeadDay,
        storeStockDay: item.storeStockDay,
        ignoreStock: item.ignoreStock,
        activeStockOrderDate: moment(item.activeStockOrderDate).valueOf(),
        activeStockOrderDateL: toFakeLocalDate(item.activeStockOrderDate.valueOf()),
        activeStockTransferDate: moment(item.activeStockTransferDate).valueOf(),
        activeStockTransferDateL: toFakeLocalDate(item.activeStockTransferDate.valueOf()),
        growRate: item.growRate,
        pastStockOrderDay: STOCK_ORDER_DAY,
      };
    });

    const data = {
      email: userEmail,
      activeStockOrderDate: moment(values.pastStockOrderDay).valueOf(),
      activeStockTransferDate: moment(values.pastStockTransferDay).valueOf(),
      serviceType: GETIR_AUTO_STOCK_ORDER_TYPES.AUTO_STOCK_ORDER_SERVICE_TYPE,
      startDate: moment(values.demandRange[0]).valueOf(),
      endDate: moment(values.demandRange[1]).endOf('day').valueOf(),
      growRate: values.demandMultiplier,
      ignoreStock: values.ignoreCurrentStock,
      mainLeadDay: values.mainLeadDay,
      mainStockDay: values.mainStockDay,
      storeStockDay: values.storeStockDay,
      supplier: values.suppliers,
      startDateL: toFakeLocalDate(values.demandRange[0].valueOf()),
      endDateL: toFakeLocalDate(values.demandRange[1].endOf('day').valueOf()),
      activeStockOrderDateL: toFakeLocalDate(values.pastStockOrderDay.valueOf()),
      activeStockTransferDateL: toFakeLocalDate(values.pastStockTransferDay.valueOf()),
      itemParams: params,
      timestamp: Date.now(),
    };

    dispatch(Creators.getAutoStockOrderRequest({ data }));
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
              <RangePicker format={dateFormat} className="w-100" disabledDate={disableDateBiggerThanToday} allowClear={false} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="mainStockDay" label={t('MAIN_STOCK_DAY')} className={classes.formItemWrapper}>
              <AntInputNumber className="w-100" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="mainLeadDay" label={t('MAIN_LEAD_DAY')} className={classes.formItemWrapper}>
              <AntInputNumber className="w-100" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="storeStockDay" label={t('STORE_STOCK_DAY')} className={classes.formItemWrapper}>
              <AntInputNumber className="w-100" />
            </Form.Item>
          </Col>
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
        </Row>
        <Row gutter={[8, 8]} justify="end">
          <Col span={24} className={classes.actionButtonsWrapper}>
            <Space size="small">
              <Button type="primary" htmlType="submit" disabled={!supplierId}>
                {t('EXPORT_EXCEL')}
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default StockOrderAutoForm;
