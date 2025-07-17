import { memo, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Col, Form, Row } from 'antd';

import { useParams } from 'react-router-dom';

import { useFormik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';

import { Space, EditSaveCancelButtons, Select } from '@shared/components/GUI';

import { usePrevious, usePermission } from '@shared/hooks';
import { getOnlyModifiedValuesBeforeSubmit, getInitialValues, getMasterCategoriesV2Options } from './formHelper';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { canSubmit } from '@shared/utils/formHelper';
import {
  createSupplyLogisticInfoSelector,
  getSupplyLogisticInfoSelector,
  updateSupplyLogisticInfoSelector,
  getMasterCategoriesV2Selector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { MASTER_CATEGORY_PAYLOAD_FIELDS, PRODUCT_DETAIL_CONTAINER } from '@app/pages/MarketProduct/constants';
import { FORM_IDS_SUPPLY, LAZY_LOAD_LIMIT_TO_INCREASE } from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/constants';
import useProductActivationErrors from '@app/pages/MarketProduct/DetailV2/hooks/useProductActivationErrors';
import permKey from '@shared/shared/permKey.json';

export const MasterCategoryV2Info = memo(function MasterCategoryV2Info() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { t } = useTranslation('marketProductPageV2');

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

  const getMasterCategoriesV2Data = useSelector(getMasterCategoriesV2Selector.getData);
  const getMasterCategoriesV2Pending = useSelector(getMasterCategoriesV2Selector.getIsPending);
  const getMasterCategoriesV2DataOptions = useMemo(
    () => (getMasterCategoriesV2Options(getMasterCategoriesV2Data, supplyLogisticInfo)),
    [getMasterCategoriesV2Data, supplyLogisticInfo],
  );

  const activationErrorsForMasterCategory = useProductActivationErrors({ containerId: PRODUCT_DETAIL_CONTAINER.MASTER_CATEGORY_V2.containerId });

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
      dispatch(Creators.createOrUpdateSupplyLogisticInfoRequest({ id, body, isCreated, errors: activationErrorsForMasterCategory }));
    },
  });
  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;
  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );

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

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };
  const handleEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };
  const handleSelectCategory = value => {
    setFieldValue('level4Id', value);
  };

  const handleSearchValue = searchValue => {
    if (searchValue !== '') {
      setSearch(true);
      dispatch(Creators.getMasterCategoriesV2Request({
        queryText: searchValue,
        level: MASTER_CATEGORY_PAYLOAD_FIELDS.LEVEL4,
      }));
    }
    else {
      setSearch(false);
      dispatch(Creators.getMasterCategoriesV2Request({
        level: MASTER_CATEGORY_PAYLOAD_FIELDS.LEVEL4,
        limit,
      }));
    }
  };

  const handleScroll = ({ target }) => {
    const { scrollTop, offsetHeight, scrollHeight } = target;
    if ((scrollTop + offsetHeight === scrollHeight) && !search && !getMasterCategoriesV2Pending) {
      setLimit(prevState => prevState + LAZY_LOAD_LIMIT_TO_INCREASE);
      dispatch(Creators.getMasterCategoriesV2Request({
        level: MASTER_CATEGORY_PAYLOAD_FIELDS.LEVEL4,
        limit,
      }));
    }
  };

  const { debouncedCallback: handleDebouncedSearch } = useDebouncedCallback({ callback: handleSearchValue, delay: DEFAULT_DEBOUNCE_MS });

  return (
    <Space
      title={t('MASTER_CATEGORY_V2_INFO.TITLE')}
      errorBadgeProps={{
        title: t('PRODUCT_ACTIVATION_ERRORS'),
        errors: activationErrorsForMasterCategory,
      }}
    >
      <Form form={form} id={FORM_IDS_SUPPLY.MASTER_CATEGORY_V2} onFinish={handleSubmit}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Select
              data-testid="master-category"
              name="level4Id"
              label={t('MASTER_CATEGORY_V2_INFO.MASTER_CATEGORY_V2')}
              optionsData={getMasterCategoriesV2DataOptions}
              value={values?.level4Id}
              onChange={handleSelectCategory}
              disabled={isUpdatePending || !isFormEditable}
              showSearch
              errors={errors}
              onSearch={query => handleDebouncedSearch(query)}
              loading={getMasterCategoriesV2Pending}
              onPopupScroll={handleScroll}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              data-testid="category-role"
              name="categoryRole"
              label={t('MASTER_CATEGORY_V2_INFO.CATEGORY_ROLE')}
              value={values?.categoryRole}
              disabled
            />
          </Col>
        </Row>
        <Can permKey={permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_FIELD_EDIT}>
          <EditSaveCancelButtons
            disabled={!canBeSubmittable}
            form={FORM_IDS_SUPPLY.MASTER_CATEGORY_V2}
            isFormEditable={isFormEditable}
            loading={isPending}
            onCancelClick={handleCancelClick}
            onEditClick={handleEditClick}
          />
        </Can>
      </Form>
    </Space>
  );
});
