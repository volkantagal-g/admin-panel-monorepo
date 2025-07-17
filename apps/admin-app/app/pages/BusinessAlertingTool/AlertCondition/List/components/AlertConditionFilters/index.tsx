import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';

import { validate } from '@shared/yup';
import { convertConstantValueTranslationsToSelectOptions, getLimitAndOffset } from '@shared/utils/common';
import UserSelect from '@shared/containers/Select/User';
import SelectRole from '@shared/containers/Select/Role';

import { filterAlertConditionsSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { INITIAL_STATE } from '../../redux/reducer';

import { validationSchema } from './formHelper';
import useStyles from './styles';
import { CHANNELS, CONDITION_STATUSES, INITIAL_PAGINATION_OBJECT } from '@app/pages/BusinessAlertingTool/constants';

const { RangePicker } = DatePicker;

type AlertConditionFilterProps = {
  pagination: { currentPage: number, rowsPerPage: number };
  setPagination: any;
}

function AlertConditionFilters({ pagination, setPagination }: AlertConditionFilterProps) {
  const { t } = useTranslation(['batAlertConditionListPage', 'batAlertConditionCommon']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const filters = useSelector(filterAlertConditionsSelector.getFilters);
  const isPending = useSelector(filterAlertConditionsSelector.getIsPending);
  const alertConditionChannelOptions = convertConstantValueTranslationsToSelectOptions({
    constants: CHANNELS,
    translationBaseKey: 'batAlertConditionCommon:CHANNELS',
  });

  const alertConditionStatusesOptions = convertConstantValueTranslationsToSelectOptions({
    constants: CONDITION_STATUSES,
    translationBaseKey: 'batAlertConditionCommon:CONSTANT_VALUES.ALERT_CONDITION_STATUSES',
  });

  const formik = useFormik({
    initialValues: filters,
    validate: validate(validationSchema),
    onSubmit: values => {
      const newPagination: PaginationProps = {
        ...pagination,
        currentPage: INITIAL_PAGINATION_OBJECT.currentPage,
      };
      setPagination(newPagination);

      dispatch(Creators.filterAlertConditionsRequest({
        filters: {
          ...values,
          ...getLimitAndOffset(newPagination),
        },
      }));
    },
  });
  const { handleSubmit, values, setFieldValue, setValues, submitForm, initialValues } = formik;

  return (
    <div className={classes.filters}>
      <Form
        form={form}
        onFinish={handleSubmit}
      >
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={8} xl={3}>
            <Form.Item className="mb-0">
              <Select
                value={values.statuses}
                defaultValue={values.statuses}
                className={classes.fullWidth}
                options={alertConditionStatusesOptions}
                onChange={statuses => {
                  setFieldValue('statuses', statuses);
                  dispatch(Creators.setFilterStatuses({ statuses }));
                }}
                placeholder={t('batAlertConditionCommon:PLACEHOLDERS.STATUS')}
                allowClear
                disabled={isPending}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8} xl={3}>
            <Form.Item className="mb-0">
              <Select
                value={values.notificationChannels}
                defaultValue={values.notificationChannels}
                className={classes.fullWidth}
                options={alertConditionChannelOptions}
                mode="multiple"
                onChange={notificationChannels => {
                  setFieldValue('notificationChannels', notificationChannels);
                  dispatch(Creators.setFilterNotificationChannels({ notificationChannels }));
                }}
                placeholder={t('PLACEHOLDERS.CHANNEL')}
                showArrow
                allowClear
                maxTagCount="responsive"
                disabled={isPending}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8} xl={3}>
            <Form.Item className="mb-0">
              <UserSelect
                value={values.createdBy}
                defaultValue={values.createdBy}
                onChange={(createdBy: any) => {
                  setFieldValue('createdBy', createdBy);
                  dispatch(Creators.setFilterCreatedBy({ createdBy }));
                }}
                placeholder={t('PLACEHOLDERS.CREATED_BY')}
                mode="single"
                disabled={isPending}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8} xl={3}>
            <Form.Item className="mb-0">
              <SelectRole
                value={values.permittedRoles}
                defaultValue={values.permittedRoles}
                mode="multiple"
                onChange={(permittedRoles: any) => {
                  setFieldValue('permittedRoles', permittedRoles);
                  dispatch(Creators.setFilterPermittedRoles({ permittedRoles }));
                }}
                placeholder={t('PLACEHOLDERS.PERMITTED_ROLE')}
                labelInValue
                disabled={isPending}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8} xl={4}>
            <Form.Item className="mb-0">
              <RangePicker
                value={values.createdAtRange}
                className={classes.fullWidth}
                onCalendarChange={createdAtRange => {
                  setFieldValue('createdAtRange', createdAtRange);
                  dispatch(Creators.setFilterCreatedAtRange({ createdAtRange: createdAtRange || [] }));
                }}
                disabled={isPending}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8} xl={3}>
            <Form.Item className="mb-0">
              <Input
                value={values.searchTerm}
                prefix={<SearchOutlined />}
                className={classes.fullWidth}
                placeholder={t('PLACEHOLDERS.SEARCH')}
                onChange={handleSearchTermOnChange}
                allowClear
                disabled={isPending}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 8]} justify="end">
          <Col>
            <div className={classes.buttonContainer}>
              <Form.Item className="mb-0">
                <Button type="primary" htmlType="submit" disabled={isPending}>
                  {t('button:APPLY')}
                </Button>
              </Form.Item>
              <Form.Item className="mb-0">
                <Button
                  type="default"
                  onClick={clearFilterOnClick}
                  disabled={isPending}
                >
                  {t('button:CLEAR')}
                </Button>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );

  function handleSearchTermOnChange(event: { target: { value: any; }; }) {
    const { value } = event.target;

    setFieldValue('searchTerm', value);
    dispatch(Creators.setFilterSearchTerm({ searchTerm: value || undefined }));
  }

  function clearFilterOnClick() {
    if (JSON.stringify(initialValues) === JSON.stringify(values)) return;
    dispatch(Creators.resetFilters());
    setValues(INITIAL_STATE.filters);
    setPagination(INITIAL_PAGINATION_OBJECT);
    submitForm();
  }
}

export default AlertConditionFilters;
