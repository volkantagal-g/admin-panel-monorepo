import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Col, Row, Form, Select, DatePicker } from 'antd';
import { useFormik } from 'formik';

import { validate } from '@shared/yup';
import { convertConstantValueTranslationsToSelectOptions, getLimitAndOffset } from '@shared/utils/common';
import { getLangKey } from '@shared/i18n';

import { filterIncidentsSelector, getAlertConditionsSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { INITIAL_STATE } from '../../redux/reducer';

import { validationSchema } from './formHelper';
import useStyles from './styles';
import { INCIDENT_PRIORITIES, INCIDENT_STATUSES, INITIAL_PAGINATION_OBJECT } from '@app/pages/BusinessAlertingTool/constants';

const { RangePicker } = DatePicker;

type IncidentFiltersProps = {
  pagination: PaginationProps;
  setPagination: any;
}

function IncidentFilters({ pagination, setPagination }: IncidentFiltersProps) {
  const { t } = useTranslation(['batIncidentListPage', 'batAlertConditionCommon']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const filters = useSelector(filterIncidentsSelector.getFilters);
  const isPending = useSelector(filterIncidentsSelector.getIsPending);

  const incidentStatusesOptions = convertConstantValueTranslationsToSelectOptions({
    constants: INCIDENT_STATUSES,
    translationBaseKey: 'batAlertConditionCommon:CONSTANT_VALUES.INCIDENT_STATUSES',
  });

  const alertConditions = useSelector(getAlertConditionsSelector.getData);
  const incidentPriorityOptions = convertConstantValueTranslationsToSelectOptions({
    constants: INCIDENT_PRIORITIES,
    translationBaseKey: 'batAlertConditionCommon:CONSTANT_VALUES.INCIDENT_PRIORITIES',
  });

  useEffect(() => {
    dispatch(Creators.getAlertConditionsRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: filters,
    validate: validate(validationSchema),
    onSubmit: values => {
      const newPagination: PaginationProps = {
        ...pagination,
        currentPage: INITIAL_PAGINATION_OBJECT.currentPage,
      };
      setPagination(newPagination);

      dispatch(Creators.filterIncidentsRequest({
        filters: {
          ...values,
          ...getLimitAndOffset(newPagination),
        },
      }));
    },
  });
  const { handleSubmit, values, setFieldValue, setValues, submitForm, initialValues } = formik;

  const getAlertConditionOptions = (data: AlertCondition[]) => {
    return data.map(alertCondition => ({
      value: alertCondition._id,
      label: alertCondition.name[getLangKey()],
    }));
  };

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
                options={incidentStatusesOptions}
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
                value={values.priority}
                defaultValue={values.priority}
                className={classes.fullWidth}
                options={incidentPriorityOptions}
                onChange={priority => {
                  setFieldValue('priority', priority);
                  dispatch(Creators.setFilterPriority({ priority }));
                }}
                placeholder={t('batAlertConditionCommon:PLACEHOLDERS.PRIORITY')}
                allowClear
                disabled={isPending}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8} xl={5}>
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
          <Col xs={24} sm={8} xl={4}>
            <Form.Item className="mb-0">
              <Select
                value={values.alertCondition}
                defaultValue={values.alertCondition}
                className={classes.fullWidth}
                options={getAlertConditionOptions(alertConditions)}
                onChange={alertCondition => {
                  setFieldValue('alertCondition', alertCondition);
                  dispatch(Creators.setFilterAlertCondition({ alertCondition }));
                }}
                placeholder={t('batAlertConditionCommon:PLACEHOLDERS.ALERT_CONDITION_NAME')}
                allowClear
                disabled={isPending}
                optionFilterProp="label"
                showSearch
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

  function clearFilterOnClick() {
    if (JSON.stringify(initialValues) === JSON.stringify(values)) return;
    dispatch(Creators.resetFilters());
    setValues(INITIAL_STATE.filters);
    setPagination(INITIAL_PAGINATION_OBJECT);
    submitForm();
  }
}

export default IncidentFilters;
