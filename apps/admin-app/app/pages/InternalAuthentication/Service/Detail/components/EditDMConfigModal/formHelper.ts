import * as Yup from 'yup';

import { SLACK_WORKSPACES } from '../../constants';
import { WorkspaceChannelNamePair, WorkspaceDMConfigPair } from '@app/pages/InternalAuthentication/types';

export const teamSchema =
  Yup.object()
    .shape({
      workspaceName: Yup.string()
        .oneOf(Object.keys(SLACK_WORKSPACES))
        .required(),
      isDMEnabled: Yup.boolean()
        .required(),
    });

export const getInitialValues = (pair?: WorkspaceDMConfigPair) => ({
  workspaceName: pair?.workspaceName ?? '',
  isDMEnabled: !!pair?.isDMEnabled,
});
