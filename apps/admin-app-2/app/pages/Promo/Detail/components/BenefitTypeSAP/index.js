import { DownloadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Tooltip } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { ValidationError } from 'yup';

import { isNil } from 'lodash';

import { PROMO_MECHANICS } from '@app/pages/Promo/constantValues';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

import { getSuppliersSelector } from '@shared/redux/selectors/common';
import CsvImporter from '@shared/components/UI/CsvImporter';
import { usePermission } from '@shared/hooks';
import { getChildPromosSelector, updateConditionProductsSelector } from '@app/pages/Promo/Detail/redux/selectors';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators } from '../../redux/actions';
import permKey from '@shared/shared/permKey.json';
import { ExampleCSV } from '../ExampleCSVModal';
import { SAP_EXAMPLE_CSV, validateCSVData } from './formHelper';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';

const BenefitTypeSAP = () => {
  const [importCount, setImportCount] = useState(0);
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const canEdit = canAccess(permKey.PAGE_PROMO_DETAIL_EDIT);
  const promoMechanic = useSelector(PromoDetailSlice.selectors.promoMechanic);
  const isUpdatePending = useSelector(updateConditionProductsSelector.getIsPending);
  const isChildrenRequestPending = useSelector(getChildPromosSelector.getIsPending);
  const suppliers = useSelector(getSuppliersSelector.getData);
  const isSuppliersPending = useSelector(getSuppliersSelector.getIsPending);

  const validSuppliers = useMemo(() => {
    return suppliers.filter(supplier => !!supplier.supplierReferenceId);
  }, [suppliers]);

  const [isFormEditable, setIsFormEditable] = useState(false);
  const [canBeSubmittable, setCanBeSubmittable] = useState(false);
  const [benefitSAPData, setBenefitSAPData] = useState([]);
  const { t } = useTranslation('promoPage');
  const theme = useTheme();

  const handleBenefitSAPImport = ({ data }) => {
    try {
      if (!data?.length) {
        return;
      }
      const csvData = [];
      const productIds = new Set();
      data.forEach(d => {
        const key = `${d.item}-${d.promo_code}`;
        if (
          promoMechanic === PROMO_MECHANICS.BASKET_BASED_CHANGE_PRICE ||
          promoMechanic === PROMO_MECHANICS.STAR_DEALS
        ) {
          if (d.discountedPrice === null || d.discountedPrice === undefined) {
            throw new Error(t('ERRORS.ERR_DISCOUNTED_PRICE_FIELD_SHOULD_BE_GREATER_THAN_0'));
          }
        }
        if (!productIds.has(key)) {
          productIds.add(key);
          csvData.push(
            {
              ...d,
              third_party_sap_ref_code: d.third_party_sap_ref_code ? d.third_party_sap_ref_code?.toString() : null,
              supplier_sap_ref_code: d.supplier_sap_ref_code ? d.supplier_sap_ref_code?.toString() : null,
              discounted_price: d.discounted_price ? parseFloat(d.discounted_price) : null,
            },
          );
        }
      });
      if (!csvData.every(product => isNil(product.supplier_sap_ref_code) || validSuppliers.some(
        supplier => supplier.supplierReferenceId.toString() === product.supplier_sap_ref_code.toString(),
      ))) {
        dispatch(
          ToastCreators.error({ message: t('ERR_INVALID_SUPPLIER') }),
        );
        return;
      }

      if (!csvData.every(product => isNil(product.third_party_sap_ref_code) || validSuppliers.some(
        supplier => supplier.supplierReferenceId.toString() === product.third_party_sap_ref_code.toString(),
      ))) {
        dispatch(
          ToastCreators.error({ message: t('ERR_INVALID_SUPPLIER') }),
        );
        return;
      }

      validateCSVData(csvData, t);
      setBenefitSAPData(csvData);
      setCanBeSubmittable(true);
      setImportCount(csvData?.length);
    }
    catch (error) {
      if (error instanceof ValidationError) {
        setImportCount(0);
        setCanBeSubmittable(false);
        dispatch(
          ToastCreators.error({ message: `${t('BULK_PROMO.INVALID_BULK_CSV')} : ${error.message}. path: ${error.path}` }),
        );
      }
    }
  };

  const handleBenefitSAPSubmit = () => {
    return dispatch(Creators.updateBenefitSAPBulkRequest({ body: benefitSAPData }));
  };

  const handleDownloadCsv = () => {
    dispatch(Creators.getChildPromosRequest({
      limit: 10000,
      page: 0,
      isBenefitSAP: true,
    }));
  };

  useEffect(() => {
    dispatch(CommonCreators.getSuppliersRequest());
  }, [dispatch]);

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {isFormEditable ? (
        <>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" onClick={() => setIsFormEditable(false)}>
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button
                size="small"
                form="condition-products"
                type="primary"
                htmlType="submit"
                loading={isUpdatePending}
                disabled={!canBeSubmittable}
                onClick={handleBenefitSAPSubmit}
              >
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button size="small" onClick={() => setIsFormEditable(true)} disabled={isSuppliersPending}>
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );

  return (
    <>
      <Row gutter={[theme.spacing(3)]}>
        <Col
          xs={12}
          lg={12}
          className="mt-2"
          style={{ display: 'flex', paddingLeft: 0, marginLeft: '-5px' }}
        >
          <CsvImporter
            onOkayClick={handleBenefitSAPImport}
            hasNestedHeaderKeys
            importButtonText={t('CONDITION_PRODUCTS.UPLOAD_CSV')}
            isButton
            loading={isUpdatePending}
            disabled={!isFormEditable}
          />
          <ExampleCSV modalProps={{ width: 1000 }} exampleCsv={[SAP_EXAMPLE_CSV]} />
          <Button
            icon={<DownloadOutlined />}
            className="ml-1"
            onClick={handleDownloadCsv}
            disabled={!isFormEditable}
            loading={isChildrenRequestPending || isUpdatePending}
          >
            {t('CONDITION_PRODUCTS.DOWNLOAD_CSV')}
          </Button>
          <Tooltip title={t('BENEFIT_SAP.BENEFIT_TYPE_SAP_TOOLTIP')}>
            <InfoCircleOutlined style={{ marginTop: 12, marginLeft: 10 }} />
          </Tooltip>
        </Col>
      </Row>
      {importCount ? (
        <Row className="alert alert-success mt-2 mb-0" role="alert">
          <b>
            {t('CONDITION_PRODUCTS.SUCCESS_N_PRODUCTS_IMPORT', { importCount })}
          </b>
        </Row>
      ) : null}
      {canEdit && cardFooter}
    </>
  );
};

export default BenefitTypeSAP;
