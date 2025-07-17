import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { Button, Col, Collapse, Form, Row, Select, Typography } from 'antd';

import { getPromoBadgesSelector, updatePromoBadgeSelector } from '@app/pages/Promo/Detail/redux/selectors';

import { getInitialValues, getOnlyModifiedValuesBeforeSubmit } from './formHelper';
import permKey from '@shared/shared/permKey.json';
import { canSubmit } from '@shared/utils/formHelper';
import { usePermission, usePrevious } from '@shared/hooks';
import { Creators } from '../../redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getSelectFilterOption } from '@shared/utils/common';
import { ERROR_TIMEOUT_MS, PROMO_BADGE_VARIABLE } from '@app/pages/Promo/constantValues';
import { PromoBadge } from '@app/pages/Promo/Badges/List/interfaces';
import useStyles from './styles';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';

const { Panel } = Collapse;

const PromoBadgeForm = () => {
  const [selectedBadge, setSelectedBadge] = useState<PromoBadge>();
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const canEdit = canAccess(permKey.PAGE_PROMO_DETAIL_COMPONENT_PROMO_BADGE_UPDATE);
  const promo = useSelector(PromoDetailSlice.selectors.promo);
  const isParent = useSelector(PromoDetailSlice.selectors.isParent);
  const promoBadges: PromoBadge[] | [] = useSelector(
    getPromoBadgesSelector.getData,
  );
  const selectedLanguage = useSelector(getSelectedLanguage);
  const isUpdatePending = useSelector(updatePromoBadgeSelector.getIsPending);
  const updateError = useSelector(updatePromoBadgeSelector.getError);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('promoPage');
  const prevIsUpdatePending = usePrevious(isUpdatePending);
  const classes = useStyles();

  const initialValues = useMemo(() => getInitialValues(promo), [promo]);

  const promoBadgesOptions = useMemo(
    () => promoBadges?.map(item => {
      return {
        value: item?._id,
        label: item?.name,
      };
    }),
    [promoBadges],
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: async values => {
      try {
        const body = getOnlyModifiedValuesBeforeSubmit({ values });
        return dispatch(
          Creators.updatePromoBadgeRequest({
            id: get(promo, '_id'),
            body,
          }),
        );
      }
      catch (error) {
        return dispatch(ToastCreators.error({ error, toastOptions: { autoClose: ERROR_TIMEOUT_MS } }));
      }
    },
  });

  const { handleSubmit, values, setValues, setFieldValue } = formik;

  const canBeSubmittable = useMemo(() => canSubmit({ initialValues, values }), [initialValues, values]);

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      if (updateError) {
        setValues(initialValues);
      }
      setIsFormEditable(false);
    }
  }, [prevIsUpdatePending, setIsFormEditable, setValues, updateError, isUpdatePending, initialValues]);

  useEffect(() => {
    dispatch(Creators.getPromoBadgesRequest({ promoMechanic: promo?.promoMechanic }));
  }, [dispatch, promo?.promoMechanic]);

  useEffect(() => {
    const initialBadge = promoBadges?.find(
      item => item._id === promo?.badgeId,
    );
    if (initialBadge) setSelectedBadge(initialBadge);
  }, [promo?.badgeId, promoBadges]);

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleSelect = (badgeId: string) => {
    const badge = promoBadges.find(item => {
      return item._id === badgeId;
    });
    setSelectedBadge(badge);
    setFieldValue('badgeId', badgeId);
  };

  const promoReplacement: Record<string, number> = {
    REQUIRED_PRODUCT_COUNT: 2,
    REQUIRED_PRODUCT_AMOUNT: promo.condition.minItemTotalAmount,
    DISCOUNT_AMOUNT: promo.discountAmount,
    DISCOUNTED_PRICE: promo.changePrice ?? -1,
    MAX_ITEM_COUNT: promo.maxItemCount,
    MIN_REQUIRED_ITEM_COUNT: promo.condition.minItemCount,
  };

  const getBadgePreviewText = (badgeText: string | undefined) => {
    if (!badgeText) return '';
    let previewText = badgeText;
    Object.values(PROMO_BADGE_VARIABLE).forEach(promoVariable => {
      previewText = previewText.replace(
        promoVariable,
        promoReplacement[promoVariable]?.toString(),
      );
    });
    return previewText;
  };

  const cardFooter = (
    <Row justify="end" gutter={[8, 8]}>
      {isFormEditable ? (
        <>
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
                onClick={() => handleSubmit()}
              >
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button size="small" onClick={handleEditClick} disabled={isParent}>
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );

  return (
    <Form
      layout="vertical"
    >
      <Row>
        <Col xs={12} lg={12} className="mt-2">
          <Form.Item
            label={t('PROMO_BADGE.PRODUCT_BADGE_LABEL')}
            className="d-inline"
          >
            <Select
              allowClear
              value={values.badgeId}
              options={promoBadgesOptions}
              onChange={handleSelect}
              disabled={isUpdatePending || !isFormEditable}
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Form.Item>
        </Col>
        {selectedBadge ? (
          <Col xs={12} lg={12} className="mt-2 pl-4">
            <div className={classes.badgeRow}>
              <Typography.Text>
                {t('PROMO_BADGE.PRODUCT_LISTING_PAGE_BADGE')}
              </Typography.Text>
              <Typography.Text strong className={classes.badgePreview}>
                {getBadgePreviewText(selectedBadge?.productListingPage[selectedLanguage])}
              </Typography.Text>
            </div>
            <div className={classes.badgeRow}>
              <Typography.Text>
                {t('PROMO_BADGE.PRODUCT_DETAIL_PAGE_BADGE')}
              </Typography.Text>
              <Typography.Text strong className={classes.badgePreview}>
                {getBadgePreviewText(selectedBadge?.productDetailPage[selectedLanguage])}
              </Typography.Text>
            </div>
            <div className={classes.badgeRow}>
              <Typography.Text>
                {t('PROMO_BADGE.BASKET_NOT_APPLIED_BADGE')}
              </Typography.Text>
              <Typography.Text strong className={classes.badgePreview}>
                {getBadgePreviewText(selectedBadge?.basketNotApplied[selectedLanguage])}
              </Typography.Text>
            </div>
            <div className={classes.badgeRow}>
              <Typography.Text>
                {t('PROMO_BADGE.BASKET_APPLIED_BADGE')}
              </Typography.Text>
              <Typography.Text strong className={classes.badgePreview}>
                {getBadgePreviewText(selectedBadge?.basketApplied[selectedLanguage])}
              </Typography.Text>
            </div>
          </Col>
        ) : null}
      </Row>
      {canEdit && cardFooter}
    </Form>
  );
};

const PromoBadgeSection = memo(function PromoBadgeSection() {
  const { t } = useTranslation('promoPage');

  const isParent = useSelector(PromoDetailSlice.selectors.isParent);

  if (isParent) {
    return null;
  }

  return (
    <Collapse className="mb-2">
      <Panel header={t('PROMO_BADGE.HEADER_TITLE')} key={1}>
        <PromoBadgeForm />
      </Panel>
    </Collapse>
  );
});

export default PromoBadgeSection;
