import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get, isEqual } from 'lodash';
import { Col, Collapse, Form, Row, Tooltip } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';

import { getBrandsSelector, getMarketProductCategoriesSelector } from '@shared/redux/selectors/common';

import { Button, Select, Switch } from '@shared/components/GUI';

import {
  downloadP3SegmentClientsSelector,
  generateP3SegmentSelector,
  getP3DetailsSelector,
  getSegmentClientCountsSelector,
  updateClientSegmentSelector,
} from '@app/pages/Promo/Detail/redux/selectors';
import useStyles from './styles';
import {
  getBrandsOptions,
  getCategoryOptions,
  getExcludedPromoAbuserOptions,
  getInitialValues,
  getObjectiveOptions,
  getOnlyModifiedValuesBeforeSubmit,
  getSegmentCount,
  shouldInputRender,
  validationSchema,
} from './formHelper';
import permKey from '@shared/shared/permKey.json';
import { canSubmit } from '@shared/utils/formHelper';
import { usePermission, usePrevious } from '@shared/hooks';
import { Creators } from '../../redux/actions';
import { getSelectFilterOption } from '@shared/utils/common';
import { checkIfSegmentsArray } from './utils';
import { validate } from '@shared/yup';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { P3_ERROR, P3_STATUS } from '@app/pages/Promo/constantValues';
import PromoProductSelect from '@shared/containers/Marketing/Select/PromoProductSelect';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { CopySegmentsModal } from '@app/pages/Promo/Detail/components/OverwriteModal/CopySegmentsModal/CopySegmentsModal';

const { Panel } = Collapse;

