import { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { Placemark } from 'react-yandex-maps';

import { YandexMaps } from '@shared/components/YMaps/Map';
import { InputWrapper } from '@shared/components/UI/Form';
import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import { validationSchema } from './formHelper';
import { getDefaultMapState } from '../../utils';
import { HOME_ADDRESS_PLACEMARK_OPTIONS, ANT_SPACING_24 } from '../../constants';
import Footer from '../Footer';
import useStyles from './styles';

function HomeAddress({ data, handleUpdate, isPending, isSuccessPersonUpdate, editPermKey }) {
  const classes = useStyles();
  const { t } = useTranslation('personPage');

  const [isFormEditable, setIsFormEditable] = useState(false);

  const [form] = Form.useForm();
  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
    validate: validate(validationSchema),
    onSubmit: homeAddress => {
      handleUpdate({ updateData: { homeAddress } });
    },
  });
  const { values, handleChange, setFieldValue, setValues, resetForm, handleSubmit, errors, touched } = formik;
  const defaultMapState = getDefaultMapState({ values });

  const handleDragEnd = param => {
    const [lat, lon] = get(param, 'originalEvent.target.geometry._coordinates', []);
    const coordinates = [lon, lat];
    setFieldValue('location.coordinates', coordinates);
    return false;
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  return (
    <Form form={form} layout="vertical">
      <AntCard
        footer={(
          <Footer
            initialValues={data}
            values={values}
            setValues={setValues}
            resetForm={resetForm}
            isFormEditable={isFormEditable}
            setIsFormEditable={setIsFormEditable}
            permKey={editPermKey}
            isPending={isPending}
            isSuccessPersonUpdate={isSuccessPersonUpdate}
            handleSubmit={handleSubmit}
          />
        )}
        bordered={false}
        title={t('HOME_ADDRESS.TITLE')}
      >
        <Row className={classes.mapWrapper}>
          <Col span={ANT_SPACING_24}>
            <YandexMaps
              state={defaultMapState}
            >
              <Placemark
                geometry={defaultMapState.center}
                options={{
                  ...HOME_ADDRESS_PLACEMARK_OPTIONS,
                  draggable: isFormEditable && !isPending,
                }}
                onDragEnd={handleDragEnd}
              />
            </YandexMaps>
          </Col>
        </Row>
        <Row
          align="bottom"
          className={classes.marginTop}
        >
          <Col span={ANT_SPACING_24}>
            <InputWrapper
              inputKey="description"
              label={t('HOME_ADDRESS.TITLE')}
              value={values.description}
              hasError={get(errors, 'description')}
              isTouched={get(touched, 'description')}
              handleChange={handleChange}
              mode="textarea"
              disabled={isPending || !isFormEditable}
              setDefaultValue={false}
            />
          </Col>
        </Row>
      </AntCard>
    </Form>
  );
}

export default HomeAddress;
