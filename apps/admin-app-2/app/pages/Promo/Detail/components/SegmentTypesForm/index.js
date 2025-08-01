import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useFormik } from 'formik';
import { has, isEmpty } from 'lodash';
import { Button, Col, Collapse, Form, Row, Select } from 'antd';

import { updatePromoSegmentTypesSelector } from '@app/pages/Promo/Detail/redux/selectors';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { getInitialValues, getOnlyModifiedValuesBeforeSubmit, getSegmentTypesOptions, validate } from './formHelper';
import permKey from '@shared/shared/permKey.json';
import { canSubmit } from '@shared/utils/formHelper';
import { usePermission, usePrevious } from '@shared/hooks';
import { Creators } from '../../redux/actions';
import CsvImporter from '@shared/components/UI/CsvImporter';
import { getSelectFilterOption } from '@shared/utils/common';
import { ERROR_TIMEOUT_MS } from '@app/pages/Promo/constantValues';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';

const { Panel } = Collapse;

const SegmentTypesForm = () => {
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const canEdit = canAccess(permKey.PAGE_PROMO_DETAIL_EDIT);
  const promo = useSelector(PromoDetailSlice.selectors.promo);
  const isUpdatePending = useSelector(updatePromoSegmentTypesSelector.getIsPending);
  const updateError = useSelector(updatePromoSegmentTypesSelector.getError);

  const [isFormEditable, setIsFormEditable] = useState(false);
  const [isCSVModalOpen, setIsCSVModalOpen] = useState(false);
  const [clientIds, setClientIds] = useState([]);
  const [loadedFile, setLoadedFile] = useState();
  const [loadedBase64File, setLoadedBase64File] = useState();
  const { t } = useTranslation('promoPage');
  const theme = useTheme();
  const prevIsUpdatePending = usePrevious(isUpdatePending);

  const initialValues = useMemo(() => getInitialValues(), []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: values => {
      try {
        validate({ values, clientIds });
        const body = getOnlyModifiedValuesBeforeSubmit({ values, loadedFile, loadedBase64File });
        return dispatch(Creators.updatePromoSegmentTypesRequest({ id: promo._id, body }));
      }
      catch (error) {
        return dispatch(ToastCreators.error({ error }));
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

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };

  const handleCSVImportOnOkayClick = ({ data }, file, base64file) => {
    if (isEmpty(data) || !has(data[0], 'client')) {
      return dispatch(ToastCreators.error({
        message: t('ERR_CHECK_CSV_FORMAT'),
        toastOptions: { autoClose: ERROR_TIMEOUT_MS },
      }));
    }
    setClientIds(data);
    setLoadedFile(file);
    setLoadedBase64File(base64file);
    setIsCSVModalOpen(false);
    return null;
  };

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
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
            <Button size="small" onClick={handleEditClick}>
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );

  return (
    <Form layout="vertical">
      <Row gutter={[theme.spacing(3)]}>
        <Col span={12} className="mt-2">
          <Form.Item
            label={t('global:UPLOAD_FILE')}
          >
            <Button onClick={() => setIsCSVModalOpen(true)} size="small">
              <CsvImporter
                modalProps={{ title: t('global:UPLOAD_CSV'), okText: t('button:UPLOAD') }}
                onOkayClick={handleCSVImportOnOkayClick}
                disabled={isUpdatePending || !isFormEditable}
                importButtonText={t('SEGMENT_TYPES.IMPORT_CLIENTS_FROM_CSV')}
                exampleCsv={{ client: 'id' }}
                isVisible={isCSVModalOpen}
                exampleTableProps={{
                  className: null,
                  scroll: { x: '100vw', y: 240 },
                }}
              />
            </Button>
          </Form.Item>
        </Col>
        <Col span={12} className="mt-2">
          <Form.Item
            label={t('SEGMENT_TYPES.HEADER_TITLE')}
          >
            <Select
              placeholder={t('SEGMENT_TYPES.HEADER_TITLE')}
              className="w-100"
              labelInValue
              value={values?.segmentTypes}
              options={getSegmentTypesOptions()}
              disabled={isUpdatePending || !isFormEditable}
              onChange={segmentTypes => {
                setFieldValue('segmentTypes', segmentTypes);
              }}
              autoComplete="off"
              allowClear
              showSearch
              filterOption={getSelectFilterOption}
              mode="multiple"
            />
          </Form.Item>
        </Col>
      </Row>
      {canEdit && cardFooter}
    </Form>
  );
};

const SegmentTypesSection = memo(function SegmentTypesSection() {
  const { t } = useTranslation('promoPage');

  const isP3Enabled = useSelector(PromoDetailSlice.selectors.p3Enabled);
  const isParent = useSelector(PromoDetailSlice.selectors.isParent);

  if (isParent || isP3Enabled) {
    return null;
  }

  return (
    <Col xs={24}>
      <Collapse className="mb-2">
        <Panel header={t('SEGMENT_TYPES.HEADER_TITLE')} key={1}>
          <SegmentTypesForm />
        </Panel>
      </Collapse>
    </Col>
  );
});

export default SegmentTypesSection;
