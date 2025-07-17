/* eslint-disable react/require-default-props */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Select, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import { useSelector } from 'react-redux';

import Card from '@shared/components/UI/AntCard';
import { defaultValues, validationSchema } from './formHelper';
import { SelectWrapper } from '@shared/components/UI/Form';
import {
  GETIR_10_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
  WAREHOUSE_ACTIVE_STATE,
  WAREHOUSE_ARCHIVE_STATE,
  WAREHOUSE_INACTIVE_STATE,
  WAREHOUSE_STATES,
} from '@shared/shared/constants';
import { validate } from '@shared/yup';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { SAP_REFERENCE_CODE_ENABLED_COUNTRY_CODES } from '@app/pages/MarketProduct/constants';

const { Option } = Select;

const { useForm } = Form;

const DOMAIN_TYPES_REQUIRES_SAP_CODE = [
  GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE, GETIR_VOYAGER_DOMAIN_TYPE,
];

function WarehouseState(props) {
  const {
    state,
    archiveRequest,
    deactivateRequest,
    activateRequest,
    isWarehouseValid,
    hasSAPReferenceCode,
    domainTypes,
  } = props;
  const { t } = useTranslation();
  const { canAccess } = usePermission();
  const countryCode = useSelector(getSelectedCountryV2)?.code?.alpha2;

  const [form] = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const initialProps = { state };

  const hasSAPRequiredDomainType = domainTypes.some(domainType => DOMAIN_TYPES_REQUIRES_SAP_CODE.includes(domainType));

  const canActivate = !hasSAPRequiredDomainType || !SAP_REFERENCE_CODE_ENABLED_COUNTRY_CODES.includes(countryCode) || hasSAPReferenceCode;

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (_.isEqual(values, initialProps)) {
        return false;
      }

      switch (values.state) {
        case WAREHOUSE_ARCHIVE_STATE:
          archiveRequest();
          break;
        case WAREHOUSE_INACTIVE_STATE:
          deactivateRequest();
          break;
        case WAREHOUSE_ACTIVE_STATE:
          activateRequest();
          break;
        default:
          break;
      }
      form.setFieldsValue({ ...initialProps });
      setIsModalVisible(false);
      return true;
    },
    enableReinitialize: true,
  });

  const { handleSubmit, values, errors, touched, setFieldValue, setValues, submitForm } = formik;

  const handleResetForm = () => {
    if (_.isEqual(values, initialProps)) {
      return false;
    }

    setValues(initialProps);
    form.setFieldsValue(initialProps);
    return true;
  };

  const isSelectedValueActive = selectedValue => {
    return selectedValue === WAREHOUSE_ACTIVE_STATE;
  };

  const handleSelectChange = fieldName => {
    return selectedItems => {
      if (isSelectedValueActive(selectedItems) && !isWarehouseValid()) {
        form.setFieldsValue({ ...initialProps });
        setValues({ ...initialProps });
        return;
      }

      if (selectedItems === values.state) {
        return;
      }
      setIsModalVisible(true);
      setFieldValue(fieldName, selectedItems);
    };
  };

  useEffect(() => {
    form.setFieldsValue({ state });
    setValues({ state });
  }, [form, setValues, state]);

  const handleOkButton = () => {
    submitForm();
  };

  const handleCancelButton = () => {
    handleResetForm();
    setIsModalVisible(false);
  };

  const renderStateOptions = () => {
    return WAREHOUSE_STATES.map(stateOption => (
      <Option
        key={stateOption}
        value={stateOption}
        label={t(`global:STATES:${stateOption}`)}
        disabled={stateOption === WAREHOUSE_ACTIVE_STATE && !canActivate}
      >
        {(stateOption === WAREHOUSE_ACTIVE_STATE && !canActivate) ? (
          <Tooltip title={t('warehousePage:NO_SAP_REFERENCE_CODE_WARNING')} placement="left" className="pr-3">
            <div>{t(`global:STATES:${stateOption}`)}</div>
          </Tooltip>
        ) : <div>{t(`global:STATES:${stateOption}`)}</div>}
      </Option>
    ));
  };

  return (
    <Card>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <SelectWrapper
          selectKey="state"
          label={t('STATE')}
          disabled={!canAccess(permKey.PAGE_WAREHOUSE_DETAIL_EDIT_STATE)}
          value={values.state}
          hasError={_.get(errors, 'state')}
          isTouched={_.get(touched, 'state')}
          onChangeCallback={handleSelectChange('state')}
          renderCustomItems={renderStateOptions}
        />
        <Modal
          title={t('warehousePage:CONFIRM_MODAL_TITLE')}
          visible={isModalVisible}
          onOk={handleOkButton}
          onCancel={handleCancelButton}
        />
      </Form>
    </Card>
  );
}

WarehouseState.propTypes = {
  state: PropTypes.number,
  archiveRequest: PropTypes.func,
  deactivateRequest: PropTypes.func,
  activateRequest: PropTypes.func,
  isWarehouseValid: PropTypes.func,
  hasSAPReferenceCode: PropTypes.bool,
};

export default WarehouseState;
