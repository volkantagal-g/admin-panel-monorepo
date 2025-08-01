import { InfoCircleOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Button, Radio, Select } from '@shared/components/GUI';
import chevronDown from '@app/pages/MarketProductChainManagement/assets/Icons/chevron-down.svg';
import { useMarketTranslation } from '@app/pages/MarketProductChainManagement/hooks/useMarketTranslation';

import { REDUX_STORE_KEYS } from '@app/pages/MarketProductChainManagement/constants';
import { DATASET_OPTIONS, STEPS } from '../constants';
import useStyles from '../styles';

const DatasetSelection = ({
  values,
  setFieldValue,
  setCurrentStep,
}) => {
  const { t } = useMarketTranslation();
  const classes = useStyles();
  const { errors, touched } = useFormikContext();
  const { id: darkStoreId } = useParams();

  const { cities, centralWarehouses, darkStores, loading } = useSelector(state => ({
    cities: state?.[REDUX_STORE_KEYS.MATCH_DARKSTORE]?.cities || [],
    centralWarehouses: state?.[REDUX_STORE_KEYS.MATCH_DARKSTORE]?.centralWarehouses || [],
    darkStores: state?.[REDUX_STORE_KEYS.MATCH_DARKSTORE]?.darkStores || [],
    loading: state?.[REDUX_STORE_KEYS.MATCH_DARKSTORE]?.loading || {},
  }));

  useEffect(() => {
    if (darkStoreId && darkStores.length > 0) {
      const darkStore = darkStores.find(ds => ds.value === darkStoreId);
      if (darkStore) {
        setFieldValue('dataset', DATASET_OPTIONS.DARK_STORE);
        setFieldValue('selectedValue', darkStoreId);
      }
    }
  }, [darkStoreId, darkStores, setFieldValue]);

  const loadingContent = (
    <div className={classes.loadingContainer}>
      <Spin size="small" />
    </div>
  );

  const renderSelect = () => {
    if (!values.dataset) return null;

    const selectProps = {
      className: classes.selectWrapper,
      autoComplete: 'off',
      showSearch: true,
      value: values.selectedValue,
      onChange: value => {
        setFieldValue('selectedValue', value);
      },
      error: touched.selectedValue && errors.selectedValue,
      suffixIcon: <img src={chevronDown} alt="chevron-down" />,
    };

    switch (values.dataset) {
      case DATASET_OPTIONS.CITY:
        return (
          <Select
            {...selectProps}
            optionsData={cities.map(city => ({
              value: city.value,
              label: city.label,
            }))}
            label={t('CITY')}
            loading={loading.cities}
            notFoundContent={loading.cities ? loadingContent : t('NO_DATA')}
            filterOption={(input, option) => option.label?.toLowerCase().includes(input.toLowerCase())}
          />
        );
      case DATASET_OPTIONS.CENTRAL_WAREHOUSE:
        return (
          <Select
            {...selectProps}
            optionsData={centralWarehouses.map(cw => ({
              value: cw.value,
              label: cw.label,
            }))}
            label={t('CENTRAL_WAREHOUSE')}
            loading={loading.centralWarehouses}
            notFoundContent={loading.centralWarehouses ? loadingContent : t('NO_DATA')}
            filterOption={(input, option) => option.label?.toLowerCase().includes(input.toLowerCase())}
          />
        );
      case DATASET_OPTIONS.DARK_STORE:
        return (
          <Select
            {...selectProps}
            optionsData={darkStores.map(ds => ({
              value: ds.value,
              label: ds.label,
            }))}
            label={t('DARK_STORE')}
            loading={loading.darkStores}
            notFoundContent={loading.darkStores ? loadingContent : t('NO_DATA')}
            filterOption={(input, option) => option.label?.toLowerCase().includes(input.toLowerCase())}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className={classes.infoBox}>
        <div className={classes.infoIconWrapper}>
          <InfoCircleOutlined className={classes.infoIcon} />
        </div>
        <div className={classes.infoText}>
          {t('MATCH_DARK_STORE_TITLE')}
        </div>
      </div>
      <div className={classes.selectInfo}>
        <p className={classes.selectInfoTitle}>{t('SELECT_YOUR_DATASET')}</p>
        <div className={classes.formGroup}>
          <div className={classes.radioGroup}>
            {[
              { value: DATASET_OPTIONS.CITY, label: t('CITY') },
              { value: DATASET_OPTIONS.CENTRAL_WAREHOUSE, label: t('CENTRAL_WAREHOUSE') },
              { value: DATASET_OPTIONS.DARK_STORE, label: t('DARK_STORE') },
            ].map(option => (
              <Radio
                key={option.value}
                value={option.value}
                checked={values.dataset === option.value}
                onChange={() => {
                  setFieldValue('dataset', option.value);
                  setFieldValue('selectedValue', null);
                }}
                error={touched.dataset && errors.dataset}
              >
                <span>{option.label}</span>
              </Radio>
            ))}
          </div>
          {touched.dataset && errors.dataset && (
            <div className={classes.errorText}>{errors.dataset}</div>
          )}
        </div>
        {renderSelect()}
        <div className={classes.continueButton}>
          <Button
            type="primary"
            onClick={() => {
              if (!errors.dataset && !errors.selectedValue) {
                setCurrentStep(STEPS.DATA_DISPLAY);
              }
            }}
            disabled={!values.selectedValue || Object.keys(errors).length > 0}
          >
            {t('CONTINUE')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default DatasetSelection;
