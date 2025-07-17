import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Card, Button, Input, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { Title } from '@app/pages/Person/Request/Detail/components';
import { PERSON_INFORMATION_CHANGE_STATUSES } from '@shared/shared/constants';
import { Creators } from '@app/pages/Person/Request/Detail/redux/actions';
import useStyles from './styles';

const { Text } = Typography;

const RejectNotesSection = ({ status, note, isPending, approvalId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('personRequestPage');
  const [rejectNote, setRejectNote] = useState(undefined);
  const [showError, setShowError] = useState(false);

  const handleConfirmClick = () => {
    setShowError(false);
    dispatch(Creators.acceptInformationEditRequestDetailRequest({ approvalId, description: rejectNote }));
  };

  const handleRejectClick = () => {
    if (!rejectNote || rejectNote.trim() === '') {
      setShowError(true);
    }
    else {
      setShowError(false);
      dispatch(Creators.rejectInformationEditRequestDetailRequest({ approvalId, description: rejectNote }));
    }
  };

  const handleChangeRejectNotes = e => {
    const { value } = e.target;
    if (value) {
      setRejectNote(value);
    }
    else {
      setRejectNote(undefined);
    }
  };

  return (
    <Card>
      {
        status === PERSON_INFORMATION_CHANGE_STATUSES.ACTIVE
          ?
          <>
            <Row>
              <Col span={24}>
                <Title>{t('REJECT_NOTE')}</Title>
                <Input
                  className={showError && classes.redBorderColor}
                  placeholder={t('REJECT_NOTE')}
                  onChange={handleChangeRejectNotes}
                />
                {
                  showError && <span className={classes.errorText}>{t('REJECT_NOTE_ERROR')}</span>
                }
              </Col>
            </Row>
            <Row className={classes.row} justify="end">
              <Col>
                <Button
                  type="primary"
                  danger
                  loading={isPending}
                  onClick={handleRejectClick}
                >
                  {t('global:REJECT')}
                </Button>
                <Button
                  className={classes.confirmButton}
                  type="primary"
                  loading={isPending}
                  onClick={handleConfirmClick}
                >
                  {t('global:CONFIRM')}
                </Button>
              </Col>
            </Row>
          </>
          :
          <Row>
            <Col span={24}>
              <Title>{t('REJECT_NOTE')}:</Title>
              <Text>{note}</Text>
            </Col>
          </Row>
      }
    </Card>
  );
};

export default RejectNotesSection;