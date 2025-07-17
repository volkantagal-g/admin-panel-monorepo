import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import AntCard from '@shared/components/UI/AntCard';
import DraftImporter from '@shared/components/Marketing/DraftImporter';
import LiveClock from '@shared/components/UI/LiveClock';
import { DATE_FORMAT } from '@app/pages/Email/constants';
import { responsibleDepartment } from '@shared/shared/constantValues';
import { rules } from '@app/pages/Email/Detail/formHelpers';
import { statusTypeOptions } from '@app/pages/Email/constantValues';
import { fileUploadSelector, emailConfigSelector } from '@app/pages/Email/Detail/redux/selectors';
import { Creators } from '@app/pages/Email/Detail/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getLangKey } from '@shared/i18n';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';
import { GETIR_FINANCE_DOMAIN_TYPE, GETIR_SELECT_DOMAIN_TYPE, N11_DOMAIN_TYPE } from '@shared/shared/constants';

const GeneralInformationForm = ({ form, isFormEditable }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const config = useSelector(emailConfigSelector.getEmailConfig);
  const isConfigPending = useSelector(emailConfigSelector.getEmailConfigIsPending);

  const disabledDate = current => {
    return current && current.valueOf() < Date.now();
  };

  const isUserFileUploading = useSelector(fileUploadSelector.isIncludedUserFileUploading);

  const handleDraftUpload = (file, stateKey) => {
    const reader = new FileReader();
    reader.onload = e => {
      const dataBase64 = e?.target?.result;
      dispatch(Creators.uploadFilesToS3Request({
        file: { base64: dataBase64, name: file.nameWithTimeStamp },
        fileStateKey: stateKey,
      }));
    };

    reader.onerror = () => {
      const message = t('UPLOAD_ERROR');
      dispatch(ToastCreators.error({ message }));
    };
    reader.readAsDataURL(file);
    return false;
  };

  return (
    <Badge.Ribbon text={<Ribbon />}>
      <AntCard footer={false} bordered={false} title={t('GENERAL_INFO')}>
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item
              hasFeedback
              name="status"
              label={t('STATUS')}
              rules={rules.onlyRequired}
            >
              <Select
                disabled={!isFormEditable}
                options={convertConstantValuesToSelectOptions(statusTypeOptions)}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item noStyle dependencies={['phoneLanguages']}>
              {({ getFieldValue }) => {
                const selectedPhoneLanguage = getFieldValue('phoneLanguages');
                return (
                  <TargetDomainSelect
                    fieldName="domainType"
                    label={t('TARGET_SERVICE')}
                    filteredDomains={[GETIR_FINANCE_DOMAIN_TYPE, GETIR_SELECT_DOMAIN_TYPE, N11_DOMAIN_TYPE]}
                    rules={rules.onlyRequired}
                    disabled={!isFormEditable}
                    onChange={() => {
                      selectedPhoneLanguage.forEach(phoneLanguage => {
                        const formValues = form.getFieldsValue();
                        // Reset senderName and senderMail fields
                        form.resetFields([['contents', phoneLanguage, 'senderName']]);
                        form.setFieldsValue({
                          ...formValues,
                          contents: {
                            ...formValues.contents,
                            [phoneLanguage]: {
                              ...formValues.contents[phoneLanguage],
                              senderName: null,
                              senderEmail: null,
                            },
                          },
                        });
                      });
                    }}
                  />
                );
              }}
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item noStyle hasFeedback name="customTag" className="d-inline">
              <Input placeholder={t('CUSTOM_LABEL')} disabled={!isFormEditable} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item
              hasFeedback
              name="responsibleDepartment"
              label={t('RESPONSIBLE_DEPARTMENT')}
              rules={rules.onlyRequired}
            >
              <Select
                options={convertConstantValuesToSelectOptions(responsibleDepartment)}
                allowClear
                disabled={!isFormEditable}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <DraftImporter
            required
            sampleDraftCsv={{
              information: <p>{t('EMAIL_SAMPLE_CSV_INFORMATION_1')} <br /> {t('EMAIL_SAMPLE_CSV_INFORMATION_2')}</p>,
              url: config?.value?.sampleCsv?.url,
              disabled: isConfigPending,
              isPending: isConfigPending,
            }}
            name="clientImportTemplate"
            loading={isUserFileUploading}
            label={t('INCLUDED_USER_LIST')}
            disabled={!isFormEditable}
            handleDraftUpload={handleDraftUpload}
            form={form}
            btnLabel={t('CSV_UPLOAD')}
            searchNotFoundErrorText={t('NOT_FOUND_PLEASE_TYPE_FOR_SEARCH', { letterCount: 3 })}
            placeholder={t('SEARCH_CLIENT_LIST_TEMPLATE')}
            requiredErrorText={t('error:REQUIRED')}
          />
        </Row>

        <Row gutter={24}>
          <Col md={12}>
            <Form.Item
              name="validDates"
              label={t('START_AND_DATE_RANGE')}
              rules={[
                { required: true },
                () => ({
                  validator(_, validDates) {
                    if (!validDates) {
                      return Promise.reject(t('error:REQUIRED'));
                    }
                    const [startDate] = validDates;
                    if (startDate.diff(moment()) <= 0) {
                      return Promise.reject(t('START_DATE_CANT_BE_LESS_THAN_NOW'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <DatePicker.RangePicker
                showTime
                format={DATE_FORMAT}
                className="w-100"
                disabledDate={disabledDate}
                disabled={!isFormEditable}
                ranges={{
                  [t('TO_END_OF_DAY')]: [moment().add(15, 'minutes'), moment().endOf('day')],
                  [t('TO_END_OF_MONTH')]: [moment().add(15, 'minutes'), moment().endOf('month')],
                  [t('TO_END_OF_YEAR')]: [moment().add(15, 'minutes'), moment().endOf('year')],
                }}
              />
            </Form.Item>
          </Col>
        </Row>

      </AntCard>
    </Badge.Ribbon>
  );
};

const Ribbon = () => {
  return (
    <>
      <span className="mr-2">{getSelectedCountry().name[getLangKey()]}</span>
      <LiveClock />
    </>
  );
};

GeneralInformationForm.propTypes = { isFormEditable: PropTypes.bool.isRequired };

export default memo(GeneralInformationForm);
