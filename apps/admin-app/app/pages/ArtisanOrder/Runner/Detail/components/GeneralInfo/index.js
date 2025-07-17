import { Button, Col, Form, Input, Row, Tag, Typography } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getLocalDateFormat } from '@shared/utils/localization';
import useSharedStyle from '../../styles';
import useStyles from './styles';

function GeneralInfo({ runner = {}, onSubmit, isPending }) {
  const { Text } = Typography;
  const [enableEdit, setShowEnableEdit] = useState(false);
  const { t } = useTranslation('runnerDetailPage');
  const sharedClasses = useSharedStyle();
  const classes = useStyles();

  const { cellPhone = '', nameSurname = '', createdAt, runnerUuid } = runner;

  const {
    values,
    handleChange,
    handleSubmit: handleFormikSubmit,
  } = useFormik({
    initialValues: { cellPhone, nameSurname },
    enableReinitialize: true,
    onSubmit,
  });

  const creationDateFormatted = moment(createdAt).format(getLocalDateFormat());

  const handleEditClick = () => {
    if (enableEdit) {
      handleFormikSubmit();
    }
    setShowEnableEdit(!enableEdit);
  };

  const textInputs = useMemo(
    () => [
      {
        label: t('GSM'),
        key: 'cellPhone',
      },
      {
        label: t('NAME'),
        key: 'nameSurname',
      },
    ],
    [t],
  );

  return (
    <div className={sharedClasses.sectionContainer}>
      <Row justify="space-between">
        <Col>
          <Text className={sharedClasses.sectionTitle}>{t('GENERAL_INFO')}</Text>
        </Col>
        <Col>
          <Button onClick={handleEditClick}>{t('EDIT')}</Button>
        </Col>
      </Row>
      <div>
        <Form>
          {textInputs.map(({ label, key }, i) => (
            <div className={i !== 0 && 'mt-2'} key={label}>
              <label htmlFor={key} className={sharedClasses.label}>{label}</label>
              <Input disabled={!enableEdit} onChange={handleChange} name={key} value={values[key]} />
            </div>
          ))}
        </Form>
        <Row className="mt-4" justify="space-between">
          <Col>
            <Text className={classes.dataLabel}>{t('CREATION_DATE')}</Text>
          </Col>
          <Col>
            <Text>{creationDateFormatted}</Text>
          </Col>
        </Row>
        <Row className="mt-4" justify="space-between">
          <Col>
            <Text className={classes.dataLabel}>{t('RUNNER_ID')}</Text>
          </Col>
          <Col>{runnerUuid ? <Tag>{runnerUuid}</Tag> : !isPending && <Tag color="error">{t('RUNNER_ID_NOT_EXISTS')}</Tag>}</Col>
        </Row>
      </div>
    </div>
  );
}

export default GeneralInfo;
