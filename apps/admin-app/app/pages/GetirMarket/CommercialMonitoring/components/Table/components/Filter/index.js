import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse, Row, Col, Input, Typography } from 'antd';

import AntSelect from '@shared/components/UI/AntSelect';
import AntRadioGroup from '@shared/components/UI/AntRadioGroup';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { convertSelectOptions, isMobile, getSelectFilterOption } from '@shared/utils/common';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import {
  getSuppliersSelector,
  getMarketProductCategoriesSelector,
  getMarketProductSubCategoriesSelector,
} from '@shared/redux/selectors/common';
import { Creators } from '../../../../redux/actions';
import {
  availabilitySelector,
  instantAvailabilitySelector,
  productSaleStatsSelector,
  tableFiltersSelector,
} from '../../../../redux/selectors';
import {
  getFilteredSelectedSubCategoryBySelectedCategories,
  getFilteredSubCategories,
  getTableTypeButtonOptions,
} from '../../utils';

const { Panel } = Collapse;
const { Text } = Typography;

const GetirMarketCommercialMonitoringMainTable = () => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();

  const isMobileDevice = !!isMobile();

  const tableFilters = useSelector(tableFiltersSelector.getAllFilters);
  const suppliers = useSelector(getSuppliersSelector.getData);
  const categories = useSelector(getMarketProductCategoriesSelector.getData);
  const subCategories = useSelector(getMarketProductSubCategoriesSelector.getData);
  const isProductSaleStatsPending = useSelector(productSaleStatsSelector.getIsPending);
  const isAvailabilityPending = useSelector(availabilitySelector.getIsPending);
  const isInstantAvailabilityPending = useSelector(instantAvailabilitySelector.getIsPending);
  const isDisabledAllInputs = isProductSaleStatsPending && isAvailabilityPending && isInstantAvailabilityPending;

  const supplierSelectOptions = useMemo(() => convertSelectOptions(suppliers), [suppliers]);
  const categorySelectOptions = useMemo(() => convertSelectOptions(categories, { isTranslation: true }), [categories]);
  const subCategorySelectOptions = useMemo(() => {
    const filteredSubCategories = getFilteredSubCategories({
      subCategories,
      selectedCategories: tableFilters.categories,
    });

    return convertSelectOptions(filteredSubCategories, { isTranslation: true });
  }, [subCategories, tableFilters.categories]);
  const tableTypeButtonOptions = getTableTypeButtonOptions({ t, isMobile: isMobileDevice });

  const handleTableTypeChangeButtonsClick = event => {
    const { value } = event.target;

    dispatch(Creators.setTableFilterParams({ filterParams: { tableType: value } }));
  };

  const handleSearch = event => {
    const searchTerm = event?.target?.value?.trim();
    dispatch(Creators.setTableFilterParams({ filterParams: { searchTerm } }));
  };

  const handleGenericSelectChange = (key, selectedItems = []) => {
    if (key === 'categories') {
      const tempSelectedCategories = getFilteredSelectedSubCategoryBySelectedCategories({
        selectedSubCategories: tableFilters.subCategories,
        selectedCategories: selectedItems,
        subCategories,
      });
      dispatch(Creators.setTableFilterParams({ filterParams: { subCategories: tempSelectedCategories } }));
    }

    dispatch(Creators.setTableFilterParams({ filterParams: { [key]: selectedItems } }));
  };

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  return (
    <Collapse defaultActiveKey={['tableFilters']}>
      <Panel key="tableFilters" header={t('global:FILTER')}>
        <Row gutter={[8, 8]}>
          <Col xxl={6} sm={12} xs={24}>
            <Text strong>{t('global:SEARCH')}</Text>
            <Input
              allowClear
              placeholder={t('global:SEARCH')}
              onChange={debouncedHandleSearch}
              disabled={isDisabledAllInputs}
            />
          </Col>
          <Col xxl={6} sm={12} xs={24}>
            <Text strong>{t('global:SUPPLIER')}</Text>
            <AntSelect
              value={tableFilters.suppliers}
              options={supplierSelectOptions}
              filterOption={getSelectFilterOption}
              mode="multiple"
              placeholder={t('global:SUPPLIER')}
              onChange={(_suppliers = []) => handleGenericSelectChange('suppliers', _suppliers)}
              maxTagCount="responsive"
              disabled={isDisabledAllInputs}
              className="w-100"
              allowClear
            />
          </Col>
          <Col xxl={6} sm={12} xs={24}>
            <Text strong>{t('global:CATEGORY')}</Text>
            <AntSelect
              value={tableFilters.categories}
              options={categorySelectOptions}
              filterOption={getSelectFilterOption}
              mode="multiple"
              placeholder={t('global:CATEGORY')}
              onChange={(_categories = []) => handleGenericSelectChange('categories', _categories)}
              maxTagCount="responsive"
              disabled={isDisabledAllInputs}
              className="w-100"
              allowClear
            />
          </Col>
          <Col xxl={6} sm={12} xs={24}>
            <Text strong>{t('global:SUB_CATEGORY')}</Text>
            <AntSelect
              value={tableFilters.subCategories}
              options={subCategorySelectOptions}
              filterOption={getSelectFilterOption}
              mode="multiple"
              disabled={isDisabledAllInputs || tableFilters.categories?.length === 0}
              onChange={(_subCategories = []) => handleGenericSelectChange('subCategories', _subCategories)}
              placeholder={t('global:SUB_CATEGORY')}
              maxTagCount="responsive"
              className="w-100"
              allowClear
            />
          </Col>
          <Col xxl={6} sm={12} xs={24}>
            <AntRadioGroup
              options={tableTypeButtonOptions}
              onChange={handleTableTypeChangeButtonsClick}
              value={tableFilters.tableType}
              disabled={isDisabledAllInputs}
              fullWidth={isMobileDevice}
              optionType="button"
            />
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};

export default GetirMarketCommercialMonitoringMainTable;
