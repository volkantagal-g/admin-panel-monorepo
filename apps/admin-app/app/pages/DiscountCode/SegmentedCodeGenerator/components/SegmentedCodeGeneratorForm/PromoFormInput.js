// import { useTranslation } from 'react-i18next';
import { get } from 'lodash';
// import { Select, Col } from 'antd';
import { useSelector } from 'react-redux';
// import { useState } from 'react';

import PromotionSelect from '@shared/containers/Marketing/Select/PromotionSelect';
// import { convertConstantValueTranslationsToSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import { createSegmentedCodeByBulkSelector } from '../../redux/selectors';
import useStyles from './styles';
import { PromoDomains } from '@app/pages/Promo/types';

const PromoFormInput = ({ formik, form }) => {
  // const { t } = useTranslation(['global']);
  const classes = useStyles();

  const { setFieldValue, setFieldTouched, touched, errors } = formik;
  const createSegmentedCodeByBulkIsPending = useSelector(createSegmentedCodeByBulkSelector.getIsPending);
  const targetDomainType = PromoDomains.Getir10;
  // const [targetDomainType, setTargetDomainType] = useState(PROMO_DOMAIN_TYPES.GETIR10);

  // in order to link antd form and formik form
  const getHandleChange = (fieldName, inputType = 'text') => {
    return param => {
      if (inputType === 'select' || inputType === 'date') {
        setFieldValue(fieldName, param);
      }
      else if (inputType === 'checkbox') {
        setFieldValue(fieldName, param.target.checked);
      }
      else {
        setFieldValue(fieldName, param.target.value);
      }
    };
  };

  return (
    <PromotionSelect
      fieldName="promo"
      targetServiceId={targetDomainType}
      disabled={createSegmentedCodeByBulkIsPending}
      form={form}
      onChange={getHandleChange('promo', 'select')}
      onBlur={() => setFieldTouched('promo')}
      formHelp={get(touched, 'promo') && get(errors, 'promo')}
      formValidateStatus={get(touched, 'promo') && get(errors, 'promo') ? 'error' : 'success'}
      formItemClassName={classes.formItem}
    />
  );
  // return (
  //   <>
  //     <Col xs={24} className="p-0">
  //       <Select
  //         disabled={createSegmentedCodeByBulkIsPending}
  // the usage of convertConstantValueTranslationsToSelectOptions is updated after commenting out this line, please be aware
  //         options={convertConstantValueTranslationsToSelectOptions(PROMO_DOMAIN_TYPES, 'global:GETIR_MARKET_DOMAIN_TYPES')}
  //         filterOption={getSelectFilterOption}
  //         onChange={setTargetDomainType}
  //         placeholder={t('segmentedCodeGeneratorPage:SELECT_PROMO_TARGET_DOMAIN_TYPE')}
  //       />
  //     </Col>
  //     <PromotionSelect
  //       fieldName="promo"
  //       targetServiceId={targetDomainType}
  //       disabled={createSegmentedCodeByBulkIsPending}
  //       form={form}
  //       onChange={getHandleChange('promo', 'select')}
  //       onBlur={() => setFieldTouched('promo')}
  //       formHelp={get(touched, 'promo') && get(errors, 'promo')}
  //       formValidateStatus={get(touched, 'promo') && get(errors, 'promo') ? 'error' : 'success'}
  //     />
  //   </>
  // );
};

export default PromoFormInput;
