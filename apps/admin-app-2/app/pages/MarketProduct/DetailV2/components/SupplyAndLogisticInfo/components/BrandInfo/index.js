import { memo, useState, useMemo, useEffect } from 'react';
import { Col, Form, Row } from 'antd';

import { useFormik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Space, EditSaveCancelButtons, Select } from '@shared/components/GUI';

import {
  getSupplyLogisticInfoSelector, createSupplyLogisticInfoSelector,
  updateSupplyLogisticInfoSelector, getSupplyBrandsSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';

import {
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit, getSupplyBrandsOption,
} from './formHelper';
import { canSubmit } from '@shared/utils/formHelper';
import { usePrevious, usePermission } from '@shared/hooks';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import useProductActivationErrors from '@app/pages/MarketProduct/DetailV2/hooks/useProductActivationErrors';
import { PRODUCT_DETAIL_CONTAINER } from '@app/pages/MarketProduct/constants';
import { LAZY_LOAD_LIMIT_TO_INCREASE } from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/constants';
import permKey from '@shared/shared/permKey.json';

export const BrandInfo = memo(function BrandInfo() {
  const { t } = useTranslation('marketProductPageV2');
  const { id } = useParams();
  const dispatch = useDispatch();

  const { Can } = usePermission();

  const [isFormEditable, setIsFormEditable] = useState(false);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState(false);

  const supplyLogisticInfo = useSelector(getSupplyLogisticInfoSelector.getData);
  const supplyLogisticInfoPending = useSelector(getSupplyLogisticInfoSelector.getIsPending);
  const isCreatePending = useSelector(createSupplyLogisticInfoSelector.getIsPending);
  const isUpdatePending = useSelector(updateSupplyLogisticInfoSelector.getIsPending);
  const isUpdateFailure = useSelector(updateSupplyLogisticInfoSelector.getError);
  const isPending = isCreatePending || isUpdatePending || supplyLogisticInfoPending;
  const prevIsUpdatePending = usePrevious(isPending);

  const getSupplyBrandsData = useSelector(getSupplyBrandsSelector.getData);
  const getSupplyBrandsIsPending = useSelector(getSupplyBrandsSelector.getIsPending);
  const getSupplytBrandsDataOptions = useMemo(
    () => (getSupplyBrandsOption(getSupplyBrandsData, supplyLogisticInfo)),
    [getSupplyBrandsData, supplyLogisticInfo],
  );
  const activationErrors = useProductActivationErrors({ containerId: PRODUCT_DETAIL_CONTAINER.BRAND.containerId });

  const formId = 'brandInfo';
  const [form] = Form.useForm();
  const initialValues = useMemo(
    () => getInitialValues(supplyLogisticInfo),
    [supplyLogisticInfo],
  );
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: values => {
      const { isCreated, ...body } = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      return dispatch(Creators.createOrUpdateSupplyLogisticInfoRequest({ id, body, isCreated, errors: activationErrors }));
    },
  });
  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;
  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };
  const handleEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      if (isUpdateFailure) {
        setValues(values);
      }
      else {
        setIsFormEditable(false);
      }
    }
  }, [initialValues, isUpdateFailure, isUpdatePending, prevIsUpdatePending, setValues, values]);

  const handleInputForm = (field, value) => {
    setFieldValue(field, value);
  };
  const handleSearchValue = searchValue => {
    if (searchValue !== '') {
      setSearch(true);
      dispatch(Creators.getSupplyBrandsRequest({ name: searchValue }));
    }
    else {
      setSearch(false);
      dispatch(Creators.getSupplyBrandsRequest({ limit }));
    }
  };

  const handleScroll = ({ target }) => {
    const { scrollTop, offsetHeight, scrollHeight } = target;
    if ((scrollTop + offsetHeight === scrollHeight) && !search && !getSupplyBrandsIsPending) {
      setLimit(prevState => prevState + LAZY_LOAD_LIMIT_TO_INCREASE);
      dispatch(Creators.getSupplyBrandsRequest({ limit }));
    }
  };

  const { debouncedCallback: handleDebouncedSearch } = useDebouncedCallback({ callback: handleSearchValue, delay: DEFAULT_DEBOUNCE_MS });
  return (
    <Space
      title={t('BRAND_INFO.TITLE')}
      errorBadgeProps={{
        title: t('PRODUCT_ACTIVATION_ERRORS'),
        errors: activationErrors,
      }}
    >
      <Form form={form} id={formId} onFinish={handleSubmit}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Select
              errors={errors}
              dataTestId="brands"
              name="brandId"
              label={t('BRAND_INFO.BRAND')}
              value={values?.brandId}
              optionsData={getSupplytBrandsDataOptions}
              onChange={value => handleInputForm('brandId', value)}
              disabled={isPending || !isFormEditable}
              onSearch={query => handleDebouncedSearch(query)}
              loading={getSupplyBrandsIsPending}
              showSearch
              onPopupScroll={handleScroll}
            />
          </Col>
        </Row>
        <Can permKey={permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_FIELD_EDIT}>
          <EditSaveCancelButtons
            disabled={!canBeSubmittable}
            form={formId}
            isFormEditable={isFormEditable}
            onCancelClick={handleCancelClick}
            onEditClick={handleEditClick}
            loading={isPending}
          />
        </Can>
      </Form>
    </Space>
  );
});
