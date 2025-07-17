import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Select, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { LoadingOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

import { promoSelector } from '@shared/containers/Marketing/Select/PromotionSelect/redux/selectors';
import { PROMO_TYPE } from '@shared/containers/Marketing/Select/PromotionSelect/constants';
import { Creators } from '@shared/containers/Marketing/Select/PromotionSelect/redux/actions';
import { getSelectFilterOption, isObjectIdValid } from '@shared/utils/common';
import CustomDropdown from '@shared/containers/Marketing/Select/PromotionSelect/components/CustomDropdown';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { getPromoQueryParamsForTargetDomain } from '@shared/containers/Marketing/Select/PromotionSelect/utils';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

const LocalsPromoSelect = ({ disabled, hasMultiple, fieldName, rules, form, inline }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketing');
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  const isPending = useSelector(promoSelector(PROMO_TYPE.LOCALS_PROMO).getIsPending);
  const localsPromoList = useSelector(promoSelector(PROMO_TYPE.LOCALS_PROMO).getData);

  useEffect(() => {
    dispatch(Creators.initContainer());
    if (form?.getFieldValue(fieldName)) {
      dispatch(Creators.getPromoDetailsByTargetDomainRequest({
        promoType: PROMO_TYPE.LOCALS_PROMO,
        promoId: form.getFieldValue(fieldName),
      }));
      dispatch(Creators.initContainer());
    }
    return () => {
      dispatch(Creators.destroyContainer());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const addItem = promoId => {
    if (isObjectIdValid(promoId)) {
      if (hasMultiple) {
        const currentPromoIDs = form.getFieldValue(fieldName) || [];
        if (!currentPromoIDs.includes(promoId)) {
          form.setFields([{ name: fieldName, value: [...currentPromoIDs, promoId] }]);
        }
      }
      else {
        form.setFields([{ name: fieldName, value: promoId }]);
      }
      setDropdownVisibility(false);
    }
    else {
      dispatch(ToastCreators.error({ message: t('INVALID_PROMO_ID') }));
    }
  };

  const renderDropDownMenu = menu => {
    return (
      <CustomDropdown menu={menu} isPending={isPending} addItem={addItem} />
    );
  };

  const searchPromo = searchString => {
    if (searchString.length >= 3) {
      dispatch(Creators.getPromosByTargetDomainRequest({
        promoType: PROMO_TYPE.LOCALS_PROMO,
        filterParams: getPromoQueryParamsForTargetDomain(PROMO_TYPE.LOCALS_PROMO, searchString),
      }));
    }
  };

  return (
    <Form.Item
      name={fieldName}
      label={inline ? null : t('LOCALS_PROMO')}
      className="d-inline"
      rules={rules}
    >
      <Select
        suffixIcon={isPending && <LoadingOutlined spin />}
        mode={hasMultiple ? 'multiple' : 'default'}
        disabled={disabled || isPending}
        filterOption={getSelectFilterOption}
        placeholder={`${t('LOCALS_PROMO')}`}
        allowClear
        onSearch={debounce(searchPromo, DEFAULT_DEBOUNCE_MS)}
        options={localsPromoList}
        showSearch
        onDropdownVisibleChange={val => {
          setDropdownVisibility(val);
        }}
        dropdownRender={renderDropDownMenu}
        open={dropdownVisibility}
      />
    </Form.Item>
  );
};

export default LocalsPromoSelect;
