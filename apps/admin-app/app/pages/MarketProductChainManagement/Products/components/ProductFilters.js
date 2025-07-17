import React, { useCallback } from 'react';
import { Row, Col, Form, Switch, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

import { getLangKey } from '@shared/i18n';
import { productSegments } from '@shared/shared/constantValues';
import { FormItem } from '@shared/components/GUI/FormItem';
import { FloatingLabel } from '@shared/components/GUI/FloatingLabel';
import magnifyingGlass from '@app/pages/MarketProductChainManagement/assets/Icons/magnifying-glass.svg';
import chevronDown from '@app/pages/MarketProductChainManagement/assets/Icons/chevron-down.svg';
import { colors } from '@app/pages/MarketProductChainManagement/styleVariables';
import { getSelectFilterOption } from '@shared/utils/common';

const useStyles = createUseStyles({
  formContainer: {
    position: 'relative',
    padding: '16px 16px 8px',
    background: colors.backgroundWhite,
    borderRadius: '8px 8px 0 0',
    borderBottom: 'none',
  },
  filterRow: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 -8px',
  },
  filterCol: {
    padding: '0 8px',
    '& .ant-form-item': {
      margin: '0 0 16px !important',
      width: '100% !important',
    },
    '& .ant-select': {
      width: '100% !important',
      '& .ant-select-selector': {
        height: '48px !important',
        borderRadius: '8px !important',
        display: 'flex !important',
        alignItems: 'center !important',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        border: `1px solid ${colors.borderGray} !important`,
        '&:hover': { borderColor: `${colors.purple} !important` },
      },
      '& .ant-select-focused .ant-select-selector': {
        borderColor: `${colors.purple} !important`,
        boxShadow: '0 0 0 2px rgba(135, 94, 196, 0.2) !important',
      },
      '& .ant-select-selection-search': {
        height: '46px !important',
        display: 'flex !important',
        alignItems: 'center !important',
        '& .ant-select-selection-search-input': {
          marginTop: '12px !important',
          height: '24px !important',
        },
      },
      '& .ant-select-selection-item': {
        display: 'flex !important',
        alignItems: 'center !important',
        lineHeight: '20px !important',
        marginTop: '16px !important',
        paddingTop: '0 !important',
      },
      '& .ant-select-arrow': {
        top: '50%',
        right: '11px',
        width: '12px',
        height: '12px',
        marginTop: '-6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
  searchCol: {
    padding: '0 8px',
    '& .ant-form-item': {
      margin: '0 0 16px !important',
      width: '100% !important',
    },
    '& .ant-input-affix-wrapper': {
      height: '48px !important',
      borderRadius: '8px !important',
      border: `1px solid ${colors.borderGray}`,
      '&:hover': { borderColor: `${colors.purple}` },
      '&:focus, &-focused': {
        borderColor: `${colors.purple} !important`,
        boxShadow: '0 0 0 2px rgba(135, 94, 196, 0.2) !important',
      },
      '& .ant-input-prefix': { marginRight: '12px' },
    },
    '& .ant-input': {
      height: '100% !important',
      fontSize: '14px !important',
    },
    '& .ant-form-item-control-input': { minHeight: '36px !important' },
    '& .flabel': { left: '36px !important' },
  },
  floatingLabelContainer: {
    position: 'relative',
    display: 'flex',
    '& .flabel': {
      color: colors.textLight,
      position: 'absolute',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '16px',
      transform: 'translate(0, 16px)',
      transformOrigin: 'top left',
      transition: 'all 200ms ease',
      left: '12px',
      zIndex: 1,
      pointerEvents: 'none',
    },
    '& input:not([value=""]) + .flabel, & .ant-select-focused + .flabel, & .ant-select:has(.ant-select-selection-item) + .flabel': {
      color: colors.purple,
      transform: 'translate(0, 0px)',
      fontSize: '12px',
      top: '8px',
      zIndex: 1,
      pointerEvents: 'none',
    },
    '& input:focus + .flabel': {
      color: colors.purple,
      transform: 'translate(0, 0px)',
      fontSize: '12px',
      top: '8px',
    },
  },
  switchContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxHeight: '48px',
    height: '48px',
    justifyContent: 'space-between',
    paddingTop: '4px',
    paddingBottom: '4px',
    '& .ant-form-item-label': {
      padding: 0,
      marginBottom: '4px',
      lineHeight: '14px',
      height: '14px',
      '& label': {
        fontSize: '12px',
        lineHeight: '14px',
        color: colors.textLight,
        height: '14px',
      },
    },
    '& .ant-form-item-control': { marginTop: '0' },
    '& .ant-switch': {
      minWidth: '44px',
      height: '22px',
      borderRadius: '11px',
      '&.ant-switch-checked': {
        backgroundColor: colors.purple,
        boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.3)',
        transition: 'all 0.3s ease',
        '&:after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '11px',
          boxShadow: '0 0 8px rgba(135, 94, 196, 0.6)',
          opacity: 0.7,
          pointerEvents: 'none',
        },
      },
      '& .ant-switch-handle': {
        width: '18px',
        height: '18px',
        top: '2px',
        left: '2px',
      },
      '&.ant-switch-checked .ant-switch-handle': { left: 'calc(100% - 18px - 2px)' },
    },
  },
  switchStyle: {
    minWidth: '44px',
    width: '44px',
    maxWidth: '44px',
    height: '22px',
    borderRadius: '11px',
    flexShrink: 0,
    '&.ant-switch-checked': {
      backgroundColor: colors.purple,
      boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.3)',
      transition: 'all 0.3s ease',
      '&:after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '11px',
        boxShadow: '0 0 8px rgba(135, 94, 196, 0.6)',
        opacity: 0.7,
        pointerEvents: 'none',
      },
    },
    '& .ant-switch-handle': {
      width: '18px',
      height: '18px',
      top: '2px',
      left: '2px',
    },
    '&.ant-switch-checked .ant-switch-handle': { left: 'calc(100% - 18px - 2px)' },
  },
  customSearch: {
    '& .ant-input': { paddingLeft: '36px !important' },
    '& .flabel': {
      left: '36px !important',
      transform: 'translate(0, 16px) !important',
    },
    '& input:focus + .flabel, & input:not([value=""]) + .flabel': {
      color: colors.purple,
      transform: 'translate(0, 0px) !important',
      fontSize: '12px',
      top: '8px',
      left: '36px !important',
    },
  },
});

