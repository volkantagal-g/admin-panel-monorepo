import { toString } from 'lodash';

import { PROCESS_STATUS, WYSIWYG_BODY_PATTERN } from '@app/pages/Announcement/constants';

export const convertPhoneLanguageOptions = countryLanguages => {
  return countryLanguages?.map(item => ({
    value: toString(item.toLowerCase()),
    label: item,
  }));
};

export const convertPlatformOptions = options => Object.entries(options).map(([, value]) => ({ value, label: value }));

export const getPageHeaderTagColor = status => {
  switch (status) {
    case PROCESS_STATUS.CREATED:
    case PROCESS_STATUS.READY:
      return 'cyan';
    case PROCESS_STATUS.PRE_PROCESS:
    case PROCESS_STATUS.IN_PROCESS:
      return 'green';
    case PROCESS_STATUS.CANCEL:
    case PROCESS_STATUS.FAIL:
      return 'red';
    case PROCESS_STATUS.FINISHED:
      return 'green';
    default:
      return null;
  }
};

export const createPromoContentHTML = (body, contentSectionTitle) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>
    <meta charset='UTF-8'>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${contentSectionTitle}</title>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700' rel='stylesheet' type='text/css'>
    <style type='text/css'>
      body {
        font-family: "Open Sans", sans-serif;
        color: #3e3e3e;
        font-weight: 600;
        font-size: 12px !important;
        margin: 0;
        padding: 0;
      }
      main {
        font-family: "Open Sans", sans-serif;
        font-weight: 600;
        font-size: 12px !important;
        padding: 20px 15px 5px 15px;
        color: #3e3e3e;
      }
      div {
        font-family: 'Open Sans';
        font-weight: 600;
        padding: 0px !important;
        font-size: 12px !important;
      }
      p {
        font-family: 'Open Sans';
        font-weight: 600;
        margin-top: -4px !important;
        font-size: 12px !important;
      }
      ul, ol {
        list-style-position: inside;
        padding-left: 0;
      }
      span {
        font-family: 'Open Sans';
        font-weight: 600;
        font-size: 12px !important
      }
      span > p {
        font-family: 'Open Sans';
        font-weight: 600;
        font-size: 12px !important
      }
      strong {
        font-family: 'Open Sans';
        font-weight: bold;
        font-size: 12px !important
      }
      blockquote {
        font-family: 'Open Sans';
        font-weight: 600;
        font-size: 12px !important;
        margin: 2px 0px 0px 0px !important;
        padding: 0px !important;
        border: none !important;

      }
      blockquote > div {
        font-family: 'Open Sans';
        font-weight: 600;
        font-size: 12px !important;
        margin-top: 0px;
        margin-bottom: 2px;
        padding-bottom: 2px;
        text-indent: 2em;
      }
      blockquote > p {
        font-family: 'Open Sans';
        font-weight: 600;
        margin-top: 0px;
        margin-bottom: 2px;
        padding-bottom: 2px;
        text-indent: 2em;
        font-size: 12px !important
      }
      blockquote > div > p {
        font-family: 'Open Sans';
        font-weight: 600;
        font-size: 12px !important
      }
    </style>
  </head>
  <body style='color: #3e3e3e;'>
    <main>${body}</main>
  </body>
</html>
`.replace(/\n/g, '');

export const normalizeHtmlContentForWYSIWYG = content => (WYSIWYG_BODY_PATTERN.exec(content)?.[1] || content);
