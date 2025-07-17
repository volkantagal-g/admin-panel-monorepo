/* eslint-disable max-len */
// the page contains some string templates

import { useTranslation } from 'react-i18next';
import React from 'react';
import { Modal, Alert } from 'antd';

type SlackIntegrationInfoModalProps = {
  onClose: () => void;
  workspaceName: string;
  channelName: string;
  dm: string;
};

const SlackIntegrationInfoModal = ({ onClose, workspaceName, channelName, dm }: SlackIntegrationInfoModalProps) => {
  const { t } = useTranslation(['internalAuthentication']);

  let channelOrDm = `"channel": "${channelName}",`;
  if (dm) {
    channelOrDm = `"dm": "${dm}",`;
  }

  return (
    <Modal
      title={t('internalAuthentication:HOW_TO_SEND_SLACK_MESSAGE')}
      visible
      onCancel={onClose}
      onOk={onClose}
    >
      <Alert message={t('internalAuthentication:SLACK_INTEGRATION_INFO')} type="info" />
      <hr />
      <pre>{`curl --location --request POST 'http://<SLACK_LAMBDA_URL>.com>'
--header 'x-api-key: <READ_THIS_FROM_VAULT>'
--header 'access-token: <GET_THIS_FROM_THIS_PAGE>'
--header 'Content-Type: application/json'
--data-raw '{
    "team": "${workspaceName}",
    ${channelOrDm}
    "text": "<Place your message here>",
    "botName": "<You can name your bot smth cool>",
    "language": "en",
    "iconEmoji": ":getirlogo:",
    "attachments": [
        {
            "fallback": "this will be your fallback message",
            "color": "#5d3ebc",
            "fields": [
                {
                    "title": "Short but",
                    "value": "useful info",
                    "short": true
                },
                {
                    "title": "See?",
                    "value": "yeah cool",
                    "short": true
                },
                {
                    "title": "A Long Example",
                    "value": "This message is a long text\nIt also proves that this slack configuration works well\nIt uses the slack token generated for the service and the general X_API_KEY for auth\nAttachments are always optional but encouraged to use",
                    "short": false
                }
            ],
            "footer": "ps: There is even a tiny footer here",
            "ts": "${Math.floor(Date.now().valueOf() / 1000)}"
        }
    ]
}'`}
      </pre>
    </Modal>
  );
};

export default SlackIntegrationInfoModal;
