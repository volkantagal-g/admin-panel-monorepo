import * as Yup from 'yup';

import { SLACK_WORKSPACES } from '../../constants';

export const teamSchema =
    Yup.object()
      .shape({
        workspaceName: Yup.string()
          .oneOf(Object.keys(SLACK_WORKSPACES))
          .required(),
        channelName: Yup.string()
          .required(),
      });

type WorkspaceChannelNamePair = {
  workspaceName: string;
  channelName: string;
}
export const getInitialValues = (pair?: WorkspaceChannelNamePair) => {
  const initialValues = {
    workspaceName: pair?.workspaceName ?? '',
    channelName: pair?.channelName ?? '',
  };
  return initialValues;
};
