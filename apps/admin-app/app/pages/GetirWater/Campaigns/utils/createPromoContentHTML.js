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
