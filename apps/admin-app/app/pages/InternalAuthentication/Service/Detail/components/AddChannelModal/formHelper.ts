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

export const getInitialValues = () => {
  const initialValues = {
    workspaceName: '',
    channelName: '',
  };
  return initialValues;
};
