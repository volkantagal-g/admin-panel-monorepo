import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Row, Space } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { validate } from '@shared/yup';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import Card from '@shared/components/UI/AntCard';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { personNewSelector } from './redux/selector';
import { GeneralInformation, RelativeInformation, Header, HomeAddress, CreateCourier, Footer } from './components';
import { defaultValues, validationSchema } from './formHelper';
import { ANT_SPACING_16, DEFAULT_COL_SPACING, DEFAULT_ROW_SPACING } from './constants';
import useStyles from './styles';

const { useForm } = Form;

const reduxKey = REDUX_KEY.PERSON.NEW;

const PersonNewPage = () => {
  usePageViewAnalytics({ name: ROUTE.PERSON_NEW.name, squad: ROUTE.PERSON_NEW.squad });
  const classes = useStyles();
  const { t } = useTranslation('personPage');

  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [formIsDirty, setFormIsDirty] = useState(false);

  const countries = useSelector(countriesSelector.getData);
  const isPending = useSelector(personNewSelector.getIsPending);
  const validation = useMemo(() => validate(() => validationSchema(t)), [t]);

  const [form] = useForm();
  const formik = useFormik({
    initialValues: defaultValues,
    validate: validation,
    onSubmit: requestBody => {
      dispatch(Creators.createPersonRequest({ requestBody }));
    },
    validateOnChange: formIsDirty,
  });

  const { values, errors, touched, handleSubmit, setFieldValue, setValues, handleChange } = formik;

  useEffect(() => {
    dispatch(CommonCreators.getOperationalCountriesRequest());
  }, [dispatch]);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  const handleSubmitActions = () => {
    handleSubmit();
    setFormIsDirty(true);
  };

  return (
    <>
      <Header />
      <Card bordered={false} footer={<Footer isPending={isPending} handleSubmit={handleSubmitActions} />}>
        <Form id="new-person" form={form} layout="vertical">
          <Row gutter={DEFAULT_ROW_SPACING} align="top" className={classes.spaceWrapper}>
            <Col {...DEFAULT_COL_SPACING}>
              <Space direction="vertical" size={ANT_SPACING_16} className={classes.spaceWrapper}>
                <GeneralInformation
                  values={values}
                  countries={countries}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  setValues={setValues}
                  errors={errors}
                  touched={touched}
                  isPending={isPending}
                />
                <RelativeInformation
                  values={values}
                  countries={countries}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  touched={touched}
                  isPending={isPending}
                />
              </Space>
            </Col>
            <Col {...DEFAULT_COL_SPACING}>
              <Space direction="vertical" size={ANT_SPACING_16} className={classes.spaceWrapper}>
                <HomeAddress
                  values={values}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  touched={touched}
                  isPending={isPending}
                />
                <CreateCourier
                  values={values}
                  setFieldValue={setFieldValue}
                  isPending={isPending}
                />
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default PersonNewPage;
