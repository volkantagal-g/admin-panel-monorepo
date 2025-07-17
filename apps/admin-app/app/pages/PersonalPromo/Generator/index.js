import {
  Card,
  Row,
  Col,
  Select,
  Input,
  InputNumber,
  DatePicker,
  Checkbox,
  Button,
  PageHeader,
  Tooltip,
} from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  map as _map,
  isEmpty as _isEmpty,
  trim as _trim,
  isNull as _isNull,
} from 'lodash';
import moment from 'moment';
import { InfoCircleOutlined, LoadingOutlined } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';
import { isCurrentCountryTurkey, getSelectFilterOption, currency } from '@shared/utils/common';
import permKey from '@shared/shared/permKey.json';
import { useInitAndDestroyPage, usePermission } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getSelectedCountryTimezone, getSuppliersSelector } from '@shared/redux/selectors/common';
import { Creators } from './redux/actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { getDepartmentsSelector, createPersonalPromosBulkSelector } from './redux/selectors';
import {
  PROMO_TARGET,
  PROMO_FINANCED_BY,
  COUNT_LIMIT,
  MIN_DELIVERY_FEE,
  MAX_DELIVERY_FEE,
  DELIVERY_FEE_CONFIRMATION_THRESHOLD,
} from './constants';
import {
  getPromoTargetsOptions,
  getGetirMarketDomainTypesOptions,
  getPromoFinancedByOptions,
  getPromoClassesOptions,
  getPromoObjectiveTypesOptions,
  checkRequiredFields,
  getEmptyLanguageStrings,
  getPromoTitles,
  showLang,
} from './util';
import { getSupplierOptions } from '@app/pages/Promo/utils';

const reduxKey = REDUX_KEY.PERSONAL_PROMO.GENERATOR;
const { TextArea } = Input;

