import { useEffect, useMemo } from 'react';
import {
  Row,
  Col,
  Collapse,
  Button,
  Form,
} from 'antd';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { getLangKey, t } from '@shared/i18n';
import {
  CITY_BASE_PEAK_HOURS,
  CONFIG_PEAK_HOURS,
  REGION_BASE_PEAK_HOURS,
} from '@shared/shared/constants';

import { defaultValues, validationSchema } from './formHelper';
import { SelectWrapper } from '@shared/components/UI/Form';
import { filtersSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { validate } from '@shared/yup';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

const { Panel } = Collapse;

const { useForm } = Form;

function Filter({ onCreatePeakHours }) {
  const dispatch = useDispatch();
  const selectedCountry = useSelector(getSelectedCountry);
  const peakHoursType = useSelector(filtersSelector.getPeakHoursType);
  const cityId = useSelector(filtersSelector.getCity);
  const regionId = useSelector(filtersSelector.getRegion);
  const cities = useSelector(getCitiesSelector.getData);

  const [form] = useForm();

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.getPeakHoursRequest(values));
    },
    enableReinitialize: true,
  });

  const { handleSubmit, values, errors, touched, setFieldValue, setValues } = formik;

  const isCreateDisabled = useMemo(() => {
    if (!values.peakHoursType) {
      return true;
    }
    if (values.peakHoursType === CITY_BASE_PEAK_HOURS) {
      if (!values.cityId) {
        return true;
      }
    }
    return false;
  }, [values.cityId, values.peakHoursType]);

  const handleCityChange = selectedCityId => {
    if (values.regionId) {
      setFieldValue('regionId', '');
    }
    setFieldValue('cityId', selectedCityId);
    dispatch(CommonCreators.getRegionsRequest({ cityId: selectedCityId }));
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  useEffect(() => {
    form.setFieldsValue({ peakHoursType, cityId, regionId });
    setValues({ peakHoursType, cityId, regionId });
  }, [form, setValues, peakHoursType, cityId, regionId]);

  const customLabelTranslation = path => {
    return label => {
      return t(`${path}:${label}`);
    };
  };

  const checkCitySelectVisibility = () => {
    return [CITY_BASE_PEAK_HOURS, REGION_BASE_PEAK_HOURS].includes(values.peakHoursType);
  };

  const handlePeakHoursTypeChange = selectedPeakHoursType => {
    setFieldValue('peakHoursType', selectedPeakHoursType);
    if (selectedPeakHoursType === CITY_BASE_PEAK_HOURS) {
      dispatch(CommonCreators.getCitiesRequest({ countryId: selectedCountry._id }));
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
                    selectKey="peakHourType"
                    label={t('warehousePage:BASE_PEAK_HOUR_TYPE')}
                    value={values.peakHoursType}
                    hasError={get(errors, 'peakHoursType')}
                    isTouched={get(touched, 'peakHoursType')}
                    optionsData={CONFIG_PEAK_HOURS}
                    labelTranslationCallback={customLabelTranslation('warehousePage:BASE_PEAK_HOURS')}
                    onChangeCallback={handlePeakHoursTypeChange}
                  />
                </Col>
                <Col span={12}>
                  {
                    checkCitySelectVisibility() ? (
                      <SelectWrapper
                        selectKey="cityId"
                        label={t('global:CITY')}
                        value={values.cityId}
                        hasError={get(errors, 'cityId')}
                        isTouched={get(touched, 'cityId')}
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
                  <Button block onClick={() => onCreatePeakHours(values.peakHoursType, values.cityId, regionId)} disabled={isCreateDisabled}>
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
