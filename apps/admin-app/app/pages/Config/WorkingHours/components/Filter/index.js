import { useEffect, useMemo } from 'react';
import {
  Row,
  Col,
  Collapse,
  Button,
  Form,
} from 'antd';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { getLangKey, t } from '@shared/i18n';
import {
  CITY_BASE_WORKING_HOURS,
  CONFIG_WORKING_HOURS,
  REGION_BASE_WORKING_HOURS,
} from '@shared/shared/constants';

import { defaultValues, validationSchema } from './formHelper';
import { SelectWrapper } from '@shared/components/UI/Form';
import { filtersSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { getCitiesSelector, regionsSelector } from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { validate } from '@shared/yup';

const { Panel } = Collapse;

const { useForm } = Form;

function Filter({ onCreateWorkingHours }) {
  const dispatch = useDispatch();

  const workingHoursType = useSelector(filtersSelector.getWorkingHoursType);
  const countryId = useSelector(filtersSelector.getCountry);
  const cityId = useSelector(filtersSelector.getCity);
  const regionId = useSelector(filtersSelector.getRegion);
  const cities = useSelector(getCitiesSelector.getData);
  const regions = useSelector(regionsSelector.getData);

  const [form] = useForm();

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.getWorkingHoursRequest(values));
    },
    enableReinitialize: true,
  });

  const { handleSubmit, values, errors, touched, setFieldValue, setValues } = formik;

  const isCreateDisabled = useMemo(() => {
    if (!values.workingHoursType) {
      return true;
    }
    if (values.workingHoursType === CITY_BASE_WORKING_HOURS) {
      if (!values.cityId) {
        return true;
      }
    }
    return false;
  }, [values.cityId, values.workingHoursType]);

  const handleCityChange = selectedCityId => {
    if (values.regionId) {
      setFieldValue('regionId', '');
    }
    setFieldValue('cityId', selectedCityId);
    dispatch(CommonCreators.getRegionsRequest({ cityId: selectedCityId }));
  };

  useEffect(() => {
    form.setFieldsValue(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities, regions]);

  useEffect(() => {
    form.setFieldsValue({ workingHoursType, countryId, cityId, regionId });
    setValues({ workingHoursType, countryId, cityId, regionId });
  }, [form, setValues, workingHoursType, countryId, cityId, regionId]);

  const customLabelTranslation = path => {
    return label => {
      return t(`${path}:${label}`);
    };
  };

  const checkCitySelectVisibility = () => {
    return [CITY_BASE_WORKING_HOURS, REGION_BASE_WORKING_HOURS].includes(values.workingHoursType);
  };

  const handleWorkingHoursTypeChange = selectedWorkingHoursType => {
    setFieldValue('workingHoursType', selectedWorkingHoursType);
    if (values.countryId) {
      dispatch(CommonCreators.getCitiesRequest({ countryId: values.countryId }));
    }

    if (values.cityId) {
      dispatch(CommonCreators.getRegionsRequest({ cityId: values.cityId }));
    }
  };

  return (
    <Row>
      <Col span={24}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Collapse defaultActiveKey={['1']}>
            <Panel header={t('global:FILTER')} key="1">
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <SelectWrapper
                    selectKey="workingHourType"
                    label={t('warehousePage:BASE_WORKING_HOUR_TYPE')}
                    value={values.workingHoursType}
                    hasError={_.get(errors, 'workingHoursType')}
                    isTouched={_.get(touched, 'workingHoursType')}
                    optionsData={CONFIG_WORKING_HOURS}
                    labelTranslationCallback={customLabelTranslation('warehousePage:BASE_WORKING_HOURS')}
                    onChangeCallback={handleWorkingHoursTypeChange}
                  />
                </Col>
                <Col span={12}>
                  {
                    checkCitySelectVisibility() ? (
                      <SelectWrapper
                        selectKey="cityId"
                        label={t('global:CITY')}
                        value={values.cityId}
                        hasError={_.get(errors, 'cityId')}
                        isTouched={_.get(touched, 'cityId')}
                        optionsData={cities}
                        optionLabelProp={`name.${getLangKey()}`}
                        optionValueProp="_id"
                        onChangeCallback={handleCityChange}
                      />
                    ) : null
                  }
                </Col>
              </Row>
              <Row align="bottom" justify="end">
                <Col span={3}>
                  <Button block onClick={() => onCreateWorkingHours(values.workingHoursType, countryId, values.cityId, regionId)} disabled={isCreateDisabled}>
                    {t('warehousePage:CREATE_HOURS')}
                  </Button>
                </Col>
                <Col span={3}>
                  <Button block type="primary" htmlType="submit">
                    {t('button:GET')}
                  </Button>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </Form>
      </Col>
    </Row>
  );
}

export default Filter;
