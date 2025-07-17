import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Form, Spin, Button, Col } from 'antd';

import { useFormik, FormikErrors, FormikTouched } from 'formik';

import { REDUX_KEY } from '@shared/shared/constants';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { PageHeader } from './components';

import { ApplicantInfoForm, PropertyInfoForm, Photos, Map, ProposalInfoForm } from '@app/pages/WarehouseProposal/components';
import { warehouseProposalsSelector } from './redux/selectors';
import { defaultValues, getValidationSchema, prepareData } from '../Create/formHelper';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

import {
  IApplicant,
  IPropertyValues,
  IProposalValues,
  IWarehouseProposalFormValues,
} from '../interfaces';
import Videos from '../components/Videos';

const reduxKey = REDUX_KEY.WAREHOUSE_PROPOSAL.DETAIL;
const { useForm } = Form;

const WarehouseDetailPage = () => {
  usePageViewAnalytics({ name: ROUTE.WAREHOUSE_PROPOSAL_DETAIL.name, squad: ROUTE.WAREHOUSE_PROPOSAL_DETAIL.squad });
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  useTranslation('warehouseProposalPage');

  useEffect(() => {
    if (id) {
      dispatch(Creators.getWarehouseProposalRequest({ id }));
    }
  }, [dispatch, id]);

  const { t } = useTranslation('warehouseProposalPage');
  const selectedCountry = useSelector(getSelectedCountryV2);
  const isPending = useSelector(warehouseProposalsSelector.getIsPending);
  const isUpdatePending = useSelector(warehouseProposalsSelector.getIsUpdatePending);
  const location = useSelector(warehouseProposalsSelector.getLocationData);
  const applicant = useSelector(warehouseProposalsSelector.getApplicantData);
  const proposal = useSelector(warehouseProposalsSelector.getProposalData);
  const photos = useSelector(warehouseProposalsSelector.getPhotoData);
  const videos = useSelector(warehouseProposalsSelector.getVideoData);
  const property = useSelector(warehouseProposalsSelector.getPropertyData);
  const note = useSelector(warehouseProposalsSelector.getNote);
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [firstPhotosState, setFirstPhotosState] = useState([]);
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: getValidationSchema(t),
    enableReinitialize: false,
    validateOnMount: true,
    onSubmit: values => {
      dispatch(Creators.updateWarehouseProposalRequest({ id, warehouseProposal: prepareData(values, selectedCountry?._id), firstPhotosState }));
    },
  });
  const [firstProposalState, setFirstProposalState] = useState<IWarehouseProposalFormValues>(proposal);

  const { handleSubmit, values, errors, touched, setFieldValue, setValues } = formik;

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e);
  };

  const handleClickEdit = () => {
    if (onEdit) {
      setValues({ ...firstProposalState });
    }
    if (!onEdit) {
      setFirstProposalState({ property, note, photos, videos, applicant, proposal, location });
    }
    setOnEdit(!onEdit);
  };

  useEffect(() => {
    if (property || note || photos || applicant) {
      setValues({ property, note, photos, videos, applicant, proposal, location });
      setFirstProposalState({ property, note, photos, videos, applicant, proposal, location });
      setFirstPhotosState(photos);
    }
  }, [property, note, photos, videos, applicant, setValues, proposal, location]);

  if (isPending || isUpdatePending) {
    return <Spin />;
  }

  return (
    <Spin spinning={isPending}>
      <PageHeader
        handleClickEdit={handleClickEdit}
        onEdit={onEdit}
      />
      <Form
        layout="vertical"
        onFinish={handleSubmitForm}
      >
        <ProposalInfoForm
          values={values.proposal}
          errors={errors.proposal as FormikErrors<IProposalValues>}
          touched={touched.proposal as unknown as FormikTouched<IProposalValues>}
          handleChange={setFieldValue}
          isDisabled={isPending || !onEdit}
        />
        <ApplicantInfoForm
          isDisabled={isPending || !onEdit}
          values={values.applicant}
          errors={errors.applicant as FormikErrors<IApplicant>}
          touched={touched.applicant as FormikTouched<IApplicant>}
          handleChange={setFieldValue}
        />
        {location && (
        <Map
          isDisabled={isPending || !onEdit}
          data={
            { coordinates: [values?.location?.lon, values?.location?.lat] }
          }
          handleChange={setFieldValue}
        />
        )}
        <PropertyInfoForm
          values={values.property}
          errors={errors.property as FormikErrors<IPropertyValues>}
          touched={touched.property as FormikTouched<IPropertyValues>}
          handleChange={setFieldValue}
          isDisabled={isPending || !onEdit}
          onDetail
          note={note}
        />
        <Photos
          photos={photos}
          formik={formik}
          errors={errors}
          touched={touched}
          isDisabled={isPending || !onEdit}
          onDetail
        />
        {videos?.length > 0 && (
          <Videos
            videos={videos}
            formik={formik}
            errors={errors}
            touched={touched}
            isDisabled={isPending || !onEdit}
            onDetail
          />
        )}
        {onEdit && (
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
        )}
      </Form>
    </Spin>
  );
};

export default WarehouseDetailPage;
