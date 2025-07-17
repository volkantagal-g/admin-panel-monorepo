import { get } from 'lodash';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Row, Col, Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { Button } from '@shared/components/GUI';
import { isEmptyObject, jsonToBase64 } from '@shared/utils/common';
import SelectMentor from '@app/pages/Mentorship/components/Select/Mentor';
import SelectTopic from '@app/pages/Mentorship/components/Select/Topic';
import SelectLanguage from '@app/pages/Mentorship/components/Select/Language';
// import SelectJobFamily from '@app/pages/Employee/components/Select/JobFamily';
import { Creators } from '../../redux/actions';
import useStyles from './styles';

const SearchFilter = ({ t, initialValues, loading }) => {
  const dispatch = useDispatch();
  const [form] = useForm();
  const classes = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();

  const mentorName = searchParams.get('mentorName');
  const topicName = searchParams.get('topicName');
  // const jobFamilyName = searchParams.get('jobFamilyName');

  const disabled = !form.isFieldsTouched() || isEmptyObject(initialValues);

  const searchMentorshipCoursesRequest = currentFilters => {
    dispatch(Creators.searchMentorshipCoursesRequest({ body: currentFilters }));
  };

  // eslint-disable-next-line no-unused-vars
  const handleOnValuesChange = (_, selectedFilters) => {
    const base64Filters = jsonToBase64(selectedFilters);
    searchParams.set('filters', base64Filters);

    dispatch(Creators.setFilters({ filters: selectedFilters }));
    setSearchParams(searchParams);
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: searchMentorshipCoursesRequest,
  });

  const { handleSubmit, values, setFieldValue, setFieldTouched } = formik;

  // in order to link antd form and formik form
  const getHandleChange = (fieldName, inputType = 'text') => {
    return param => {
      if (inputType === 'select') {
        setFieldValue(fieldName, param);
      }
      else {
        setFieldValue(fieldName, param.target.value);
      }
    };
  };

  // in order to link antd form and formik form
  const getHandleBlur = (fieldName, searchParamKey) => {
    return () => {
      if (!values?.[fieldName]?.length) {
        searchParams.delete(searchParamKey);
        setSearchParams(searchParams);
      }
      setFieldTouched(fieldName);
    };
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  const handleResetOnClick = () => {
    dispatch(Creators.resetFilters({}));
    searchMentorshipCoursesRequest({});
    searchParams.delete('filters');
    searchParams.delete('mentorName');
    searchParams.delete('topicName');
    searchParams.delete('jobFamilyName');
    setSearchParams(searchParams);
  };

  const handleOnSearchMentor = name => {
    searchParams.set('mentorName', name);
    setSearchParams(searchParams);
  };

  const handleOnSearchTopic = name => {
    searchParams.set('topicName', name);
    setSearchParams(searchParams);
  };

  // const handleOnSearchJobFamily = name => {
  //   searchParams.set('jobFamilyName', name);
  //   setSearchParams(searchParams);
  // };

  const handleOnClearSearchTerm = searchParamKey => {
    return () => {
      searchParams.delete(searchParamKey);
      setSearchParams(searchParams);
    };
  };

  return (
    <Form
      initialValues={initialValues}
      form={form}
      id="mentorshipSearch"
      onFinish={handleSubmit}
      layout="vertical"
      onValuesChange={handleOnValuesChange}
    >
      <Row gutter={[8, 8]}>
        <Col lg={{ span: 12 }} xs={{ span: 24 }}>
          <Form.Item name="mentors" className={classes.formItem}>
            <SelectMentor
              label={t('MENTOR')}
              value={get(values, 'mentors')}
              onChange={getHandleChange('mentors', 'select')}
              onBlur={getHandleBlur('mentors', 'mentorName')}
              disabled={loading}
              isFetchOptionsOnLoad
              initialSearchTerm={mentorName}
              onSearch={handleOnSearchMentor}
              onClear={handleOnClearSearchTerm('mentorName')}
            />
          </Form.Item>
        </Col>
        <Col lg={{ span: 12 }} xs={{ span: 24 }}>
          <Form.Item name="topics" className={classes.formItem}>
            <SelectTopic
              label={t('TOPIC')}
              value={get(values, 'topics')}
              mode="multiple"
              onChange={getHandleChange('topics', 'select')}
              onBlur={getHandleBlur('topics', 'topicName')}
              disabled={loading}
              isFetchOptionsOnLoad
              initialSearchTerm={topicName}
              onSearch={handleOnSearchTopic}
              onClear={handleOnClearSearchTerm('topicName')}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col lg={{ span: 12 }} xs={{ span: 24 }}>
          <Form.Item name="languages" className={classes.formItem}>
            <SelectLanguage
              label={t('LANGUAGE')}
              value={get(values, 'languages')}
              placeholder=""
              onChange={getHandleChange('languages', 'select')}
              onBlur={getHandleBlur('languages')}
              disabled={loading}
            />
          </Form.Item>
        </Col>
        {/* <Col lg={{ span: 12 }} xs={{ span: 24 }}> */}
        {/*   <Form.Item name="jobFamilyId" className={classes.formItem}> */}
        {/*     <SelectJobFamily */}
        {/*       label={t('JOB_FAMILY')} */}
        {/*       isGUISelect */}
        {/*       value={get(values, 'jobFamilyId')} */}
        {/*       placeholder="" */}
        {/*       onChange={getHandleChange('jobFamilyId', 'select')} */}
        {/*       onBlur={getHandleBlur('jobFamilyId', 'jobFamilyName')} */}
        {/*       disabled={loading} */}
        {/*       isFetchOptionsOnLoad */}
        {/*       initialSearchTerm={jobFamilyName} */}
        {/*       onSearch={handleOnSearchJobFamily} */}
        {/*       onClear={handleOnClearSearchTerm('jobFamilyName')} */}
        {/*     /> */}
        {/*   </Form.Item> */}
        {/* </Col> */}
      </Row>
      <Row gutter={[8, 8]} justify="end">
        <Button
          size="small"
          color="secondary"
          className="mr-2"
          onClick={handleResetOnClick}
          loading={loading}
          disabled={disabled}
        >{t('global:RESET')}
        </Button>
        <Button
          size="small"
          htmlType="submit"
          loading={loading}
          disabled={disabled}
        >{t('global:FILTER')}
        </Button>
      </Row>
    </Form>
  );
};

export default SearchFilter;
