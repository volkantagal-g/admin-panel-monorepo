import { Button, Col, Form, Row, Select, Tooltip, Upload } from 'antd';
import PropTypes from 'prop-types';
import { FileExcelOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import ClientDraftListSelect from '@shared/containers/Marketing/Select/ClientDraftListSelect';
import { DRAFT_TYPES } from '@shared/components/Marketing/DraftImporter/constant';
import { draftTypeOption } from '@shared/components/Marketing/DraftImporter/constantValues';

const DraftImporter = ({
  name,
  required,
  handleDraftUpload = () => { },
  allowClear = true,
  loading,
  label,
  form,
  disabled,
  btnLabel,
  sampleDraftCsv,
  requiredErrorText,
  inactiveDraftTypes = [],
}) => {
  const CSV_TYPES = 'text/csv, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel';
  const nestedCsvName = [name, 'csv'];
  const nestedTemplateTypeName = [name, 'type'];
  const nestedTemplateName = [name, 'draft'];
  const { t } = useTranslation('marketing');

  const manipulateBeforeChange = e => ({
    csvName: e?.file?.nameWithTimeStamp,
    originalFileName: e?.file?.name,
  });

  const getDraftTypeOptions = options => convertConstantValuesToSelectOptions(options).filter(option => !inactiveDraftTypes.includes(option.value));

  return (
    <>
      <Col md={12} xs={24}>
        <Form.Item label={label} name={nestedTemplateTypeName} rules={required ? [{ required: true, message: requiredErrorText }] : []}>
          <Select
            aria-label={label}
            allowClear={allowClear}
            className="w-100"
            onChange={value => {
              // Draft type changed reset fields
              form.setFieldsValue([{ name, value: undefined }]);
              form.setFieldsValue([{ name: nestedTemplateTypeName, value }]);
            }}
            disabled={loading || disabled}
            options={getDraftTypeOptions(draftTypeOption)}
          />
        </Form.Item>
      </Col>
      <Col md={12} xs={24}>
        <Form.Item noStyle dependencies={[nestedTemplateTypeName, nestedCsvName]}>
          {({ getFieldValue }) => {
            const type = getFieldValue(nestedTemplateTypeName);
            const csv = getFieldValue(nestedCsvName);

            return (
              <>
                {type && type === DRAFT_TYPES.CSV && (
                  <Row>
                    <Col md={8} xs={8}>
                      <Form.Item
                        name={nestedCsvName}
                        getValueFromEvent={manipulateBeforeChange}
                        valuePropName="file"
                        preserve={false}
                        rules={[{ required: true, message: requiredErrorText }]}
                      >
                        <Upload
                          disabled={disabled}
                          maxCount={1}
                          multiple={false}
                          accept={CSV_TYPES}
                          action={false}
                          showUploadList={false}
                          beforeUpload={file => {
                            const tempFile = file;
                            const extensionRegExp = /(?:\.([^.]+))?$/;
                            const nameWithExtensionArr = file.name.split(extensionRegExp);
                            tempFile.nameWithTimeStamp = `${nameWithExtensionArr[0]}_${moment().valueOf()}.${nameWithExtensionArr[1]}`;
                            handleDraftUpload(tempFile, name);
                            return tempFile;
                          }}
                        >
                          <Button
                            disabled={loading || disabled}
                            loading={loading}
                            icon={loading ? <LoadingOutlined /> : <UploadOutlined />}
                          > {btnLabel}
                          </Button>
                        </Upload>
                      </Form.Item>
                    </Col>
                    {csv?.originalFileName && (
                    <Col lg={8}>
                      {/* File Name Preview */}
                      <Button disabled type="button" icon={<FileExcelOutlined />}>{csv?.originalFileName}</Button>
                    </Col>
                    )}
                    {sampleDraftCsv && (
                      <Col lg={8}>
                        {/* File Name Preview */}
                        <Tooltip title={sampleDraftCsv?.information}>
                          <a href={sampleDraftCsv.url} download target="_blank" rel="noreferrer">
                            <Button
                              disabled={sampleDraftCsv.disabled}
                              type="button"
                              icon={sampleDraftCsv.isPending ? <LoadingOutlined /> : <FileExcelOutlined />}
                            >
                              {t('SAMPLE_CSV_FILE')}
                            </Button>
                          </a>
                        </Tooltip>
                      </Col>
                    )}
                  </Row>
                )}
                {type && type === DRAFT_TYPES.DRAFT && (
                  <Row>
                    <Col md={24} xs={24}>
                      <ClientDraftListSelect
                        form={form}
                        fieldName={[...nestedTemplateName, 'id']}
                        rules={[{ required: true, message: requiredErrorText }]}
                        disabled={disabled}
                        onChange={(value, drafts) => {
                          const { data } = drafts.find(template => template._id === value);
                          form.setFields([{ name: [...nestedTemplateName, 'query'], value: data }]);
                        }}
                      />
                      <Form.Item noStyle name={[...nestedTemplateName, 'query']} />
                    </Col>
                  </Row>
                )}
              </>
            );
          }}
        </Form.Item>
      </Col>
    </>
  );
};

DraftImporter.propTypes = { name: PropTypes.string.isRequired };

export default memo(DraftImporter);
