import { Button, Col, DatePicker, Form, Modal, Row, Input } from 'antd';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { useTheme } from 'react-jss';

import { REDUX_KEY, DEFAULT_TIME_FORMAT } from '@shared/shared/constants';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { codeBulkEditSelector } from './redux/selectors';
import { canSubmit } from '@shared/utils/formHelper';
import CsvImporter from '@shared/components/UI/CsvImporter';
import { getOnlyModifiedValuesBeforeSubmit } from './formHelper';
import { useInitAndDestroyPage } from '@shared/hooks';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const initialValues = {
  codes: null,
  validFrom: null,
  validUntil: null,
};

const CodeBulkModal = ({ isModalVisible, handleModal, codeType }) => {
  const dispatch = useDispatch();
  const codeBulkResponse = useSelector(codeBulkEditSelector.getData);
  const codeBulkPending = useSelector(codeBulkEditSelector.getIsPending);
  const { t } = useTranslation('codeBulk');
  const theme = useTheme();
  const [isImportCodeModalVisible, setIsImportCodeModalVisible] = useState(false);
  useInitAndDestroyPage({ dispatch, Creators });

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      try {
        const body = getOnlyModifiedValuesBeforeSubmit({ values, t });
        return dispatch(
          Creators.codeBulkEditRequest({ body: { ...body, codeType } }),
        );
      }
      catch (error) {
        return dispatch(ToastCreators.error({ error }));
      }
    },
  });

  const { values, setFieldValue, handleSubmit } = formik;

  const canBeSubmittable = useMemo(() => canSubmit({ initialValues, values }), [values]);

  const exampleCsv = [
    'Column title',
    'code-1',
    'code-2',
    '...',
  ];

  const handleSelectDateRange = ([startDate, endDate]) => {
    setFieldValue('validFrom', startDate);
    setFieldValue('validUntil', endDate);
  };

  const handleCodesImport = ({ data }) => {
    if (!data.length) {
      return dispatch(ToastCreators.error({ error: t('ERR_INVALID_CSV_FILE') }));
    }
    const importedCodes = data.map(codes => {
      return Object.values(codes)?.[0];
    });
    setFieldValue('codes', importedCodes);
    return null;
  };

  useEffect(() => {
    if (codeBulkResponse.failedUpdateCodes?.length) {
      const error = t('ERR_FAILED_UPDATED_CODES').replace('{total}', codeBulkResponse.failedUpdateCount);
      return dispatch(ToastCreators.error({ message: error }));
    }
    return null;
  }, [codeBulkResponse.failedUpdateCodes?.length, codeBulkResponse.failedUpdateCount, dispatch, t]);

  useEffect(() => {
    if (codeBulkResponse.succesfullUpdateCount > 0) {
      const message = t('SUCCESS_UPDATE_COUNT').replace('{total}', codeBulkResponse.succesfullUpdateCount);
      return dispatch(ToastCreators.success({ message }));
    }
    return null;
  }, [codeBulkResponse.succesfullUpdateCount, dispatch, t]);

  return (
    <Modal
      centered
      title={t('EDIT_CODES')}
      visible={isModalVisible}
      onCancel={handleModal}
      footer={[
        <Row justify="end" gutter={[theme.spacing(2)]}>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" onClick={handleModal}>
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button
                size="small"
                form="edit-codes"
                type="primary"
                htmlType="submit"
                loading={codeBulkPending}
                disabled={!canBeSubmittable}
              >
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </Row>,
      ]}
    >
      <Form id="edit-codes" onFinish={handleSubmit} layout="horizontal">
        <Button onClick={() => setIsImportCodeModalVisible(true)} className="mb-1" style={{ border: 'none' }}>
          <CsvImporter
            onOkayClick={handleCodesImport}
            hasNestedHeaderKeys
            isVisible={isImportCodeModalVisible}
            importButtonText={t('IMPORT_CODES_BY_CSV')}
            isButton
          />
        </Button>
        <Row style={{ margin: 10 }}>
          <h5>{ t('EXAMPLE_CSV') }</h5>
          {exampleCsv.map(ex => <Col key={ex} xs={24}><code> { ex } </code></Col>)}
        </Row>
        <hr />
        <Row>
          <Col span={24}>
            <Form.Item label={t('START_END_DATES')}>
              <RangePicker
                disabled={!values.codes}
                format={DEFAULT_TIME_FORMAT}
                showTime
                onChange={handleSelectDateRange}
              />
            </Form.Item>
          </Col>
        </Row>
        {codeBulkResponse.failedUpdateCodes?.length ? (
          <Row>
            <Col span={24}>
              <Form.Item label={t('FAILED_TO_UPDATE_VALUES')}>
                <TextArea rows={3} disabled value={codeBulkResponse.failedUpdateCodes.join(' ')} />
              </Form.Item>
            </Col>
          </Row>
        ) : null}
      </Form>
    </Modal>
  );
};

const reduxKey = REDUX_KEY.CODE_BULK;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(CodeBulkModal);
