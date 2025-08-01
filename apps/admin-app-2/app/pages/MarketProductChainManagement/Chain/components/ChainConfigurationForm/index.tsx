import { LoadingOutlined } from '@ant-design/icons';
import { Checkbox, Form, FormInstance, Skeleton, Spin, Switch } from 'antd';
import { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { XCommFloatingLabel } from '@app/pages/MarketProductChainManagement/components/XCommFloatingLabel';
import { createSegment2Options, createSegmentOptions } from '@app/pages/MarketProductChainManagement/utils/segmentMapper';
import ChainDatePicker from '../ChainDatePicker';
import ChainNumberInput from '../ChainNumberInput';
import useStyles from './styles';

// Tip tanımlamaları
type OptionType = {
  id: string;
  name: string;
};

type FormValues = {
  chainType?: string;
  storageType?: string;
  productSegmentPlanning?: number;
  productSegmentLogistic?: number;
  introductionDate?: Moment;
  terminationDate?: Moment;
  batchSize?: number;
  minOrderQuantity?: number;
  minStock?: number;
  segment?: string;
  segment2?: string;
  planningSegment?: string;
  pickedToZero?: boolean;
  isEnabled?: boolean;
};

/**
 * ChainConfigurationForm bileşeni props arayüzü
 */
interface ChainConfigurationFormProps {
  form: FormInstance;
  isEdit?: boolean;
  isBulkEdit?: boolean;
  onFinish: (values: FormValues) => void;
  onFinishFailed: (errorInfo: any) => void;
  initialValues?: FormValues;
  // Call status props
  loading?: boolean;
  error?: string | null;
  success?: boolean;
}

/**
 * Zincir konfigürasyon formu bileşeni
 * Zincir detaylarını görüntüler ve düzenleme imkanı sağlar
 */
const ChainConfigurationForm: React.FC<ChainConfigurationFormProps> = ({
  form,
  isEdit = false,
  isBulkEdit = false,
  onFinish,
  onFinishFailed,
  initialValues,
  // Call status props
  loading = false,
  error,
  success,
}) => {
  const { t } = useTranslation('marketProductChainManagement');
  const classes = useStyles();
  const [formValues, setFormValues] = useState<FormValues>({} as FormValues);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [formTouched, setFormTouched] = useState(false);

  // Form durumunu belirle - isEdit false ise form disabled olmalı
  // Ayrıca veri yüklenmemişse de form disabled olmalı
  const isFormDisabled = !isEdit || !dataLoaded;
  const hasData = initialValues && Object.keys(initialValues).length > 0;

  // Form değerlerini başlangıçta ayarla
  useEffect(() => {
    if (initialValues) {
      // Loading durumunda form değerlerini koruyalım
      if (!loading) {
        form.setFieldsValue(initialValues);
        setFormValues(initialValues);
      }
      setDataLoaded(true);
      // Form ilk yüklendiğinde touched durumunu sıfırla
      setFormTouched(false);
    }
    else {
      // Veri yoksa formu sıfırla
      form.resetFields();
      setFormValues({} as FormValues);
      setDataLoaded(false);
      setFormTouched(false);
    }
  }, [form, initialValues, loading]);

  /**
   * Form değerleri değiştiğinde çalışır
   */
  const handleValuesChange = (_: any, allValues: FormValues) => {
    setFormValues(allValues);
    // Form değiştiğinde touched durumunu true yap
    setFormTouched(true);
  };

  // Veri yok ve hata var
  if (loading && !dataLoaded) {
    return (
      <div className={classes.container}>
        <h2 className={classes.title}>{t('CONFIGURATIONS')}</h2>
        <p className={classes.subtitle}>{t('CONFIGURATIONS_SUBTITLE')}</p>

        {/* Tarih Aralığı Skeleton */}
        <div className={classes.section}>
          <h3 className={classes.sectionTitle}>{t('DATE_RANGE')}</h3>
          <div className={classes.dateInputs}>
            <Skeleton.Input active style={{ width: '100%', height: 40 }} />
            <Skeleton.Input active style={{ width: '100%', height: 40 }} />
          </div>
        </div>

        {/* Konfigürasyon Skeleton */}
        <div className={classes.section}>
          <h3 className={classes.sectionTitle}>{t('CONFIGURATIONS')}</h3>
          <div className={classes.configInputs}>
            <Skeleton.Input active style={{ width: '100%', height: 40 }} />
            <Skeleton.Input active style={{ width: '100%', height: 40 }} />
            <Skeleton.Input active style={{ width: '100%', height: 40 }} />
            <Skeleton.Input active style={{ width: '100%', height: 40 }} />
            <Skeleton.Input active style={{ width: '100%', height: 40 }} />
          </div>
        </div>

        {/* Diğer Ayarlar Skeleton */}
        <div className={classes.section}>
          <Skeleton.Input active style={{ width: 100, height: 24 }} />
          <Skeleton.Input active style={{ width: 100, height: 24 }} />
        </div>
      </div>
    );
  }

  // Veri yüklendikten sonra form göster
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{t('CONFIGURATIONS')}</h2>
      <p className={classes.subtitle}>{t('CONFIGURATIONS_SUBTITLE')}</p>

      <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
        {/* Hata mesajı */}
        {error && (
          <div className={classes.errorMessage}>
            {error}
          </div>
        )}

        {/* Başarı mesajı */}
        {success && (
          <div className={classes.successMessage}>
            {t('FORM_MESSAGES.CHANGES_SAVED')}
          </div>
        )}

        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          className={classes.form}
          validateTrigger={['onSubmit']}
          onValuesChange={handleValuesChange}
        >
          {/* Tarih Aralığı Bölümü */}
          <div className={classes.section}>
            <h3 className={classes.sectionTitle}>{t('DATE_RANGE')}</h3>
            <div className={classes.dateInputs}>
              <Form.Item name="introductionDate">
                <ChainDatePicker
                  name="introductionDate"
                  label={t('FIELD_NAMES.INTRODUCTIONDATE')}
                  disabled={isFormDisabled}
                />
              </Form.Item>
              <Form.Item name="terminationDate">
                <ChainDatePicker
                  name="terminationDate"
                  label={t('FIELD_NAMES.TERMINATIONDATE')}
                  disabled={isFormDisabled}
                />
              </Form.Item>
            </div>
          </div>

          {/* Konfigürasyon Bölümü */}
          <div className={classes.section}>
            <h3 className={classes.sectionTitle}>{t('CONFIGURATIONS')}</h3>
            <div className={classes.configInputs}>
              {/* Parti Büyüklüğü */}
              <Form.Item name="batchSize">
                <ChainNumberInput
                  label={t('FIELD_NAMES.BATCHSIZE')}
                  name="batchSize"
                  min={0}
                  disabled={isFormDisabled}
                />
              </Form.Item>

              {/* Minimum Sipariş Miktarı */}
              <Form.Item name="minOrderQuantity">
                <ChainNumberInput
                  label={t('FIELD_NAMES.MOQ')}
                  name="minOrderQuantity"
                  min={0}
                  disabled={isFormDisabled}
                />
              </Form.Item>

              {/* Minimum Stok */}
              <Form.Item name="minStock">
                <ChainNumberInput
                  label={t('FIELD_NAMES.MINSTOCK')}
                  name="minStock"
                  min={0}
                  disabled={isFormDisabled}
                />
              </Form.Item>

              {/* Segment */}
              <Form.Item name="segment">
                <XCommFloatingLabel.Select
                  label={t('FIELD_NAMES.SEGMENT')}
                  allowClear
                  loading={false}
                  optionsData={createSegmentOptions()}
                  showSearch
                  disabled={isFormDisabled}
                />
              </Form.Item>

              {/* Segment 2 */}
              <Form.Item name="segment2">
                <XCommFloatingLabel.Select
                  label={t('FIELD_NAMES.SEGMENT2')}
                  allowClear
                  loading={false}
                  optionsData={createSegment2Options()}
                  showSearch
                  disabled={isFormDisabled}
                />
              </Form.Item>
            </div>
          </div>

          {/* Diğer Ayarlar Bölümü */}
          <div className={classes.section}>
            <Form.Item
              name="pickedToZero"
              valuePropName="checked"
            >
              <Checkbox disabled={!isEdit}>{t('PICKED_TO_ZERO')}</Checkbox>
            </Form.Item>
            <Form.Item
              name="isEnabled"
              valuePropName="checked"
            >
              <Switch
                checkedChildren={t('ENABLED')}
                unCheckedChildren={t('DISABLED')}
                disabled={!isEdit}
              />
            </Form.Item>
          </div>
        </Form>
      </Spin>
    </div>
  );
};

export default ChainConfigurationForm;
