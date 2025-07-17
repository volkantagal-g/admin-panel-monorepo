import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { find, isNull, omitBy } from 'lodash';
import { Button, Form, Card } from 'antd';
import * as Yup from 'yup';

import { CONFIG_TYPES, INPUT_VALIDATION_TYPE_MAP, NAMESPACES } from '@app/pages/Algorithm/Config/Domain/constants';
import { algorithmDomainConfigDetailSelector } from '@app/pages/Algorithm/Config/Domain/Base/Detail/redux/selectors';
import { Creators } from '@app/pages/Algorithm/Config/Domain/Base/Detail/redux/actions';
import NumberInput from '@app/pages/Algorithm/Config/Domain/Base/Detail/components/ConfigInputs/NumberInput';
import SliderInput from '@app/pages/Algorithm/Config/Domain/Base/Detail/components/ConfigInputs/SliderInput';
import SwitchInput from '@app/pages/Algorithm/Config/Domain/Base/Detail/components/ConfigInputs/SwitchInput';
import SelectBoxInput from '@app/pages/Algorithm/Config/Domain/Base/Detail/components/ConfigInputs/SelectBoxInput';
import { GETIR_DOMAIN_TYPES } from '@shared/shared/constants';

const { Item } = Form;

const INPUT_TYPE_MAP = {
  integer: NumberInput,
  decimal: NumberInput,
  slider: SliderInput,
  boolean: SwitchInput,
  selectbox: SelectBoxInput,
};

const DomainConfigForm = () => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const dispatch = useDispatch();

  const configDetailData = useSelector(algorithmDomainConfigDetailSelector.getData);
  const isPending = useSelector(algorithmDomainConfigDetailSelector.getIsPending);
  const settingIsPending = useSelector(algorithmDomainConfigDetailSelector.getDomainSettingsIsPending);
  const domainSettings = useSelector(algorithmDomainConfigDetailSelector.getDomainSettingsData);
  const namespace = useSelector(algorithmDomainConfigDetailSelector.getNamespace);
  const isUpdating = useSelector(algorithmDomainConfigDetailSelector.getIsUpdating);
  const domainTypes = useSelector(algorithmDomainConfigDetailSelector.getDomainTypes);
  const warehouseIsPending = useSelector(algorithmDomainConfigDetailSelector.getWarehouseIsPending);

  const inputs = useMemo(() => {
    const configType = configDetailData?.type;
    if (!configType) {
      return [];
    }
    const unitConfigs = find(domainSettings?.units, { name: configType });
    let configInputs = unitConfigs?.config_set || domainSettings?.default_config_set;

    if (namespace === NAMESPACES.MARKET && configDetailData?.type === CONFIG_TYPES.WAREHOUSE && domainTypes) {
      const isServingG10 = domainTypes.includes(GETIR_DOMAIN_TYPES.GETIR10);
      const isServingG30 = domainTypes.includes(GETIR_DOMAIN_TYPES.MARKET);
      if (!isServingG10) {
        configInputs = configInputs.filter(input => !input.field.startsWith('G10'));
      }
      if (!isServingG30) {
        configInputs = configInputs.filter(input => !input.field.startsWith('G30'));
      }
    }
    return configInputs;
  }, [configDetailData, domainSettings, namespace, domainTypes]);

  const initialValues = useMemo(() => {
    const initVal = {};
    inputs?.forEach(inputParam => {
      initVal[inputParam?.field] = configDetailData?.value?.[inputParam?.field];
    });
    return initVal;
  }, [inputs, configDetailData]);

  const validationScheme = useMemo(() => {
    const scheme = {};
    inputs?.forEach(input => {
      const type = INPUT_VALIDATION_TYPE_MAP[input?.type];
      if (type) {
        let yup = Yup[type]();
        if (type === 'number') {
          if (input.type === 'integer') {
            yup = yup.integer();
          }
          if (Object.keys(input).includes('min')) {
            yup = yup.min(input?.min);
          }
          if (Object.keys(input).includes('max')) {
            yup = yup.max(input.max);
          }
        }
        scheme[input?.field] = yup;
      }
    });
    return Yup.object().shape({ ...scheme });
  }, [inputs]);

  const formik = useFormik({
    initialValues,
    validationSchema: validationScheme,
    onSubmit: values => {
      dispatch(Creators.updateAlgorithmDomainConfigValueRequest({
        key: configDetailData?.key,
        namespace,
        value: values,
      }));
    },
    enableReinitialize: true,
  });

  const { handleSubmit } = formik;

  return (
    <div>
      <Card
        style={{ height: '100%' }}
        title={t('algorithmConfigPage:CONFIG_VALUE')}
        loading={isPending || settingIsPending || isUpdating || warehouseIsPending}
      >
        <Form layout="vertical">
          {inputs?.map(inputParams => {
            const InputComponent = INPUT_TYPE_MAP[inputParams?.type];
            return InputComponent ? <InputComponent inputParams={omitBy(inputParams, isNull)} formik={formik} /> : null;
          })}
          <Item>
            <Button type="primary" onClick={handleSubmit} loading={isUpdating}>SAVE</Button>
          </Item>
        </Form>
      </Card>
    </div>
  );
};

export default DomainConfigForm;
