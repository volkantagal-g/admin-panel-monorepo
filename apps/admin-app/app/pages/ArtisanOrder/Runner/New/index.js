/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Form, Input, PageHeader, Select, Typography } from 'antd';
import { useEffect, useMemo } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import AntCard from '@shared/components/UI/AntCard';
import { validationSchema } from './formHelper';
import { Creators } from './redux/actions';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { REDUX_KEY } from '@shared/shared/constants';
import saga from './redux/saga';
import reducer from './redux/reducer';

function RunnerNewPage() {
  const { t } = useTranslation(['runnerNewPage']);
  const { Text } = Typography;
  const dispatch = useDispatch();

  const textInputs = useMemo(
    () => [
      {
        label: t('NAME'),
        key: 'nameSurname',
      },
      {
        label: t('GSM'),
        key: 'cellPhone',
        placeholder: '90 555 555 55 55',
      },
      {
        label: t('EMAIL'),
        key: 'email',
      },
    ],
    [t],
  );

  const selectBoxes = useMemo(
    () => [
      {
        label: t('MALL_SHORT'),
        options: [
          {
            key: 'Hilltown',
            value: 'hilltown',
          },
        ],
        defaultValue: 'hilltown',
        field: 'mallInfo',
      },
      {
        label: t('RECEIVING'),
        options: [
          {
            key: 'Mall Logistics',
            value: 1,
          },
        ],
        defaultValue: 1,
        field: 'receiving',
      },
      {
        label: t('EMPLOYER_SERVICE_RECIPIENT'),
        options: [
          {
            key: 'Mall Logistics',
            value: 1,
          },
        ],
        defaultValue: 1,
        field: 'recipient',
      },
    ],
    [t],
  );
  const createRunner = values => {
    dispatch(Creators.createRunnerRequest({ body: values }));
  };

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <PageHeader className="p-0" title={t('NEW_RUNNER')} />
      <Formik
        initialValues={{
          cellPhone: '',
          personId: '23453243',
          nameSurname: '',
          shoppingMallId: 1,
          companyId: 1,
        }}
        validationSchema={validationSchema}
        onSubmit={createRunner}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <AntCard
            footer={(
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                {t('SAVE')}
              </Button>
            )}
          >
            <AntCard title={t('GENERAL_INFO')}>
              <Form>
                {textInputs.map(({ label, key, placeholder }, i) => (
                  <div className={i !== 0 ? 'mt-2' : ''} key={label}>
                    <label htmlFor={key}>{label}</label>
                    <Form.Item help={touched[key] && errors[key]} validateStatus={errors[key] && touched[key] ? 'error' : 'success'}>
                      <Input placeholder={placeholder || ''} name={key} onChange={handleChange} value={values[key]} />
                    </Form.Item>
                  </div>
                ))}
              </Form>
            </AntCard>
            <AntCard title={t('MALL_INFO')}>
              <div>
                {selectBoxes.map((selectbox, i) => (
                  <Form key={selectbox.label}>
                    <div className={i !== 0 ? 'mt-2' : ''}>
                      <label>{selectbox.label}</label>
                      <Select
                        value={values[selectbox.field]}
                        onChange={handleChange}
                        defaultValue={selectbox.defaultValue}
                        className="w-100"
                      >
                        {selectbox.options.map(({ key, value }) => (
                          <Select.Option key={value} value={value}>
                            <Text>{key}</Text>
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                  </Form>
                ))}
              </div>
            </AntCard>
          </AntCard>
        )}
      </Formik>
    </>
  );
}

const reduxKey = REDUX_KEY.GL_RUNNER_NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(RunnerNewPage);
