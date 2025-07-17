import { Button } from 'antd';

import { getErrorCode } from '@shared/utils/common';
import { PERSON_CANDIDATE_FORM_STATUSES } from '@shared/shared/constants';

export const whichActionButton = ({ status, t, classes, handleSubmit, handleOpenAllAttachments, handleOpenDescriptionModal }) => {
  const {
    ON_CUSTOMER_SERVICE,
    ON_LAW,
    REJECTED,
    MISSING_INFORMATION,
    APPROVED,
    MANUAL_OPERATION,
  } = PERSON_CANDIDATE_FORM_STATUSES;

  const OpenAllAttachementsButton = (
    <Button
      size="small"
      className={classes.button}
      type="primary"
      onClick={handleOpenAllAttachments}
    >
      {t('PERSON_FORM.ACTIONS.OPEN_ALL_ATTACHMENTS')}
    </Button>
  );

  switch (status) {
    case ON_CUSTOMER_SERVICE:
      return (
        <div className={classes.buttonContainer}>
          {OpenAllAttachementsButton}
          <div>
            <Button
              size="small"
              className={classes.button}
              type="primary"
              onClick={() => handleSubmit({ status: ON_LAW })}
            >
              {t('PERSON_FORM.ACTIONS.TRANSFER_TO_LAW')}
            </Button>
            <Button
              size="small"
              className={classes.button}
              type="success"
              onClick={() => handleOpenDescriptionModal(APPROVED)}
            >
              {t('PERSON_FORM.ACTIONS.CREATE_PERSON')}
            </Button>
            <Button
              size="small"
              className={classes.button}
              type="danger"
              onClick={() => handleOpenDescriptionModal(REJECTED)}
            >
              {t('PERSON_FORM.ACTIONS.REJECT')}
            </Button>
            <Button
              size="small"
              className={classes.button}
              type="warning"
              onClick={() => handleOpenDescriptionModal(MISSING_INFORMATION)}
            >
              {t('PERSON_FORM.ACTIONS.MISSING_INFORMATION')}
            </Button>
          </div>
        </div>
      );
    case ON_LAW:
      return (
        <div className={classes.buttonContainer}>
          {OpenAllAttachementsButton}
          <Button
            size="small"
            className={classes.button}
            type="primary"
            onClick={() => handleOpenDescriptionModal(ON_CUSTOMER_SERVICE)}
          >
            {t('PERSON_FORM.ACTIONS.TRANSFER_TO_CS')}
          </Button>
        </div>
      );
    case MANUAL_OPERATION:
      return (
        <div className={classes.buttonContainer}>
          {OpenAllAttachementsButton}
          <div>
            <Button
              size="small"
              className={classes.button}
              type="primary"
              onClick={() => handleOpenDescriptionModal(APPROVED)}
            >
              {t('PERSON_FORM.ACTIONS.PROCESS_COMPLETED')}
            </Button>
            <Button
              size="small"
              className={classes.button}
              type="primary"
              onClick={() => handleSubmit({ status: ON_LAW })}
            >
              {t('PERSON_FORM.ACTIONS.TRANSFER_TO_LAW')}
            </Button>
            <Button
              size="small"
              className={classes.button}
              type="danger"
              onClick={() => handleOpenDescriptionModal(REJECTED)}
            >
              {t('PERSON_FORM.ACTIONS.REJECT')}
            </Button>
            <Button
              size="small"
              className={classes.button}
              type="warning"
              onClick={() => handleOpenDescriptionModal(MISSING_INFORMATION)}
            >
              {t('PERSON_FORM.ACTIONS.MISSING_INFORMATION')}
            </Button>
          </div>
        </div>
      );
    default:
      return (
        <div className={classes.buttonContainer}>
          {OpenAllAttachementsButton}
        </div>
      );
  }
};

export const isPersonHasActiveCourierError = error => getErrorCode(error) === 56;
