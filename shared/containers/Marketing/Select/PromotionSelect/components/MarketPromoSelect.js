import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Select, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { LoadingOutlined } from '@ant-design/icons';

import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { promoSelector } from '@shared/containers/Marketing/Select/PromotionSelect/redux/selectors';
import { PROMO_TYPE } from '@shared/containers/Marketing/Select/PromotionSelect/constants';
import { Creators } from '@shared/containers/Marketing/Select/PromotionSelect/redux/actions';
import { getSelectFilterOption, isObjectIdValid } from '@shared/utils/common';
import CustomDropdown from '@shared/containers/Marketing/Select/PromotionSelect/components/CustomDropdown';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';

const noOp = () => {
};

const MarketPromoSelect = ({
  disabled,
  hasMultiple,
  fieldName,
  rules,
  form,
  inline,
  onChange,
  onBlur,
  formHelp,
  formItemClassName,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketing');
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  const isPending = useSelector(promoSelector(PROMO_TYPE.MARKET_PROMO).getIsPending);
  const marketPromoList = useSelector(promoSelector(PROMO_TYPE.MARKET_PROMO).getData);

  useEffect(() => {
    dispatch(Creators.initContainer());
    return () => {
      dispatch(Creators.destroyContainer());
    };
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
      <CustomDropdown
        menu={menu}
        isPending={isPending}
        addItem={addItem}
      />
    );
  };

  const handleChange = value => {
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  const handleSearch = text => {
    if (text?.trim().length >= 3) {
      const filterParams = { promoCode: text };
      dispatch(Creators.getPromosByTargetDomainRequest({ promoType: PROMO_TYPE.MARKET_PROMO, filterParams }));
    }
  };

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({
    callback: handleSearch,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  return (
    <Form.Item
      name={fieldName}
      label={inline ? null : t('PROMO')}
      className={formItemClassName || 'd-inline'}
      rules={rules}
      help={formHelp}
    >
      <Select
        suffixIcon={isPending && <LoadingOutlined spin />}
        disabled={disabled || isPending}
        filterOption={getSelectFilterOption}
        placeholder={`${t('PROMO_CODE')}`}
        allowClear
        mode={hasMultiple ? 'multiple' : 'default'}
        onSearch={debouncedHandleSearch}
        options={marketPromoList}
        showSearch
        onDropdownVisibleChange={val => {
          setDropdownVisibility(val);
        }}
        dropdownRender={renderDropDownMenu}
        open={dropdownVisibility}
        onChange={handleChange}
        onBlur={onBlur || noOp}
      />
    </Form.Item>
  );
};

export default MarketPromoSelect;
