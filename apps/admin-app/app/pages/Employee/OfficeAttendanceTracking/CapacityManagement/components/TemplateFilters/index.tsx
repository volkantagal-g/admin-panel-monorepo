import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import { Button, Col, DatePicker, Form, Row } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';

import { DEPARTMENT_LEVELS } from '@app/pages/Employee/constants';
import SelectLocation from '@app/pages/Employee/components/Select/Location';
import SelectBusinessUnit from '@app/pages/Employee/components/Select/BusinessUnit';
import SelectDepartment from '@shared/containers/Select/Department';
import { Creators } from '../../redux/actions';
import { capacityTemplateDataSelector, capacityTemplateFiltersSelector } from '../../redux/selectors';

import { validationSchema, initialValues, manipulateValuesBeforeSubmit } from './formHelper';

const { RangePicker } = DatePicker;

// in order not to create a new reference
const SELECT_DEPARTMENT_FILTERS = {
  fields: ['_id', 'name'],
  isActive: true,
  levels: [DEPARTMENT_LEVELS.MAIN_DEPARTMENT],
};

function TemplateFilters() {
  const dispatch = useDispatch();
  const { t } = useTranslation(['officeAttendanceTracking']);

  const templateDataIsPending = useSelector(capacityTemplateDataSelector.getIsPending);
  const templateFilters = useSelector(capacityTemplateFiltersSelector.getFilters);

  const [form] = Form.useForm();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      dispatch(Creators.getCapacityTemplateDataRequest({ reqData: { ...manipulateValuesBeforeSubmit(values) } }));
    },
  });

  const { handleSubmit, values, setFieldValue, setValues } = formik;

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
    >
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item className="mb-0">
            <RangePicker
              className="w-100"
              value={[values.startDay as moment.Moment, values.endDay as moment.Moment]}
              // we actually don't want to clear but it is the only way
              // to select a start date gt end date while selecting a new range
              // however it shows a clear icon but we don't set the values when cleared
              // since we have to have a date
              allowClear
              onCalendarChange={handleCalendarChange}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={4} lg={4}>
          <Form.Item className="mb-0">
            <SelectLocation
              allowClear
              value={values.officeId}
              onChange={(officeId: string | undefined) => {
                setFieldValue('officeId', officeId);
                dispatch(Creators.setTemplateFilters({ filters: { officeId } }));
              }}
              disabled={templateDataIsPending}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={4} lg={4}>
          <Form.Item className="mb-0">
            <SelectBusinessUnit
              value={values.businessUnit}
              onChange={(businessUnit: string) => {
                setFieldValue('businessUnit', businessUnit);
                dispatch(Creators.setTemplateFilters({
                  filters: {
                    businessUnit,
                    department: undefined,
                  },
                }));
              }}
              // @ts-ignore
              mode="single"
              allowClear
              disabled={templateDataIsPending || !isEmpty(templateFilters?.departmentId)}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={4} lg={4}>
          <Form.Item className="mb-0">
            <SelectDepartment
              onChange={(parsedDepartment: any) => {
                setFieldValue('department', parsedDepartment?.department);
                dispatch(Creators.setTemplateFilters({
                  filters: {
                    department: parsedDepartment?.department,
                    businessUnit: undefined,
                  },
                }));
              }}
              allowClear
              isReturnParsedValue
              filters={SELECT_DEPARTMENT_FILTERS}
              disabled={templateDataIsPending || !isEmpty(templateFilters?.businessUnitId)}
            />
          </Form.Item>
        </Col>
        <Col flex="auto">
          <div className="w-100 d-flex justify-content-end">
            <Button
              type="primary"
              htmlType="submit"
              disabled={templateDataIsPending}
            >
              <CloudDownloadOutlined /> {t('officeAttendanceTracking:DOWNLOAD_TEMPLATE')}
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );

  // @ts-ignore
  function handleCalendarChange(dateRange: RangePickerProps.moment) {
    if (dateRange?.[0] && dateRange?.[1]) {
      const startDay = moment(dateRange[0]).startOf('day');
      const endDay = moment(dateRange[1]).startOf('day');
      const newValues = { ...values, startDay, endDay };
      setValues(newValues);
      dispatch(Creators.setTemplateFilters({ filters: { startDay, endDay } }));
    }
  }
}

export default TemplateFilters;
// onClick={() => dispatch(Creators.getCapacityTemplateDataRequest({ reqData: {} }))}
