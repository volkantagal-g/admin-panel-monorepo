import { Form, message, Modal, Result } from 'antd';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Content from '@app/pages/MarketProductChainManagement/components/Content';
import ErrorFallback from '@app/pages/MarketProductChainManagement/components/ErrorFallback';
import Header from '@app/pages/MarketProductChainManagement/components/Header';
import { REDUX_STORE_KEYS } from '@app/pages/MarketProductChainManagement/constants';
import { TRANSLATION_NAMESPACE } from '@app/pages/MarketProductChainManagement/hooks/useMarketTranslation';
import { ROUTE_MAP } from '@app/routes';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import DetailInfo from '../components/DetailInfo';

import ChainConfigurationForm from '../components/ChainConfigurationForm';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import {
  selectChainDetail,
  selectChainDetailError,
  selectChainDetailLoading,
  selectDomainDetail,
  selectIsEditMode,
  selectLocationDetail,
  selectProductDetail,
  selectSupplierDetail,
} from './redux/selectors';
import type { FormValues } from './redux/types';
import useStyles from './styles';

// Constants
const REDIRECT_DELAY = 2000;

/**
 * Zincir detay sayfası
 */
const ChainDetail: React.FC = () => {
  // Hooks
  const { t } = useTranslation(TRANSLATION_NAMESPACE);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: chainId, domainType } = useParams();
  const routerLocation = useLocation();
  const [form] = Form.useForm();
  // Track whether we have already shown the domain required modal to avoid duplicate modals
  const [isDomainModalShown, setIsDomainModalShown] = useState(false);

  // Redux state
  useInjectSaga({ key: REDUX_STORE_KEYS.CHAIN_DETAIL, saga });
  useInjectReducer({ key: REDUX_STORE_KEYS.CHAIN_DETAIL, reducer });

  const chain = useSelector(selectChainDetail);
  const product = useSelector(selectProductDetail);
  const supplier = useSelector(selectSupplierDetail);
  const chainLocation = useSelector(selectLocationDetail);
  const domain = useSelector(selectDomainDetail);
  const loading = useSelector(selectChainDetailLoading);
  const error = useSelector(selectChainDetailError);
  const isEditMode = useSelector(selectIsEditMode);

  // Form initial values
  const initialValues = useMemo(() => ({
    chainType: chain?.chainType || undefined,
    storageType: chain?.storageType || undefined,
    productSegmentPlanning: chain?.productSegmentPlanning,
    productSegmentLogistic: chain?.productSegmentLogistic,
    introductionDate: chain?.introductionDate ? moment(chain.introductionDate) : undefined,
    terminationDate: chain?.terminationDate ? moment(chain.terminationDate) : undefined,
    batchSize: chain?.batchSize,
    minOrderQuantity: chain?.minOrderQuantity,
    minStock: chain?.minStock,
    segment: chain?.productSegmentPlanning?.toString() || undefined,
    segment2: chain?.productSegmentLogistic?.toString() || undefined,
    planningSegment: chain?.planningSegment || undefined,
    pickedToZero: chain?.pickedToZero || false,
    isEnabled: chain?.isEnabled || false,
  }), [chain]);

  // Fetch chain details
  useEffect(() => {
    if (chainId) {
      dispatch(Creators.getChainDetailRequest(chainId, domainType));
    }

    return () => {
      if (chainId) {
        dispatch(Creators.destroyPage());
      }
    };
  }, [chainId, domainType, dispatch]);

  // Set form values when chain data is loaded or updated
  useEffect(() => {
    if (chain && !loading) {
      form.setFieldsValue(initialValues);
    }
  }, [chain, form, initialValues, loading]);

  // Update form values when edit mode changes
  useEffect(() => {
    if (!isEditMode && chain && !loading) {
      form.setFieldsValue(initialValues);
    }
  }, [isEditMode, chain, form, initialValues, loading]);

  // Zincir başlığı
  const chainTitle = useMemo(() => {
    if (!product || !supplier) return '';
    return `${product.nameTR || product.nameEN} - ${supplier.name}`;
  }, [product, supplier]);

  // Detay bilgileri
  const detailData = useMemo(() => {
    if (!product || !supplier || !chainLocation) return null;
    const data: any = {
      product: product.nameTR || product.nameEN || '-',
      supplier: supplier.name || '-',
      location: chainLocation.name || '-',
      createdAt: chain?.createdAt || '-',
      updatedAt: chain?.updatedAt || '-',
    };
    if (domain && domain.name) {
      data.domain = domain.name;
    }
    else {
      data.domain = t('ALL_DOMAINS');
    }
    return data;
  }, [product, supplier, chainLocation, domain, chain, t]);

  // Geçersiz ID kontrolü
  useEffect(() => {
    if (!chainId) {
      const timeoutId = setTimeout(() => {
        navigate(ROUTE_MAP.MARKET_PRODUCT_CHAIN_MANAGEMENT_CHAIN_LIST.path, {
          state: { invalidId: true },
          replace: true,
        });
      }, REDIRECT_DELAY);

      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [chainId, navigate]);

  // Domain requirement check: show modal if chainType needs domain but URL lacks it
  useEffect(() => {
    const needsDomain =
      (chain && ['SUP_DS_CHAIN', 'CW_DS_CHAIN'].includes(chain.chainType ?? '')) ||
      (!chain && error);

    const shouldShowModal = needsDomain && (
      !domainType ||
      (domainType && !domain && error)
    );

    if (!isDomainModalShown && shouldShowModal) {
      setIsDomainModalShown(true);

      const { pathname, search } = routerLocation;
      const basePath = pathname.replace(/\/$/, '');

      Modal.warning({
        title: t('DOMAIN_REQUIRED_TITLE', 'Domain Gerekli'),
        content: (
          <div>
            <p style={{ marginBottom: 8 }}>
              {t(
                'DOMAIN_REQUIRED_MESSAGE',
                'Bu zincir tipi bir domain ile yönetilmelidir. Lütfen domain bilgisi ile tekrar deneyiniz.',
              )}
            </p>
            <p style={{ margin: 0 }}>{t('CORRECT_URL_EXAMPLE', 'Örnek doğru URL:')}</p>
            <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, marginTop: 4, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {basePath}/<strong>&lt;domainType&gt;</strong>{search}
            </pre>
          </div>
        ),
        okText: t('OK', 'Tamam'),
      });
    }
  }, [chain, error, domainType, domain, isDomainModalShown, t, routerLocation]);

  // Event handlers
  const handleEditClick = () => {
    dispatch(Creators.setEditMode(true));
  };

  const handleSave = (values: FormValues) => {
    const changedFields: Partial<FormValues> = {};

    Object.keys(values).forEach(key => {
      const currentValue = values[key as keyof FormValues];
      const initialValue = initialValues[key as keyof FormValues];

      if (currentValue !== initialValue) {
        (changedFields as any)[key] = currentValue;
      }
    });

    if (Object.keys(changedFields).length > 0) {
      dispatch(Creators.updateChainRequest(chainId, changedFields, domainType));
    }
    else {
      message.error(t('NO_CHANGES_DETECTED'));
      dispatch(Creators.setEditMode(false));
    }
  };

  const handleCancel = () => {
    dispatch(Creators.setEditMode(false));
    if (chain) {
      form.setFieldsValue(initialValues);
    }
  };

  // Geçersiz ID durumunda hata göster
  if (!chainId) {
    return (
      <Result
        status="error"
        title={t('INVALID_CHAIN_ID')}
        subTitle={t('REDIRECTING_TO_CHAINS')}
        className={classes.errorResult}
      />
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className={classes.container}>
        <Header
          title={chainTitle}
          configurationButton={false}
          importButton={false}
          exportButton={false}
          actionButton={false}
          editButton={!isEditMode}
          saveButton={isEditMode}
          cancelButton={isEditMode}
          onEditClick={handleEditClick}
          onSaveClick={() => {
            form.validateFields()
              .then(values => {
                handleSave(values);
              })
              .catch(info => {
                message.error(t('PLEASE_CHECK_FORM_ERRORS', 'Lütfen form hatalarını kontrol edin'));
              });
          }}
          onCancelClick={handleCancel}
          productId={product?.productId || null}
          buttons={[]}
          dsConfigurationButton={false}
          onDSConfigClick={() => {}}
          onImportClick={() => {}}
          onExportClick={() => {}}
          pageType="detail"
          loading={loading}
        />

        <DetailInfo data={detailData} />

        <Content
          pageContent={(
            <div className={classes.formWrapper}>
              <ChainConfigurationForm
                form={form}
                isEdit={isEditMode}
                onFinish={handleSave}
                onFinishFailed={errorInfo => {
                  message.error(t('PLEASE_CHECK_FORM_ERRORS', 'Lütfen form hatalarını kontrol edin'));
                }}
                initialValues={initialValues}
                loading={loading}
              />
            </div>
          )}
          loading={false}
        />
      </div>
    </ErrorBoundary>
  );
};

export default ChainDetail;