const PersonalPromoGeneratorPage = () => {
  const { t } = useTranslation(['personalPromoGeneratorPage']);
  const langKey = getLangKey();
  const allSuppliers = useSelector(getSuppliersSelector.getData);
  const isSupplierPending = useSelector(getSuppliersSelector.getIsPending);
  const { canAccess } = usePermission();
  const canGenerate = canAccess(permKey.PAGE_PERSONAL_PROMO_GENERATOR);
  const dispatch = useDispatch();
  let countryLanguages = getSelectedCountryLanguages();
  countryLanguages = _map(countryLanguages, key => {
    const newKey = key === 'en-US' ? 'enUS' : key;
    return newKey;
  });
  const currencySymbol = currency();
  const selectedCountryTimezone = useSelector(getSelectedCountryTimezone.getData);
  const labelColWidth = 6;
  const inputColWidth = 18;
  usePageViewAnalytics({ name: ROUTE.PERSONAL_PROMO_GENERATOR.name, squad: ROUTE.PERSONAL_PROMO_GENERATOR.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [getirMarketDomainTypes, setGetirMarketDomainTypes] = useState([]);
  const handleGetirMarketDomainTypeSelect = selectedDomainTypes => setGetirMarketDomainTypes(selectedDomainTypes);

  const promoTargetsOptions = getPromoTargetsOptions();
  const [promoTarget, setPromoTarget] = useState();
  const handlePromoTargetSelect = selectedPromoTarget => {
    setGetirMarketDomainTypes([]);
    setPromoTarget(selectedPromoTarget);
  };

  const [thumbnailURL, setThumbnailURL] = useState({});
  const handleThumbnailURLChange = (v, lng) => {
    const newThumbnailURL = { ...thumbnailURL };
    newThumbnailURL[lng] = v;
    setThumbnailURL(newThumbnailURL);
  };

  const [picURL, setPicURL] = useState({});
  const handlePicURLChange = (v, lng) => {
    const newPicURL = { ...picURL };
    newPicURL[lng] = v;
    setPicURL(newPicURL);
  };

  const [promoContentSectionTitle, setPromoContentSectionTitle] = useState(getEmptyLanguageStrings(countryLanguages));
  const handlePromoContentSectionTitleChange = (v, lng) => {
    const newPromoContentSectionTitle = { ...promoContentSectionTitle };
    newPromoContentSectionTitle[lng] = v;
    setPromoContentSectionTitle(newPromoContentSectionTitle);
  };

  const [promoURL, setPromoURL] = useState(getEmptyLanguageStrings(countryLanguages));
  const handlePromoURLChange = (v, lng) => {
    const newPromoURL = { ...promoURL };
    newPromoURL[lng] = v;
    setPromoURL(newPromoURL);
  };

  const [promoContentURL, setPromoContentURL] = useState(getEmptyLanguageStrings(countryLanguages));
  const handlePromoContentURLChange = (v, lng) => {
    const newPromoContentURL = { ...promoContentURL };
    newPromoContentURL[lng] = v;
    setPromoContentURL(newPromoContentURL);
  };

  const [validFrom, setValidFrom] = useState(moment());
  const handleValidFromChange = selectedValidFrom => setValidFrom(selectedValidFrom);

  const [validUntil, setValidUntil] = useState(moment().add(30, 'days').endOf('day'));
  const handleValidUntilChange = selectedValidUntil => setValidUntil(selectedValidUntil);

  const [count, setCount] = useState(0);
  const handleCountChange = newCount => setCount(newCount);

  const [prefix, setPrefix] = useState();
  const handlePrefixChange = newPrefix => setPrefix(newPrefix.toUpperCase());

  const [syllableCount, setSyllableCount] = useState(2);
  const handleSyllableCountChange = newSyllableCount => setSyllableCount(newSyllableCount);

  const [amount, setAmount] = useState(0);
  const handleAmountChange = newAmount => setAmount(newAmount);

  const [useLimit, setUseLimit] = useState(0);
  const handleUseLimitChange = newUseLimit => setUseLimit(newUseLimit);

  const [isFreeProduct, setIsFreeProduct] = useState(false);
  const handleIsFreeProductChange = newIsFreeProduct => setIsFreeProduct(newIsFreeProduct);

  const [supplier, setSupplier] = useState();
  const handleSupplierChange = selectedSupplier => setSupplier(selectedSupplier);

  const [supplierSupportRate, setSupplierSupportRate] = useState(0);
  const handleSupplierSupportRateChange = newSupplierSupportRate => setSupplierSupportRate(newSupplierSupportRate);

  const [thirdPartySupportRate, setThirdPartySupportRate] = useState(0);

  const promoFinancedByOptions = getPromoFinancedByOptions();
  const [promoFinancedBy, setPromoFinancedBy] = useState(PROMO_FINANCED_BY.GETIR);

  const handlePromoFinancedBySelect = selectedPromoFinancedBy => {
    if (selectedPromoFinancedBy === PROMO_FINANCED_BY.SUPPLIER) {
      setSupplierSupportRate(1);
      setThirdPartySupportRate(0);
    }
    else if (selectedPromoFinancedBy === PROMO_FINANCED_BY.THIRD_PARTY) {
      setSupplierSupportRate(0);
      setThirdPartySupportRate(1);
      setIsFreeProduct(false);
    }
    else {
      setSupplierSupportRate(0);
      setThirdPartySupportRate(0);
      setIsFreeProduct(false);
    }
    setPromoFinancedBy(selectedPromoFinancedBy);
  };

  const [isBalanceEnabled, setIsBalanceEnabled] = useState(true);
  const handleIsBalanceEnabledChange = newIsBalanceEnabled => {
    if (newIsBalanceEnabled) {
      setUseLimit(0);
    }
    setIsBalanceEnabled(newIsBalanceEnabled);
  };

  const [domainMinBasketSizes, setDomainMinBasketSizes] = useState({
    getir10: null,
    market: null,
    water: null,
    gorillas: null,
  });
  const handleDomainMinBasketSizesChange = (v, domain) => {
    const newDomainMinBasketSizes = { ...domainMinBasketSizes };
    newDomainMinBasketSizes[domain] = v;
    setDomainMinBasketSizes(newDomainMinBasketSizes);
  };

  const [doNotApplyMinimumBasketSize, setDoNotApplyMinimumBasketSize] = useState(false);
  const handleDoNotApplyMinimumBasketSizeChange = newDoNotApplyMinimumBasketSize => {
    setDomainMinBasketSizes({
      getir10: null,
      market: null,
      water: null,
      gorillas: null,
    });
    setDoNotApplyMinimumBasketSize(newDoNotApplyMinimumBasketSize);
  };

  const [deliveryFee, setDeliveryFee] = useState({
    amount: null,
    doNotCharge: false,
  });
  const handleDeliveryFeeChange = newDeliveryFeeAmount => {
    const newDeliveryFee = { ...deliveryFee };
    newDeliveryFee.amount = newDeliveryFeeAmount;
    setDeliveryFee(newDeliveryFee);
  };

  const [doNotChargeDeliveryFee, setDoNotChargeDeliveryFee] = useState(false);
  const handleDoNotChargeDeliveryFeeChange = newDoNotChargeDeliveryFee => {
    const newDeliveryFee = { ...deliveryFee };
    newDeliveryFee.doNotCharge = newDoNotChargeDeliveryFee;
    if (newDoNotChargeDeliveryFee === true) {
      newDeliveryFee.amount = null;
    }
    setDeliveryFee(newDeliveryFee);
    setDoNotChargeDeliveryFee(newDoNotChargeDeliveryFee);
  };

  const [promoObjectiveTypesOptions, setPromoObjectiveTypesOptions] = useState();
  const [objective, setObjective] = useState();
  const handleObjectiveSelect = selectedObjective => setObjective(selectedObjective);

  const promoClassesOptions = getPromoClassesOptions();
  const [promoClass, setPromoClass] = useState();
  const handlePromoClassSelect = selectedPromoClass => {
    const newPromoObjectiveTypesOptions = getPromoObjectiveTypesOptions(selectedPromoClass);
    setObjective();
    setPromoObjectiveTypesOptions(newPromoObjectiveTypesOptions);
    setPromoClass(selectedPromoClass);
  };

  const isDepartmentsLoading = useSelector(getDepartmentsSelector.getIsPending);
  const departments = useSelector(getDepartmentsSelector.getData);
  const departmentOptions = _map(departments, ({ _id, name }) => ({ value: _id, label: name[langKey] }));
  const [responsibleDepartment, setResponsibleDepartment] = useState();
  const handleResponsibleDepartmentSelect = selectedResponsibleDepartment => setResponsibleDepartment(selectedResponsibleDepartment);

  const [internalReason, setInternalReason] = useState();
  const handleInternalReasonChange = newInternalReason => setInternalReason(newInternalReason);

  const isPromoCodesLoading = useSelector(createPersonalPromosBulkSelector.getIsPending);

  const [isAlreadySold, setIsAlreadySold] = useState(false);

  const createPersonalPromosBulk = () => {
    if (!promoTarget) {
      return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:TARGET') }));
    }
    if (
      (promoTarget === PROMO_TARGET.ALL || promoTarget === PROMO_TARGET.GETIR_MARKET) && _isEmpty(getirMarketDomainTypes)
    ) {
      return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:DOMAIN') }));
    }
    try {
      checkRequiredFields(thumbnailURL, countryLanguages);
    }
    catch (e) {
      return dispatch(ToastCreators.error({ message: `${t('personalPromoGeneratorPage:THUMBNAIL_URL')} ${e}` }));
    }
    try {
      checkRequiredFields(picURL, countryLanguages);
    }
    catch (e) {
      return dispatch(ToastCreators.error({ message: `${t('personalPromoGeneratorPage:PIC_URL')} ${e}` }));
    }
    if (validUntil.valueOf() < moment().valueOf() || validUntil.valueOf() < validFrom.valueOf()) {
      return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:VALID_UNTIL') }));
    }
    if (count <= 0) {
      return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:COUNT') }));
    }
    if (count > COUNT_LIMIT) {
      return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:COUNT_LIMIT_ERROR', { countLimit: COUNT_LIMIT }) }));
    }
    if (_isEmpty(_trim(prefix))) {
      return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:PREFIX') }));
    }
    if (syllableCount < 0) {
      return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:SYLLABLE_COUNT') }));
    }
    if (syllableCount === 0 && count > 1) {
      return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:SYLLABLE_COUNT_AND_COUNT_MISMATCH_ERROR') }));
    }
    if (amount <= 0) {
      return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:DISCOUNT_AMOUNT') }));
    }
    if (useLimit === null || useLimit === undefined || useLimit < 0) {
      return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:USE_LIMIT') }));
    }
    if (useLimit === 0 && !isBalanceEnabled) {
      return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:USE_LIMIT_AND_PARTIAL_MISMATCH_ERROR') }));
    }
    if (
      (promoTarget === PROMO_TARGET.ALL || promoTarget === PROMO_TARGET.GETIR_FOOD) &&
      promoFinancedBy === PROMO_FINANCED_BY.SUPPLIER &&
      (_isNull(supplierSupportRate) || supplierSupportRate < 0 || supplierSupportRate > 1)
    ) {
      return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:SUPPLIER_SUPPORT_RATE_RANGE') }));
    }
    if (useLimit === 0) {
      // eslint-disable-next-line no-alert
      const useLimitConfirmation = window.confirm(t('personalPromoGeneratorPage:CONFIRM_ARE_YOU_SURE_TO_CONTINUE_WITH_USE_LIMIT_0'));
      if (!useLimitConfirmation) {
        return null;
      }
    }
    if ((promoFinancedBy === PROMO_FINANCED_BY.THIRD_PARTY || promoFinancedBy === PROMO_FINANCED_BY.SUPPLIER) && !supplier) {
      return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:SUPPLIER_SHOULD_BE_SELECTED') }));
    }
    if (doNotApplyMinimumBasketSize) {
      if (domainMinBasketSizes.getir10 !== null && domainMinBasketSizes.getir10 <= 0) {
        return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:G10_MIN_BASKET_SIZE_APPLY') }));
      }
      if (domainMinBasketSizes.market !== null && domainMinBasketSizes.market <= 0) {
        return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:GETIR_MORE_MIN_BASKET_SIZE_APPLY') }));
      }
      if (domainMinBasketSizes.water !== null && domainMinBasketSizes.water <= 0) {
        return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:GETIR_WATER_MIN_BASKET_SIZE_APPLY') }));
      }
      if (domainMinBasketSizes.gorillas !== null && domainMinBasketSizes.gorillas <= 0) {
        return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:GORILLAS_MIN_BASKET_SIZE_APPLY') }));
      }
    }
    if (!doNotChargeDeliveryFee && deliveryFee.amount !== null) {
      if (deliveryFee.amount <= MIN_DELIVERY_FEE) {
        return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:DELIVERY_FEE_MUST_BE_GREATER_THAN', { amount: MIN_DELIVERY_FEE }) }));
      }
      if (deliveryFee.amount >= MAX_DELIVERY_FEE) {
        return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:DELIVERY_FEE_MUST_BE_LESS_THAN', { amount: MAX_DELIVERY_FEE }) }));
      }
      if (deliveryFee.amount > DELIVERY_FEE_CONFIRMATION_THRESHOLD) {
        // eslint-disable-next-line no-alert
        const deliveryFeeConfirmation = window.confirm(t('personalPromoGeneratorPage:CONFIRM_DELIVERY_FEE', { amount: MAX_DELIVERY_FEE }));
        if (!deliveryFeeConfirmation) {
          return null;
        }
      }
    }
    if (!promoClass) {
      return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:PROMO_CLASS') }));
    }
    if (!responsibleDepartment) {
      return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:RESPONSIBLE_DEPARTMENT') }));
    }
    if (!objective) {
      return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:OBJECTIVE') }));
    }
    if (_isEmpty(_trim(internalReason))) {
      return dispatch(ToastCreators.error({ message: t('personalPromoGeneratorPage:INTERNAL_REASON_DESCRIPTION') }));
    }

    const title = getPromoTitles(countryLanguages, currencySymbol, amount);
    const description = getPromoTitles(countryLanguages, currencySymbol, amount);
    const requestParams = {
      promoTarget,
      domainTypes: getirMarketDomainTypes,
      thumbnailURL,
      picURL,
      promoContentSectionTitle,
      promoURL,
      promoContentURL,
      validFrom: moment.tz(validFrom, selectedCountryTimezone),
      validUntil: moment.tz(validUntil, selectedCountryTimezone).endOf('day'),
      count,
      prefix,
      syllableCount,
      amount,
      useLimit,
      supplier,
      supplierSupportRate,
      thirdPartySupportRate,
      isFreeProduct,
      doNotApplyMinimumBasketSize,
      isBalanceEnabled,
      domainMinBasketSizes,
      doNotChargeDeliveryFee,
      deliveryFee,
      promoClass,
      responsibleDepartment,
      objective,
      internalReason,
      currencySymbol,
      title,
      description,
      isAlreadySold,
    };
    return dispatch(Creators.createPersonalPromosBulkRequest({ body: requestParams }));
  };

  useEffect(() => {
    dispatch(Creators.getDepartmentsRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(CommonCreators.getSuppliersRequest());
  }, [dispatch]);

  return (
    <Row>
      <Col md={12}>
        <Card>
          <PageHeader
            ghost={false}
            className="mb-3"
            title={t('global:PAGE_TITLE.PERSONAL_PROMO.GENERATOR')}
          />
          <Row className="mb-2">
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:TARGET')}</span>
            </Col>
            <Col md={inputColWidth}>
              <Select
                className="w-100"
                options={promoTargetsOptions}
                onChange={handlePromoTargetSelect}
              />
            </Col>
          </Row>
          {
            promoTarget === PROMO_TARGET.ALL || promoTarget === PROMO_TARGET.GETIR_MARKET ?
              (
                <Row className="mb-2">
                  <Col md={labelColWidth} className="pt-2">
                    <span>{t('personalPromoGeneratorPage:DOMAIN')}</span>
                  </Col>
                  <Col md={inputColWidth}>
                    <Select
                      className="w-100"
                      value={getirMarketDomainTypes}
                      options={getGetirMarketDomainTypesOptions(promoTarget)}
                      onChange={handleGetirMarketDomainTypeSelect}
                      mode="multiple"
                    />
                  </Col>
                </Row>
              ) :
              null
          }
          <Row>
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:THUMBNAIL_URL')}</span>
            </Col>
            <Col md={inputColWidth}>
              {_map(countryLanguages, lng => (
                <Input
                  type="text"
                  className="mb-2"
                  key={`thumbnail-url-${lng}`}
                  addonAfter={showLang(lng)}
                  onChange={e => handleThumbnailURLChange(e.target.value, lng)}
                />
              ))}
            </Col>
          </Row>
          <Row>
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:PIC_URL')}</span>
            </Col>
            <Col md={inputColWidth}>
              {_map(countryLanguages, lng => (
                <Input
                  type="text"
                  className="mb-2"
                  key={`pic-url-${lng}`}
                  addonAfter={showLang(lng)}
                  onChange={e => handlePicURLChange(e.target.value, lng)}
                />
              ))}
            </Col>
          </Row>
          <Row>
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:V2_CONTENT_SECTION_TITLE')}</span>
            </Col>
            <Col md={inputColWidth}>
              {_map(countryLanguages, lng => (
                <Input
                  type="text"
                  className="mb-2"
                  key={`promo-content-section-title-${lng}`}
                  addonAfter={showLang(lng)}
                  onChange={e => handlePromoContentSectionTitleChange(e.target.value, lng)}
                />
              ))}
            </Col>
          </Row>
          <Row>
            <Col md={labelColWidth} className="pt-2">
              <span style={{ marginRight: 5 }}>{t('personalPromoGeneratorPage:PROMO_URL')}</span>
              <Tooltip
                title={t('personalPromoGeneratorPage:PROMO_URL_TOOLTIP')}
              >
                <InfoCircleOutlined className="icon-type2" />
              </Tooltip>
            </Col>
            <Col md={inputColWidth}>
              {_map(countryLanguages, lng => (
                <Input
                  type="text"
                  className="mb-2"
                  key={`promo-url-${lng}`}
                  addonAfter={showLang(lng)}
                  onChange={e => handlePromoURLChange(e.target.value, lng)}
                />
              ))}
            </Col>
          </Row>
          <Row>
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:V2_PROMO_URL')}</span>
            </Col>
            <Col md={inputColWidth}>
              {_map(countryLanguages, lng => (
                <Input
                  type="text"
                  className="mb-2"
                  key={`promo-content-url-${lng}`}
                  addonAfter={showLang(lng)}
                  onChange={e => handlePromoContentURLChange(e.target.value, lng)}
                />
              ))}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:VALID_FROM')}</span>
            </Col>
            <Col md={inputColWidth}>
              <DatePicker
                className="w-100"
                value={validFrom}
                onChange={handleValidFromChange}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:VALID_UNTIL')}</span>
            </Col>
            <Col md={inputColWidth}>
              <DatePicker
                className="w-100"
                value={validUntil}
                onChange={handleValidUntilChange}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:COUNT')}</span>
            </Col>
            <Col md={inputColWidth}>
              <InputNumber
                className="w-100"
                value={count}
                onChange={v => handleCountChange(v)}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:PREFIX')}</span>
            </Col>
            <Col md={inputColWidth}>
              <Input
                type="text"
                value={prefix}
                onChange={e => handlePrefixChange(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:SYLLABLE_COUNT')}</span>
            </Col>
            <Col md={inputColWidth}>
              <InputNumber
                className="w-100"
                value={syllableCount}
                onChange={v => handleSyllableCountChange(v)}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:DISCOUNT_AMOUNT')}</span>
            </Col>
            <Col md={inputColWidth}>
              <InputNumber
                className="w-100"
                value={amount}
                onChange={v => handleAmountChange(v)}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:USE_LIMIT')}</span>
            </Col>
            <Col md={inputColWidth}>
              <InputNumber
                className="w-100"
                value={useLimit}
                onChange={v => handleUseLimitChange(v)}
                disabled={isBalanceEnabled}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:PROMO_FINANCED_BY')}</span>
            </Col>
            <Col md={inputColWidth}>
              <Select
                className="w-100"
                options={promoFinancedByOptions}
                value={promoFinancedBy}
                onChange={handlePromoFinancedBySelect}
              />
            </Col>
          </Row>
          {
            promoFinancedBy === PROMO_FINANCED_BY.SUPPLIER || promoFinancedBy === PROMO_FINANCED_BY.THIRD_PARTY ?
              (
                <Row className="mb-2">
                  <Col md={labelColWidth}>
                    <span style={{ marginRight: 5 }}>{t('personalPromoGeneratorPage:SAP_REFERENCE_ID')}</span>
                  </Col>
                  <Col md={inputColWidth}>
                    <Select
                      className="w-100"
                      allowClear
                      value={supplier}
                      options={getSupplierOptions(allSuppliers, isCurrentCountryTurkey())}
                      onChange={handleSupplierChange}
                      suffixIcon={isSupplierPending && <LoadingOutlined spin />}
                      autoComplete="off"
                      showSearch
                      filterOption={getSelectFilterOption}
                    />
                  </Col>
                </Row>
              ) :
              null
          }
          {
            (promoTarget === PROMO_TARGET.ALL || promoTarget === PROMO_TARGET.GETIR_FOOD) && promoFinancedBy === PROMO_FINANCED_BY.SUPPLIER ?
              (
                <Row className="mb-2">
                  <Col md={labelColWidth} className="pt-2">
                    <span style={{ marginRight: 5 }}>{t('personalPromoGeneratorPage:SUPPLIER_SUPPORT_RATE')}</span>
                    <Tooltip title={t('personalPromoGeneratorPage:SUPPLIER_SUPPORT_RATE_TOOLTIP')}>
                      <InfoCircleOutlined className="icon-type2" />
                    </Tooltip>
                  </Col>
                  <Col md={inputColWidth}>
                    <InputNumber
                      className="w-100"
                      value={supplierSupportRate}
                      onChange={v => handleSupplierSupportRateChange(v)}
                    />
                  </Col>
                </Row>
              ) :
              null
          }
          {
            promoFinancedBy === PROMO_FINANCED_BY.SUPPLIER ?
              (
                <Row className="mb-2">
                  <Col md={labelColWidth}>
                    <span style={{ marginRight: 5 }}>{t('personalPromoGeneratorPage:IS_FREE_PRODUCT')}</span>
                    <Tooltip
                      title={t('personalPromoGeneratorPage:IS_FREE_PRODUCT_TOOLTIP')}
                    >
                      <InfoCircleOutlined className="icon-type2" />
                    </Tooltip>
                  </Col>
                  <Col md={inputColWidth}>
                    <Checkbox
                      checked={isFreeProduct}
                      onChange={e => handleIsFreeProductChange(e.target.checked)}
                    />
                  </Col>
                </Row>
              ) :
              null
          }
          <Row className="mb-2">
            <Col md={labelColWidth}>
              <span>{t('personalPromoGeneratorPage:THIS_CODE_IS_SOLD')}</span>
            </Col>
            <Col md={inputColWidth}>
              <Checkbox
                checked={isAlreadySold}
                onChange={e => setIsAlreadySold(e.target.checked)}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={labelColWidth}>
              <span>{t('personalPromoGeneratorPage:PARTIAL')}</span>
            </Col>
            <Col md={inputColWidth}>
              <Checkbox
                checked={isBalanceEnabled}
                onChange={e => handleIsBalanceEnabledChange(e.target.checked)}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={labelColWidth}>
              <span>{t('personalPromoGeneratorPage:DO_NOT_APPLY_MINIMUM_BASKET_SIZE')}</span>
            </Col>
            <Col md={inputColWidth}>
              <Checkbox
                checked={doNotApplyMinimumBasketSize}
                onChange={e => handleDoNotApplyMinimumBasketSizeChange(e.target.checked)}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:G10_MIN_BASKET_SIZE_APPLY')}</span>
            </Col>
            <Col md={inputColWidth}>
              <InputNumber
                className="w-100"
                value={domainMinBasketSizes.getir10}
                onChange={v => handleDomainMinBasketSizesChange(v, 'getir10')}
                placeholder={t('personalPromoGeneratorPage:MIN_BASKET_SIZE_PLACEHOLDER')}
                disabled={!doNotApplyMinimumBasketSize}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:GETIR_MORE_MIN_BASKET_SIZE_APPLY')}</span>
            </Col>
            <Col md={inputColWidth}>
              <InputNumber
                className="w-100"
                value={domainMinBasketSizes.market}
                onChange={v => handleDomainMinBasketSizesChange(v, 'market')}
                placeholder={t('personalPromoGeneratorPage:MIN_BASKET_SIZE_PLACEHOLDER')}
                disabled={!doNotApplyMinimumBasketSize}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:GETIR_WATER_MIN_BASKET_SIZE_APPLY')}</span>
            </Col>
            <Col md={inputColWidth}>
              <InputNumber
                className="w-100"
                value={domainMinBasketSizes.water}
                onChange={v => handleDomainMinBasketSizesChange(v, 'water')}
                placeholder={t('personalPromoGeneratorPage:MIN_BASKET_SIZE_PLACEHOLDER')}
                disabled={!doNotApplyMinimumBasketSize}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:GORILLAS_MIN_BASKET_SIZE_APPLY')}</span>
            </Col>
            <Col md={inputColWidth}>
              <InputNumber
                className="w-100"
                value={domainMinBasketSizes.gorillas}
                onChange={v => handleDomainMinBasketSizesChange(v, 'gorillas')}
                placeholder={t('personalPromoGeneratorPage:MIN_BASKET_SIZE_PLACEHOLDER')}
                disabled={!doNotApplyMinimumBasketSize}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={labelColWidth}>
              <span>{t('personalPromoGeneratorPage:DO_NOT_CHARGE_DELIVERY_FEE')}</span>
            </Col>
            <Col md={inputColWidth}>
              <Checkbox
                checked={doNotChargeDeliveryFee}
                onChange={e => handleDoNotChargeDeliveryFeeChange(e.target.checked)}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:DELIVERY_FEE')}</span>
            </Col>
            <Col md={inputColWidth}>
              <InputNumber
                className="w-100"
                value={deliveryFee.amount}
                onChange={v => handleDeliveryFeeChange(v)}
                placeholder={t('personalPromoGeneratorPage:DELIVERY_FEE_PLACEHOLDER')}
                disabled={doNotChargeDeliveryFee}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:PROMO_CLASS')}</span>
            </Col>
            <Col md={inputColWidth}>
              <Select
                className="w-100"
                options={promoClassesOptions}
                onChange={handlePromoClassSelect}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:RESPONSIBLE_DEPARTMENT')}</span>
            </Col>
            <Col md={inputColWidth}>
              <Select
                className="w-100"
                options={departmentOptions}
                onChange={handleResponsibleDepartmentSelect}
                loading={isDepartmentsLoading}
                disabled={isDepartmentsLoading}
                autoComplete="off"
                allowClear
                showSearch
                filterOption={getSelectFilterOption}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:OBJECTIVE')}</span>
            </Col>
            <Col md={inputColWidth}>
              <Select
                className="w-100"
                value={objective}
                options={promoObjectiveTypesOptions}
                onChange={handleObjectiveSelect}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={labelColWidth} className="pt-2">
              <span>{t('personalPromoGeneratorPage:INTERNAL_REASON_DESCRIPTION')}</span>
            </Col>
            <Col md={inputColWidth}>
              <TextArea
                autoSize={{ minRows: 5, maxRows: 5 }}
                onChange={e => handleInternalReasonChange(e.target.value)}
              />
            </Col>
          </Row>
          {canGenerate && (
            <Row justify="end">
              <Col>
                <Button
                  type="primary"
                  disabled={isPromoCodesLoading}
                  onClick={createPersonalPromosBulk}
                >
                  {t('global:CREATE')}
                </Button>
              </Col>
            </Row>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default PersonalPromoGeneratorPage;
