import { useState, useEffect, useCallback } from 'react';
import { Input, Button, Radio, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { DtsDecisionCodes, DtsDecisionCodeEnum, DtsStatusCodeEnum } from '../../../constant';
import { Creators } from '../../redux/actions';
import useStyles from './styles';

const { TextArea } = Input;
const { Text } = Typography;

const Decision = ({ decision, rule, dtsStatus, id }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('dts');

  const classes = useStyles();

  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [point, setPoint] = useState(null);
  const [error, setError] = useState(false);
  const isDisabled = dtsStatus === DtsStatusCodeEnum.CLOSED;

  const decisionCodes = convertConstantValuesToSelectOptions(DtsDecisionCodes);

  const admin = get(decision, 'adminName', '') || get(decision, 'adminEmail', '-');

  const prepareSetPoint = useCallback(value => {
    if (value === DtsDecisionCodeEnum.ACCEPT) {
      setPoint(rule?.priority?.acceptancePoint);
    }
    else if (value === DtsDecisionCodeEnum.WARN) {
      setPoint(rule?.priority?.warningPoint);
    }
    else if (value === DtsDecisionCodeEnum.REJECT) {
      setPoint(rule?.priority?.rejectionPoint);
    }
    else {
      setPoint(null);
    }

    setStatus(value);
  }, [rule]);

  const radioGroupChange = e => {
    const { value } = e.target;
    prepareSetPoint(value);
  };

  const handleUpdateDecision = () => {
    if (!status || !note.trim()) {
      setError(true);
    }
    else {
      setError(false);
      const payload = {
        note,
        point,
        status,
      };
      dispatch(Creators.updateDtsDecisionRequest({ data: { ...payload, id } }));
    }
  };

  useEffect(() => {
    if (dtsStatus === DtsStatusCodeEnum.WAITING_DECISION) {
      setNote(rule?.defaultNote);
    }
    else {
      setNote(decision?.note);
    }
  }, [dtsStatus, rule?.defaultNote, decision?.note]);

  useEffect(() => {
    prepareSetPoint(decision?.status);
  }, [prepareSetPoint, decision]);

  return (
    <Card title={t('DECISION')} extra={error && <span className={classes.errorMessage}>{t('DECISION_ERROR')}</span>}>
      <div>
        <Text>{t('DECISION')}</Text>
      </div>
      <Radio.Group onChange={radioGroupChange} value={status} disabled={isDisabled}>
        {decisionCodes.map(code => <Radio.Button key={code.value} value={code.value}>{code.label}</Radio.Button>)}
      </Radio.Group>
      <div>
        <Text>{t('NOTES')}</Text>
      </div>
      <TextArea
        value={note}
        rows={4}
        placeholder={t('NOTES')}
        onChange={e => setNote(e.target.value)}
        disabled={isDisabled}
      />
      {
        dtsStatus === DtsStatusCodeEnum.WAITING_DECISION && (
          <div>
            <Button
              size="small"
              type="primary"
              onClick={handleUpdateDecision}
            >
              Save
            </Button>
          </div>
        )
      }
      {
        dtsStatus === DtsStatusCodeEnum.CLOSED && (
          <>
            <Text>{t('POINT')}</Text>
            <Input value={point} disabled />
            <p> {decision && `${admin} - ${moment(get(decision, 'createdAt')).format('YYYY-MM-DD HH:mm')}`}</p>
          </>
        )
      }
    </Card>
  );
};

export default Decision;
