import { Button, Col, Form, Modal, Row, Select } from 'antd';
import React, { memo, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';

import { ValidationError } from 'yup';

import { ProfileOutlined } from '@ant-design/icons';

import { validate } from '@shared/yup';
import CsvImporter from '@shared/components/UI/CsvImporter';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { downloadDataAsCSV, getSelectFilterOption } from '@shared/utils/common';
import { Creators } from '../../redux/actions';
import { createBulkPromosSelector, getMasterPromoIdsSelector } from '../../redux/selectors';
import {
  csvLineType,
  ExampleCsvColumns,
  ExampleCsvData,
  getInitialValues,
  getParentIdOptions,
  getValuesBeforeSubmit,
  validateCSVData,
  validationSchema,
} from './formHelper';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import useStyles from '@app/pages/Promo/Bulk/components/BulkModalForm/styles';

type BulkModalProps = {
  visible: boolean;
  onCancel: () => void;
};

type BulkModalFormProps = {
  onCancel: () => void;
};

const BulkModalForm = ({ onCancel }: BulkModalFormProps) => {
  const [promoCount, setPromoCount] = useState(0);
  const dispatch = useDispatch();
  const isPending = useSelector(createBulkPromosSelector.getIsPending);
  const masterPromos = useSelector(getMasterPromoIdsSelector.getData);
  const masterPromosPending = useSelector(getMasterPromoIdsSelector.getIsPending);
  const createBulkPromosData = useSelector(createBulkPromosSelector.getData);
  const countryLanguages = getSelectedCountryLanguages();
  const { t } = useTranslation('promoPage');
  const classes = useStyles();

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(),
    onSubmit: async values => {
      try {
        const body = getValuesBeforeSubmit(values, countryLanguages);
        return dispatch(Creators.createBulkPromosRequest(body));
      }
      catch (error) {
        return dispatch(ToastCreators.error({ error }));
      }
    },
  });

  const { handleSubmit, values, errors, setFieldValue } = formik;

  // Whenever a master promo is selected, we also need to set the promoType for later validation
  const handlePromoSelect = (parentId: string) => {
    const promoType = masterPromos.find(
      (promo: { _id: string; promoType: number }) => promo._id === parentId,
    )?.promoType;
    setFieldValue('promoType', promoType);
    setFieldValue('parentId', parentId);
  };

  const isDiscountAmountWrong = useMemo(() => {
    return Object.keys(errors).find(error => error.includes('discount_amount'));
  }, [errors]);

  const handleCSVImport = ({ data }: { data: csvLineType[] }) => {
    try {
      validateCSVData(data);
      setFieldValue('bulkPromos', data);
      setPromoCount(data?.length || 0);
    }
    catch (error) {
      // Yup will throw error if data is empty or invalid
      if (error instanceof ValidationError) {
        dispatch(
          ToastCreators.error({ message: `${t('BULK_PROMO.INVALID_BULK_CSV')} :${error.path}` }),
        );
      }
    }
  };

  const downloadExample = () => {
    downloadDataAsCSV({
      data: ExampleCsvData,
      columns: ExampleCsvColumns,
      fileName: 'bulk_promo_example',
    });
  };

  const getPromos = useCallback((search?: string) => {
    dispatch(Creators.getMasterPromoIdsRequest({ promoCode: search }));
  }, [dispatch]);

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({ callback: getPromos });

  useEffect(() => {
    getPromos();
  }, [getPromos]);

  useEffect(() => {
    if (createBulkPromosData.length && promoCount) {
      setPromoCount(0);
      onCancel();
    }
  }, [createBulkPromosData, onCancel, promoCount]);

  return (

    <Form
      layout="vertical"
    >
      <Row className="mb-3">{t('BULK_PROMO.TIP_CREATE_MASTER_PROMO')}</Row>
      <Row>
        <Col span={24}>
          <Form.Item
            help={get(errors, 'parentId')}
            validateStatus={get(errors, 'parentId') ? 'error' : 'success'}
            label={t('MASTER_ID')}
          >
            <Select
              value={values.parentId}
              options={getParentIdOptions(masterPromos)}
              onChange={handlePromoSelect}
              showSearch
              onSearch={debouncedHandleSearch}
              filterOption={getSelectFilterOption}
              loading={isPending || masterPromosPending}
              disabled={isPending}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row className={classes.importRow}>
        <Col>
          <CsvImporter
            onOkayClick={handleCSVImport}
            hasNestedHeaderKeys
            importButtonText={t('UPLOAD_CSV')}
            buttonType="primary"
            isButton
          />
        </Col>
        <Col>
          <Button
            icon={<ProfileOutlined />}
            onClick={downloadExample}
          >
            {t('global:EXAMPLE_CSV')}
          </Button>
        </Col>
        <Col>
          {promoCount ? (
            <Row className="alert alert-success mb-0" role="alert">
              <b>
                {t('BULK_PROMO.SUCCESS_N_PROMOS_IMPORT').replace(
                  '{promoCount}',
                  promoCount.toString(),
                )}
              </b>
            </Row>
          ) : null}
          {errors.bulkPromos ? (
            <Row className="alert alert-danger mb-0" role="alert">
              <b>{t('BULK_PROMO.EMPTY_CSV')}</b>
            </Row>
          ) : null}
        </Col>
        {isDiscountAmountWrong ? (
          <Col>
            <Row className="alert alert-danger mt-2" role="alert">
              {t('BULK_PROMO.PERCENTAGE')}
            </Row>
          </Col>
        ) : null}
        <Col
          span={24}
          className={classes.buttonContainer}
        >
          <Button onClick={onCancel}>
            {t('button:CANCEL')}
          </Button>
          <Button
            type="primary"
            loading={isPending}
            onClick={() => handleSubmit()}
          >
            {t('button:CREATE')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

const BulkModal = memo(function BulkModal({ visible, onCancel }: BulkModalProps) {
  const { t } = useTranslation('promoPage');

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, visible]);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      centered
      title={t('BULK_PROMO.TITLE')}
      visible
      onCancel={onCancel}
      footer={null}
    >
      <BulkModalForm onCancel={onCancel} />
    </Modal>
  );
});

export default BulkModal;
