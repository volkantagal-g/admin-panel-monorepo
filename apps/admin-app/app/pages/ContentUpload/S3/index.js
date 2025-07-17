import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Row, Col, Input, Button } from 'antd'; // Select Switch
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { compose } from 'redux';
// import { get } from 'lodash';

import {
  validationSchema,
  getInitialValues,
  // getBucketsOptions,
  getOnlyModifiedValuesBeforeSubmit,
} from './formHelper';
import { Creators } from '../redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
// import { getSelectFilterOption } from '@shared/utils/common';
import UploadDocument from './uploadDocument';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import sagas from '../redux/saga';
import reducer from '../redux/reducer';
import { uploadDocumentUrlSelector } from '../redux/selectors';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';

const ContentUploadS3 = () => {
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({ name: ROUTE.CONTENT_UPLOAD_S3.name, squad: ROUTE.CONTENT_UPLOAD_S3.squad });
  const [document, setDocument] = useState({});
  const isUploadPending = useSelector(uploadDocumentUrlSelector.getIsPending);
  const uploadS3Link = useSelector(uploadDocumentUrlSelector.getData);
  const { t } = useTranslation('contentUpload');
  const [form] = Form.useForm();
  const initialValues = useMemo(
    () => getInitialValues(),
    [],
  );

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues,
    onSubmit: values => {
      try {
        if (!document?.base64) {
          throw new Error(t('ERR_FILE_EMPTY'));
        }
        const body = getOnlyModifiedValuesBeforeSubmit({ values, document });
        dispatch(
          Creators.getUploadDocumentURLRequest({ body }),
        );
        return form.resetFields();
      }
      catch (error) {
        return dispatch(ToastCreators.error({ error }));
      }
    },
  });

  const { handleSubmit } = formik; // values, setFieldValue, errors

  const handleDocumentUpload = ({ base64, name, contentType }) => {
    setDocument({ base64, name, contentType });
  };

  const resetUpload = () => {
    setDocument({ base64: null, name: null, contentType: null });
  };

  useEffect(() => {
    if (uploadS3Link) {
      resetUpload();
    }
  }, [uploadS3Link]);

  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <AntCard bordered title={t('TITLE')}>
        <Form
          form={form}
          id="content-upload"
          onFinish={handleSubmit}
          layout="horizontal"
        >
          {/* <Row>
            <Col span={6}>
              {t('BUCKET')}
            </Col>
            <Col span={8}>
              <Form.Item
                help={get(errors, 'bucket')}
                validateStatus={
                  get(errors, 'bucket') ? 'error' : 'success'
                }
              >
                <Select
                  labelInValue
                  allowClear
                  options={getBucketsOptions()}
                  onChange={bucket => {
                    setFieldValue('bucket', bucket?.value?.toLowerCase());
                  }}
                  disabled={isUploadPending}
                  autoComplete="off"
                  showSearch
                  value={values.bucket}
                  filterOption={getSelectFilterOption}
                />
              </Form.Item>
            </Col>
          </Row> */}
          <Row>
            <Col span={3}>
              {t('global:SELECT_FILE')}
            </Col>
            <Col span={6}>
              <Form.Item>
                <UploadDocument
                  onDocumentUpload={handleDocumentUpload}
                  fileName={document?.name}
                  disabled={isUploadPending}
                  resetUpload={resetUpload}
                />
              </Form.Item>
            </Col>
          </Row>
          {/* <Row>
            <Col span={6}>
              {t('FILENAME')}
            </Col>
            <Col span={8}>
              <Form.Item>
                <Input
                  value={values.fileName}
                  disabled={isUploadPending}
                  onChange={event => setFieldValue('fileName', event.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              {t('USE_ORIGINAL_FILE_NAME')}
            </Col>
            <Col span={8}>
              <Form.Item>
                <Switch
                  onChange={isChecked => {
                    setFieldValue('useOriginalFileName', isChecked);
                  }}
                  disabled={isUploadPending}
                  checkedChildren={t('global:ACTIVE')}
                  unCheckedChildren={t('global:INACTIVE')}
                  className={
                    values.useOriginalFileName
                      ? 'bg-success'
                      : 'bg-danger'
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              {t('ADD_TIMESTAMP')}
            </Col>
            <Col span={8}>
              <Form.Item>
                <Switch
                  checked={values.addTimestamp}
                  onChange={isChecked => {
                    setFieldValue('addTimestamp', isChecked);
                  }}
                  disabled={isUploadPending}
                  checkedChildren={t('global:ACTIVE')}
                  unCheckedChildren={t('global:INACTIVE')}
                  className={
                    values.addTimestamp
                      ? 'bg-success'
                      : 'bg-danger'
                  }
                />
              </Form.Item>
            </Col>
          </Row> */}
          <Row>
            <Col span={3} />
            <Col span={6}>
              <Form.Item className="mb-0 mt-0">
                <Button
                  size="small"
                  form="content-upload"
                  type="primary"
                  htmlType="submit"
                  loading={isUploadPending}
                >
                  {t('global:UPLOAD')}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </AntCard>
      {uploadS3Link && (
      <AntCard bordered title={t('LINK')}>
        <Row>
          <Col span={24} style={{ display: 'flex' }}>
            <Input
              value={uploadS3Link}
              disabled
            />
            <CopyToClipboard
              inner={t('global:COPY')}
              message={uploadS3Link}
              color="#5D3EBC"
              style={{ cursor: 'pointer', lineHeight: '30px' }}
            />
          </Col>
        </Row>
      </AntCard>
      )}
    </div>
  );
};

const reduxKey = REDUX_KEY.CONTENT_UPLOAD.S3;
const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ContentUploadS3);
