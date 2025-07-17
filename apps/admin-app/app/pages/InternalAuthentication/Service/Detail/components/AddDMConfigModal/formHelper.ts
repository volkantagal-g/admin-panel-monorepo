import * as Yup from 'yup';

import { SLACK_WORKSPACES } from '../../constants';

export const teamSchema =
  Yup.object()
    .shape({
      workspaceName: Yup.string()
        .oneOf(Object.keys(SLACK_WORKSPACES))
        .required(),
      isDMEnabled: Yup.boolean()
        .required(),
    });

export const getInitialValues = () => ({
  workspaceName: '',
  isDMEnabled: false,
});
