import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { validate } from '@shared/yup';
import { Button, Card, Select } from '@shared/components/GUI';
import {
  channels,
  contacts,
  domainTypes,
  features,
  levels,
  mainReasons,
  segments,
} from '../../../constants';
import { agentGuidanceContentSelector } from '../../redux/selectors';
import { getInitialValues, validationSchema } from './formHelpers';
import { Creators } from '../../redux/actions';
import { getFormattedReasons } from '@app/pages/llm/utils';

const Filter = () => {
  const { t } = useTranslation('agentGuidancePage');
  const dispatch = useDispatch();
  const filters = useSelector(agentGuidanceContentSelector.getFilters);
  const isPending = useSelector(agentGuidanceContentSelector.getIsPending);
  const isAgentAssistance = useSelector(
    agentGuidanceContentSelector.isAgentAssistance,
  );
  const initialValues = getInitialValues(filters);

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(() => validationSchema(t)),
    initialValues,
    onSubmit: filterValues => {
      dispatch(
        Creators.getAgentGuidanceContentRequest({ filters: filterValues }),
      );
    },
  });

  const { values, setFieldValue, handleSubmit, errors } = formik;

  function handleOptionChange(field, value) {
    setFieldValue(field, value);
    const newFilters = { ...filters, [field]: value };
    if (field === 'mr') {
      newFilters.sr = null;
      newFilters.segment = null;
    }
    if (field === 'sr') {
      newFilters.segment = null;
    }
    dispatch(Creators.setFilters({ filters: newFilters }));
  }

  const subReasons = mainReasons.find(
    reason => reason.title.en === filters.mr,
  )?.subReasons;

  const reasonSegments = subReasons?.find(reason => reason.title.en === filters.sr)?.segments;
  const selectedSegments = segments.filter(segment => reasonSegments?.includes(segment.value));

  const inputSelectMap = [
    {
      name: 'feature',
      label: t('FILTER_OPTIONS.FEATURE'),
      value: values.feature,
      options: features,
    },
    {
      name: 'domain',
      label: t('global:DOMAIN'),
      value: values.domain,
      options: domainTypes,
      hidden: isAgentAssistance,
    },
    {
      name: 'contact',
      label: t('FILTER_OPTIONS.CONTACT'),
      value: values.contact,
      options: contacts,
      hidden: isAgentAssistance,
    },
    {
      name: 'level',
      label: t('global:LEVEL'),
      value: values.level,
      options: levels,
      hidden: isAgentAssistance,
    },
    {
      name: 'channel',
      label: t('FILTER_OPTIONS.CHANNEL'),
      value: values.channel,
      options: channels,
      hidden: isAgentAssistance,
    },
    {
      name: 'mr',
      label: t('FILTER_OPTIONS.MAIN_REASON'),
      value: values.mr,
      options: getFormattedReasons(mainReasons),
      hidden: isAgentAssistance,
    },
    {
      name: 'sr',
      label: t('FILTER_OPTIONS.SUB_REASON'),
      value: values.sr,
      options: getFormattedReasons(subReasons),
      disabled: !filters.mr,
      hidden: isAgentAssistance,
    },
    {
      name: 'segment',
      label: t('FILTER_OPTIONS.SEGMENT'),
      value: values.segment,
      options: selectedSegments,
      disabled: !filters.sr,
      hidden: isAgentAssistance,
    },
  ];
  return (
    <Card title={t('FILTER_OPTIONS.TITLE')}>
      <Row gutter={[16, 16]}>
        {inputSelectMap.map(({ name, label, value, options, hidden, disabled }) => (!hidden ? (
          <Col span={6} key={name}>
            <Select
              label={label}
              name={name}
              disabled={!!disabled}
              value={value}
              onChange={selectedValue => handleOptionChange(name, selectedValue)}
              optionsData={options}
              hasForm
              errors={errors}
            />
          </Col>
        ) : null))}
        {!isAgentAssistance && (
          <Col span={24}>
            <Button
              size="small"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {`${t('global:BRING')}`}
            </Button>
          </Col>
        )}
      </Row>
    </Card>
  );
};
export default Filter;
