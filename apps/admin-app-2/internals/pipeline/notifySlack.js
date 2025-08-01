// use native libraries so that we don't need to install any dependencies
const https = require('https');

const ENVS = {
  WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
  SLACK_HEADER_EXTRA: process.env.SLACK_HEADER_EXTRA,
  IS_SUCCESS: process.env.BITBUCKET_EXIT_CODE === '0',
  PIPELINE_ID: process.env.BITBUCKET_BUILD_NUMBER,
  TAG: process.env.BITBUCKET_TAG,
  BRANCH: process.env.BITBUCKET_BRANCH,
  PR_ID: process.env.BITBUCKET_PR_ID,
  // if it is not tag or PR then it is a branch pipeline, no need to check that
  // Note: custom pipelines are not supported in this version
  IS_TAG: !!process.env.BITBUCKET_TAG,
  IS_PR: !!process.env.BITBUCKET_PR_ID,
  IS_BEFORE_MANUAL_TRIGGER: !!process.env.IS_BEFORE_MANUAL_TRIGGER,
};

const TAG_MARKDOWN = `*Tag:*\n${ENVS.TAG}`;

const BRANCH_URL = `https://bitbucket.org/getirdev/admin-panel-frontend/branch/${ENVS.BRANCH}`;
const BRANCH_MARKDOWN = `*Branch:*\n<${BRANCH_URL}|${ENVS.BRANCH}>`;

const PIPELINE_URL = `https://bitbucket.org/getirdev/admin-panel-frontend/pipelines/results/${ENVS.PIPELINE_ID}`;
const PIPELINE_MARKDOWN = `*Pipeline:*\n<${PIPELINE_URL}|#${ENVS.PIPELINE_ID}>`;

const PR_URL = `https://bitbucket.org/getirdev/admin-panel-frontend/pull-requests/${ENVS.PR_ID}`;
const PR_MARKDOWN = `*Pull Request:*\n<${PR_URL}|#${ENVS.PR_ID}>`;

function getStatusMarkdown() {
  if (!ENVS.IS_SUCCESS) return '*Status:*\n:x: Failed';
  if (ENVS.IS_BEFORE_MANUAL_TRIGGER) return '*Status:*\n:arrow_forward: Ready to trigger';
  return '*Status:*\n:white_check_mark: Success';
}

const STATUS_MARKDOWN = getStatusMarkdown();

const payload = {
  blocks: [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `admin-panel-frontend / ${ENVS.SLACK_HEADER_EXTRA}`,
        emoji: true,
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: PIPELINE_MARKDOWN,
        },
      ],
    },
    { type: 'divider' },
    {
      type: 'section',
      fields: [

        {
          type: 'mrkdwn',
          // could be custom pipeline, but not supported, if it is not tag or pr, it is assumed a branch pipeline
          // eslint-disable-next-line no-nested-ternary
          text: ENVS.IS_TAG ? TAG_MARKDOWN : (ENVS.IS_PR ? PR_MARKDOWN : BRANCH_MARKDOWN),
        },
        {
          type: 'mrkdwn',
          text: STATUS_MARKDOWN,
        },
      ],
    },
    { type: 'divider' },
  ],
};

const notifySlack = async () => {
  https.request(
    ENVS.WEBHOOK_URL,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    res => {
      res.on('data', d => {
        process.stdout.write(d);
      });
    },
  ).end(JSON.stringify(payload));
};

notifySlack();
