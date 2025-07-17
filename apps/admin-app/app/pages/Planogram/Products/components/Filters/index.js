import React, { useMemo } from 'react';
import { Row, Col, Form, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';

import {
  Button,
  FormItem,
  Select,
  Space,
  TextInput,
} from '@shared/components/GUI';

import { Creators } from '@app/pages/Planogram/Products/redux/actions';
import {
  getCustomDomainTypeOptions,
  getSelectFilterOption,
  selectFormatter,
} from '@app/pages/Planogram/formHelper';
import { PLANOGRAM_PRODUCT_DOMAIN_TYPES } from '@shared/shared/constantValues';
import {
  getDemographiesSelector,
  getSizesSelector,
} from '@app/pages/Planogram/Products/redux/selectors';

const Filters = React.memo(({ setFormValues }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('planogramPage');
  const [form] = Form.useForm();

  const demographyList = useSelector(getDemographiesSelector.getData);
  const sizeList = useSelector(getSizesSelector.getData);

  const useProductFilters = () => {
    const sizeListIsPending = useSelector(getSizesSelector.getIsPending);
    const demographyListIsPending = useSelector(
      getDemographiesSelector.getIsPending,
    );
    return { isPending: sizeListIsPending || demographyListIsPending };
  };
  const { isPending } = useProductFilters();

  const initialPagination = useMemo(() => ({ page: 1, pageSize: 10 }), []);

  const isEmptyValue = item => isEmpty(item) || item === undefined || item === null || item?.length === 0;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { productName: null, productId: null, domainTypes: [] },
    onSubmit: values => {
      setFormValues(values);
      let body = { ...initialPagination, filter: {} };
      Object.entries(values).map(([key, value]) => {
        if (key === 'isLocal' || !isEmptyValue(value)) {
          body = {
            ...body,
            filter: { ...body.filter, [key]: value },
          };
        }
        return body;
      });
      dispatch(Creators.getPlanogramProductListRequest({ body }));
    },
  });
  const { handleSubmit, values, setValues } = formik;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      id="planogram_product_filter"
    >
      <Space title={t('FILTER')} className="w-100">
        <Row gutter={[8, 8]}>
          <Col span={8}>
            <FormItem name="productName">
              <TextInput
                label={(
                  <label htmlFor="product-name">
                    {t('PRODUCT_LIST.FILTER_AND_TABLE.PRODUCT_NAME')}
                  </label>
                )}
                id="product-name"
                onChange={({ target: { value } }) => setValues({ ...values, productName: value })}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem name="productId">
              <TextInput
                label={(
                  <label htmlFor="product-id">
                    {(t('PRODUCT_LIST.FILTER_AND_TABLE.PRODUCT_ID'))}
                  </label>
                )}
                id="product-id"
                onChange={({ target: { value } }) => setValues({ ...values, productId: value })}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem name="domainTypes">
              <Select
                optionsData={getCustomDomainTypeOptions(
                  PLANOGRAM_PRODUCT_DOMAIN_TYPES,
                )}
                label={(
                  <label htmlFor="domain-type">
                    {t('PRODUCT_LIST.FILTER_AND_TABLE.DOMAIN')}
                  </label>
                )}
                id="domain-type"
                name="domainTypes"
                allowClear
                mode="multiple"
                onChange={value => setValues({ ...values, domainTypes: value })}
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={8}>
            <FormItem name="demographyIds">
              <Select
                label={(
                  <label htmlFor="demography-id">
                    {t('PRODUCT_LIST.FILTER_AND_TABLE.DEMOGRAPHY')}
                  </label>
                )}
                id="demography-id"
                name="demographyIds"
                mode="multiple"
                allowClear
                filterOption={getSelectFilterOption}
                loading={isPending}
                optionsData={
                  demographyList?.length > 0
                    ? selectFormatter(demographyList)
                    : []
                }
                onChange={value => setValues({ ...values, demographyIds: value })}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem name="sizeIds">
              <Select
                label={(
                  <label htmlFor="size-id">
                    {t('PRODUCT_LIST.FILTER_AND_TABLE.SIZE')}
                  </label>
                )}
                id="size-id"
                name="sizeIds"
                mode="multiple"
                allowClear
                filterOption={getSelectFilterOption}
                loading={isPending}
                optionsData={sizeList?.length > 0 ? selectFormatter(sizeList) : []}
                onChange={value => setValues({ ...values, sizeIds: value })}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem name="isLocal">
              <span className="mr-2">
                {t('PRODUCT_LIST.FILTER_AND_TABLE.IS_LOCAL')}
              </span>
              <Switch
                checkedChildren="ON"
                unCheckedChildren="OFF"
                name="isLocal"
                checked={values?.isLocal}
                loading={isPending}
                onChange={value => setValues({ ...values, isLocal: value })}
              />
            </FormItem>
          </Col>
        </Row>
        <Row justify="end">
          <Button
            size="small"
            form="planogram_product_filter"
            htmlType="submit"
            loading={isPending}
          >
            {t('global:APPLY')}
          </Button>
        </Row>
      </Space>
    </Form>
  );
});

export default Filters;
