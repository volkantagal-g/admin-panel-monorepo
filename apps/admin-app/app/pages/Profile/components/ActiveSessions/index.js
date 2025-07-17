import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Typography } from 'antd';

import { Creators } from '../../redux/actions';
import { getActiveSessionsSelector } from '../../redux/selectors';
import { PROFILE_PAGE_COMPONENTS_TRANSLATION_PREFIXES } from '../../constants';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getColumns } from './config';

const { Title } = Typography;

export default function ActiveSessions() {
  const dispatch = useDispatch();
  const { t } = useTranslation('profile');

  useEffect(() => {
    dispatch(Creators.getActiveSessionsRequest());
  }, [dispatch]);

  const sessions = useSelector(getActiveSessionsSelector.getData);
  const isPending = useSelector(getActiveSessionsSelector.getIsPending);

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        <Title level={5}>{t(`${PROFILE_PAGE_COMPONENTS_TRANSLATION_PREFIXES.ACTIVE_SESSIONS}.TITLE`)}</Title>
      </Divider>
      <AntTableV2
        data={sessions}
        loading={isPending}
        columns={getColumns({ t, prefix: PROFILE_PAGE_COMPONENTS_TRANSLATION_PREFIXES.ACTIVE_SESSIONS })}
      />
    </>
  );
}
