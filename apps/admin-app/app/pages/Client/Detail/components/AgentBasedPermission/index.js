import { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

import { Creators } from '@app/pages/Client/Detail/redux/actions';
import { accessSelector } from '@app/pages/Client/Detail/redux/selectors';
import { GATEWAY_ERRORS } from '@shared/shared/constants';
import SMSOtpModal from '../SMSOtpModal';

const AgentBasedPermission = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const activeChatToken = searchParams.get('activeChatToken');
  const errorCode = useSelector(accessSelector.getErrorCode);
  const isActiveChatTokenValid = useSelector(accessSelector.isActiveChatTokenValid);
  const isActiveChatTokenValidationPending = useSelector(accessSelector.isActiveChatTokenValidationPending);
  const hasUserBasedPermissionError = errorCode === GATEWAY_ERRORS.YOU_SHALL_NOT_PASS.errorCode;

  useEffect(() => {
    if (!hasUserBasedPermissionError || !activeChatToken || !id || !dispatch) return;
    dispatch(Creators.validateActiveChatTokenRequest({ activeChatToken, clientId: id }));
  }, [dispatch, id, hasUserBasedPermissionError, activeChatToken]);

  if (
    hasUserBasedPermissionError &&
    !isActiveChatTokenValidationPending &&
    (!activeChatToken || !isActiveChatTokenValid)
  ) {
    return <SMSOtpModal clientId={id} isVisible />;
  }

  return null;
};

export default memo(AgentBasedPermission);
