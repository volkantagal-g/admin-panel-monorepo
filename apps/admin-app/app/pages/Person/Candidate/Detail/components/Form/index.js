/* eslint-disable no-param-reassign */
import { useState, useEffect, useRef } from 'react';
import { compose } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { cloneDeep, isEmpty } from 'lodash';
import { Card, Alert, Button, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { personCandidateRequiredFilesByWorkerType } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { REDUX_KEY } from '@shared/shared/constants';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { DynamicFormComponent } from '@shared/utils/dynamicFormHelper/components';
import { FormTypes } from '@shared/utils/dynamicFormHelper/components/DynamicForm/constants';
import { Creators } from '../../redux/actions';
import saga from '../../redux/saga';
import reducer from '../../redux/reducer';
import { personCandidateDetailSelector } from '../../redux/selector';
import DescriptionModal from '../DescriptionModal';
import { whichActionButton } from '../../utils';
import useStyles from './styles';

const formType = FormTypes.EDIT;
const formName = 'PERSON';

const Form = ({ personId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { Can } = usePermission();
  const { t } = useTranslation(['personCandidatePage']);

  const formRef = useRef();
  const [isDescriptionWarningVisible, setIsDescriptionWarningVisible] = useState(false);
  const [filesDescription, setFilesDescription] = useState('');
  const [formWithInitialValues, setFormWithInitialValues] = useState([]);
  const [descriptionModalVisibility, setDescriptionModalVisibility] = useState(false);
  const [modalStatus, setModalStatus] = useState(null);

  const data = useSelector(state => personCandidateDetailSelector.getData(state));
  const initialValues = useSelector(state => personCandidateDetailSelector.getInitialValues(state));
  const isPending = useSelector(state => personCandidateDetailSelector.getIsPending(state));
  const initialValueIsPending = useSelector(state => personCandidateDetailSelector.getInitialValueIsPending(state));
  const isBanned = useSelector(state => personCandidateDetailSelector.getIsBanned(state));
  const isBannedPending = useSelector(state => personCandidateDetailSelector.getIsBannedPending(state));

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(Creators.getPersonCandidateFormRequest({
      formType,
      formName,
    }));
    dispatch(Creators.getPersonCandidateFormInitialValueRequest({ id: personId }));
  }, [personId, dispatch]);

  useEffect(() => {
    if (data?.formItems?.length && !isEmpty(initialValues)) {
      dispatch(Creators.getPersonCandidateIsBannedRequest({ uniqueIdentifier: initialValues.uniqueIdentifier }));

      const tempData = cloneDeep(data.formItems);
      const sampleFormItemsWithInitialValues = tempData?.map(formItemGroup => {
        formItemGroup.children.map(formItem => {
          formItem.initialValue = initialValues[formItem.name] || undefined;
          formItem.defaultValue = initialValues[formItem.name] || undefined;
          return formItem;
        });
        return formItemGroup;
      });
      setFormWithInitialValues(sampleFormItemsWithInitialValues);
    }
  }, [data, initialValues, dispatch]);

  const formSubmit = values => {
    dispatch(Creators.submitPersonCandidateFormRequest({ id: personId, data: values, formType, formName }));
  };

  const handleSubmit = ({ status, description }) => {
    const formik = formRef.current?.getFormik();
    formik.setFieldValue('status', status);
    if (description) {
      formik.setFieldValue('description', description);
    }
    formik.handleSubmit();
  };

  const handleCloseDescriptionModal = () => {
    setModalStatus(null);
    setDescriptionModalVisibility(false);
  };

  const handleOpenDescriptionModal = modalDescStatus => {
    setModalStatus(modalDescStatus);
    setDescriptionModalVisibility(true);
  };

  const handleConfirmDescriptionModal = description => {
    const status = modalStatus;
    handleSubmit({ status, description });
    handleCloseDescriptionModal();
  };

  const handleOpenAllAttachments = () => {
    initialValues?.files?.forEach(file => {
      window.open(file.uid, '_blank');
    });
  };

  const renderDescriptionHeader = () => {
    if (isDescriptionWarningVisible) {
      const description = () => {
        return (
          <ul>
            {filesDescription?.map(desc => <li key={desc}>{desc}</li>)}
          </ul>
        );
      };

      return <Alert message={t('PERSON_FORM.BE_UPLOADED_DOCUMENTS')} description={description()} type="warning" showIcon />;
    }
    return null;
  };

  const renderWarningHeader = () => {
    return (
      <>
        {
          isBanned && (
            <Alert
              description={t('PERSON_FORM.BANNED')}
              type="warning"
              showIcon
            />
          )
        }
        {
          initialValues?.description && (
            <Alert
              description={initialValues?.description}
              type="info"
              showIcon
            />
          )
        }
        {renderDescriptionHeader()}
      </>
    );
  };

  const renderActionButtons = () => (
    !isPending && !initialValueIsPending && (
    <Can permKey={permKey.PAGE_PERSON_CANDIDATE_DETAIL_ACTION_BUTTONS}>
      {whichActionButton({ status: initialValues?.status, t, handleOpenDescriptionModal, handleSubmit, handleOpenAllAttachments, classes })}
    </Can>
    )
  );

  const dependencyChangeHandler = dependencies => {
    const workerType = dependencies.find(item => item.name === 'workerType');
    if (workerType?.value) {
      setFilesDescription(personCandidateRequiredFilesByWorkerType?.[data?.countryCode]?.[workerType?.value]?.[getLangKey()]);
      setIsDescriptionWarningVisible(true);
      window.scrollTo(0, 0);
    }
  };

  return (
    <Card>
      <Row justify="end">
        <Col className="mb-3">
          <Button
            type="primary"
            loading={initialValueIsPending}
            disabled={!initialValues?.personId}
            target="_blank"
            href={`/person/detail/${initialValues?.personId}`}
          >
            {t('GO_TO_PERSON_DETAIL')}
          </Button>
        </Col>
      </Row>
      <div>
        <DynamicFormComponent
          t={t}
          isPending={isPending || initialValueIsPending || isBannedPending}
          formItems={formWithInitialValues}
          type={FormTypes.READONLY}
          formSubmit={formSubmit}
          ref={formRef}
          warningHeader={renderWarningHeader()}
          actionButtons={renderActionButtons()}
          dependencyList={data?.dependencyList?.description && Object.keys(data.dependencyList.description)}
          dependencyChangeHandler={dependencyChangeHandler}
        />
      </div>
      <DescriptionModal
        descriptionModalVisibility={descriptionModalVisibility}
        handleCloseDescriptionModal={handleCloseDescriptionModal}
        handleConfirmDescriptionModal={handleConfirmDescriptionModal}
      />
    </Card>
  );
};

const reduxKey = REDUX_KEY.PERSON_CANDIDATE.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(Form);