const DOMAIN_COL_SPANS = {
  xs: 24,
  sm: 12,
  md: 6,
  lg: 4,
  xl: 4,
};

const SEGMENT_COL_SPANS = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 8,
  xl: 8,
};

const CATEGORY_COL_SPANS = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 8,
  xl: 8,
};

const DEMOGRAPHY_COL_SPANS = {
  xs: 24,
  sm: 12,
  md: 6,
  lg: 4,
  xl: 4,
};

const SIZE_COL_SPANS = {
  xs: 24,
  sm: 12,
  md: 6,
  lg: 4,
  xl: 4,
};

const ISLOCAL_COL_SPANS = {
  xs: 24,
  sm: 12,
  md: 6,
  lg: 4,
  xl: 4,
};

const SEARCH_COL_SPANS = {
  xs: 24,
  sm: 24,
  md: 18,
  lg: 12,
  xl: 12,
};

const ProductFilters = ({
  filters,
  onFilterChange,
  demographies,
  demographiesLoading,
  sizes,
  sizesLoading,
  domainTypes,
  domainTypesLoading,
  categories,
  categoriesLoading,
}) => {
  const { t } = useTranslation('marketProductChainManagement');
  const [form] = Form.useForm();
  const classes = useStyles();

  // Form değişikliklerinde filtreleri güncelle
  const handleFormFinish = useCallback(values => {
    onFilterChange(values);
  }, [onFilterChange]);

  // Search input için özel handler
  const handleSearchChange = useCallback(e => {
    const { value } = e.target;
    form.setFieldsValue({ search: value });

    // Debounce uygulanmış form submit
    setTimeout(() => {
      form.submit();
    }, 500);
  }, [form]);

  // Enter tuşuna basıldığında
  const handlePressEnter = useCallback(() => {
    form.submit();
  }, [form]);

  // Select değişikliği için handler
  const handleSelectChange = useCallback((value, name) => {
    form.setFieldsValue({ [name]: value });
    form.submit();
  }, [form]);

  // Seçenek listeleri
  const domainOptions = React.useMemo(() => {
    if (domainTypes && Array.isArray(domainTypes) && domainTypes.length > 0) {
      return domainTypes;
    }
    return [];
  }, [domainTypes]);

  const demographyOptions = React.useMemo(() => {
    if (!demographies || !Array.isArray(demographies) || !demographies.length) {
      return [];
    }
    return demographies;
  }, [demographies]);

  const sizeOptions = React.useMemo(() => {
    if (!sizes || !Array.isArray(sizes) || !sizes.length) {
      return [];
    }
    return sizes;
  }, [sizes]);

  const segmentOptions = React.useMemo(() => {
    return Object.entries(productSegments).map(([value, labels]) => ({
      value,
      label: labels[getLangKey()] || labels.en,
    }));
  }, []);

  const categoryOptions = React.useMemo(() => {
    if (!categories || !Array.isArray(categories) || !categories.length) {
      return [];
    }
    return categories;
  }, [categories]);

  // Form değerlerini mevcut filtrelerden ayarla
  React.useEffect(() => {
    form.setFieldsValue(filters);
  }, [form, filters]);

  return (
    <div className={classes.formContainer}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormFinish}
        initialValues={filters}
      >
        <Row gutter={[16, 0]} className={classes.filterRow}>
          <Col {...SEARCH_COL_SPANS} className={classes.searchCol}>
            <Form.Item name="search" className={classes.customSearch}>
              <FloatingLabel label={t('SEARCH')}>
                <Input
                  prefix={<img src={magnifyingGlass} alt="search" style={{ marginRight: '8px', width: '16px', height: '16px' }} />}
                  onChange={handleSearchChange}
                  onPressEnter={handlePressEnter}
                  allowClear
                />
              </FloatingLabel>
            </Form.Item>
          </Col>

          <Col {...DOMAIN_COL_SPANS} className={classes.filterCol}>
            <FormItem name="domain">
              <FloatingLabel label={t('DOMAIN')}>
                <Select
                  allowClear
                  showSearch
                  filterOption={getSelectFilterOption}
                  onChange={value => handleSelectChange(value, 'domain')}
                  options={domainOptions}
                  loading={domainTypesLoading}
                  suffixIcon={<img src={chevronDown} alt="chevron-down" />}
                />
              </FloatingLabel>
            </FormItem>
          </Col>

          <Col {...SEGMENT_COL_SPANS} className={classes.filterCol}>
            <FormItem name="segment">
              <FloatingLabel label={t('SEGMENT')}>
                <Select
                  allowClear
                  showSearch
                  filterOption={getSelectFilterOption}
                  onChange={value => handleSelectChange(value, 'segment')}
                  options={segmentOptions}
                  suffixIcon={<img src={chevronDown} alt="chevron-down" />}
                />
              </FloatingLabel>
            </FormItem>
          </Col>

          <Col {...CATEGORY_COL_SPANS} className={classes.filterCol}>
            <FormItem name="category">
              <FloatingLabel label={t('CATEGORY_LABEL')}>
                <Select
                  allowClear
                  showSearch
                  filterOption={getSelectFilterOption}
                  onChange={value => handleSelectChange(value, 'category')}
                  options={categoryOptions}
                  loading={categoriesLoading}
                  suffixIcon={<img src={chevronDown} alt="chevron-down" />}
                />
              </FloatingLabel>
            </FormItem>
          </Col>

          <Col {...DEMOGRAPHY_COL_SPANS} className={classes.filterCol}>
            <FormItem name="demography">
              <FloatingLabel label={t('DEMOGRAPHY')}>
                <Select
                  allowClear
                  showSearch
                  filterOption={getSelectFilterOption}
                  onChange={value => handleSelectChange(value, 'demography')}
                  options={demographyOptions}
                  loading={demographiesLoading}
                  suffixIcon={<img src={chevronDown} alt="chevron-down" />}
                />
              </FloatingLabel>
            </FormItem>
          </Col>

          <Col {...SIZE_COL_SPANS} className={classes.filterCol}>
            <FormItem name="size">
              <FloatingLabel label={t('SIZE')}>
                <Select
                  allowClear
                  showSearch
                  filterOption={getSelectFilterOption}
                  onChange={value => handleSelectChange(value, 'size')}
                  options={sizeOptions}
                  loading={sizesLoading}
                  suffixIcon={<img src={chevronDown} alt="chevron-down" />}
                />
              </FloatingLabel>
            </FormItem>
          </Col>

          <Col {...ISLOCAL_COL_SPANS} className={classes.filterCol}>
            <Form.Item
              name="isLocal"
              valuePropName="checked"
              className={classes.filterCol}
              style={{ marginBottom: '16px' }}
            >
              <div style={{
                height: '48px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              >
                <div style={{
                  fontSize: '12px',
                  color: colors.textLight,
                  marginBottom: '6px',
                }}
                >
                  {t('IS_LOCAL')}
                </div>
                <Switch
                  onChange={checked => {
                    form.setFieldsValue({ isLocal: checked });
                    form.submit();
                  }}
                  size="small"
                  className={classes.switchStyle}
                  style={{ width: '44px', flexShrink: 0 }}
                />
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ProductFilters;
