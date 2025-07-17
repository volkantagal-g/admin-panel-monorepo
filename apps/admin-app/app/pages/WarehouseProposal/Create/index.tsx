import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik, FormikErrors, FormikTouched } from 'formik';
import { Form, Col, Button, PageHeader, Spin } from 'antd';
import React from 'react';

import { createWarehouseProposalSelector } from '@app/pages/WarehouseProposal/Create/redux/selectors';

import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';

import { usePageViewAnalytics, useInitAndDestroyPage } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { ApplicantInfoForm, PropertyInfoForm, Photos, ProposalInfoForm, Map } from '../components';
import { defaultValues, getValidationSchema, prepareData } from './formHelper';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { REDUX_KEY } from '@shared/shared/constants';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import {
  IWarehouseProposalFormValues,
  IApplicant,
  IPropertyValues,
  IProposalValues,
} from '../interfaces';

const reduxKey = REDUX_KEY.WAREHOUSE_PROPOSAL.CREATE;

const WarehouseProposalCreatePage: React.FC = () => {
  usePageViewAnalytics({ name: ROUTE.WAREHOUSE_PROPOSAL_CREATE.name, squad: ROUTE.WAREHOUSE_PROPOSAL_CREATE.squad });
  const { t } = useTranslation('warehouseProposalPage');
  const dispatch = useDispatch();
  const selectedCountry = useSelector(getSelectedCountryV2);
  const isPending = useSelector(createWarehouseProposalSelector.getIsPending);
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const formik = useFormik<IWarehouseProposalFormValues>({
    initialValues: defaultValues as IWarehouseProposalFormValues,
    validationSchema: getValidationSchema(t),
    onSubmit: values => {
      dispatch(Creators.createWarehouseProposalRequest({ requestBody: prepareData(values, selectedCountry?._id) }));
    },
    enableReinitialize: false,
    validateOnMount: true,
  });

  const { handleSubmit, values, errors, touched, setFieldValue } = formik;

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e);
  };

  if (isPending) {
    return <Spin />;
  }

  return (
    <>
      <PageHeader className="p-0 page-title" title={t('global:PAGE_TITLE.WAREHOUSE_PROPOSAL.CREATE')} />

      <Form
        onFinish={handleSubmitForm}
        layout="vertical"
      >
        <ProposalInfoForm
          values={values.proposal}
          errors={errors.proposal as FormikErrors<IProposalValues>}
          touched={touched.proposal as unknown as FormikTouched<IProposalValues>}
          handleChange={setFieldValue}
          isDisabled={false}
        />
        <ApplicantInfoForm
          values={values.applicant}
          errors={errors.applicant as FormikErrors<IApplicant>}
          touched={touched.applicant as FormikTouched<IApplicant>}
          handleChange={setFieldValue}
          isDisabled={false}
        />
        <Map
          data={
            { coordinates: [values?.location?.lon, values?.location?.lat] }
          }
          isDisabled={false}
          handleChange={setFieldValue}
        />
        <PropertyInfoForm
          values={values.property}
          errors={errors.property as FormikErrors<IPropertyValues>}
          touched={touched.property as FormikTouched<IPropertyValues>}
          handleChange={setFieldValue}
          isDisabled={false}
        />
        <Photos
          formik={formik}
          errors={errors}
          touched={touched}
          isDisabled={false}
          onDetail={false}
        />
        <Col className="text-right">
          <Form.Item className="mt-0 w-100">
            <Button
              type="primary"
              htmlType="submit"
            >
              {t('global:SAVE')}
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </>
  );
};

export default WarehouseProposalCreatePage;