const SegmentForm = () => {
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const canEdit = canAccess(permKey.PAGE_PROMO_DETAIL_EDIT);
  const hasAccessToP3 = canAccess(permKey.PAGE_PROMO_DETAIL_COMPONENT_TEST);

  const promo = useSelector(PromoDetailSlice.selectors.promo);
  const isParent = useSelector(PromoDetailSlice.selectors.isParent);
  const { data: p3Details } = useSelector(getP3DetailsSelector.getData);
  const isUpdatePending = useSelector(updateClientSegmentSelector.getIsPending);
  const isP3StatusPending = useSelector(getP3DetailsSelector.getIsPending);
  const updateError = useSelector(updateClientSegmentSelector.getError);
  const segmentClientCounts = useSelector(getSegmentClientCountsSelector.getData);
  const p3SegmentCount = useSelector(getSegmentClientCountsSelector.getData);
  const isSegmentClientCountPending = useSelector(getSegmentClientCountsSelector.getIsPending);
  const downloadSegmentData = useSelector(downloadP3SegmentClientsSelector.getData);
  const isDownloadSegmentClientPending = useSelector(downloadP3SegmentClientsSelector.getIsPending);
  const isP3GeneratePending = useSelector(generateP3SegmentSelector.getIsPending);
  const brands = useSelector(getBrandsSelector.getData);
  const categories = useSelector(getMarketProductCategoriesSelector.getData);

  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('promoPage');
  const prevIsUpdatePending = usePrevious(isUpdatePending);
  const initialValues = useMemo(() => getInitialValues(promo, p3Details), [promo, p3Details]);
  const classes = useStyles();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validate: validate(validationSchema),
    onSubmit: async values => {
      try {
        const body = getOnlyModifiedValuesBeforeSubmit({ values });
        body.regenerate = shouldRegenerate();
        body.isFirstTime = !promo.isP3Enabled;
        body.shouldDelete = shouldDelete();

        if (values.isP3Enabled && !promo.items.length) {
          throw new Error(t('SEGMENT.ERRORS.NO_PRODUCTS'));
        }
        if (values.isP3Enabled && !promo.domainTypes.length) {
          throw new Error(t('SEGMENT.ERRORS.NO_DOMAIN'));
        }
        return dispatch(Creators.updateClientSegmentRequest({ id: get(promo, '_id'), body }));
      }
      catch (error) {
        return dispatch(ToastCreators.error({ error }));
      }
    },

  });

  const { handleSubmit, values, setValues, setFieldValue, errors } = formik;

  const canBeSubmittable = useMemo(() => canSubmit({ initialValues, values }), [initialValues, values]);

  function shouldRegenerate() {
    return !!initialValues.p3Objective && (!isEqual(values, initialValues));
  }

  function shouldDelete() {
    return initialValues.isP3Enabled && !values.isP3Enabled;
  }

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      if (updateError) {
        setValues(initialValues);
      }
      setIsFormEditable(false);
    }
  }, [prevIsUpdatePending, setIsFormEditable, setValues, updateError, isUpdatePending, initialValues]);

  useEffect(() => {
    if (promo.isP3Enabled) {
      dispatch(Creators.getP3DetailsRequest({ id: promo._id }));
    }
  }, [promo, dispatch]);

  useEffect(() => {
    dispatch(CommonCreators.getBrandsRequest());
    dispatch(CommonCreators.getMarketProductCategoriesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (downloadSegmentData?.message === P3_ERROR.PROCESSING) {
      dispatch(ToastCreators.pending({ message: t('SEGMENT.ERRORS.PROCESSING'), toastOptions: { autoClose: false } }));
    }
  }, [downloadSegmentData, dispatch, t]);

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };

  const handleRegenerate = () => {
    const body = getOnlyModifiedValuesBeforeSubmit({ values });
    dispatch(Creators.generateP3SegmentRequest({ id: get(promo, '_id'), ...body, regenerate: true }));
    setIsFormEditable(false);
  };

  const handleGetSegmentClientCounts = () => {
    if (!segmentClientCounts.excludedSegments) {
      const exSegments = promo.clientExSegments;
      const inSegments = promo.clientSegments;
      const body = checkIfSegmentsArray({ included: inSegments, excluded: exSegments });
      dispatch(Creators.getSegmentClientCountsRequest({
        body: {
          ...body,
          isP3Enabled: promo.isP3Enabled,
          id: promo._id,
        },
      }));
    }
  };

  const handleDownloadSegmentClients = () => {
    dispatch(Creators.downloadP3SegmentClientsRequest({ id: promo._id }));
  };

  const renderStatusPill = () => {
    const status = p3Details?.status;
    const label = t(`SEGMENT.P3_STATUS.${status}`);
    switch (status) {
      case P3_STATUS.IN_PROGRESS:
        return <span className={classes.orange}>{label}</span>;
      case P3_STATUS.DONE:
        return (
          <>
            <span className={classes.green}>{label}</span>
            <span className="ml-2">{p3Details?.segmentGenerationDate}
            </span>
          </>
        );
      case P3_STATUS.FAILED:
        return (
          <>
            <span className={classes.red}>{label}</span>
            {p3Details.errorMessage === P3_ERROR.CLIENT_NOT_FOUND ? (
              <span className="ml-2 text-danger">{t('SEGMENT.ERRORS.CLIENT_NOT_FOUND')}</span>) : null}
          </>
        );
      default:
        return null;
    }
  };

  const isP3Completed = () => p3Details?.status === P3_STATUS.DONE || p3Details?.status === P3_STATUS.FAILED;

  const handleP3Toggle = isToggled => {
    if (isToggled && !promo.isP3Enabled) {
      setFieldValue('clientSegments', []);
    }
    else if (isToggled) {
      setFieldValue('clientSegments', initialValues.clientSegments);
    }
    else {
      setFieldValue('clientSegments', []);
    }
    setFieldValue('isP3Enabled', isToggled);
  };

  const mergedProducts = (own, targeted) => {
    return own.concat(targeted);
  };

  const clearExtraFields = () => {
    setFieldValue('ownProducts', []);
    setFieldValue('targetedProducts', []);
    setFieldValue('ownBrands', []);
    setFieldValue('targetedBrands', []);
    setFieldValue('subcategories', []);
  };

  const cardFooter = (
    <Row justify="space-between" gutter={16}>
      <div className="d-flex gap">
        <Col>
          <Button
            type="primary"
            loading={isSegmentClientCountPending}
            onClick={handleGetSegmentClientCounts}
            disabled={!isP3Completed() && promo.isP3Enabled}
            size="small"
            color="secondary"
          >
            {t('SEGMENT.COUNT_SEGMENTS')}
          </Button>
        </Col>
        {values.isP3Enabled && p3Details?.status === P3_STATUS.DONE && (
          <Col>
            <Button
              type="primary"
              loading={isDownloadSegmentClientPending}
              onClick={handleDownloadSegmentClients}
              disabled={p3Details?.status !== P3_STATUS.DONE}
              size="small"
              color="secondary"
            >
              {t('SEGMENT.DOWNLOAD_SEGMENTS')}
            </Button>
          </Col>
        )}
      </div>
      <div className="d-flex">
        {(values.isP3Enabled && isP3Completed()) ? (
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button
                size="small"
                onClick={handleRegenerate}
                loading={isP3GeneratePending}
                disabled={!isEqual(values, initialValues)}
              >
                {t('SEGMENT.REGENERATE_SEGMENTS')}
              </Button>
            </Form.Item>
          </Col>
        ) : (null)}
        {isFormEditable ? (
          <>
            {!promo.isParentPromo && (
            <Col>
              <Form.Item className="mb-0 mt-0">
                <CopySegmentsModal />
              </Form.Item>
            </Col>
            )}
            <Col>
              <Form.Item className="mb-0 mt-0">
                <Button size="small" onClick={handleCancelClick}>
                  {t('button:CANCEL')}
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item className="mb-0 mt-0">
                <Button
                  size="small"
                  type="primary"
                  loading={isUpdatePending}
                  disabled={!canBeSubmittable}
                  onClick={handleSubmit}
                >
                  {t('button:SAVE')}
                </Button>
              </Form.Item>
            </Col>
          </>
        ) : (
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button
                size="small"
                onClick={handleEditClick}
                loading={isP3StatusPending || isP3GeneratePending}
                disabled={p3Details?.status === P3_STATUS.IN_PROGRESS || isParent}
              >
                {t('button:EDIT')}
              </Button>
            </Form.Item>
          </Col>
        )}
      </div>

    </Row>
  );

  return (
    <Form layout="vertical">
      <Row gutter={16} className="mb-2">
        <Col span={19} className="d-flex align-items-center text-align-center">
          <label>
            <span className="mr-2">{t('SEGMENT.AI_GENERATION')}</span>
            <Switch
              checked={values.isP3Enabled}
              onClick={handleP3Toggle}
              checkedChildren="ON"
              unCheckedChildren="OFF"
              disabled={isUpdatePending || !isFormEditable || !hasAccessToP3}
            />
          </label>
          {values.isP3Enabled && (
            <label className="ml-2">
              {renderStatusPill()}
            </label>
          )}
        </Col>
        <Col span={5} className="d-flex text-align-center justify-content-end align-items-center">
          <Tooltip title={t('SEGMENT.INFO')} overlayInnerStyle={{ whiteSpace: 'pre-line', width: '300px' }}>
            <InfoCircleFilled style={{ pointerEvents: 'auto' }} className="icon-type2" />
          </Tooltip>
          <span className="mx-2">{t('SEGMENT.GET_INFO')}</span>
          <span
            style={{ color: 'teal', padding: '2px 8px', borderRadius: 2, border: 'teal 1px solid' }}
          >{t('SEGMENT.NEW')}
          </span>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Select
            allowClear
            mode="tags"
            name="clientSegments"
            label={t('SEGMENT.HEADER_TITLE')}
            value={values.clientSegments}
            onChange={clientSegments => {
              setFieldValue('clientSegments', clientSegments);
            }}
            disabled={isUpdatePending || !isFormEditable || values.isP3Enabled}
            autoComplete="off"
          />
        </Col>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'p3Objective')}
            validateStatus={get(errors, 'p3Objective') ? 'error' : 'success'}
            className={classes.selectGroup}
          >
            <Select
              allowClear
              label={t('SEGMENT.OBJECTIVE')}
              value={values.p3Objective}
              optionsData={getObjectiveOptions()}
              onChange={objective => {
                setFieldValue('p3Objective', objective);
                clearExtraFields();
              }}
              disabled={isUpdatePending || !isFormEditable || !values.isP3Enabled}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
              listHeight={600}
            />

          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        {shouldInputRender(values.p3Objective, 'ownProducts') && (
          <Col span={12}>
            <Form.Item
              help={get(errors, 'ownProducts')}
              validateStatus={get(errors, 'ownProducts') ? 'error' : 'success'}
              className={classes.selectGroup}
            >
              <PromoProductSelect
                isNewStyle
                label={t('SEGMENT.OWN_PRODUCTS')}
                value={values.ownProducts}
                selectedProducts={mergedProducts(values.ownProducts, values.targetedProducts)}
                onChange={product => {
                  setFieldValue('ownProducts', product);
                }}
                disabled={isUpdatePending || !isFormEditable || !values.isP3Enabled}
                autoComplete="off"
                showSearch
                filterOption={getSelectFilterOption}
                listHeight={600}
                mode="multiple"
              />
            </Form.Item>
          </Col>
        )}
        {shouldInputRender(values.p3Objective, 'targetedProducts') && (
          <Col span={12}>
            <Form.Item
              help={get(errors, 'targetedProducts')}
              validateStatus={get(errors, 'targetedProducts') ? 'error' : 'success'}
              className={classes.selectGroup}
            >
              <PromoProductSelect
                isNewStyle
                label={t('SEGMENT.TARGETED_PRODUCTS')}
                value={values.targetedProducts}
                selectedProducts={mergedProducts(values.ownProducts, values.targetedProducts)}
                onChange={product => {
                  setFieldValue('targetedProducts', product);
                }}
                disabled={isUpdatePending || !isFormEditable || !values.isP3Enabled}
                autoComplete="off"
                showSearch
                filterOption={getSelectFilterOption}
                listHeight={600}
                mode="multiple"
              />
            </Form.Item>
          </Col>
        )}
        {shouldInputRender(values.p3Objective, 'ownBrands') && (
          <Col span={12}>
            <Form.Item
              help={get(errors, 'ownBrands')}
              validateStatus={get(errors, 'ownBrands') ? 'error' : 'success'}
              className={classes.selectGroup}
            >
              <Select
                allowClear
                label={t('SEGMENT.OWN_BRANDS')}
                value={values.ownBrands}
                optionsData={getBrandsOptions(brands)}
                onChange={brand => {
                  setFieldValue('ownBrands', brand);
                }}
                disabled={isUpdatePending || !isFormEditable || !values.isP3Enabled}
                autoComplete="off"
                showSearch
                filterOption={getSelectFilterOption}
                listHeight={600}
                mode="multiple"
              />
            </Form.Item>

          </Col>
        )}
        {shouldInputRender(values.p3Objective, 'targetedBrands') && (
          <Col span={12}>
            <Form.Item
              help={get(errors, 'targetedBrands')}
              validateStatus={get(errors, 'targetedBrands') ? 'error' : 'success'}
              className={classes.selectGroup}
            >
              <Select
                allowClear
                label={t('SEGMENT.TARGETED_BRANDS')}
                value={values.targetedBrands}
                optionsData={getBrandsOptions(brands)}
                onChange={brand => {
                  setFieldValue('targetedBrands', brand);
                }}
                disabled={isUpdatePending || !isFormEditable || !values.isP3Enabled}
                autoComplete="off"
                showSearch
                filterOption={getSelectFilterOption}
                listHeight={600}
                mode="multiple"
              />
            </Form.Item>
          </Col>
        )}
        {shouldInputRender(values.p3Objective, 'subcategories') && (
          <Col span={12}>
            <Form.Item
              help={get(errors, 'subcategories')}
              validateStatus={get(errors, 'subcategories') ? 'error' : 'success'}
              className={classes.selectGroup}
            >
              <Select
                allowClear
                label={t('SEGMENT.SUBCATEGORIES')}
                value={values.subcategories}
                optionsData={getCategoryOptions(categories)}
                onChange={value => {
                  setFieldValue('subcategories', value);
                }}
                disabled={isUpdatePending || !isFormEditable || !values.isP3Enabled}
                autoComplete="off"
                showSearch
                filterOption={getSelectFilterOption}
                listHeight={600}
                mode="multiple"
              />
            </Form.Item>
          </Col>
        )}
      </Row>

      <Row gutter={16} className="mb-4">
        <Col span={12}>
          <Select
            allowClear
            mode="tags"
            name="clientExSegments"
            label={t('SEGMENT.EX_SEGMENTS')}
            value={values.clientExSegments}
            onChange={clientExSegments => {
              setFieldValue('clientExSegments', clientExSegments);
            }}
            disabled={isUpdatePending || !isFormEditable}
            autoComplete="off"
          />
        </Col>
        <Col span={12}>
          <Select
            allowClear
            label={t('SEGMENT.EXCLUDED_FRAUD_LEVELS')}
            value={values.excludedPromoAbuser}
            optionsData={getExcludedPromoAbuserOptions()}
            onChange={excludedPromoAbuser => {
              setFieldValue('excludedPromoAbuser', excludedPromoAbuser);
            }}
            disabled={isUpdatePending || !isFormEditable}
            autoComplete="off"
            showSearch
            filterOption={getSelectFilterOption}
          />
        </Col>
      </Row>
      <Row gutter={16} className="mb-3">
        <Col span={12}>
          {segmentClientCounts.excludedSegments ? (
            <div className="form-control pull-left" style={{ fontSize: 14, height: 'auto' }}>
              <div>
                {t('SEGMENT.EXCLUDED_CLIENT')} : {getSegmentCount(segmentClientCounts.excludedSegments?.count, t)}
              </div>
              <div>
                {t('SEGMENT.INCLUDED_CLIENT')} :
                {promo.isP3Enabled ?
                  getSegmentCount(p3SegmentCount?.includedSegments?.data.count, t) : getSegmentCount(segmentClientCounts.includedSegments?.count, t)}
              </div>
            </div>
          ) : null}
        </Col>
      </Row>
      {canEdit && cardFooter}
    </Form>
  );
};

const SegmentSection = memo(function SegmentSection() {
  const { t } = useTranslation('promoPage');

  return (
    <Collapse className="mb-2">
      <Panel header={t('SEGMENT.HEADER_TITLE')} key={1}>
        <SegmentForm />
      </Panel>
    </Collapse>
  );
});

export default SegmentSection;
