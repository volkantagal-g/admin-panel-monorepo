import { memo, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'antd';

import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import { Select, Checkbox } from '@shared/components/GUI';

import {
  extractSupplierAndManufacturer,
  getSupplierAccounts,
  getSupplierAndManufacturerOptions,
} from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/util';
import { getSuppliersSelector } from '@shared/redux/selectors/common';
import { getSelectFilterOption } from '@shared/utils/common';
import { createBuyingPriceFinancialsSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';

export const SelectItems = memo(function SelectItems({ errors, handleFormValueChange, values }) {
  const { t } = useTranslation('marketProductPageV2');
  const suppliers = useSelector(getSuppliersSelector.getData);
  const isSupplierPending = useSelector(getSuppliersSelector.getIsPending);

  const isPending = useSelector(createBuyingPriceFinancialsSelector.getIsPending);
  const getError = useSelector(createBuyingPriceFinancialsSelector.getError);

  const [selectedSupplierId, setSelectedSupplierId] = useState([]);

  const { supplier } = useMemo(
    () => extractSupplierAndManufacturer(suppliers),
    [suppliers],
  );

  const supplierOptions = useMemo(() => getSupplierAndManufacturerOptions(supplier), [supplier]);
  const supplierAccounts = useMemo(() => getSupplierAccounts({
    supplier,
    selectedSupplierId,
  }), [supplier, selectedSupplierId]);

  const handleSupplierChange = value => {
    if (!value) {
      setSelectedSupplierId([]);
    }
    else {
      setSelectedSupplierId(value);
    }
    handleFormValueChange('supplierId', value);
  };

  useEffect(() => {
    if (!getError && !isPending) {
      setSelectedSupplierId([]);
    }
  }, [getError, isPending]);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12} lg={8}>
        <Select
          dataTestId="supplier"
          name="supplierId"
          label={t('SUPPLIER')}
          showSearch
          filterOption={getSelectFilterOption}
          optionsData={supplierOptions}
          onChange={handleSupplierChange}
          loading={isSupplierPending}
          allowClear
          errors={errors}
          value={values?.supplierId}
        />
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Select
          dataTestId="account"
          name="supplierAccountCodes"
          optionsData={supplierAccounts}
          onChange={supplierAccountCodes => handleFormValueChange('supplierAccountCodes', supplierAccountCodes)}
          label={t('SUPPLIER_ACOUNT')}
          mode="multiple"
          errors={errors}
          value={values?.supplierAccountCodes}
        />
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Checkbox
          name="isPreferred"
          onChange={event => handleFormValueChange('isPreferred', event.target.checked)}
          checked={values?.isPreferred}
        >
          {t('IS_PREFERRED')}
        </Checkbox>
      </Col>
    </Row>
  );
});
