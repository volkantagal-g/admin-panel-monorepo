import { FC, useEffect, useMemo } from 'react';
import { Button, Col, Collapse, Form, Row, Select, Space, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';

import { validate } from '@shared/yup';
import useStyles from './styles';
import {
  getInitialValues,
  getPromoMechanicOptions,
  getStatusTypesOptions,
  getValuesBeforeSearch,
  validationSchema,
} from './formHelper';
import { convertConstantValuesToSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import { getResponsibleDepartmentsOptions } from '@app/pages/Promo/Detail/components/ClassificationForm/formHelper';
import { IFilters, PaginationType, ResponsibleDepartment } from '../../interfaces';
import { allDomainTypes } from '@app/pages/Promo/constantValues';

const { Panel } = Collapse;

type FiltersProps = {
  onSearch: (filters: IFilters) => void;
  isSearchPending: boolean;
  responsibleDepartments: ResponsibleDepartment[];
  pagination: PaginationType;
  onFiltersChange: (filters: IFilters) => void;
  resetForm: boolean;
  setResetForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filters: FC<FiltersProps> = ({
  onSearch,
  isSearchPending,
  responsibleDepartments,
  pagination,
  onFiltersChange,
  resetForm,
  setResetForm,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('excludePromoProducts');
  const [form] = Form.useForm();

  const initialValues = useMemo(() => getInitialValues(), []);

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(() => validationSchema()),
    initialValues,
    onSubmit: values => {
      const body: IFilters = getValuesBeforeSearch(values);
      onSearch(body);
    },
  });

  const { handleSubmit, setFieldValue, values, errors, resetForm: formikReset } = formik;

  useEffect(() => {
    const body: IFilters = getValuesBeforeSearch(values);
    onSearch(body);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.currentPage, pagination.rowsPerPage]);

  useEffect(() => {
    onFiltersChange(getValuesBeforeSearch(values));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    if (resetForm) {
      formikReset();
      setResetForm(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetForm]);

  return (
    <Row gutter={[8, 8]} className="mb-2">
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Form
                form={form}
                id="promo-form"
                onFinish={handleSubmit}
                layout="vertical"
              >
                <Row gutter={[8, 8]}>
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label={t('DOMAIN_TYPES')}
                      help={get(errors, 'domainTypes')}
                      validateStatus={get(errors, 'domainTypes') ? 'error' : 'success'}
                    >
                      <Select
                        placeholder={t('DOMAIN_TYPES')}
                        className="w-100"
                        labelInValue
                        mode="multiple"
                        options={convertConstantValuesToSelectOptions(allDomainTypes)}
                        value={values.domainTypes}
                        onChange={domainTypes => {
                          setFieldValue('domainTypes', domainTypes);
                        }}
                        allowClear
                        showSearch
                        filterOption={getSelectFilterOption}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      help={get(errors, 'status')}
                      validateStatus={get(errors, 'status') ? 'error' : 'success'}
                      label={t('STATUS')}
                    >
                      <Select
                        placeholder={t('STATUS')}
                        className="w-100"
                        labelInValue
                        options={getStatusTypesOptions()}
                        onChange={status => {
                          setFieldValue('status', status);
                        }}
                        value={values.status}
                        allowClear
                        showSearch
                        filterOption={getSelectFilterOption}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item label={t('DEPARTMENT_TYPE')}>
                      <Select
                        placeholder={t('DEPARTMENT_TYPE')}
                        className="w-100"
                        labelInValue
                        options={getResponsibleDepartmentsOptions(responsibleDepartments)}
                        onChange={responsibleDepartment => {
                          setFieldValue('responsibleDepartment', responsibleDepartment);
                        }}
                        allowClear
                        value={values.responsibleDepartment}
                        showSearch
                        filterOption={getSelectFilterOption}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      help={get(errors, 'promoMechanic')}
                      validateStatus={get(errors, 'promoMechanic') ? 'error' : 'success'}
                      label={t('USAGE_TYPE')}
                    >
                      <Select
                        placeholder={t('USAGE_TYPE')}
                        className="w-100"
                        labelInValue
                        value={values.promoMechanic}
                        options={getPromoMechanicOptions()}
                        onChange={promoMechanic => {
                          setFieldValue('promoMechanic', promoMechanic);
                        }}
                        allowClear
                        showSearch
                        filterOption={getSelectFilterOption}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label={t('IS_FREE_PRODUCT')}
                    >
                      <Switch
                        checked={values.isFreeProduct}
                        checkedChildren={t('TRUE')}
                        unCheckedChildren={t('FALSE')}
                        className={`${values.isFreeProduct ? 'bg-success' : 'bg-danger'} mb-1 ml-3`}
                        onChange={isFreeProduct => setFieldValue('isFreeProduct', isFreeProduct)}
                      />
                    </Form.Item>
                  </Col>

                </Row>
                <Col>
                  <div className={classes.submitButtonContainer}>
                    <Button
                      size="middle"
                      type="primary"
                      htmlType="submit"
                      disabled={isSearchPending}
                    > {t('global:BRING')}
                    </Button>
                  </div>
                </Col>
              </Form>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filters;
