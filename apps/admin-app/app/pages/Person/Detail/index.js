import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { COURIER_TYPE, PICKER_TYPE, REDUX_KEY } from '@shared/shared/constants';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { useInitAndDestroyPage, usePageViewAnalytics, usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { personDetailSelector, updatePersonSelector, personNotesSelector, couriersSelector, pickersSelector } from './redux/selector';
import {
  Header,
  GeneralInfo,
  EmploymentInfo,
  PersonalInfo,
  HomeAddress,
  ProfileBox,
  RelativeInfo,
  TrainingsInfo,
  DisableCourierLoginBox,
  DisableCourierLoginHistoryBox,
  FranchiseEmployersInfo,
  CouriersInfo,
  PickersInfo,
  NotesBox,
  IntegrationsBox,
  GetirUpTrainings,
} from './components';
import { operationalCountriesSelector as countriesSelector, getWarehousesSelector } from '@shared/redux/selectors/common';
import { FILTER_COURIERS_FIELDS, FILTER_PICKERS_FIELDS, AVATAR_FORMAT } from './constants';
import useStyles from './styles';

const reduxKey = REDUX_KEY.PERSON.DETAIL;

const PersonDetailPage = () => {
  usePageViewAnalytics({ name: ROUTE.PERSON_DETAIL.name, squad: ROUTE.PERSON_DETAIL.squad });
  const classes = useStyles();
  const { Can } = usePermission();

  const { id: personId } = useParams();
  const { t } = useTranslation('personPage');

  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [versionProblem, setVersionProblem] = useState('');

  const personDetail = useSelector(personDetailSelector.getData);
  const personGeneralInfo = useSelector(personDetailSelector.getGeneralInfoData);
  const personEmploymentInfo = useSelector(personDetailSelector.getEmploymentInfoData);
  const personPersonalInfo = useSelector(personDetailSelector.getPersonalInfoData);
  const personAddressInfo = useSelector(personDetailSelector.getHomeAddressInfoData);
  const personImageInfo = useSelector(personDetailSelector.getImageBoxData);
  const relativeInfo = useSelector(personDetailSelector.getRelativeInfoData);
  const trainingsInfo = useSelector(personDetailSelector.getTrainingsInfoData);
  const personCouriersAndPickers = useSelector(personDetailSelector.getCouriersAndPickersInfo);
  const marketEmployersInfo = useSelector(personDetailSelector.getMarketEmployersInfo);
  const isCouriersLoginDisabled = useSelector(personDetailSelector.getIsCouriersLoginDisabled);
  const disablecCourierLoginHistory = useSelector(personDetailSelector.getDisableCourierLoginHistoryInfo);
  const isActivated = useSelector(personDetailSelector.getIsActivatedInfo);
  const hasEmployeeDiscount = useSelector(personDetailSelector.getHasEmployeeDiscount);
  const integrationData = useSelector(personDetailSelector.getIntegrationData);
  const isPendingPersonDetail = useSelector(personDetailSelector.getIsPending);

  const isPendingPersonUpdate = useSelector(updatePersonSelector.getIsPending);
  const isSuccessPersonUpdate = useSelector(updatePersonSelector.getIsSuccess);

  const isPendingPersonNotes = useSelector(personNotesSelector.getIsPending);
  const personNotes = useSelector(personNotesSelector.getData);

  const isPendingCouriers = useSelector(couriersSelector.getIsPending);
  const couriers = useSelector(couriersSelector.getData);
  const couriersError = useSelector(couriersSelector.getError);

  const isPendingPickers = useSelector(pickersSelector.getIsPending);
  const pickers = useSelector(pickersSelector.getData);
  const pickersError = useSelector(pickersSelector.getError);

  const warehouses = useSelector(getWarehousesSelector.getData);

  const countryList = useSelector(countriesSelector.getData);

  const isPending = isPendingPersonDetail || isPendingPersonUpdate || isPendingCouriers || isPendingPickers;

  const filteredCouriersByType = useMemo(() => couriers?.filter(({ courierType }) => courierType === COURIER_TYPE.GM), [couriers]);

  const handlePersonUpdate = ({ updateData, onlyPerson }) => {
    if (versionProblem) {
      return toast.error(t(versionProblem));
    }

    return dispatch(Creators.updatePersonDetailRequest({ personId, updateData, onlyPerson }));
  };

  const handlePersonalUpdate = ({ updateData }) => {
    if (versionProblem) {
      return toast.error(t(versionProblem));
    }
    const { personalGsm: oldPersonalGsm = '', countryGsmCode: oldCountryCode = '' } = personPersonalInfo;

    return dispatch(Creators.updatePersonalDetailRequest({ personId, updateData, oldPersonalGsm, oldCountryCode, isActivated }));
  };

  const handleAddPersonTraining = ({ trainingObj }) => {
    dispatch(Creators.addPersonTrainingRequest({ person: personId, trainingObj }));
  };

  const handleDisableLoginOfCouriers = ({ courierDisableReason, isLoginDisabled }) => {
    dispatch(Creators.disableLoginOfCouriersRequest({ id: personId, courierDisableReason, isLoginDisabled }));
  };

  const handleAddMarketEmployer = ({ workType, franchise, contractId, franchiseAreaId }) => {
    dispatch(Creators.addMarketEmployerRequest({ person: personId, workType, franchise, contractId, franchiseAreaId }));
  };

  const handleEditMarketEmployers = ({ marketEmployers }) => {
    dispatch(Creators.editMarketEmployerRequest({ person: personId, marketEmployers }));
  };

  const handleRemoveMarketEmployer = ({ franchise, contractId }) => {
    dispatch(Creators.removeMarketEmployerRequest({ person: personId, franchise, contractId }));
  };

  const handleCreateCourierForPerson = () => {
    if (versionProblem) {
      return toast.error(t(versionProblem));
    }
    return dispatch(Creators.createCourierForPersonRequest({ id: personId, courierTypes: [COURIER_TYPE.GM] }));
  };

  const handleCreatePickerForPerson = () => {
    if (versionProblem) {
      return toast.error(t(versionProblem));
    }
    return dispatch(Creators.createPickerForPersonRequest({ id: personId, pickerTypes: [PICKER_TYPE.GENERAL] }));
  };

  const handleChangePassword = ({ password }) => {
    if (versionProblem) {
      return toast.error(t(versionProblem));
    }
    return dispatch(Creators.changePasswordRequest({ id: personId, password }));
  };

  const handleChangeAvatar = ({ data }) => {
    if (versionProblem) {
      return toast.error(t(versionProblem));
    }
    return dispatch(Creators.changeAvatarRequest({
      data,
      id: personId,
      name: `${personId}.${AVATAR_FORMAT.split('/')[1]}`,
    }));
  };

  const handleActiveness = ({ status }) => {
    if (status) {
      dispatch(Creators.activatePersonRequest({
        id: personId,
        gsm: personDetail.personalGsm,
        countryCode: personDetail.countryGsmCode,
        shouldAddEmployeeDiscount: personDetail.shouldAddEmployeeDiscount,
      }));
    }
    else {
      dispatch(Creators.deactivatePersonRequest({
        id: personId,
        gsm: personDetail.personalGsm,
        countryCode: personDetail.countryGsmCode,
      }));
    }
  };

  const handleAddEmployeeDiscount = () => {
    if (!isActivated || !personPersonalInfo.shouldAddEmployeeDiscount) {
      return toast.error(t('PERSONAL.WARN_EMPLOYEE_DISCOUNT'));
    }
    return dispatch(Creators.addEmployeeDiscountRequest({
      gsm: personDetail.personalGsm,
      countryCode: personDetail.countryGsmCode,
    }));
  };

  useEffect(() => {
    dispatch(Creators.getPersonDetailRequest({ personId }));
    dispatch(CommonCreators.getOperationalCountriesRequest());
    dispatch(CommonCreators.getWarehousesRequest());
  }, [dispatch, personId]);

  useEffect(() => {
    if (personDetail?.countryCode) {
      dispatch(Creators.getPersonContractRequest({ countryCode: personDetail.countryCode }));
    }
  }, [dispatch, personDetail]);

  useEffect(() => {
    const courierIds = personCouriersAndPickers.couriers.map(({ courier }) => courier);
    const pickerIds = personCouriersAndPickers.pickers.map(({ picker }) => picker);
    if (courierIds.length) {
      dispatch(Creators.getCouriersRequest({ courierIds, fields: FILTER_COURIERS_FIELDS }));
    }
    if (pickerIds.length) {
      dispatch(Creators.getPickersRequest({ pickerIds, fields: FILTER_PICKERS_FIELDS }));
    }
  }, [personCouriersAndPickers, dispatch]);

  useEffect(() => {
    const personVersion = personDetail?.personV;
    if (couriersError || pickersError) {
      setVersionProblem('ERRORS.VERSION_PROBLEM_WARN');
    }
    couriers?.forEach(({ courierType, personV, isActivated: courierIsActivated }) => {
      if (courierType !== COURIER_TYPE.GM && personV !== personVersion && courierIsActivated) {
        setVersionProblem('ERRORS.VERSION_PROBLEM_ERR');
      }
    });
    pickers?.forEach(({ personV }) => {
      if (personV !== personVersion) {
        setVersionProblem('ERRORS.VERSION_PROBLEM_ERR');
      }
    });
  }, [couriers, pickers, couriersError, pickersError, personDetail]);

  useEffect(() => {
    if (versionProblem) {
      toast.error(t(versionProblem));
    }
  }, [versionProblem, t]);

  return (
    <>
      <Header
        data={personDetail}
        isPending={isPending}
      />
      <div className={classes.container}>
        <Can permKey={permKey.PAGE_PERSON_DETAIL_PROFILE_BOX_VIEW}>
          <ProfileBox
            data={personImageInfo}
            isActivated={isActivated}
            isPending={isPending}
            editPermKey={permKey.PAGE_PERSON_DETAIL_PROFILE_BOX_EDIT}
            isSuccessPersonUpdate={isSuccessPersonUpdate}
            handleChangePassword={handleChangePassword}
            handleChangeAvatar={handleChangeAvatar}
            handleActiveness={handleActiveness}
          />
        </Can>
        <Can permKey={permKey.PAGE_PERSON_DETAIL_GENERAL_BOX_VIEW}>
          <GeneralInfo
            data={personGeneralInfo}
            isPending={isPending}
            countryList={countryList}
            editPermKey={permKey.PAGE_PERSON_DETAIL_GENERAL_BOX_EDIT}
            isSuccessPersonUpdate={isSuccessPersonUpdate}
            handleUpdate={handlePersonUpdate}
          />
        </Can>
        <Can permKey={permKey.PAGE_PERSON_DETAIL_PERSONAL_BOX_VIEW}>
          <PersonalInfo
            data={personPersonalInfo}
            isPending={isPending}
            countryList={countryList}
            hasEmployeeDiscount={hasEmployeeDiscount}
            editPermKey={permKey.PAGE_PERSON_DETAIL_PERSONAL_BOX_EDIT}
            isSuccessPersonUpdate={isSuccessPersonUpdate}
            handleUpdate={handlePersonalUpdate}
            handleAddEmployeeDiscount={handleAddEmployeeDiscount}
          />
        </Can>
        <Can permKey={permKey.PAGE_PERSON_DETAIL_RELATIVE_BOX_VIEW}>
          <RelativeInfo
            data={relativeInfo}
            isPending={isPending}
            editPermKey={permKey.PAGE_PERSON_DETAIL_RELATIVE_BOX_EDIT}
            isSuccessPersonUpdate={isSuccessPersonUpdate}
            handleUpdate={handlePersonUpdate}
          />
        </Can>
        <Can permKey={permKey.PAGE_PERSON_DETAIL_HOME_ADDRESS_BOX_VIEW}>
          <HomeAddress
            data={personAddressInfo}
            isPending={isPending}
            editPermKey={permKey.PAGE_PERSON_DETAIL_HOME_ADDRESS_BOX_EDIT}
            isSuccessPersonUpdate={isSuccessPersonUpdate}
            handleUpdate={handlePersonUpdate}
          />
        </Can>
        <Can permKey={permKey.PAGE_PERSON_DETAIL_EMPLOYMENT_BOX_VIEW}>
          <EmploymentInfo
            data={personEmploymentInfo}
            isPending={isPending}
            editPermKey={permKey.PAGE_PERSON_DETAIL_EMPLOYMENT_BOX_EDIT}
            isSuccessPersonUpdate={isSuccessPersonUpdate}
            handleUpdate={handlePersonUpdate}
          />
        </Can>
        <Can permKey={permKey.PAGE_PERSON_DETAIL_TRAININGS_BOX_VIEW}>
          <TrainingsInfo
            data={trainingsInfo}
            isPending={isPending}
            editPermKey={permKey.PAGE_PERSON_DETAIL_TRAININGS_BOX_EDIT}
            isSuccessPersonUpdate={isSuccessPersonUpdate}
            handleUpdate={handleAddPersonTraining}
          />
        </Can>
        <Can permKey={permKey.PAGE_PERSON_DETAIL_COURIER_LOGIN_BOX_VIEW}>
          <DisableCourierLoginBox
            data={isCouriersLoginDisabled}
            isPending={isPending}
            editPermKey={permKey.PAGE_PERSON_DETAIL_COURIER_LOGIN_BOX_EDIT}
            isSuccessPersonUpdate={isSuccessPersonUpdate}
            handleUpdate={handleDisableLoginOfCouriers}
          />
        </Can>
        <Can permKey={permKey.PAGE_PERSON_DETAIL_COURIER_LOGIN_HISTORY_BOX_VIEW}>
          <DisableCourierLoginHistoryBox
            data={disablecCourierLoginHistory}
            isPending={isPending}
          />
        </Can>
        <Can permKey={permKey.PAGE_PERSON_DETAIL_COURIERS_BOX_VIEW}>
          <CouriersInfo
            filteredCouriers={filteredCouriersByType}
            warehouses={warehouses}
            isPending={isPending}
            editPermKey={permKey.PAGE_PERSON_DETAIL_COURIERS_BOX_EDIT}
            handleCreateCourierForPerson={handleCreateCourierForPerson}
          />
        </Can>
        <Can permKey={permKey.PAGE_PERSON_DETAIL_PICKERS_BOX_VIEW}>
          <PickersInfo
            data={pickers}
            warehouses={warehouses}
            isPending={isPending}
            editPermKey={permKey.PAGE_PERSON_DETAIL_PICKERS_BOX_EDIT}
            handleCreatePickerForPerson={handleCreatePickerForPerson}
          />
        </Can>
        <Can permKey={permKey.PAGE_PERSON_DETAIL_NOTES_BOX_VIEW}>
          <NotesBox
            getNotes={Creators.getPersonNotesRequest}
            createNote={Creators.createPersonNoteRequest}
            updateNote={Creators.updatePersonNoteRequest}
            versionProblem={versionProblem}
            personId={personId}
            notes={personNotes}
            isPending={isPending || isPendingPersonNotes}
            editPermKey={permKey.PAGE_PERSON_DETAIL_NOTES_BOX_EDIT}
          />
        </Can>
        <Can permKey={permKey.PAGE_PERSON_DETAIL_FRANCHISE_EMPLOYERS_BOX_VIEW}>
          <FranchiseEmployersInfo
            data={marketEmployersInfo}
            isPending={isPending}
            editPermKey={permKey.PAGE_PERSON_DETAIL_FRANCHISE_EMPLOYERS_BOX_EDIT}
            handleAdd={handleAddMarketEmployer}
            handleRemove={handleRemoveMarketEmployer}
            handleEdit={handleEditMarketEmployers}
          />
        </Can>
        <Can permKey={permKey.PAGE_PERSON_DETAIL_INTEGRATIONS_BOX}>
          <IntegrationsBox
            data={integrationData}
            isPending={isPending}
            editPermKey={permKey.PAGE_PERSON_DETAIL_INTEGRATIONS_BOX}
            isSuccessPersonUpdate={isSuccessPersonUpdate}
            handleUpdate={handlePersonUpdate}
          />
        </Can>
        <Can permKey={permKey.PAGE_PERSON_DETAIL_COMPONENT_GETIRUP_TRAININGS_BOX}><GetirUpTrainings personId={personId} isPending={isPending} /></Can>
      </div>
    </>
  );
};

export default PersonDetailPage;
