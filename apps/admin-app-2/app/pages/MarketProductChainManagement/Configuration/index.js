import { Form, message } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { usePageViewAnalytics } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';

import Content from '@app/pages/MarketProductChainManagement/components/Content';
import ErrorFallback from '@app/pages/MarketProductChainManagement/components/ErrorFallback';
import Header from '@app/pages/MarketProductChainManagement/components/Header';
import ConfigurationForm from './components/ConfigurationForm';
import SaveConfirmationModal from './components/SaveConfirmationModal';

import { ANALYTICS_CONFIG } from './constants';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/sagas';
import useStyles from './styles';

const selectConfigurationState = state => state[REDUX_KEY.MARKET_PRODUCT_CHAIN_MANAGEMENT.CONFIGURATION] || {};

const ChainManagementConfiguration = () => {
  const { t } = useTranslation('marketProductChainManagement');
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const [form] = Form.useForm();
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
  const mainWarehousesLoadedRef = useRef(false);

  useInjectReducer({ key: REDUX_KEY.MARKET_PRODUCT_CHAIN_MANAGEMENT.CONFIGURATION, reducer });
  useInjectSaga({ key: REDUX_KEY.MARKET_PRODUCT_CHAIN_MANAGEMENT.CONFIGURATION, saga });

  usePageViewAnalytics({
    name: ANALYTICS_CONFIG.name,
    squad: ANALYTICS_CONFIG.squad,
  });

  const {
    domainTypes = [],
    demographies = [],
    sizes = [],
    isLocal = false,
    warehouseTypes = [],
    isEditMode = false,
    mainWarehouses = [],
    cities = [],
    warehouses = [],
    status = 'active',
    country = 'tr',
    name = '',
    description = '',
    isUpdating = false,
    mainWarehousesAndCities = [],
  } = useSelector(selectConfigurationState);

  const formValues = useMemo(() => ({
    isLocal,
    domainTypes,
    demographies,
    sizes,
    warehouseTypes,
    mainWarehouses: mainWarehouses || [],
    cities: cities || [],
    warehouses: warehouses || [],
    status: status || 'active',
    country: country || 'tr',
    name,
    description,
  }), [
    isLocal,
    domainTypes,
    demographies,
    sizes,
    warehouseTypes,
    mainWarehouses,
    cities,
    warehouses,
    status,
    country,
    name,
    description,
  ]);

  useEffect(() => {
    if (!isEditMode) {
      form.setFieldsValue(formValues);
    }
  }, [form, isEditMode, formValues]);

  // Initialize page data only once on mount
  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getProductConfigurationRequest(productId));

    // Only fetch main warehouses and cities once if not already loaded
    if (!mainWarehousesLoadedRef.current) {
      dispatch(Creators.getMainWarehousesAndCitiesRequest());
    }

    return () => {
      dispatch(Creators.destroyPage());
      form.resetFields();
      dispatch(Creators.setEditMode(false));
      mainWarehousesLoadedRef.current = false;
    };
  }, [dispatch, productId, form]);

  // Track if main warehouses have been loaded to prevent duplicate calls
  useEffect(() => {
    if (mainWarehousesAndCities && mainWarehousesAndCities.length > 0) {
      mainWarehousesLoadedRef.current = true;
    }
  }, [mainWarehousesAndCities]);

  // Close modal when save operation completes
  useEffect(() => {
    if (!isUpdating && !isEditMode && isSaveModalVisible) {
      setIsSaveModalVisible(false);
    }
  }, [isUpdating, isEditMode, isSaveModalVisible]);

  const handleEditClick = useCallback(() => {
    dispatch(Creators.setEditMode(true));
  }, [dispatch]);

  const handleCancelClick = useCallback(() => {
    dispatch(Creators.setEditMode(false));
    form.resetFields();
  }, [dispatch, form]);

  const handleSaveClick = useCallback(() => {
    setIsSaveModalVisible(true);
  }, []);

  const handleSaveConfirm = useCallback(() => {
    form.validateFields()
      .then(values => {
        const requestBody = {
          isLocal: values.isLocal || false,
          domainTypes: values.domainTypes || [],
          demographyIds: values.demographies || [],
          sizeIds: values.sizes || [],
          warehouseTypes: values.warehouseTypes || [],
          warehouseIds: values.warehouses || [],
        };

        dispatch(Creators.updateProductConfigurationRequest(productId, requestBody));
      })
      .catch(() => {
        message.error(t('FORM_VALIDATION_ERROR'));
        setIsSaveModalVisible(false);
      });
  }, [dispatch, form, productId, t]);

  const handleSaveCancel = useCallback(() => {
    setIsSaveModalVisible(false);
  }, []);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const headerProps = useMemo(() => ({
    title: t('BUTTONS.CONFIGURATION'),
    editButton: !isEditMode,
    onEditClick: handleEditClick,
    saveButton: isEditMode,
    onSaveClick: handleSaveClick,
    cancelButton: isEditMode,
    onCancelClick: handleCancelClick,
    loading: isUpdating,
    buttons: [
      {
        condition: true,
        onClick: handleGoBack,
        text: t('BUTTONS.BACK'),
        color: 'default',
        type: 'default',
      },
    ],
  }), [t, isEditMode, handleEditClick, handleSaveClick, handleCancelClick, handleGoBack, isUpdating]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className={classes.container}>
        <Header {...headerProps} />
        <Content
          pageContent={(
            <div className={classes.configurationContent}>
              <ConfigurationForm form={form} isEditMode={isEditMode} productId={productId} />
            </div>
          )}
        />
        <SaveConfirmationModal
          isOpen={isSaveModalVisible}
          onCancel={handleSaveCancel}
          onConfirm={handleSaveConfirm}
          isLoading={isUpdating}
        />
      </div>
    </ErrorBoundary>
  );
};

export default ChainManagementConfiguration;
